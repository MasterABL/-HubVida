import React from 'react';
import {
  Plus,
  Trash2,
  Target,
  Dumbbell,
  Briefcase,
  Sun, Bus, BookOpen, FileText, Coffee, Moon, GraduationCap, Home, MapPin
} from 'lucide-react';
import { Skeleton } from './Skeleton';

const iconMap = {
  Sun, Bus, Briefcase, BookOpen, FileText, Coffee, Target, Moon, Dumbbell, GraduationCap, Home, MapPin
};

// Mapeamento de cores no tema escuro
const colorMap = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-700 dark:text-purple-300', icon: 'text-purple-500 dark:text-purple-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-700 dark:text-yellow-300', icon: 'text-yellow-600 dark:text-yellow-400' },
  blue: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-700 dark:text-indigo-300', icon: 'text-indigo-600 dark:text-indigo-400' },
  green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-700 dark:text-emerald-300', icon: 'text-emerald-600 dark:text-emerald-400' },
  red: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-700 dark:text-rose-300', icon: 'text-rose-600 dark:text-rose-400' },
  gray: { bg: 'bg-hub-inner', border: 'border-hub-border', text: 'text-hub-strong', icon: 'text-hub-faint' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-700 dark:text-teal-300', icon: 'text-teal-600 dark:text-teal-400' },
};

