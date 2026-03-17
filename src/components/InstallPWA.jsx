import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS] = useState(() => typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === 'undefined') return false;
        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isPWA = window.matchMedia('(display-mode: standalone)').matches;
        return ios && !isPWA;
    });

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-slide-in-up">
            <div className="bg-hub-inner border border-hub-border p-5 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 p-3 rounded-2xl text-yellow-500">
                        <Download size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-hub-strong flex items-center gap-2">
                            📲 Instalar HubVida
                        </p>
                        <p className="text-sm text-hub-muted mt-1">
                            Instale para receber notificações nativas e ter acesso rápido.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="text-hub-faint hover:text-hub-strong transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {isIOS ? (
                    <div className="bg-white/5 p-4 rounded-2xl text-xs text-slate-300 leading-tight">
                        No Safari: toque em <span className="font-bold text-white italic">Compartilhar</span> e depois em <span className="font-bold text-white italic">Adicionar à Tela de Início</span>.
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleInstallClick}
                            className="flex-1 bg-yellow-500 text-black font-bold py-3 px-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-yellow-500/20"
                        >
                            Instalar Agora
                        </button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="flex-1 bg-white/5 text-hub-content font-bold py-3 px-6 rounded-2xl transition-all hover:bg-white/10"
                        >
                            Agora não
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
