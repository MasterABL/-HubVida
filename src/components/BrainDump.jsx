import React, { useState } from 'react';
import { 
  Brain, 
  Send, 
  Trash2, 
  Clock, 
  Smile, 
  Frown, 
  Zap, 
  CloudRain
} from 'lucide-react';

export const BrainDump = () => {
  const [noteText, setNoteText] = useState('');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isAddingMood, setIsAddingMood] = useState(false);
  const [newMoodName, setNewMoodName] = useState('');
  
  const [moods, setMoods] = useState([
    { id: 'focus', icon: Zap, label: 'Foco Absoluto', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { id: 'happy', icon: Smile, label: 'No Controle', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'neutral', icon: CloudRain, label: 'Exausto', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { id: 'stressed', icon: Frown, label: 'Estresse Alto', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  ]);

  // Estado local para armazenar as notas simuladamente
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: 'Ideia para o Capítulo 3 da Tese: Usar o modelo comportamental de Kahneman.',
      moods: ['focus'],
      date: 'Hoje, 09:30',
    },
    {
      id: 2,
      text: 'Lembrar de comprar Whey no mercado "Boa".',
      moods: ['neutral'],
      date: 'Ontem, 18:45',
    }
  ]);

  const toggleMood = (id) => {
    setSelectedMoods(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleCreateMood = () => {
    if (!newMoodName.trim()) {
      setIsAddingMood(false);
      return;
    }
    const newId = newMoodName.toLowerCase().replace(/\s+/g, '-');
    if (!moods.find(m => m.id === newId)) {
      setMoods([...moods, {
        id: newId, 
        icon: Brain, // Custom icon padrão
        label: newMoodName,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30'
      }]);
    }
    setSelectedMoods(prev => prev.includes(newId) ? prev : [...prev, newId]);
    setNewMoodName('');
    setIsAddingMood(false);
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      text: noteText,
      moods: selectedMoods.length > 0 ? selectedMoods : ['neutral'],
      date: new Date().toLocaleString('pt-BR', { 
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
      }),
    };

    setNotes([newNote, ...notes]);
    setNoteText('');
    setSelectedMoods([]);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 max-w-4xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-4 border border-indigo-500/20">
           <Brain className="w-10 h-10 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-black italic tracking-widest text-white mb-2">
          BRAIN <span className="text-indigo-400">DUMP</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          O armazenamento externo da sua mente. Não guarde tarefas aleatórias ou estresse no seu cérebro de Ph.D. Descarregue aqui e libere memória RAM orgânica.
        </p>
      </div>

      {/* INPUT EDITOR (CAIXA DE ENTRADA) */}
      <div className="bg-[#12141a] border border-[#1f222a] rounded-2xl p-4 md:p-6 shadow-xl relative mt-8">
         <div className="flex gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center mr-2 flex-none">
               Humores:
            </span>
            {moods.map(mood => {
              const Icon = mood.icon;
              const isSelected = selectedMoods.includes(mood.id);
              return (
                <button
                  key={mood.id}
                  onClick={() => toggleMood(mood.id)}
                  className={`flex-none flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    isSelected 
                      ? `${mood.bg} ${mood.border} ${mood.color} ring-2 ring-indigo-500/50` 
                      : 'bg-[#1a1d24] border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {mood.label}
                </button>
              );
            })}
            
            {/* Adicionar Novo Humor */}
            {isAddingMood ? (
              <div className="flex-none flex items-center gap-2">
                <input
                  type="text"
                  autoFocus
                  placeholder="Novo..."
                  value={newMoodName}
                  onChange={e => setNewMoodName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCreateMood()}
                  onBlur={handleCreateMood}
                  className="bg-[#0f1115] border border-indigo-500/50 rounded-full px-3 py-1.5 text-xs text-white focus:outline-none w-24"
                />
              </div>
            ) : (
              <button 
                onClick={() => setIsAddingMood(true)}
                className="flex-none flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-slate-600 text-xs font-bold text-slate-500 hover:text-indigo-400 hover:border-indigo-400 transition-colors"
              >
                + Criar
              </button>
            )}
         </div>

         <div className="relative">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="O que está pesando na mente agora?"
              className="w-full bg-[#1a1d24] border border-slate-700/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none min-h-[120px] transition-all"
            />
            <button
               onClick={handleAddNote}
               disabled={!noteText.trim()}
               className="absolute bottom-3 right-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2.5 rounded-lg transition-colors flex items-center gap-2 font-bold text-sm"
            >
               <Send className="w-4 h-4" /> <span className="hidden sm:inline">Descarregar</span>
            </button>
         </div>
      </div>

      {/* TIMELINE DE NOTAS (HISTÓRICO) */}
      <div className="mt-12">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-1 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Extrato Cognitivo (Histórico)
        </h2>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
          
          {notes.map((note) => {
             const primaryMoodId = note.moods?.[0] || note.mood || 'neutral';
             const primaryMoodData = moods.find(m => m.id === primaryMoodId) || moods[2];
             const PrimaryIcon = primaryMoodData.icon;

             return (
              <div key={note.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Marcador Central (Timeline Node) */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0f1115] ${primaryMoodData.bg} ${primaryMoodData.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-1/2`}>
                  <PrimaryIcon className="w-4 h-4" />
                </div>
                
                {/* Card da Nota */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-4 rounded-xl bg-[#12141a] border border-[#1f222a] shadow-md group-hover:border-indigo-500/30 transition-all relative">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{note.date}</span>
                      <button 
                        onClick={() => handleDelete(note.id)}
                        className="text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                      >
                         <Trash2 className="w-3.5 h-3.5" />
                      </button>
                   </div>
                   
                   {/* Renderização Fluida de Múltiplos Humores */}
                   <div className="flex flex-wrap gap-1.5 mb-3">
                     {(note.moods || [note.mood || 'neutral']).map(mId => {
                        const mData = moods.find(m => m.id === mId) || moods[2];
                        const Icon = mData.icon;
                        return (
                          <span key={mId} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${mData.bg} ${mData.color} ${mData.border} border`}>
                             <Icon className="w-2.5 h-2.5" /> {mData.label}
                          </span>
                        )
                     })}
                   </div>

                   <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {note.text}
                   </p>
                </div>
              </div>
             )
          })}

          {notes.length === 0 && (
            <div className="text-center p-8 bg-[#12141a] border border-dashed border-slate-700 rounded-xl relative z-10">
               <p className="text-slate-500 text-sm">A mente está limpa. Nenhuma descarga cognitiva recente.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
