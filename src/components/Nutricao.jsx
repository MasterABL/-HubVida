import React, { useState } from 'react';
import { 
  Dumbbell, 
  Droplets, 
  Beef, 
  CheckCircle2, 
  Coffee,
  Brain,
  Zap,
  Flame,
  BatteryCharging
} from 'lucide-react';

export const Nutricao = () => {
  // Estado para os botões de engajamento diário
  const [dailyTracker, setDailyTracker] = useState({
    water: false,
    creatine: false,
    meals: false,
  });

  const toggleTracker = (item) => {
    setDailyTracker(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const completedCount = Object.values(dailyTracker).filter(Boolean).length;
  const progressPercent = (completedCount / 3) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600 mb-1 flex items-center gap-3">
            BIO-TRACKER <ActivityIcon />
          </h1>
          <p className="text-slate-400 font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> Nutrição de Alta Performance Ph.D.
          </p>
        </div>
        
        {/* WIDGET DE PROGRESSO DIÁRIO */}
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-4 shadow-lg w-full md:w-auto min-w-[200px]">
           <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Aderência Hoje</span>
              <span className="text-emerald-500 font-black text-lg">{completedCount}/3</span>
           </div>
           <div className="h-2 w-full bg-[#1a1d24] rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 ease-out"
               style={{ width: `${progressPercent}%` }}
             ></div>
           </div>
        </div>
      </div>

      {/* TRACKER DE HÁBITOS RÁPIDOS (O SEGREDO DO SUCESSO) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <button 
          onClick={() => toggleTracker('water')}
          className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 text-left group
          ${dailyTracker.water 
            ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
            : 'bg-[#12141a] border-[#1f222a] hover:border-blue-500/30'}`}
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${dailyTracker.water ? 'bg-blue-500 text-white' : 'bg-[#1a1d24] text-blue-500 group-hover:bg-blue-500/20'} transition-colors`}>
               <Droplets className="w-6 h-6" />
            </div>
            {dailyTracker.water && <CheckCircle2 className="w-5 h-5 text-blue-500 animate-in zoom-in" />}
          </div>
          <h3 className={`font-bold text-lg mb-1 relative z-10 ${dailyTracker.water ? 'text-blue-400' : 'text-slate-300'}`}>3 Litros de Água</h3>
          <p className="text-xs text-slate-500 relative z-10">Lubrificação neural e hidratação muscular.</p>
        </button>

        <button 
          onClick={() => toggleTracker('creatine')}
          className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 text-left group
          ${dailyTracker.creatine 
            ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
            : 'bg-[#12141a] border-[#1f222a] hover:border-purple-500/30'}`}
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${dailyTracker.creatine ? 'bg-purple-500 text-white' : 'bg-[#1a1d24] text-purple-500 group-hover:bg-purple-500/20'} transition-colors`}>
               <Dumbbell className="w-6 h-6" />
            </div>
            {dailyTracker.creatine && <CheckCircle2 className="w-5 h-5 text-purple-500 animate-in zoom-in" />}
          </div>
          <h3 className={`font-bold text-lg mb-1 relative z-10 ${dailyTracker.creatine ? 'text-purple-400' : 'text-slate-300'}`}>Creatina (5g)</h3>
          <p className="text-xs text-slate-500 relative z-10">O combustível premium do Pré-Treino e Cérebro.</p>
        </button>

        <button 
          onClick={() => toggleTracker('meals')}
          className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 text-left group
          ${dailyTracker.meals 
            ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
            : 'bg-[#12141a] border-[#1f222a] hover:border-orange-500/30'}`}
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${dailyTracker.meals ? 'bg-orange-500 text-white' : 'bg-[#1a1d24] text-orange-500 group-hover:bg-orange-500/20'} transition-colors`}>
               <Beef className="w-6 h-6" />
            </div>
            {dailyTracker.meals && <CheckCircle2 className="w-5 h-5 text-orange-500 animate-in zoom-in" />}
          </div>
          <h3 className={`font-bold text-lg mb-1 relative z-10 ${dailyTracker.meals ? 'text-orange-400' : 'text-slate-300'}`}>Bateu Proteína?</h3>
          <p className="text-xs text-slate-500 relative z-10">Cumpriu a meta de base de todas as refeições.</p>
        </button>

      </div>

      
      {/* PLANO ALIMENTAR (O VAULT) */}
      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-12 mb-4 px-1 flex items-center gap-2">
        <Brain className="w-4 h-4" /> Plano de Guerra: Seg à Sex
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BLOCO: MANHÃ */}
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-5 md:p-6 shadow-md relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Coffee className="w-24 h-24" />
           </div>
           
           <div className="inline-block px-3 py-1 bg-sky-500/10 text-sky-400 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-sky-500/20">
             07:50 - Empresa
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Café da Manhã Sustentável</h3>
           
           <div className="bg-[#1a1d24] border border-slate-700/50 rounded-lg p-4 mb-4">
             <ul className="space-y-3">
               <li className="flex gap-3 text-slate-300">
                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0"></div>
                 <p><span className="font-bold text-white">Carboidrato:</span> Pão com manteiga (Garante energia rápida pro cérebro logo cedo).</p>
               </li>
               <li className="flex gap-3 text-emerald-400 font-medium">
                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                 <p><span className="font-bold">Proteína Padrão-Ouro (Adição Obrigatória):</span> Tomar 1 porção de Whey Protein junto para ancorar o índice glicêmico e segurar a fome até o almoço.</p>
               </li>
             </ul>
           </div>
        </div>

        {/* BLOCO: ALMOÇO */}
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-5 md:p-6 shadow-md relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Flame className="w-24 h-24" />
           </div>
           
           <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
             12:xx - Almoço Farto
           </div>
           <h3 className="text-xl font-bold text-white mb-2">A Base do Superávit Modesto</h3>
           
           <div className="bg-[#1a1d24] border border-slate-700/50 rounded-lg p-4 mb-4">
             <ul className="space-y-3">
               <li className="flex gap-3 text-slate-300">
                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                 <p><span className="font-bold text-white">Prato Colorido:</span> Arroz, Feijão (ferro/fribra), saladas/verduras à vontade.</p>
               </li>
               <li className="flex gap-3 text-slate-300">
                 <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                 <p><span className="font-bold text-white">Proteína Magra:</span> Asas opções de mistura da empresa (Corte Magro ou Frango) + Os ovos mexidos, se disponíveis.</p>
               </li>
             </ul>
           </div>
           <p className="text-xs text-slate-400 italic mt-3 bg-slate-800/30 p-2 rounded border border-slate-700/50">
             *Essa refeição rica é tão protetora que te blindará contra a fome na parte da tarde e te sustentará para o treino do final do dia.
           </p>
        </div>

        {/* BLOCO: PRE-TREINO */}
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-5 md:p-6 shadow-md relative overflow-hidden lg:col-span-2">
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <BatteryCharging className="w-32 h-32" />
           </div>
           
           <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/20">
             Ter/Qui/Sex - Falta de Tempo
           </div>
           <h3 className="text-xl font-bold text-white mb-2">O Pré-Treino Dinâmico</h3>
           
           <p className="text-sm text-slate-300 mb-6 max-w-2xl">
              Nesses dias corridos da semana, onde não há janela de horas para digestão pré-academia, o plano é não "encher o estômago pesado" e confiar na digestão longa do almoço:
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1a1d24] border-l-4 border-l-purple-500 shadow-sm rounded-r-lg p-4">
                 <h4 className="font-bold text-purple-400 mb-1">A Opção Líquida + Adrenalina (Ideal)</h4>
                 <p className="text-sm text-slate-400">Jejum calórico estratégico (apenas água gelada) na janela entre almoço e treino. A sensação de estômago vazio eleva noradrenalina, dando mais agressividade lá dentro da SmartFit.</p>
              </div>

              <div className="bg-[#1a1d24] border-l-4 border-l-emerald-500 shadow-sm rounded-r-lg p-4">
                 <h4 className="font-bold text-emerald-400 mb-1">A Opção Sólida Rápida (Plano B)</h4>
                 <p className="text-sm text-slate-400">Bateu tontura nervosa no fim da tarde? Uma (1) banana na saída do trabalho ou um scoop isolado de Whey com água garantem estabilidade.</p>
              </div>
           </div>
           <p className="text-xs text-white font-bold tracking-wide mt-4 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             LEI MAIOR PARA ESSES DIAS: CREATINA DEVE SER TOMADA NO MEIO DA TARDE INFALIVELMENTE.
           </p>
        </div>

      </div>

    </div>
  );
};

/* Ícone customizado de Batimento (Activity) */
function ActivityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
       <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}
