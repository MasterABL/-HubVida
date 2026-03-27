import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { Loader2, Plus, Trash2, CheckSquare } from 'lucide-react';

export const ProgressTab = ({ discipline, session }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDate, setNewItemDate] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('as_items')
        .select('*')
        .eq('discipline_id', discipline.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [discipline.id]);



  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    setIsCreating(true);
    try {
      const { data, error } = await supabase
        .from('as_items')
        .insert({
          discipline_id: discipline.id,
          user_id: session.user.id,
          title: newItemTitle,
          due_date: newItemDate || null
        })
        .select()
        .single();
      
      if (error) throw error;
      setItems([...items, data].sort((a,b) => new Date(a.due_date) - new Date(b.due_date)));
      setNewItemTitle('');
      setNewItemDate('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('as_items')
        .update({ completed: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      setItems(items.map(item => item.id === id ? { ...item, completed: !currentStatus } : item));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('as_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-hub-muted" /></div>;

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-hub-strong">Atividades de Sistematização (AS)</h3>
        <span className="text-xs font-bold text-hub-faint">{completedCount} de {items.length} concluídas</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-hub-base rounded-full h-3 mb-6 border border-hub-border overflow-hidden p-0.5">
        <div 
          className="bg-yellow-500 h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-6 text-hub-faint text-sm">Nenhuma atividade cadastrada.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${item.completed ? 'bg-hub-hover/50 border-hub-border/50 opacity-60' : 'bg-hub-base border-hub-border'}`}>
              <div className="flex items-center gap-3 overflow-hidden">
                <button 
                  onClick={() => toggleComplete(item.id, item.completed)}
                  className={`w-6 h-6 rounded flex items-center justify-center border flex-shrink-0 transition-colors ${item.completed ? 'bg-emerald-500 border-emerald-500 text-[#111]' : 'border-hub-border hover:border-yellow-500'}`}
                >
                  {item.completed && <CheckSquare className="w-4 h-4" />}
                </button>
                <div className="min-w-0">
                  <p className={`font-medium text-sm truncate ${item.completed ? 'line-through text-hub-muted' : 'text-hub-strong'}`}>{item.title}</p>
                  {item.due_date && (
                    <p className="text-[10px] text-hub-faint uppercase font-bold tracking-wider">
                      Prazo: {new Date(item.due_date).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-hub-faint hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Create New AS Item */}
      <form onSubmit={handleCreate} className="mt-6 flex flex-col md:flex-row gap-2">
        <input 
          type="text"
          placeholder="Ex: AS-I Questionário"
          className="flex-1 bg-hub-base border border-hub-border rounded-xl px-4 py-3 text-sm text-hub-strong focus:border-yellow-500 outline-none transition-colors"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
        />
        <input 
          type="date"
          className="bg-hub-base border border-hub-border rounded-xl px-4 py-3 text-sm text-hub-strong focus:border-yellow-500 outline-none transition-colors w-full md:w-auto"
          value={newItemDate}
          onChange={(e) => setNewItemDate(e.target.value)}
        />
        <button 
          type="submit"
          disabled={!newItemTitle.trim() || isCreating}
          className="bg-yellow-500 hover:bg-yellow-400 text-[#111] px-5 py-3 rounded-xl font-bold transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {isCreating ? 'Adicionando...' : 'Adicionar AS'}
        </button>
      </form>
    </div>
  );
};
