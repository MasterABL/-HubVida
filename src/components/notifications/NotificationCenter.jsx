import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bell, Check, Trash2, Clock, Info, Moon, Scissors, Wallet, Dumbbell, GraduationCap, FlaskConical } from 'lucide-react';
import { supabase } from '../../supabase';

const CATEGORY_ICONS = {
  Faculdade: GraduationCap,
  Academia: Dumbbell,
  Sono: Moon,
  Nutricao: FlaskConical,
  Haircare: Scissors,
  Financas: Wallet,
  Default: Info
};

const CATEGORY_COLORS = {
  Faculdade: 'text-yellow-500',
  Academia: 'text-emerald-500',
  Sono: 'text-yellow-500',
  Nutricao: 'text-emerald-500',
  Haircare: 'text-fuchsia-500',
  Financas: 'text-emerald-500',
  Default: 'text-hub-faint'
};

export const NotificationCenter = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('notifications_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;

    // Use a timeout to avoid cascading render warning for initial fetch
    const timer = setTimeout(() => {
      fetchNotifications();
    }, 0);

    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications_changes')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications_history',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchNotifications();
      })
      .subscribe();

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [user, fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    const { error } = await supabase
      .from('notifications_history')
      .update({ read: true })
      .eq('id', id);
    
    if (!error) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    const { error } = await supabase
      .from('notifications_history')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false);
    
    if (!error) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const deleteNotification = async (id) => {
    const { error } = await supabase
      .from('notifications_history')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      setUnreadCount(prev => notifications.find(n => n.id === id && !n.read) ? prev - 1 : prev);
    }
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now - then) / 1000);

    if (diffInSeconds < 60) return 'agora';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`;
    return then.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-hub-muted hover:text-hub-strong transition-colors rounded-full hover:bg-white/10"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-[#111111]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-hub-surface border border-hub-border rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
          <div className="p-4 border-b border-hub-border flex justify-between items-center bg-hub-inner/50">
            <h3 className="font-bold text-hub-strong flex items-center">
              Notificações
              {unreadCount > 0 && <span className="ml-2 text-xs font-normal text-hub-faint">({unreadCount} novas)</span>}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors flex items-center"
              >
                <Check size={14} className="mr-1" /> Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="p-4 bg-hub-inner rounded-full mb-4 text-hub-faint">
                  <Bell size={32} />
                </div>
                <p className="text-hub-muted font-medium">Tudo limpo por aqui!</p>
                <p className="text-hub-faint text-xs mt-1">Você não tem notificações no momento.</p>
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = CATEGORY_ICONS[n.category] || CATEGORY_ICONS.Default;
                const iconColor = CATEGORY_COLORS[n.category] || CATEGORY_COLORS.Default;

                return (
                  <div 
                    key={n.id} 
                    className={`flex items-start p-4 border-b border-hub-border/50 hover:bg-white/5 transition-colors group ${!n.read ? 'bg-yellow-500/5' : 'opacity-60'}`}
                  >
                    <div className={`p-2 rounded-lg bg-hub-inner ${iconColor} mr-3 flex-shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0" onClick={() => !n.read && markAsRead(n.id)}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm font-semibold truncate ${!n.read ? 'text-hub-strong' : 'text-hub-muted'}`}>
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-hub-faint whitespace-nowrap ml-2 flex items-center">
                          <Clock size={10} className="mr-1" />
                          {formatRelativeTime(n.created_at)}
                        </span>
                      </div>
                      <p className="text-xs text-hub-muted line-clamp-2 pr-4">{n.body}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-hub-faint hover:text-red-400 transition-all rounded-md hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 bg-hub-inner/30 text-center">
               <span className="text-[10px] text-hub-faint uppercase tracking-wider font-semibold">Exibindo as últimas 20 notificações</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
