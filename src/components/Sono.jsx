import React, { useState } from 'react';
import { Moon, Sun, Clock, Activity, Coffee, Thermometer, Battery, CheckCircle, PhoneOff, Trash2 } from 'lucide-react';

export function Sono({ sleepGoal, setSleepGoal, sleepData, setSleepData }) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(sleepGoal);

  // New Log State
  const [newLogHours, setNewLogHours] = useState('');
  const [newLogQuality, setNewLogQuality] = useState('Boa');

  // Today Date String (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];
  const hasLoggedToday = sleepData.some(log => log.date === todayStr);

  const handleSaveGoal = () => {
    setSleepGoal(Number(tempGoal));
    setIsEditingGoal(false);
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogHours) return;

    const newLog = {
      id: Date.now().toString(),
      date: todayStr,
      hours: Number(newLogHours),
      quality: newLogQuality, // 'Ruim', 'Média', 'Boa', 'Excelente'
    };

    // Prevent duplicate logs for the same day entirely, or overwrite if needed (we'll just block if logged)
    if (hasLoggedToday) {
       // Find and replace
       const updatedData = sleepData.map(log => log.date === todayStr ? newLog : log);
       setSleepData(updatedData);
    } else {
       // Insert at beginning
       const updatedData = [newLog, ...sleepData].sort((a, b) => new Date(b.date) - new Date(a.date));
       setSleepData(updatedData);
    }
    setNewLogHours('');
  };

  const handleRemoveLog = (id) => {
    setSleepData(sleepData.filter(log => log.id !== id));
  };

  // Metrics Calculation
  const last7Days = sleepData.slice(0, 7);
  const avgHours = last7Days.length > 0
    ? (last7Days.reduce((acc, curr) => acc + curr.hours, 0) / last7Days.length).toFixed(1)
    : 0;
  
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excelente': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/50';
      case 'Boa':       return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/50';
      case 'Média':     return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50';
      case 'Ruim':      return 'text-rose-400 bg-rose-500/10 border-rose-500/50';
      default:          return 'text-hub-muted bg-slate-500/10 border-slate-500/50';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Cabeçalho */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400">
            Controle de Sono
          </h1>
          <p className="text-hub-muted mt-1 flex items-center gap-2 font-semibold">
            <Moon className="w-4 h-4 text-indigo-500" /> Reparo Celular & Cognitivo
          </p>
        </div>
        
        {/* Widget Meta de Sono */}
        <div className="bg-hub-surface border border-hub-border p-4 rounded-2xl flex items-center gap-6 shadow-xl w-full md:w-auto">
          {isEditingGoal ? (
             <div className="flex items-center gap-4">
               <div>
                 <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-1">Meta (Horas)</p>
                 <input 
                   type="number" step="0.5"
                   value={tempGoal} onChange={e => setTempGoal(e.target.value)}
                   className="w-20 bg-hub-base border border-indigo-500/50 rounded-lg px-2 py-1 text-hub-strong font-bold text-center focus:outline-none"
                 />
               </div>
               <button 
                 onClick={handleSaveGoal}
                 className="mt-4 bg-indigo-500 text-white rounded-lg p-2 hover:bg-indigo-400 transition-colors"
                 title="Salvar Meta"
               >
                 <CheckCircle className="w-4 h-4" />
               </button>
             </div>
          ) : (
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setIsEditingGoal(true)} title="Clique para editar a Meta">
               <div className="text-center group-hover:text-indigo-400 transition-colors">
                 <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest">Meta de Sono</p>
                 <p className="text-xl font-black text-hub-strong">{sleepGoal} hrs</p>
               </div>
               <div className="h-8 w-px bg-[#1f222a]"></div>
               <div className="text-center group-hover:text-indigo-400 transition-colors">
                 <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest">Média (7 dias)</p>
                 <p className={`text-xl font-black ${avgHours >= sleepGoal ? 'text-emerald-500' : 'text-yellow-500'}`}>
                   {avgHours} hrs
                 </p>
               </div>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Painel Esquerdo: Registro e Gráfico */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Formulário de Registro Diário */}
          <div className="bg-hub-surface border border-hub-border p-6 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2">
               <Sun className="w-5 h-5 text-yellow-500" /> Log da Última Noite
            </h2>
            
            <form onSubmit={handleAddLog} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-2">Horas Dormidas</label>
                <input 
                  type="number" step="0.1" required min="1" max="15"
                  value={newLogHours} onChange={e => setNewLogHours(e.target.value)}
                  placeholder="Ex: 7.5"
                  className="w-full bg-hub-base border border-hub-border rounded-xl px-4 py-3 text-hub-strong font-bold focus:outline-none focus:border-indigo-500 transition-all placeholder:text-hub-faint"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-2">Qualidade Percebida</label>
                <select 
                  value={newLogQuality} onChange={e => setNewLogQuality(e.target.value)}
                  className="w-full bg-hub-base border border-hub-border rounded-xl px-4 py-3 text-hub-strong font-bold focus:outline-none focus:border-indigo-500 transition-all appearance-none"
                >
                  <option value="Ruim">🟥 Ruim</option>
                  <option value="Média">🟨 Média</option>
                  <option value="Boa">🟩 Boa</option>
                  <option value="Excelente">🟦 Excelente</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(79,70,229,0.4)] hover:-translate-y-0.5"
                >
                  {hasLoggedToday ? 'Atualizar Hoje' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>

          {/* Histórico Visual (Lista com ProgressBar visual) */}
          <div className="bg-hub-surface border border-hub-border p-6 rounded-2xl shadow-lg">
             <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-hub-muted flex items-center gap-2">
                <Clock className="w-4 h-4" /> Histórico Recente (Últimos 14 dias)
             </h3>

             <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {sleepData.length === 0 ? (
                  <div className="text-center py-8 text-hub-faint text-sm">Nenhum registro de sono ainda.</div>
                ) : (
                  sleepData.slice(0, 14).map(log => {
                    const percentage = Math.min((log.hours / sleepGoal) * 100, 100);
                    const isSuccess = log.hours >= sleepGoal;

                    return (
                      <div key={log.id} className="bg-hub-base p-3 rounded-xl border border-hub-border flex items-center justify-between group">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-hub-content w-24">
                              {new Date(log.date + 'T12:00:00Z').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                            </span>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getQualityColor(log.quality)}`}>
                              {log.quality}
                            </span>
                            <span className={`text-xs w-12 font-black ${isSuccess ? 'text-emerald-400' : 'text-hub-muted'}`}>
                              {log.hours}h
                            </span>
                          </div>
                          
                          {/* Barra de Progresso vs Meta */}
                          <div className="h-1.5 w-full bg-[#1f222a] rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${isSuccess ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveLog(log.id)}
                          className="ml-4 p-2 text-hub-faint hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Remover Registro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  })
                )}
             </div>
          </div>
        </div>

        {/* Painel Direito: Science Vault (Higiene do Sono) */}
        <div className="space-y-6">
           <section className="bg-gradient-to-b from-[#12141a] to-[#0a0b0e] border border-hub-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
             {/* Decorator line */}
             <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
             
             <h2 className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2 mb-2">
               <Activity className="w-5 h-5 text-indigo-400" /> Sleep Vault
             </h2>
             <p className="text-[10px] font-bold text-hub-faint uppercase tracking-widest mb-6">Higiene & Fisiologia</p>

             <div className="space-y-4">
               
               <div className="bg-hub-base p-4 rounded-xl border border-hub-border group hover:border-indigo-500/30 transition-colors">
                 <h3 className="text-hub-strong font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
                   <Thermometer className="w-3.5 h-3.5 text-indigo-400" /> Termorregulação
                 </h3>
                 <p className="text-[11px] text-hub-muted leading-relaxed">
                   Para adormecer, a temperatura corporal central precisa cair cerca de 1°C. Um quarto frio (<span className="text-indigo-400 font-bold">18°C a 20°C</span>) e banho quente 90 mins antes aceleram esse processo.
                 </p>
               </div>

               <div className="bg-hub-base p-4 rounded-xl border border-hub-border group hover:border-indigo-500/30 transition-colors">
                 <h3 className="text-hub-strong font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
                   <PhoneOff className="w-3.5 h-3.5 text-indigo-400" /> Fotobiologia
                 </h3>
                 <p className="text-[11px] text-hub-muted leading-relaxed">
                   A luz azul (telas) bloqueia a liberação de <span className="text-indigo-400 font-bold">Melatonina</span> pela glândula pineal. Interromper contato ao menos 1h antes evita a fase REM atrasada.
                 </p>
               </div>

               <div className="bg-hub-base p-4 rounded-xl border border-hub-border group hover:border-indigo-500/30 transition-colors">
                 <h3 className="text-hub-strong font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
                   <Coffee className="w-3.5 h-3.5 text-indigo-400" /> Adenosina & Cafeína
                 </h3>
                 <p className="text-[11px] text-hub-muted leading-relaxed">
                   A cafeína tem meia-vida de 5 a 7 horas, bloqueando receptores de cansaço. Cortar o café até as <span className="text-indigo-400 font-bold">14h</span> garante pressão de sono adequada à noite.
                 </p>
               </div>

               <div className="bg-hub-base p-4 rounded-xl border border-hub-border group hover:border-indigo-500/30 transition-colors">
                 <h3 className="text-hub-strong font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
                   <Battery className="w-3.5 h-3.5 text-indigo-400" /> Consistência
                 </h3>
                 <p className="text-[11px] text-hub-muted leading-relaxed">
                   Acordar e dormir <span className="text-indigo-400 font-bold">exatamente</span> no mesmo horário calibra o ciclo circadiano, resolvendo 80% dos problemas de insônia (inclusive finais de semana).
                 </p>
               </div>

             </div>
           </section>
        </div>

      </div>
    </div>
  );
}
