import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Previne o prompt padrão
            e.preventDefault();
            // Salva o evento para acionar depois
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Mostra o prompt de instalação
        deferredPrompt.prompt();

        // Aguarda a resposta do usuário
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        }

        setDeferredPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-left-4 fade-in duration-500">
            <div className="bg-indigo-600 text-white rounded-2xl shadow-xl p-4 pr-12 relative flex items-center gap-3 border border-indigo-400/30">
                <div className="bg-white/20 p-2 rounded-xl">
                    <Download className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-bold text-sm">Instalar App</p>
                    <p className="text-xs text-indigo-100 opacity-80">Acesso super rápido offline</p>
                </div>

                {/* Usamos botão inteiro como clicável */}
                <button
                    onClick={handleInstallClick}
                    className="absolute inset-0 w-full h-full cursor-pointer z-10"
                    aria-label="Instalar HubVida"
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsVisible(false);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
