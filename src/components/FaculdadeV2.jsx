import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Loader2, Plus, BookOpen, Presentation, X } from 'lucide-react';
import { DisciplineDetail } from './faculdade/DisciplineDetail';
import { faculdadeSeedData } from '../data/faculdadeSeed';

export const FaculdadeV2 = ({ session }) => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  
  // Create Form State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newDiscipline, setNewDiscipline] = useState({ name: '', description: '', color: '#eab308' });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchDisciplines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchDisciplines = async () => {
    if (!session) return;
    setLoading(true);
    try {
      // 1. Fetch
      const { data, error } = await supabase
        .from('disciplines')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          console.warn('Tabela disciplines ainda não existe. Por favor, execute o script SQL.');
          setLoading(false);
          return;
        }
        throw error;
      }
      
      // 2. Check for initial seed
      if (data && data.length === 0) {
        await seedInitialDiscipline();
        return; // seed function will call fetchDisciplines again
      }

      setDisciplines(data || []);
    } catch (err) {
      console.error('Error fetching disciplines:', err);
    } finally {
      setLoading(false);
    }
  };

  const seedInitialDiscipline = async () => {
    try {
      const { data: dData, error: dErr } = await supabase.from('disciplines').insert({
        user_id: session.user.id,
        name: 'Modelos Inovadores em Negócios',
        description: 'Tópicos essenciais para estruturação e validação de modelos de negócios escaláveis.',
        color: '#8b5cf6',
        semester: 'Atual'
      }).select().single();

      if (dErr) throw dErr;

      const { error: tErr } = await supabase.from('topics').insert(
        faculdadeSeedData.map(t => ({
          discipline_id: dData.id,
          title: t.title,
          order_index: t.order_index
        }))
      );

      if (tErr) throw tErr;
      
      // Let the topic notes remain empty for the new discipline, 
      // theory is rendered from the static frontend seed!
      
      fetchDisciplines();
    } catch (err) {
      console.error('Erro no seed inicial:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newDiscipline.name.trim()) return;
    setIsCreating(true);
    try {
      const { error } = await supabase.from('disciplines').insert({
        user_id: session.user.id,
        name: newDiscipline.name,
        description: newDiscipline.description,
        color: newDiscipline.color,
        semester: 'Custom'
      });
      if (error) throw error;
      setShowCreateForm(false);
      setNewDiscipline({ name: '', description: '', color: '#eab308' });
      fetchDisciplines();
    } catch (err) {
      console.error('Erro ao criar disciplina:', err);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
        <p className="text-sm text-hub-faint font-medium">Carregando ambiente de estudos...</p>
      </div>
    );
  }

  // --- RENDERING DETAIL VIEW ---
  if (selectedDiscipline) {
    return (
      <DisciplineDetail 
        discipline={selectedDiscipline} 
        session={session} 
        onBack={() => setSelectedDiscipline(null)} 
      />
    );
  }

  // --- RENDERING LIST VIEW ---
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-hub-strong uppercase tracking-tight flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-yellow-500" />
            Faculdade
          </h2>
          <p className="mt-1 text-sm text-hub-faint font-medium">
            Gerencie suas disciplinas, progresso e revisões em um único hub de foco.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-[#111] px-5 py-2.5 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-95"
        >
          <Plus className="w-4 h-4" /> Nova Disciplina
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-hub-surface border border-hub-border rounded-2xl p-6 shadow-xl relative animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setShowCreateForm(false)}
            className="absolute top-4 right-4 text-hub-faint hover:text-rose-500 bg-hub-base p-1.5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <h3 className="text-lg font-bold text-hub-strong mb-4">Criar Disciplina</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-hub-muted uppercase tracking-wider mb-1 block">Nome da Disciplina</label>
              <input 
                type="text" 
                autoFocus
                className="w-full bg-hub-base border border-hub-border focus:border-yellow-500 rounded-xl px-4 py-3 outline-none text-hub-strong font-medium transition-colors"
                placeholder="Ex: Gestão Financeira"
                value={newDiscipline.name}
                onChange={(e) => setNewDiscipline({...newDiscipline, name: e.target.value})}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-hub-muted uppercase tracking-wider mb-1 block">Descrição Longa</label>
                <input 
                  type="text" 
                  className="w-full bg-hub-base border border-hub-border focus:border-yellow-500 rounded-xl px-4 py-3 outline-none text-hub-content text-sm transition-colors"
                  placeholder="Resumo ou objetivo (opcional)"
                  value={newDiscipline.description}
                  onChange={(e) => setNewDiscipline({...newDiscipline, description: e.target.value})}
                />
              </div>
              <div className="w-24">
                <label className="text-xs font-bold text-hub-muted uppercase tracking-wider mb-1 block">Cor</label>
                <input 
                  type="color" 
                  className="w-full h-11 bg-hub-base border border-hub-border rounded-xl px-1 cursor-pointer"
                  value={newDiscipline.color}
                  onChange={(e) => setNewDiscipline({...newDiscipline, color: e.target.value})}
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isCreating}
              className="w-full py-3 bg-hub-inner border border-hub-border hover:border-yellow-500 text-hub-strong font-bold rounded-xl transition-all disabled:opacity-50"
            >
              {isCreating ? 'Criando...' : 'Salvar Disciplina'}
            </button>
          </form>
        </div>
      )}

      {disciplines.length === 0 && !showCreateForm ? (
        <div className="py-12 bg-hub-surface border border-hub-border border-dashed rounded-3xl flex flex-col items-center justify-center text-center px-4">
          <Presentation className="w-12 h-12 text-hub-muted mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-hub-strong mb-2">Nenhuma disciplina cadastrada</h3>
          <p className="text-sm text-hub-faint max-w-sm mb-6">Comece criando sua primeira disciplina para organizar o semestre.</p>
          <button onClick={() => setShowCreateForm(true)} className="px-6 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500 hover:text-[#111] rounded-xl font-bold transition-all">
            Criar Agora
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {disciplines.map(d => (
            <div 
              key={d.id} 
              onClick={() => setSelectedDiscipline(d)}
              className="group cursor-pointer bg-hub-surface border border-hub-border hover:border-yellow-500/50 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40" style={{ backgroundColor: d.color }}></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-hub-inner text-white font-bold text-lg border border-white/5" style={{ backgroundColor: d.color }}>
                  {d.name.charAt(0)}
                </div>
                {/* Simulated Badge Placeholders */}
                <div className="flex flex-col gap-1 items-end">
                  {/* Will calculate these values in DisciplineDetail, or left to load dynamically. 
                      For now, using just a UI placeholder to match aesthetics. */}
                  <span className="px-2 py-0.5 bg-hub-base text-[9px] font-bold text-hub-muted border border-hub-border rounded-md uppercase tracking-widest">
                    {d.semester || 'Atual'}
                  </span>
                </div>
              </div>
              
              <h3 className="font-bold text-hub-strong text-lg leading-tight mb-2 line-clamp-2 relative z-10">{d.name}</h3>
              {d.description && <p className="text-xs text-hub-faint line-clamp-2 relative z-10">{d.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
