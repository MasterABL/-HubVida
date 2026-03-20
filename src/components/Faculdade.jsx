import { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  Settings,
  BarChart3,
  Sparkles,
  Rocket,
  Compass,
  Zap,
  ChevronRight,
  CheckSquare
} from 'lucide-react';
import { Skeleton } from './Skeleton';
import StudyPanel from './faculdade/StudyPanel';
import { STUDY_CONTENT } from '../data/studyContent';

// 4 fixed study discipline panels
const DISCIPLINE_PANELS = [
  {
    key: 'sistemas_adm',
    label: 'Sistemas Administrativos',
    subtitle: 'TGS · SIG · Tomada de Decisão',
    color: 'blue',
    icon: BarChart3,
  },
  {
    key: 'estrutura_org',
    label: 'Estrutura Organizacional',
    subtitle: 'Formal/Informal · Autoridade · Organogramas',
    color: 'purple',
    icon: Compass,
  },
  {
    key: 'processos',
    label: 'Processos Empresariais',
    subtitle: 'PDCA · Fluxogramas · 5W2H',
    color: 'emerald',
    icon: Rocket,
  },
  {
    key: 'osm',
    label: 'Métodos Empresariais',
    subtitle: 'Manuais · Rotinas · Metodologia de Análise',
    color: 'amber',
    icon: Settings,
  },
];

