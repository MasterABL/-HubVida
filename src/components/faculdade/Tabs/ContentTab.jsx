import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { Loader2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { MarkdownEditor } from '../MarkdownEditor';

export const ContentTab = ({ discipline, session }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('topics')
        .select(`
          id, title, summary, order_index,
          topic_notes(id, content, updated_at)
        `)
        .eq('discipline_id', discipline.id)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTopics(data || []);
    } catch (err) {
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discipline.id]);


  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    setIsCreating(true);
    try {
      const newOrderIndex = topics.length > 0 ? Math.max(...topics.map(t => t.order_index)) + 1 : 1;
      const { data, error } = await supabase
        .from('topics')
        .insert({
          discipline_id: discipline.id,
          title: newTopicTitle,
          order_index: newOrderIndex
        })
        .select()
        .single();
      
      if (error) throw error;
      setTopics([...topics, { ...data, topic_notes: [] }]);
      setNewTopicTitle('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-hub-muted" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-hub-strong">Tópicos e Conteúdo</h3>
      </div>

      <div className="space-y-3">
        {topics.map((topic, index) => {
          const isExpanded = expandedTopicId === topic.id;
          const noteData = topic.topic_notes && topic.topic_notes.length > 0 ? topic.topic_notes[0] : null;

          return (
            <div key={topic.id} className="bg-hub-surface border border-hub-border rounded-2xl overflow-hidden transition-all shadow-sm">
              <button 
                onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between hover:bg-hub-hover transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-hub-inner flex items-center justify-center text-sm font-black text-hub-muted border border-hub-border shadow-sm">
                    {index + 1}
                  </span>
                  <span className="font-black text-hub-strong text-lg md:text-xl tracking-tight leading-tight">{topic.title}</span>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-hub-faint" /> : <ChevronDown className="w-5 h-5 text-hub-faint" />}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 md:px-8 md:pb-8 border-t border-hub-border/50 bg-hub-inner">
                  <div className="mt-4">
                    <MarkdownEditor 
                      topicId={topic.id}
                      session={session}
                      initialContent={noteData?.content || ''}
                      noteId={noteData?.id}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Topic */}
      <form onSubmit={handleCreateTopic} className="mt-4 flex gap-2">
        <input 
          type="text"
          placeholder="Novo Tópico..."
          className="flex-1 bg-hub-surface border border-hub-border rounded-xl px-4 py-3 text-sm text-hub-strong focus:border-yellow-500 outline-none transition-colors shadow-sm"
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
        />
        <button 
          type="submit"
          disabled={!newTopicTitle.trim() || isCreating}
          className="bg-hub-inner border border-hub-border hover:border-yellow-500 text-hub-strong px-4 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};
