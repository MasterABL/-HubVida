import React, { useState, useEffect, useCallback } from 'react';
import { X, Bell, Info, CheckCircle, AlertTriangle, Moon, Utensils, Scissors, Wallet, Dumbbell, GraduationCap, Droplets, FlaskConical } from 'lucide-react';

const CATEGORY_STYLES = {
  Faculdade: { icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  Academia: { icon: Dumbbell, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  Sono: { icon: Moon, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  Nutricao: { icon: FlaskConical, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  Haircare: { icon: Scissors, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  Financas: { icon: Wallet, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  Default: { icon: Info, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' }
};

const Toast = ({ id, category, title, body, onDismiss }) => {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Default;
  const Icon = style.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div className={`relative flex items-start p-4 mb-3 w-80 max-w-sm ${style.bg} border ${style.border} rounded-xl shadow-2xl backdrop-blur-md animate-slide-in-right pointer-events-auto overflow-hidden`}>
      <div className={`p-2 rounded-lg ${style.bg} ${style.color} mr-3`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-100 truncate">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{body}</p>
      </div>
      <button 
        onClick={() => onDismiss(id)}
        className="text-slate-500 hover:text-slate-300 transition-colors ml-2"
      >
        <X size={16} />
      </button>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-progress-bar" />
    </div>
  );
};

export const ToastContainer = ({ service }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (service) {
      service.onNotificationReceived = (toast) => {
        setToasts(prev => {
          const newToasts = [...prev, { ...toast, id: Date.now() }];
          if (newToasts.length > 3) return newToasts.slice(1);
          return newToasts;
        });
      };
    }
  }, [service]);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none flex flex-col items-end">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onDismiss={dismiss} />
      ))}
    </div>
  );
};
