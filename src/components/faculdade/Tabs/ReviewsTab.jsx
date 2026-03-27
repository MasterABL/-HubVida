import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { Loader2, CalendarClock, Brain, CheckCircle2 } from 'lucide-react';

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
          .eq('user_id', session.id);
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
  }, [discipline.id]);



  const scheduleReview = async (topicId, daysToAdd) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    const dateStr = nextDate.toISOString().split('T')[0];

    try {
      const { data, error } = await supabase
        .from('spaced_reviews')
        .upsert({
          topic_id: topicId,
          user_id: session.id,
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

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-hub-muted" /></div>;

  const todayStr = new Date().toISOString().split('T')[0];
  
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
                <div key={rev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-hub-base rounded-xl border border-hub-border">
                  <span className="font-bold text-sm text-hub-strong">{topic.title}</span>
                  <div className="flex gap-2">
                    <button onClick={() => scheduleReview(topic.id, 1)} className="px-3 py-1.5 bg-hub-inner hover:bg-hub-hover text-[10px] font-bold uppercase rounded-lg transition-colors border border-hub-border">+ 1 dia</button>
                    <button onClick={() => scheduleReview(topic.id, 3)} className="px-3 py-1.5 bg-hub-inner hover:bg-hub-hover text-[10px] font-bold uppercase rounded-lg transition-colors border border-hub-border">+ 3 dias</button>
                    <button onClick={() => scheduleReview(topic.id, 7)} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase rounded-lg transition-colors flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Feito (+7d)
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
                <div key={topic.id} className="p-4 bg-hub-base rounded-xl border border-hub-border flex flex-col justify-between gap-4">
                  <div>
                    <span className="font-bold text-sm text-hub-strong leading-tight block mb-1">{topic.title}</span>
                    {review ? (
                      <span className="text-[10px] text-hub-faint bg-hub-inner px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">
                        Próxima: {new Date(review.next_review_date).toLocaleDateString('pt-BR')} (em {review.interval_days} dias)
                      </span>
                    ) : (
                      <span className="text-[10px] text-hub-faint bg-hub-inner px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">
                        Não agendada
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-hub-border/50">
                    <button onClick={() => scheduleReview(topic.id, 1)} className="flex-1 py-1.5 bg-hub-inner hover:bg-hub-hover text-[10px] font-bold uppercase rounded-lg transition-colors border border-hub-border text-hub-muted hover:text-white">Hoje</button>
                    <button onClick={() => scheduleReview(topic.id, 3)} className="flex-1 py-1.5 bg-hub-inner hover:bg-hub-hover text-[10px] font-bold uppercase rounded-lg transition-colors border border-hub-border text-hub-muted hover:text-white">+ 3 Dia</button>
                    <button onClick={() => scheduleReview(topic.id, 7)} className="flex-1 py-1.5 bg-hub-inner hover:bg-hub-hover text-[10px] font-bold uppercase rounded-lg transition-colors border border-hub-border text-hub-muted hover:text-white">+ 7 Dia</button>
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
