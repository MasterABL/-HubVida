import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../supabase';
import { Play, Pause, Square, History, Clock } from 'lucide-react';

export const PomodoroTab = ({ discipline, session }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [sessions, setSessions] = useState([]);

  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, break
  const timerRef = useRef(null);

  const fetchData = async () => {
    try {
      // 1. Fetch Topics
      const { data: topicsData } = await supabase
        .from('topics')
        .select('id, title')
        .eq('discipline_id', discipline.id)
        .order('order_index');
      
      if (topicsData) setTopics(topicsData);

      // 2. Fetch Sessions
      const { data: sessData } = await supabase
        .from('pomodoro_sessions')
        .select('*')
        .eq('discipline_id', discipline.id)
        .eq('user_id', session.user.id)
        .order('completed_at', { ascending: false })
        .limit(10);
      
      if (sessData) setSessions(sessData);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchData();
    return () => clearInterval(timerRef.current);
  }, [discipline.id]);



  const saveSession = async (duration) => {
    try {
      const { data, error } = await supabase
        .from('pomodoro_sessions')
        .insert({
          user_id: session.user.id,
          discipline_id: discipline.id,
          topic_id: selectedTopicId || null,
          duration_minutes: duration
        })
        .select()
        .single();
      
      if (data) {
        setSessions([data, ...sessions].slice(0, 10)); // keep last 10 locally
      }
    } catch (err) {
      console.error('Error saving pomodoro session:', err);
    }
  };

  const toggleTimer = () => {
    if (isActive) {
      clearInterval(timerRef.current);
      setIsActive(false);
    } else {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleTimerComplete = () => {
    if (mode === 'focus') {
      saveSession(25);
      // Auto-switch to break
      setMode('break');
      setTimeLeft(5 * 60);
      // Play sound if possible
      try {
        const audio = new Audio('/notification.mp3'); // Optional: Add a sound later
        audio.play().catch(() => {});
      } catch (e) {
        // ignore audio errors
      }
    } else {
      // Auto-switch to focus
      setMode('focus');
      setTimeLeft(25 * 60);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const changeMode = (newMode) => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  // formatting time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progress = mode === 'focus' 
    ? 100 - ((timeLeft / (25 * 60)) * 100)
    : 100 - ((timeLeft / (5 * 60)) * 100);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Left: Timer */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 bg-hub-base p-8 rounded-2xl border border-hub-border relative overflow-hidden">
        {isActive && (
          <div className="absolute inset-0 bg-yellow-500/5 animate-pulse z-0 pointer-events-none"></div>
        )}
        
        <div className="relative z-10 w-full max-w-sm">
          <label className="text-[10px] font-bold text-hub-muted uppercase tracking-wider mb-2 block text-center">Tópico em Foco (Opcional)</label>
          <select
            className="w-full bg-hub-inner border border-hub-border focus:border-yellow-500 rounded-xl px-4 py-3 outline-none text-sm text-hub-strong font-medium transition-colors appearance-none text-center"
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            disabled={isActive}
          >
            <option value="">Geral ({discipline.name})</option>
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 relative z-10 p-1 bg-hub-inner rounded-xl border border-hub-border">
          <button 
            onClick={() => changeMode('focus')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${mode === 'focus' ? 'bg-rose-500 text-white' : 'text-hub-muted hover:text-white hover:bg-hub-hover'}`}
          >
            Foco (25m)
          </button>
          <button 
            onClick={() => changeMode('break')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${mode === 'break' ? 'bg-emerald-500 text-white' : 'text-hub-muted hover:text-white hover:bg-hub-hover'}`}
          >
            Pausa (5m)
          </button>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center z-10">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="128" cy="128" r="120" fill="transparent" strokeWidth="8" className="stroke-hub-inner" />
            <circle 
              cx="128" cy="128" r="120" 
              fill="transparent" 
              strokeWidth="8" 
              className={`transition-all duration-1000 ease-linear ${mode === 'focus' ? 'stroke-rose-500' : 'stroke-emerald-500'}`}
              strokeDasharray="754" 
              strokeDashoffset={754 - (754 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center flex flex-col items-center">
            <span className="text-6xl font-black text-white tabular-nums tracking-tighter">{timeStr}</span>
            <span className={`text-xs font-bold uppercase tracking-widest mt-2 ${mode === 'focus' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {mode === 'focus' ? 'Modo Foco' : 'Descanso'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={stopTimer}
            className="p-4 bg-hub-inner hover:bg-hub-hover text-hub-muted hover:text-white rounded-2xl transition-all shadow-sm border border-hub-border"
          >
            <Square className="w-6 h-6" />
          </button>
          <button 
            onClick={toggleTimer}
            className={`p-6 rounded-2xl text-white transition-all shadow-lg transform active:scale-95 ${
              isActive 
                ? 'bg-hub-hover text-white border border-hub-border' 
                : 'bg-yellow-500 hover:bg-yellow-400 text-[#111] shadow-yellow-500/20'
            }`}
          >
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
          </button>
        </div>
      </div>

      {/* Right: History */}
      <div className="w-full lg:w-72 bg-hub-base border border-hub-border rounded-2xl p-5 flex flex-col">
        <h4 className="text-sm font-bold text-hub-strong uppercase tracking-wider mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-yellow-500" /> Histórico Recente
        </h4>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {sessions.length === 0 ? (
            <p className="text-[10px] text-hub-faint text-center py-8 uppercase tracking-widest">Nenhuma sessão registrada</p>
          ) : (
            sessions.map(sess => {
              const topic = topics.find(t => t.id === sess.topic_id);
              return (
                <div key={sess.id} className="p-3 bg-hub-inner border border-hub-border rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded">
                      25 Minutos
                    </span>
                    <span className="text-[9px] text-hub-muted font-bold">
                      {new Date(sess.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-hub-strong mt-2 truncate">
                    {topic ? topic.title : discipline.name}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