const colorMap = {
  blue:    { badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',    icon: 'group-hover:bg-blue-500',    btn: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20',    border: 'hover:border-blue-500/30' },
  purple:  { badge: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: 'group-hover:bg-purple-500', btn: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/20', border: 'hover:border-purple-500/30' },
  emerald: { badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: 'group-hover:bg-emerald-500', btn: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20', border: 'hover:border-emerald-500/30' },
  amber:   { badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20',  icon: 'group-hover:bg-amber-500',  btn: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20',   border: 'hover:border-amber-500/30' },
};

const Faculdade = ({ 
  isLoaded = true, 
  faculdadeData, 
  studyProgress = [],
  updateStudyProgress,
  expandedSubject, 
  setExpandedSubject, 
  handleUpdateFaculdade, 
  calculateFinalGrade 
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  // If a discipline is selected, show the Study Panel
  if (selectedDiscipline) {
    const content = STUDY_CONTENT[selectedDiscipline.key] || {
      title: selectedDiscipline.label,
      sections: [],
      quiz: []
    };

    return (
      <StudyPanel 
        discipline={{ name: selectedDiscipline.label }}
        content={content}
        onBack={() => setSelectedDiscipline(null)} 
        onSaveProgress={(score, total) => {
          updateStudyProgress(selectedDiscipline.key, score, total);
        }}
      />
    );
  }

  const calculateProgress = (checks) => {
    if (!checks) return 0;
    const items = [checks.as1, checks.as2, checks.as3, checks.as4];
    const completed = items.filter(Boolean).length;
    return (completed / items.length) * 100;
  };

  const getQuizProgress = (key) => {
    const prog = studyProgress.find(p => p.disciplina === key);
    if (!prog || prog.quiz_total === 0) return 0;
    return (prog.quiz_score / prog.quiz_total) * 100;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-hub-strong">
            FACULDADE <span className="text-yellow-500 text-lg md:text-xl">(ADM)</span>
          </h1>
          <p className="text-[10px] text-hub-faint mt-1 uppercase tracking-widest font-bold">
            Gestão Acadêmica Cruzeiro do Sul
          </p>
        </div>
        <div className="hidden md:block bg-hub-surface border border-hub-border rounded-xl px-4 py-2 text-right shadow-lg">
          <p className="text-[10px] text-hub-faint uppercase font-bold tracking-wider">Média de Aprovação</p>
          <p className="text-xl font-bold text-emerald-500">≥ 7.0</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Disciplinas" value={faculdadeData?.length || 0} color="blue" />
        <StatCard icon={Zap} label="Painéis" value="4" color="amber" />
        <StatCard icon={Calendar} label="Semestre" value="1º/24" color="emerald" />
        <StatCard icon={CheckCircle2} label="Concluídas" value="0" color="purple" />
      </div>

      <div className="flex flex-col gap-8">
        {/* Painéis de Estudo Section — 4 disciplinas fixas */}
        <section>
          <h2 className="text-xs font-black text-hub-faint uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Sparkles size={14} className="text-yellow-500" /> Painéis de Estudo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISCIPLINE_PANELS.map((disc) => {
              const Icon = disc.icon;
              const quizProg = getQuizProgress(disc.key);
              const colors = colorMap[disc.color];

              return (
                <div
                  key={disc.key}
                  className={`group bg-hub-surface border border-hub-border rounded-2xl p-5 hover:shadow-xl ${colors.border} transition-all duration-300`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-hub-inner flex items-center justify-center text-hub-muted ${colors.icon} group-hover:text-white transition-all`}>
                      <Icon size={20} />
                    </div>
                    <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-tighter border ${colors.badge}`}>
                      Painel Disponível
                    </span>
                  </div>

                  <h3 className="text-xs font-black text-hub-strong leading-tight mb-1 uppercase tracking-tight">
                    {disc.label}
                  </h3>
                  <p className="text-[10px] text-hub-faint font-bold mb-4 leading-relaxed">{disc.subtitle}</p>

                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-hub-faint">
                      <span>Quiz Score</span>
                      <span className={quizProg > 0 ? 'text-emerald-400' : ''}>{Math.round(quizProg)}%</span>
                    </div>
                    <div className="h-1 w-full bg-hub-inner rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-700"
                        style={{ width: `${quizProg}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDiscipline(disc)}
                    className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-white shadow-lg active:scale-95 ${colors.btn}`}
                  >
                    Estudar agora <ChevronRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Acadêmico List Section */}
        <section>
          <h2 className="text-xs font-black text-hub-faint uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <CheckSquare size={14} className="text-blue-500" /> Gestão Acadêmica
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {faculdadeData?.map((disc) => {
              const isExpanded = expandedSubject === disc.id;
              const progress = calculateProgress(disc.checks);
              const finalGrade = calculateFinalGrade(disc.notas.as, disc.notas.a1);
              const isApproved = finalGrade !== null && Number(finalGrade) >= 7.0;

              return (
                <div key={disc.id} className="bg-hub-surface border border-hub-border rounded-xl overflow-hidden shadow-sm">
                  <div 
                    onClick={() => setExpandedSubject(isExpanded ? null : disc.id)}
                    className="p-4 cursor-pointer hover:bg-hub-hover/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isApproved ? 'bg-emerald-500 text-white' : 'bg-hub-inner text-hub-muted'}`}>
                        <GraduationCap size={16} />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold text-hub-content leading-tight">{disc.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] text-hub-faint font-bold uppercase">AS: {Math.round(progress)}%</span>
                          {finalGrade && <span className="text-[9px] text-emerald-500 font-black">NF: {finalGrade}</span>}
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="text-yellow-500" size={16} /> : <ChevronDown className="text-hub-faint" size={16} />}
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 bg-hub-inner/10 border-t border-hub-border/30 animate-in slide-in-from-top-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[8px] text-hub-faint font-bold uppercase tracking-wider">Unidades AS</label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['as1', 'as2', 'as3', 'as4'].map((key) => (
                              <button
                                key={key}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateFaculdade(disc.id, 'checks', key, !disc.checks?.[key]);
                                }}
                                className={`p-1.5 rounded-md border text-[8px] font-bold text-center transition-all ${disc.checks?.[key] ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-hub-surface text-hub-faint border-hub-border'}`}
                              >
                                {key.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] text-hub-faint font-bold uppercase tracking-wider">Lançar Notas</label>
                          <div className="flex gap-2">
                            <input
                              placeholder="AS"
                              type="number"
                              value={disc.notas.as}
                              onClick={e => e.stopPropagation()}
                              onChange={(e) => handleUpdateFaculdade(disc.id, 'notas', 'as', e.target.value)}
                              className="w-full bg-hub-surface border border-hub-border rounded-lg p-1.5 text-[10px] text-white outline-none focus:border-blue-500"
                            />
                            <input
                              placeholder="A1"
                              type="number"
                              value={disc.notas.a1}
                              onClick={e => e.stopPropagation()}
                              onChange={(e) => handleUpdateFaculdade(disc.id, 'notas', 'a1', e.target.value)}
                              className="w-full bg-hub-surface border border-hub-border rounded-lg p-1.5 text-[10px] text-white outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => {
  let colorClasses = 'text-blue-500 bg-blue-500/10 border-blue-500/20';
  if (color === 'emerald') colorClasses = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
  else if (color === 'amber') colorClasses = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
  else if (color === 'purple') colorClasses = 'text-purple-500 bg-purple-500/10 border-purple-500/20';

  return (
    <div className={`p-4 rounded-2xl border ${colorClasses} shadow-sm transition-transform cursor-default group`}>
      <div className="flex items-center gap-3 mb-1">
        <Icon size={16} className="opacity-70 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-60">{label}</span>
      </div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  );
};

export default Faculdade;
