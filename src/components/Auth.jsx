import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Lock, Mail, KeyRound, ArrowRight, Loader2, ShieldCheck, Zap } from 'lucide-react';

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPrompt, setErrorPrompt] = useState(null);
  const [successPrompt, setSuccessPrompt] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorPrompt(null);
    setSuccessPrompt(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessPrompt('Registro bem-sucedido! Verifique seu email se o Supabase exigir, ou faça o login.');
      }
    } catch (error) {
      setErrorPrompt(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-300 font-sans selection:bg-yellow-500/30 selection:text-yellow-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-96 bg-yellow-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#12141a] border border-[#1f222a] rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="p-8 pb-6 border-b border-[#1f222a]">
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/20">
             <ShieldCheck className="w-8 h-8 text-slate-900" />
           </div>
           
           <h1 className="text-3xl font-black text-white italic tracking-wider uppercase mb-2">
             HUB<span className="text-yellow-500">VIDA</span>
           </h1>
           <p className="text-sm text-slate-400 font-medium">
             Central de Inteligência Protegida
           </p>
        </div>

        <div className="p-8 pt-6">
          <form onSubmit={handleAuth} className="space-y-4">
            {errorPrompt && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-lg text-xs font-bold shrink-0 mb-4 animate-in fade-in">
                {errorPrompt}
              </div>
            )}
            
            {successPrompt && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs font-bold shrink-0 mb-4 animate-in fade-in">
                {successPrompt}
              </div>
            )}

            <div>
               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block mb-1">
                 Email Criptografado
               </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-500" />
                 </div>
                 <input
                   type="email"
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-[#0a0b0e] border border-[#1f222a] text-white rounded-xl py-3 pl-10 pr-3 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-colors placeholder:text-slate-600"
                   placeholder="abimael@hubvida.com"
                 />
               </div>
            </div>

            <div>
               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 block mb-1">
                 Chave de Acesso
               </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-4 w-4 text-slate-500" />
                 </div>
                 <input
                   type="password"
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-[#0a0b0e] border border-[#1f222a] text-white rounded-xl py-3 pl-10 pr-3 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-colors placeholder:text-slate-600"
                   placeholder="••••••••"
                 />
               </div>
            </div>

            <button
               type="submit"
               disabled={isLoading}
               className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 disabled:from-slate-700 disabled:to-slate-800 text-slate-900 disabled:text-slate-500 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-yellow-500/25 active:scale-95"
            >
               {isLoading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <>
                   {isLogin ? 'Desbloquear Acesso' : 'Criar Nova Identidade'}
                   <ArrowRight className="w-5 h-5" />
                 </>
               )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1f222a] text-center">
            <button
               onClick={() => {
                 setIsLogin(!isLogin);
                 setErrorPrompt(null);
                 setSuccessPrompt(null);
               }}
               className="text-xs text-slate-500 hover:text-yellow-500 font-bold uppercase tracking-wider transition-colors"
            >
               {isLogin ? 'Ou criar uma nova conta mestra' : 'Já possui acesso? Voltar ao Login'}
            </button>
          </div>

        </div>
      </div>
      
      {/* Decorative Text */}
      <div className="absolute bottom-8 text-center w-full pointer-events-none">
        <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-slate-600 font-bold">
          <Zap className="w-3 h-3 text-yellow-500/50" /> Powered by Supabase Auth (SHA-256)
        </p>
      </div>
    </div>
  );
};
