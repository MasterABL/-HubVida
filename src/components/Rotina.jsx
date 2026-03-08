import React from 'react';
import {
  Plus,
  Trash2,
  Target,
  Dumbbell,
  Briefcase,
  CheckCircle2,
  Sun, Bus, BookOpen, FileText, Coffee, Moon, GraduationCap, Home, MapPin
} from 'lucide-react';

const iconMap = {
  Sun, Bus, Briefcase, BookOpen, FileText, Coffee, Target, Moon, Dumbbell, GraduationCap, Home, MapPin
};

// Mapeamento de cores no tema escuro
const colorMap = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300', icon: 'text-purple-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-300', icon: 'text-yellow-400' },
  blue:   { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-300', icon: 'text-indigo-400' },
  green:  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300', icon: 'text-emerald-400' },
  red:    { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300', icon: 'text-rose-400' },
  gray:   { bg: 'bg-slate-700/30', border: 'border-slate-600/40', text: 'text-slate-300', icon: 'text-slate-400' },
  teal:   { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-300', icon: 'text-teal-400' },
};

export const Rotina = ({
  routinesData,
  activeRoutine,
  setActiveRoutine,
  newRoutineTask,
  setNewRoutineTask,
  handleAddRoutineTask,
  handleToggleRoutineTask,
  handleRemoveRoutineTask,
}) => {
  const routine = routinesData[activeRoutine];
  const dias = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const diasAtivos = [0, 2, 4, 5]; // Ter, Qui, Sex, Dom

  const checkedCount = routine.timeline.filter(i => i.checked).length;
  const progress = routine.timeline.length > 0
    ? Math.round((checkedCount / routine.timeline.length) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#12141a] to-[#1a1d24] border border-[#1f222a] rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-white uppercase">
            Rotina Diária
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-bold">
            {activeRoutine} — {checkedCount}/{routine.timeline.length} concluídos
          </p>
        </div>
        {/* Progress */}
        <div className="flex flex-col items-end gap-1 w-full md:w-48">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{progress}% do dia</span>
          <div className="w-full h-2 bg-[#1f222a] rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs de dias */}
      <div className="flex bg-[#12141a] border border-[#1f222a] rounded-xl overflow-hidden p-1 shadow-md flex-wrap gap-1">
        {Object.keys(routinesData).map((day) => (
          <button
            key={day}
            onClick={() => setActiveRoutine(day)}
            className={`flex-1 min-w-[80px] py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeRoutine === day
                ? 'bg-yellow-500 text-slate-900 shadow'
                : 'text-slate-500 hover:text-white hover:bg-[#1a1d24]'
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
          <div className="flex items-center gap-2 bg-[#12141a] border border-[#1f222a] rounded-xl p-3 shadow-sm">
            <input
              type="time"
              value={newRoutineTask.time}
              onChange={(e) => setNewRoutineTask({ ...newRoutineTask, time: e.target.value })}
              className="bg-transparent text-slate-300 text-sm focus:outline-none p-1 border-r border-[#1f222a] pr-3"
            />
            <input
              type="text"
              placeholder="Adicionar nova tarefa..."
              value={newRoutineTask.title}
              onChange={(e) => setNewRoutineTask({ ...newRoutineTask, title: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleAddRoutineTask()}
              className="flex-1 bg-transparent text-slate-300 text-sm focus:outline-none p-1 placeholder-slate-600"
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
                  <span className="text-xs font-mono font-bold text-slate-600 w-12 text-right flex-shrink-0">
                    {item.time}
                  </span>
                  <div
                    className={`flex-1 flex justify-between items-center p-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm border ${
                      item.checked
                        ? 'bg-[#0f1015] border-[#1f222a] opacity-50'
                        : `${colors.bg} ${colors.border}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {IconComponent && (
                        <IconComponent
                          className={`w-4 h-4 flex-shrink-0 ${item.checked ? 'text-slate-600' : colors.icon}`}
                        />
                      )}
                      <span className={item.checked ? 'line-through text-slate-600' : colors.text}>
                        {item.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRoutineTask(index);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-rose-500 ml-2 flex-shrink-0"
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
          <div className="bg-[#12141a] border border-yellow-500/20 rounded-xl p-6 shadow-md">
            <h3 className="font-bold flex items-center gap-2 mb-3 text-yellow-500 text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" /> Meta do Dia
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{routine.meta}</p>
          </div>

          {/* Frequência semanal */}
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-300 flex items-center gap-2 mb-4 text-xs uppercase tracking-wider">
              <Dumbbell className="w-4 h-4 text-rose-500" /> Frequência Semanal
            </h3>
            <div className="flex justify-between gap-1 mb-3">
              {dias.map((d, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm ${
                    diasAtivos.includes(i)
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-[#0f1015] text-slate-600 border border-[#1f222a]'
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              * Academia: Ter, Qui, Sex e Domingo
            </p>
          </div>

          {/* Gym essentials */}
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6">
            <h3 className="font-bold text-rose-400 flex items-center gap-2 mb-4 text-xs uppercase tracking-wider">
              <Briefcase className="w-4 h-4" /> GYM ESSENTIALS
            </h3>
            <div className="space-y-2 text-xs text-rose-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
                Garrafinha de Água
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 flex-shrink-0" />
                Shorts / Tênis
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
