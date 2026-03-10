import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const SplashScreen = ({ isReady }) => {
  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-hub-base transition-all duration-700 ease-in-out ${
        isReady ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Decorativo Estilo Auth */}
      <div className="absolute top-0 left-0 w-full h-96 bg-yellow-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[150px] pointer-events-none" />

      {/* Conteúdo Central */}
      <div className="flex flex-col items-center animate-in zoom-in duration-1000">
        
        {/* Logo Shield Ping */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-6 shadow-2xl shadow-yellow-500/20 relative">
          <div className="absolute inset-0 rounded-3xl animate-ping opacity-20 bg-yellow-500 hidden sm:block"></div>
          <ShieldCheck className="w-12 h-12 text-slate-900 relative z-10" />
        </div>
        
        {/* Typografia da Marca */}
        <h1 className="text-4xl font-black text-hub-strong italic tracking-wider uppercase mb-3 flex items-center gap-1">
          HUB<span className="text-yellow-500">VIDA</span>
        </h1>
        
        {/* Subtexto Carregamento */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500/80 animate-pulse" />
          <p className="text-sm text-hub-faint font-bold tracking-widest uppercase animate-pulse">
            Sincronizando Módulos...
          </p>
        </div>
        
      </div>

    </div>
  );
};
