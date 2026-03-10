import React, { useEffect } from 'react';
import { Ghost, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
    // Garantir que a tela comece no topo
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-hub-base flex items-center justify-center p-6 transition-colors duration-300">
            <div className="bg-hub-surface border border-hub-border max-w-md w-full rounded-3xl p-8 text-center shadow-xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-2xl rounded-full group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                    <Ghost className="w-24 h-24 text-indigo-400 relative z-10 animate-spin-slow" style={{ animationDuration: '6s' }} />
                </div>

                <h1 className="text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
                    404
                </h1>
                <h2 className="text-xl font-bold text-hub-strong mb-4">
                    Perdido no multiverso? 🌌
                </h2>
                <p className="text-hub-muted font-medium mb-10 max-w-xs mx-auto">
                    Parece que esta área do HubVida foi abduzida. A rota que você procura não existe ou foi transferida para outra dimensão.
                </p>

                <Link
                    to="/"
                    className="w-full py-4 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 group"
                >
                    <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    Voltar ao início
                </Link>

            </div>
        </div>
    );
}
