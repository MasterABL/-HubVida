import { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Sparkles,
  Zap,
  Menu,
  X,
  Target,
  Trophy,
  ArrowRight,
  Layers,
  Search,
  FileText,
  BookOpen
} from 'lucide-react';

const StudyPanel = ({ discipline, content, onBack, onSaveProgress }) => {
  const [activeSection, setActiveSection] = useState(content.sections?.[0]?.id || 'overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visitedSections, setVisitedSections] = useState(new Set(['overview']));
  const [quizScore, setQuizScore] = useState(null);

  const sections = content.sections || [];

  const handleSectionChange = (id) => {
    setActiveSection(id);
    setVisitedSections(prev => new Set([...prev, id]));
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressTotal = sections.length + 1; // sections + quiz
  const progressCurrent = visitedSections.size + (quizScore !== null ? 1 : 0);
  const progressPercent = (progressCurrent / progressTotal) * 100;

  return (
    <div className="fixed inset-0 z-[60] bg-hub-base flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-300">
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-hub-surface border-b border-hub-border z-20">
        <button onClick={onBack} className="p-2 text-hub-muted hover:text-hub-strong">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xs font-black uppercase tracking-wider line-clamp-1">{discipline.name}</h2>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-hub-muted">
          <Menu size={20} />
        </button>
      </header>

      {/* Sidebar / Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-hub-surface border-r border-hub-border flex flex-col transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 border-b border-hub-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <BookOpen size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black text-hub-faint uppercase tracking-tighter">Painel de Estudo</p>
              <h3 className="text-xs font-bold text-hub-strong uppercase leading-none mt-0.5">Dashboard</h3>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-hub-muted">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <SectionItem 
            id="overview" 
            icon={Target} 
            label="Visão Geral" 
            isActive={activeSection === 'overview'} 
            isVisited={visitedSections.has('overview')}
            onClick={() => handleSectionChange('overview')} 
          />
          
          <div className="my-4 px-4 py-2">
            <span className="text-[9px] font-black text-hub-faint uppercase tracking-[0.2em]">Conteúdo Teórico</span>
          </div>

          {sections.map(section => {
            const Icon = section.icon || FileText;
            return (
              <SectionItem 
                key={section.id}
                id={section.id} 
                icon={Icon} 
                label={section.title} 
                isActive={activeSection === section.id} 
                isVisited={visitedSections.has(section.id)}
                onClick={() => handleSectionChange(section.id)} 
              />
            );
          })}

          <div className="my-4 px-4 py-2">
            <span className="text-[9px] font-black text-hub-faint uppercase tracking-[0.2em]">Avaliação</span>
          </div>

          <SectionItem 
            id="quiz" 
            icon={HelpCircle} 
            label="Quiz de Fixação" 
            isActive={activeSection === 'quiz'} 
            isVisited={quizScore !== null}
            onClick={() => handleSectionChange('quiz')} 
          />
        </nav>

        <div className="p-6 border-t border-hub-border bg-hub-inner/20">
          <button 
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-hub-border text-xs font-bold text-hub-muted hover:text-hub-strong hover:bg-hub-surface transition-all"
          >
            <ArrowLeft size={16} /> Voltar ao Módulo
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-hub-base overflow-hidden relative">
        {/* Top Header Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-hub-border bg-hub-base/80 backdrop-blur-md z-10 sticky top-0">
          <div>
            <h1 className="text-lg font-black text-hub-strong uppercase tracking-tight">{discipline.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">Fase 4: Métodos</span>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[9px] text-hub-faint font-bold uppercase tracking-widest">Sincronizado com Nuvem</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-black text-hub-faint uppercase tracking-widest">Progresso Total</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="w-32 h-1.5 bg-hub-inner rounded-full overflow-hidden border border-hub-border">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="text-xs font-black text-blue-400">{Math.round(progressPercent)}%</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Scroll */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
          <div className="max-w-4xl mx-auto pb-24">
            {activeSection === 'overview' && <OverviewTab discipline={discipline} onStart={() => handleSectionChange(sections[0]?.id || 'quiz')} />}
            
            {sections.map(section => (
              activeSection === section.id && (
                <div key={section.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                      {(() => {
                        const IconComponent = section.icon || FileText;
                        return <IconComponent size={24} />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">{section.title}</h2>
                      <p className="text-xs text-hub-faint font-bold uppercase tracking-widest mt-1">Material de Estudo Integrado</p>
                    </div>
                  </div>
                  
                  <div 
                    className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />

                  <div className="mt-12 pt-8 border-t border-hub-border flex justify-between items-center">
                    <span className="text-[10px] text-hub-faint font-bold uppercase tracking-widest italic">HubVida · Organização, Sistemas e Métodos</span>
                    <button 
                      onClick={() => {
                        const nextIdx = sections.findIndex(s => s.id === section.id) + 1;
                        if (nextIdx < sections.length) handleSectionChange(sections[nextIdx].id);
                        else handleSectionChange('quiz');
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-hub-surface border border-hub-border rounded-xl text-xs font-black uppercase tracking-widest hover:border-blue-500/50 hover:text-white transition-all shadow-xl"
                    >
                      Próximo Tópico <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )
            ))}

            {activeSection === 'quiz' && (
              <QuizTab 
                questions={content.quiz} 
                onFinish={(score, total) => {
                  setQuizScore(score);
                  onSaveProgress(score, total);
                }} 
              />
            )}
          </div>
        </div>

        {/* Sticky Footer Progress (Mobile Only) */}
        <div className="md:hidden sticky bottom-0 left-0 right-0 bg-hub-surface border-t border-hub-border p-4 flex items-center justify-between z-10">
           <div className="flex-1 mr-4">
              <div className="h-1.5 w-full bg-hub-inner rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
              </div>
           </div>
           <span className="text-[10px] font-black text-blue-400">{Math.round(progressPercent)}%</span>
        </div>
      </main>
    </div>
  );
};

const SectionItem = ({ icon: Icon, label, isActive, isVisited, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all
      ${isActive 
        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/5' 
        : 'text-hub-muted hover:bg-hub-hover hover:text-hub-strong border border-transparent'}
    `}
  >
    <div className={`relative ${isActive ? 'text-blue-400' : 'text-hub-faint'}`}>
      <Icon size={18} />
      {isVisited && !isActive && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border border-hub-surface" />
      )}
    </div>
    {label}
  </button>
);

const OverviewTab = ({ onStart }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 via-blue-900/10 to-transparent border border-blue-500/20 mb-12 overflow-hidden shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-40 h-40 md:w-56 md:h-56 relative group">
           <div className="absolute inset-0 bg-blue-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
           <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform"></div>
           <div className="relative inset-0 bg-hub-surface rounded-[3rem] border border-white/10 flex items-center justify-center p-8">
              <Sparkles size={64} className="text-yellow-500 animate-pulse" />
           </div>
        </div>
        
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase leading-[0.9]">
            Dominando <br/><span className="text-blue-500 italic">OSM</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-lg font-medium leading-relaxed">
            Bem-vindo ao Painel de Estudos Avançado. Aqui você encontrará o conteúdo integral do material teórico da Unicid/Cruzeiro do Sul portado para uma experiência interativa de alta performance.
          </p>
          <button 
            onClick={onStart}
            className="mt-8 px-10 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-400 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardFeature icon={Layers} title="Manuais" text="Tipos, estruturas e fluxos de processos." color="blue"/>
      <CardFeature icon={Search} title="Análise" text="Metodologia de diagnóstico e intervenção." color="emerald"/>
      <CardFeature icon={Zap} title="Fixação" text="Quiz otimizado para retenção acadêmica." color="amber"/>
    </div>
  </div>
);

const CardFeature = ({ icon: Icon, title, text, color }) => (
  <div className="bg-hub-surface border border-hub-border p-6 rounded-3xl hover:border-blue-500/30 transition-all hover:shadow-xl group">
    <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${color === 'blue' ? 'bg-blue-500/10 text-blue-400' : color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
      <Icon size={20} className="group-hover:scale-110 transition-transform" />
    </div>
    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2">{title}</h3>
    <p className="text-[10px] text-hub-faint font-bold leading-relaxed">{text}</p>
  </div>
);

const QuizTab = ({ questions, onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        setDone(true);
        onFinish(score + (correct ? 1 : 0), questions.length);
      }
    }, 1200);
  };

  if (done) {
    return (
      <div className="text-center py-20 animate-in zoom-in-95 duration-500">
        <div className="relative inline-block mb-10">
           <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
           <div className="relative w-32 h-32 bg-hub-surface border-2 border-yellow-500/30 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Trophy size={64} className="text-yellow-500" />
           </div>
        </div>
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Missão Cumprida!</h2>
        <p className="text-lg text-hub-faint font-medium mb-12">Você concluiu o módulo de <span className="text-white">OSM</span> com <span className="text-emerald-400 font-black">{Math.round((score/questions.length)*100)}%</span> de acerto.</p>
        <div className="bg-hub-surface border border-hub-border p-8 rounded-[2.5rem] max-w-sm mx-auto shadow-2xl">
           <p className="text-[10px] text-hub-faint uppercase font-bold tracking-widest mb-4">Seu Desempenho</p>
           <div className="flex justify-between items-end gap-1 mb-8">
              {questions.map((_, i) => (
                <div key={i} className={`flex-1 h-3 rounded-full ${i < score ? 'bg-emerald-500' : 'bg-hub-inner'}`}></div>
              ))}
           </div>
           <p className="text-xl font-black text-white mb-1">{score} / {questions.length}</p>
           <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Pontos salvos no Supabase</p>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
           <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1 rounded-full mb-3 inline-block">Módulo de Avaliação</span>
           <h3 className="text-2xl font-black text-white uppercase tracking-tight">Quiz de Fixação</h3>
        </div>
        <span className="text-xs font-black text-hub-faint uppercase tracking-widest">{current + 1} / {questions.length}</span>
      </div>

      <div className="bg-hub-surface border border-hub-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-8 relative overflow-hidden">
        {selected !== null && (
          <div className={`absolute top-0 right-0 p-6 animate-in zoom-in-50 duration-300 font-black uppercase text-xs italic tracking-widest ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isCorrect ? 'Excelente!' : 'Tente rever o conteúdo...'}
          </div>
        )}
        <p className="text-lg md:text-xl font-bold text-slate-200 leading-relaxed mb-10">{q.q}</p>
        <div className="space-y-3">
           {q.options.map((opt, i) => (
             <button
               key={i}
               disabled={selected !== null}
               onClick={() => handleAnswer(i)}
               className={`
                 w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 group
                 ${selected === null ? 'bg-hub-inner/30 border-hub-border hover:border-blue-500/50 hover:bg-hub-inner/50' : ''}
                 ${selected === i ? (isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-rose-500/20 border-rose-500 text-rose-400') : ''}
                 ${selected !== null && i === q.correct && !isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : ''}
                 ${selected !== null && selected !== i && (i !== q.correct || isCorrect) ? 'opacity-30' : ''}
               `}
             >
               <div className={`
                 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all
                 ${selected === null ? 'bg-hub-base text-hub-muted group-hover:bg-blue-500 group-hover:text-white' : ''}
                 ${selected === i ? (isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : 'bg-hub-base text-hub-muted'}
               `}>
                 {String.fromCharCode(65 + i)}
               </div>
               <span className="text-sm font-semibold">{opt}</span>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StudyPanel;
