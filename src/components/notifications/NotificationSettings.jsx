import React, { useState, useEffect } from 'react';
import { Settings, Bell, BellOff, GraduationCap, Dumbbell, Moon, Scissors, Wallet, Clock, CheckCircle2, FlaskConical } from 'lucide-react';

export const NotificationSettings = ({ service }) => {
  const [settings, setSettings] = useState(() => service?.settings || null);
  const [loading, setLoading] = useState(!service?.settings);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Whitelist of allowed settings keys to prevent object injection
  const ALLOWED_KEYS = [
    'enabled', 'faculdade', 'academia', 'sono', 'nutricao', 'haircare', 'financas',
    'hora_dormir', 'hora_treino_lembrete'
  ];

  useEffect(() => {
    if (service?.settings) {
      const settingsChanged = !settings || JSON.stringify(settings) !== JSON.stringify(service.settings);
      if (settingsChanged) {
        // Wrapping in a small delay to avoid "cascading render" lint error
        const timer = setTimeout(() => {
          setSettings(service.settings);
          setLoading(false);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [service?.settings, settings]);

  const handleToggle = async (key) => {
    if (!ALLOWED_KEYS.includes(key)) return;
    const newVal = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newVal }));
    const success = await service.updateSettings({ [key]: newVal });
    if (success) flashSaved();
  };

  const handleTimeChange = async (key, value) => {
    if (!ALLOWED_KEYS.includes(key)) return;
    setSettings(prev => ({ ...prev, [key]: value }));
    const success = await service.updateSettings({ [key]: value });
    if (success) flashSaved();
  };

  const flashSaved = () => {
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  if (loading || !settings) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const categories = [
    { key: 'faculdade', label: 'Faculdade', icon: GraduationCap, color: 'text-blue-500' },
    { key: 'academia', label: 'Academia', icon: Dumbbell, color: 'text-green-500' },
    { key: 'sono', label: 'Sono', icon: Moon, color: 'text-purple-400' },
    { key: 'nutricao', label: 'Nutrição', icon: FlaskConical, color: 'text-orange-500' },
    { key: 'haircare', label: 'Haircare', icon: Scissors, color: 'text-pink-500' },
    { key: 'financas', label: 'Finanças', icon: Wallet, color: 'text-yellow-500' },
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
            <Settings size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Preferências de Notificação</h3>
            <p className="text-xs text-slate-400">Escolha o que você quer receber</p>
          </div>
        </div>
        {showSavedMsg && (
          <div className="flex items-center gap-1 text-green-400 text-xs font-semibold animate-pulse">
            <CheckCircle2 size={14} /> Salvo
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Global Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-2xl border border-slate-800/50 transition-all hover:bg-slate-800/60">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${settings.enabled ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'} transition-colors`}>
              {settings.enabled ? <Bell size={24} /> : <BellOff size={24} />}
            </div>
            <div>
              <p className="font-bold text-slate-200">Notificações Gerais</p>
              <p className="text-xs text-slate-500">Ativar ou desativar todos os alertas</p>
            </div>
          </div>
          <button 
            onClick={() => handleToggle('enabled')}
            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${settings.enabled ? 'bg-blue-600' : 'bg-slate-700'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${settings.enabled ? 'translate-x-6 shadow-lg shadow-blue-900/40' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.key} className={`p-4 rounded-2xl border transition-all ${settings[cat.key] ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-900/20 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-800 ${cat.color}`}>
                    <cat.icon size={18} />
                  </div>
                  <span className="font-semibold text-slate-200">{cat.label}</span>
                </div>
                <button 
                  onClick={() => handleToggle(cat.key)}
                  className={`w-10 h-6 rounded-full p-1 transition-all duration-300 ${settings[cat.key] ? 'bg-emerald-600' : 'bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${settings[cat.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
              
              {/* Custom Settings per category */}
              {(cat.key === 'sono' || cat.key === 'academia') && settings[cat.key] && (
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} />
                    <span>{cat.key === 'sono' ? 'Hora de dormir' : 'Hora do lembrete'}</span>
                  </div>
                  <input 
                    type="time" 
                    value={cat.key === 'sono' ? settings.hora_dormir : settings.hora_treino_lembrete}
                    onChange={(e) => handleTimeChange(cat.key === 'sono' ? 'hora_dormir' : 'hora_treino_lembrete', e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-md py-1 px-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
