import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { Loader2, CalendarClock, Brain, CheckCircle2, Trash2 } from 'lucide-react';

export const ReviewsTab = ({ discipline, session }) => {
  const [topics, setTopics] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch topics for this discipline
      const { data: topicsData, error: topicsErr } = await supabase
        .from('topics')
        .select('id, title')
        .eq('discipline_id', discipline.id);
      if (topicsErr) throw topicsErr;
      
      const topicIds = topicsData.map(t => t.id) || [];
      setTopics(topicsData || []);

      if (topicIds.length > 0) {
        // Fetch spaced reviews for these topics
        const { data: revData, error: revErr } = await supabase
          .from('spaced_reviews')
          .select('*')
          .in('topic_id', topicIds)
          .eq('user_id', session.user.id);
        if (revErr) throw revErr;
        setReviews(revData || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discipline.id]);



  const scheduleReview = async (topicId, daysToAdd) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    // Use local Date to format YYYY-MM-DD to avoid UTC backward shift
    const dateStr = nextDate.getFullYear() + '-' + String(nextDate.getMonth()+1).padStart(2, '0') + '-' + String(nextDate.getDate()).padStart(2, '0');

    try {
      const { data, error } = await supabase
        .from('spaced_reviews')
        .upsert({
          topic_id: topicId,
          user_id: session.user.id,
          next_review_date: dateStr,
          interval_days: daysToAdd
        }, { onConflict: 'topic_id,user_id' })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update local state
      setReviews(prev => {
        const filtered = prev.filter(r => r.topic_id !== topicId);
        return [...filtered, data];
      });
    } catch (err) {
      console.error('Error scheduling review:', err);
    }
  };

  const clearReview = async (topicId) => {
    try {
      const { error } = await supabase
        .from('spaced_reviews')
        .delete()
        .eq('topic_id', topicId)
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      
      setReviews(prev => prev.filter(r => r.topic_id !== topicId));
    } catch (err) {
      console.error('Error clearing review:', err);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-hub-muted" /></div>;

  const today = new Date();
  const todayStr = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  
  // Pending reviews
  const pendingReviews = reviews.filter(r => r.next_review_date <= todayStr);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-hub-strong flex items-center gap-2">
            <Brain className="w-5 h-5 text-yellow-500" />
            Revisão Espaçada
          </h3>
          <p className="text-sm text-hub-faint mt-1">
            Revisar o conteúdo em intervalos crescentes é a melhor forma de reter o conhecimento.
          </p>
        </div>
      </div>

      {pendingReviews.length > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4">
          <h4 className="text-rose-500 font-bold flex items-center gap-2 mb-2 uppercase text-xs tracking-wider">
            <CalendarClock className="w-4 h-4" /> 
            Revisões Pendentes ({pendingReviews.length})
          </h4>
          <div className="flex flex-col gap-2">
            {pendingReviews.map(rev => {
              const topic = topics.find(t => t.id === rev.topic_id);
              if (!topic) return null;
              return (
                <div key={rev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-hub-surface rounded-xl border border-hub-border shadow-sm">
                  <span className="font-bold text-sm text-hub-strong">{topic.title}</span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => scheduleReview(topic.id, 1)} className="px-3 py-1.5 bg-hub-base border border-hub-border hover:border-yellow-500/50 hover:bg-yellow-500/10 text-hub-strong transition-all uppercase text-[10px] font-bold rounded-xl shadow-sm">+ 1 dia</button>
                    <button onClick={() => scheduleReview(topic.id, 3)} className="px-3 py-1.5 bg-hub-base border border-hub-border hover:border-yellow-500/50 hover:bg-yellow-500/10 text-hub-strong transition-all uppercase text-[10px] font-bold rounded-xl shadow-sm">+ 3 dias</button>
                    <button onClick={() => scheduleReview(topic.id, 7)} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase rounded-xl transition-all shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Feito (+7d)
                    </button>
                    <button onClick={() => clearReview(topic.id)} className="p-1.5 text-hub-faint hover:text-rose-500 hover:bg-rose-500/10 transition-colors rounded-lg flex-shrink-0" title="Limpar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {topics.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-hub-muted uppercase tracking-wider">Todos os Tópicos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map(topic => {
              const review = reviews.find(r => r.topic_id === topic.id);
              const isPending = review && review.next_review_date <= todayStr;
              
              if (isPending) return null; // Already shown above

              return (
                <div key={topic.id} className="p-4 bg-hub-surface rounded-2xl border border-hub-border shadow-sm flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm text-hub-strong leading-tight block mb-1">{topic.title}</span>
                      {review ? (
                        <span className="text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest inline-flex items-center gap-1">
                          Próxima: {new Date(review.next_review_date + 'T12:00:00').toLocaleDateString('pt-BR')}
                        </span>
                      ) : (
                        <span className="text-[10px] text-hub-faint bg-hub-inner px-2 py-0.5 rounded-md font-bold uppercase tracking-widest border border-hub-border">
                          Não agendada
                        </span>
                      )}
                    </div>
                    {review && (
                      <button onClick={() => clearReview(topic.id)} className="p-1 text-hub-faint hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors flex-shrink-0" title="Limpar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-hub-border/50">
                    <button onClick={() => scheduleReview(topic.id, 0)} className="flex-1 py-1.5 bg-hub-base border border-hub-border hover:border-yellow-500/50 hover:bg-yellow-500/10 text-hub-strong transition-all uppercase text-[10px] font-bold rounded-xl shadow-sm">Hoje</button>
                    <button onClick={() => scheduleReview(topic.id, 3)} className="flex-1 py-1.5 bg-hub-base border border-hub-border hover:border-yellow-500/50 hover:bg-yellow-500/10 text-hub-strong transition-all uppercase text-[10px] font-bold rounded-xl shadow-sm">+ 3 Dias</button>
                    <button onClick={() => scheduleReview(topic.id, 7)} className="flex-1 py-1.5 bg-hub-base border border-hub-border hover:border-yellow-500/50 hover:bg-yellow-500/10 text-hub-strong transition-all uppercase text-[10px] font-bold rounded-xl shadow-sm">+ 7 Dias</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
