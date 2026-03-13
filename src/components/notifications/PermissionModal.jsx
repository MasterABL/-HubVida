import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, X, Check } from 'lucide-react';

export const PermissionModal = ({ service }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if we should show the modal
    const checkPermission = async () => {
      if (Notification.permission === 'default') {
          // Check if user has already dismissed it in this session to avoid annoyance
          const isDismissed = sessionStorage.getItem('hubvida_notif_dismissed');
          if (!isDismissed) {
             // Delay showing the modal for better UX
             setTimeout(() => setShow(true), 3000);
          }
      }
    };
    
    checkPermission();
  }, [service]);

  const handleRequest = async () => {
    const permission = await service.requestPermission();
    if (permission === 'granted') {
      service.send('System', '🎉 Notificações Ativadas', 'Você agora receberá lembretes importantes do HubVida.');
    }
    setShow(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('hubvida_notif_dismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-zoom-in">
        <div className="relative p-8 flex flex-col items-center text-center">
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-6 relative">
            <Bell size={40} />
            <div className="absolute top-0 right-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-slate-900 flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-3">Fique por dentro!</h2>
          <p className="text-slate-400 mb-8">
            Ative as notificações para receber lembretes de treinos, estudos, 
            beber água e fechar o mês. Prometemos não incomodar!
          </p>

          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={handleRequest}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
            >
              <Bell size={20} /> Ativar Notificações
            </button>
            <button 
              onClick={handleDismiss}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-2xl transition-all"
            >
              Talvez mais tarde
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-500">
            <ShieldCheck size={12} />
            <span>Suas preferências podem ser alteradas nas configurações a qualquer momento.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
