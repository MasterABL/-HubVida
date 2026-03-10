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
import { Skeleton } from './Skeleton';

export const Nutricao = ({ isLoaded = true, dailyTracker = { water: false, creatine: false, meals: false }, setDailyTracker }) => {

  const toggleTracker = (item) => {
    setDailyTracker(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };


  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <Skeleton className="w-64 h-10" />
          <Skeleton className="w-full md:w-48 h-20 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="w-full h-32 rounded-2xl" />
          <Skeleton className="w-full h-32 rounded-2xl" />
          <Skeleton className="w-full h-32 rounded-2xl" />
        </div>
        <Skeleton className="w-48 h-6 mt-12 mb-4" />
        <Skeleton className="w-full h-64 rounded-xl" />
      </div>
    );
  }

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
          <p className="text-hub-muted font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> Nutrição de Alta Performance Ph.D.
          </p>
        </div>

        {/* WIDGET DE PROGRESSO DIÁRIO */}
        <div className="bg-hub-surface border border-hub-border rounded-xl p-4 shadow-lg w-full md:w-auto min-w-[200px]">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] text-hub-faint font-bold uppercase tracking-wider">Aderência Hoje</span>
            <span className="text-emerald-500 font-black text-lg">{completedCount}/3</span>
          </div>
          <div className="h-2 w-full bg-hub-hover rounded-full overflow-hidden">
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
              : 'bg-hub-surface border-hub-border hover:border-blue-500/30'}`}
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${dailyTracker.water ? 'bg-blue-500 text-white' : 'bg-hub-hover text-blue-500 group-hover:bg-blue-500/20'} transition-colors`}>
              <Droplets className="w-6 h-6" />
            </div>
            {dailyTracker.water && <CheckCircle2 className="w-5 h-5 text-blue-500 animate-in zoom-in" />}
          </div>
          <h3 className={`font-bold text-lg mb-1 relative z-10 ${dailyTracker.water ? 'text-blue-400' : 'text-hub-content'}`}>3 Litros de Água</h3>
          <p className="text-xs text-hub-faint relative z-10">Lubrificação neural e hidratação muscular.</p>
        </button>

        <button
          onClick={() => toggleTracker('creatine')}
          className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 text-left group
          ${dailyTracker.creatine
              ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
              : 'bg-hub-surface border-hub-border hover:border-purple-500/30'}`}
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${dailyTracker.creatine ? 'bg-purple-500 text-white' : 'bg-hub-hover text-purple-500 group-hover:bg-purple-500/20'} transition-colors`}>
              <Dumbbell className="w-6 h-6" />
            </div>
            {dailyTracker.creatine && <CheckCircle2 className="w-5 h-5 text-purple-500 animate-in zoom-in" />}
          </div>
          <h3 className={`font-bold text-lg mb-1 relative z-10 ${dailyTracker.creatine ? 'text-purple-400' : 'text-hub-content'}`}>Creatina (5g)</h3>
          <p className="text-xs text-hub-faint relative z-10">O combustível premium do Pré-Treino e Cérebro.</p>
        </button>

        <button
          onClick={() => toggleTracker('meals')}
          className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 text-left group
          ${dailyTracker.meals
              ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
              : 'bg-hub-surface border-hub-border hover:border-orange-500/30'}`}
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-xl ${dailyTracker.meals ? 'bg-orange-500 text-hub-strong' : 'bg-hub-hover text-orange-500 group-hover:bg-orange-500/20'} transition-colors`}>
              <Beef className="w-6 h-6" />
            </div>
            {dailyTracker.meals && <CheckCircle2 className="w-5 h-5 text-orange-500 animate-in zoom-in" />}
          </div>
          <h3 className={`font-bold text-lg mb-1 relative z-10 ${dailyTracker.meals ? 'text-orange-400' : 'text-hub-content'}`}>Bateu Proteína?</h3>
          <p className="text-xs text-hub-faint relative z-10">Cumpriu a meta de base de todas as refeições.</p>
        </button>

      </div>


      {/* PLANO ALIMENTAR (O VAULT) */}
      <h2 className="text-sm font-bold text-hub-faint uppercase tracking-widest mt-12 mb-4 px-1 flex items-center gap-2">
        <Brain className="w-4 h-4" /> Plano de Guerra: Seg à Sex
      </h2>

      <div className="space-y-6">

        {/* BLOCO 1: CAFÉ DA MANHÃ (3 OPÇÕES) */}
        <div className="bg-hub-surface border border-hub-border rounded-xl p-5 md:p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Coffee className="w-40 h-40" />
          </div>

          <div className="mb-6 relative z-10">
            <div className="inline-block px-3 py-1 bg-sky-500/10 text-sky-400 rounded-lg text-xs font-bold uppercase tracking-wider mb-2 border border-sky-500/20">
              07:50 - Empresa
            </div>
            <h3 className="text-xl font-bold text-hub-strong">Café da Manhã: Ganho de Massa</h3>
            <p className="text-sm text-hub-muted mt-1">Escolha 1 das 3 opções formadoras de músculo diariamente.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="bg-hub-hover border border-slate-700/50 hover:border-sky-500/30 transition-colors rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sky-400 mb-2">Opção 1: Clássico Prático</h4>
                <ul className="text-sm text-hub-content space-y-1.5 mb-4">
                  <li>• 1 a 2 Pães (com manteiga)</li>
                  <li>• 1 scoop de Whey (água ou leite)</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-hub-faint bg-hub-inner p-2 rounded mb-2 border border-hub-border">
                  <span>30g P</span><span>25g C</span><span>12g G</span>
                </div>
                <p className="text-xs font-bold text-emerald-500 text-right">R$ 130/mês</p>
              </div>
            </div>

            <div className="bg-hub-hover border border-slate-700/50 hover:border-amber-500/30 transition-colors rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-amber-500 mb-2">Opção 2: Ovos (Proteína Pura)</h4>
                <ul className="text-sm text-hub-content space-y-1.5 mb-4">
                  <li>• 3 Ovos Mexidos</li>
                  <li>• 1 Fatia de Queijo</li>
                  <li>• (Pão Opcional)</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-hub-faint bg-hub-inner p-2 rounded mb-2 border border-hub-border">
                  <span>22g P</span><span>0g C</span><span>15g G</span>
                </div>
                <p className="text-xs font-bold text-emerald-500 text-right">R$ 80/mês</p>
              </div>
            </div>

            <div className="bg-hub-hover border border-slate-700/50 hover:border-purple-500/30 transition-colors rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-purple-400 mb-2">Opção 3: Iogurte Proteico</h4>
                <ul className="text-sm text-hub-content space-y-1.5 mb-4">
                  <li>• 1 Iogurte Natural (170g)</li>
                  <li>• 1 Scoop de Whey</li>
                  <li>• 1 Banana amasadinha</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-hub-faint bg-hub-inner p-2 rounded mb-2 border border-hub-border">
                  <span>35g P</span><span>35g C</span><span>5g G</span>
                </div>
                <p className="text-xs font-bold text-emerald-500 text-right">R$ 170/mês</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BLOCO 2: ALMOÇO E JANTA (REFEIÇÕES BASE) */}
          <div className="bg-hub-surface border border-hub-border rounded-xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
                12:00 - Almoço da Empresa
              </div>
              <h3 className="text-xl font-bold text-hub-strong mb-2">A Base do Superávit Modesto</h3>
              <p className="text-sm text-hub-content mb-4 border-l-2 border-amber-500 pl-3">
                Arroz, Feijão, saladas à vontade + Proteína Magra (Frango / Opções da empresa) ou Ovos. Essa é sua maior injeção de energia sustentável pro resto do dia.
              </p>
            </div>
            <div className="border-t border-hub-border pt-4 mt-auto">
              <div className="inline-block px-3 py-1 bg-slate-500/10 text-hub-muted rounded-lg text-xs font-bold uppercase tracking-wider mb-2 border border-slate-500/20">
                20:30+ - Opcional Pós-Treino / Janta
              </div>
              <p className="text-sm text-hub-content border-l-2 border-slate-500 pl-3">
                Não complique. Replique a lógica do almoço em menor quantidade, OU repita a "Opção 1" do Café (Pão com Ovos ou Pão com Whey) para não dormir de estômago tão cheio e prejudicar o sono.
              </p>
            </div>
          </div>

          {/* BLOCO 3: SUPLEMENTAÇÃO E PRÉ-TREINO T/Q/S */}
          <div className="bg-hub-surface border border-indigo-500/30 rounded-xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
              <Zap className="w-24 h-24" />
            </div>

            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
                Guia de Suplementos & Pré-Treino
              </div>
              <h3 className="text-lg font-bold text-hub-strong mb-4">A Lógica da Mente Focada</h3>

              <ul className="space-y-3">
                <li className="bg-hub-hover p-3 rounded-lg border border-slate-700/50">
                  <span className="font-bold text-indigo-400 block mb-1">A Regra da Creatina (5g)</span>
                  <p className="text-xs text-hub-content">Horário livre. O importante é tomar todos os dias sem falta. Como o almoço é forte, tomar após o almoço ajuda na absorção pelos carboidratos da refeição.</p>
                </li>

                <li className="bg-hub-hover p-3 rounded-lg border border-slate-700/50">
                  <span className="font-bold text-emerald-400 block mb-1">Ter/Qui/Sex (A Salvação Rápida)</span>
                  <p className="text-xs text-hub-content">Ir treinar assim que sai do inglês cria o "Jejum de Adrenalina". Se precisar comer pra não ter tontura: Um iogurte no "Boa" ou uma (1) Banana madura 30 minutos antes do treino salvarão a sua vida e energia.</p>
                </li>

                <li className="bg-hub-hover p-3 rounded-lg border border-slate-700/50">
                  <span className="font-bold text-sky-400 block mb-1">Whey Protein</span>
                  <p className="text-xs text-hub-content">Use primariamente no Café da Manhã. Misturá-lo somente com Água ajuda a acelerar a digestão matinal e bater os macros rápido antes de trampar.</p>
                </li>
              </ul>
            </div>
          </div>
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