export const Rotina = ({
  isLoaded = true,
  routinesData,
  activeRoutine,
  setActiveRoutine,
  newRoutineTask,
  setNewRoutineTask,
  handleAddRoutineTask,
  handleToggleRoutineTask,
  handleRemoveRoutineTask,
  gymAttendance,
  setGymAttendance,
}) => {
  let routine = { timeline: [] };
  if (activeRoutine === 'Segunda' && routinesData.Segunda) routine = routinesData.Segunda;
  else if (activeRoutine === 'Terça' && routinesData.Terça) routine = routinesData.Terça;
  else if (activeRoutine === 'Quarta' && routinesData.Quarta) routine = routinesData.Quarta;
  else if (activeRoutine === 'Quinta' && routinesData.Quinta) routine = routinesData.Quinta;
  else if (activeRoutine === 'Sexta' && routinesData.Sexta) routine = routinesData.Sexta;
  else if (activeRoutine === 'Sábado' && routinesData.Sábado) routine = routinesData.Sábado;
  else if (activeRoutine === 'Domingo' && routinesData.Domingo) routine = routinesData.Domingo;

  const dias = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const checkedCount = (routine.timeline || []).filter(i => i.checked).length;
  const progress = (routine.timeline || []).length > 0
    ? Math.round((checkedCount / routine.timeline.length) * 100)
    : 0;

  const toggleGymAttendance = (dayIndex) => {
    setGymAttendance(prev => {
      let current = 'pending';
      if (dayIndex === 0) current = prev[0];
      else if (dayIndex === 1) current = prev[1];
      else if (dayIndex === 2) current = prev[2];
      else if (dayIndex === 3) current = prev[3];
      else if (dayIndex === 4) current = prev[4];
      else if (dayIndex === 5) current = prev[5];
      else if (dayIndex === 6) current = prev[6];

      let nextStatus = 'pending';
      if (current === 'pending') nextStatus = 'done';
      else if (current === 'done') nextStatus = 'missed';
      else if (current === 'missed') nextStatus = 'pending';

      const newState = [...prev];
      if (dayIndex >= 0 && dayIndex <= 6) {
        newState[dayIndex] = nextStatus;
      }
      return newState;
    });
  };

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="w-full h-32 md:h-24 rounded-xl" />
        <Skeleton className="w-full h-12 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="w-full h-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="w-full h-14 rounded-xl" />
              <Skeleton className="w-full h-14 rounded-xl" />
              <Skeleton className="w-full h-14 rounded-xl" />
              <Skeleton className="w-full h-14 rounded-xl" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-full h-32 rounded-xl" />
            <Skeleton className="w-full h-32 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-hub-surface border border-hub-border rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-hub-strong uppercase">
            Rotina Diária
          </h1>
          <p className="text-xs text-hub-faint uppercase tracking-widest mt-1 font-bold">
            {activeRoutine} — {checkedCount}/{routine.timeline.length} concluídos
          </p>
        </div>
        {/* Progress */}
        <div className="flex flex-col items-end gap-1 w-full md:w-48">
          <span className="text-[10px] text-hub-faint font-bold uppercase tracking-widest">{progress}% do dia</span>
          <div className="w-full h-2 bg-hub-inner rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs de dias */}
      <div className="flex bg-hub-surface border border-hub-border rounded-xl overflow-hidden p-1 shadow-md flex-wrap gap-1">
        {Object.keys(routinesData).map((day) => (
          <button
            key={day}
            onClick={() => setActiveRoutine(day)}
            className={`flex-1 min-w-[80px] py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeRoutine === day
              ? 'bg-yellow-500 text-slate-900 shadow'
              : 'text-hub-faint hover:text-hub-strong hover:bg-hub-hover'
              }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Input de nova tarefa */}
          <div className="flex items-center gap-2 bg-hub-surface border border-hub-border rounded-xl p-3 shadow-sm">
            <input
              type="time"
              value={newRoutineTask.time}
              onChange={(e) => setNewRoutineTask({ ...newRoutineTask, time: e.target.value })}
              className="bg-transparent text-hub-content text-sm focus:outline-none p-1 border-r border-hub-border pr-3"
            />
            <input
              type="text"
              placeholder="Adicionar nova tarefa..."
              value={newRoutineTask.title}
              onChange={(e) => setNewRoutineTask({ ...newRoutineTask, title: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAddRoutineTask()}
              className="flex-1 bg-transparent text-hub-content text-sm focus:outline-none p-1 placeholder-slate-600"
            />
            <button
              onClick={handleAddRoutineTask}
              className="p-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de tarefas */}
          <div className="space-y-2">
            {routine.timeline.map((item, index) => {
              const colors = colorMap[item.type] || colorMap['gray'];
              const IconComponent = iconMap[item.icon];
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 group cursor-pointer"
                  onClick={() => handleToggleRoutineTask(index)}
                >
                  <span className="text-xs font-mono font-bold text-hub-faint w-12 text-right flex-shrink-0">
                    {item.time}
                  </span>
                  <div
                    className={`flex-1 flex justify-between items-center p-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm border ${item.checked
                      ? 'bg-hub-base border-hub-border opacity-50'
                      : `${colors.bg} ${colors.border}`
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {IconComponent && (
                        <IconComponent
                          className={`w-4 h-4 flex-shrink-0 ${item.checked ? 'text-hub-faint' : colors.icon}`}
                        />
                      )}
                      <span className={item.checked ? 'line-through text-hub-faint' : colors.text}>
                        {item.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRoutineTask(index);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-hub-faint hover:text-rose-500 ml-2 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Painel lateral */}
        <div className="space-y-4">
          {/* Meta do dia */}
          <div className="bg-hub-surface border border-yellow-500/20 rounded-xl p-6 shadow-md">
            <h3 className="font-bold flex items-center gap-2 mb-3 text-yellow-500 text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" /> Meta do Dia
            </h3>
            <p className="text-sm text-hub-content leading-relaxed">{routine.meta}</p>
          </div>

          {/* Frequência semanal da Academia (Tracker) */}
          <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-hub-content flex items-center gap-2 mb-4 text-xs uppercase tracking-wider">
              <Dumbbell className="w-4 h-4 text-rose-500" /> Frequência da Academia
            </h3>
            <div className="flex justify-between gap-1 mb-4">
              {dias.map((d, i) => {
                let status = 'pending';
                if (i === 0) status = gymAttendance[0];
                else if (i === 1) status = gymAttendance[1];
                else if (i === 2) status = gymAttendance[2];
                else if (i === 3) status = gymAttendance[3];
                else if (i === 4) status = gymAttendance[4];
                else if (i === 5) status = gymAttendance[5];
                else if (i === 6) status = gymAttendance[6];
                
                let colorClass = 'bg-hub-inner text-hub-faint border border-hub-border hover:bg-hub-hover'; // pending

                if (status === 'done') {
                  colorClass = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                } else if (status === 'missed') {
                  colorClass = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
                }

                return (
                  <button
                    key={i}
                    onClick={() => toggleGymAttendance(i)}
                    title={status === 'done' ? 'Fui!' : status === 'missed' ? 'Faltei!' : 'Clique para marcar status'}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm transition-all sm:hover:scale-105 active:scale-95 ${colorClass}`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-bold text-hub-faint uppercase tracking-widest pt-3 border-t border-hub-border/50">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-hub-inner"></div> Pendente/Descanso</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500/70"></div> Fui</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500/70"></div> Faltei</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
