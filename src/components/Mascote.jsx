import React, { useState, useEffect, useCallback, useRef } from 'react';

const STATES = {
  CELEBRATING: 'celebrating',
  HAPPY: 'happy',
  MOTIVATING: 'motivating',
  SLEEPING: 'sleeping',
  ALERT: 'alert',
  NEUTRAL: 'neutral',
};

const MESSAGES = {
  celebrating: [
    "Isso aí! 🔥 Consistência é tudo!",
    "Missão cumprida! Você é imparável!",
    "Mais um check! Ph.D. em construção! 🎓"
  ],
  happy: [
    "Tudo nos trilhos! Continue assim 💪",
    "Sono bom + saldo positivo = mente afiada!",
    "Você está no caminho certo, Abimael!"
  ],
  motivating: [
    "Lembra: 1 artigo científico por semana 📚",
    "Hidratação! Já bebeu água hoje? 💧",
    "Creatina tomada? Não esquece! 🧪",
    "Revisão rápida de 30min vale mais que 3h cansado",
    "O Doutor Abimael começa com os hábitos de hoje",
    "Inglês: 1 podcast hoje já conta! 🎧"
  ],
  sleeping: [
    "Zzz... você está dormindo pouco... 😴",
    "Seu sono está abaixo de 6h. Cuida disso!",
    "Sono ruim = performance ruim. Dorme mais!"
  ],
  alert: [
    "Alerta! Finanças precisam de atenção ⚠️",
    "AS pendentes acumulando... vai lá! 📋",
    "Hora de revisar o orçamento do mês"
  ],
  neutral: [
    "Oi! Clique em mim para uma dica 👋",
    "HubBot online e monitorando tudo!",
    "Aqui para te ajudar, Abimael!"
  ]
};

export const Mascote = ({ 
  gymAttendance,
  englishStreak,
  sleepData,
  financeSummary,
  visaoGeralMetrics,
}) => {
  const [state, setState] = useState(STATES.NEUTRAL);
  const [message, setMessage] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMotivating, setIsMotivating] = useState(false);
  
  const lastGymStatusRef = useRef(null);
  const celebrationTimeRef = useRef(0);
  const timeoutRef = useRef(null);
  const motivatingTimeoutRef = useRef(null);

  const showRandomMessage = useCallback((currentState) => {
    const possibleMessages = MESSAGES[currentState] || MESSAGES.neutral;
    const randomMsg = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
    setMessage(randomMsg);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, 4000);
  }, []);

  // Sync state logic
  useEffect(() => {
    const updateState = () => {
      const now = Date.now();

      // 1. Check Gym Attendance for Celebration Trigger
      const todayIdx = new Date().getDay();
      const todayStatus = gymAttendance?.[todayIdx];
      if (lastGymStatusRef.current === 'todo' && todayStatus === 'done') {
        celebrationTimeRef.current = now;
        showRandomMessage(STATES.CELEBRATING);
      }
      lastGymStatusRef.current = todayStatus;

      // 2. Determine Current State Priority
      let nextState = STATES.NEUTRAL;

      // Celebrate (30s window)
      if (now - celebrationTimeRef.current < 30000) {
        nextState = STATES.CELEBRATING;
      } 
      else {
        // Sleep
        const last3DaysSleep = sleepData?.slice(-3) || [];
        const avgSleep = last3DaysSleep.length > 0 
          ? last3DaysSleep.reduce((acc, d) => acc + parseFloat(d.hours || 0), 0) / last3DaysSleep.length 
          : 8;
        
        if (avgSleep < 6) {
          nextState = STATES.SLEEPING;
        }
        // Alert
        else if ((financeSummary?.available || 0) < 0 || (visaoGeralMetrics?.progressoMes ?? 100) < 30) {
          nextState = STATES.ALERT;
        }
        // Happy
        else if ((financeSummary?.available || 0) > 0 && avgSleep >= 7 && (englishStreak?.count || 0) > 0) {
          nextState = STATES.HAPPY;
        }
        // Motivating
        else if (isMotivating) {
          nextState = STATES.MOTIVATING;
        }
      }

      if (nextState !== state) {
        setState(nextState);
      }
    };

    updateState();
    const interval = setInterval(updateState, 5000);
    return () => clearInterval(interval);
  }, [gymAttendance, sleepData, financeSummary, visaoGeralMetrics, englishStreak, isMotivating, showRandomMessage, state]);

  // Motivational interval (every 5 mins for 8s)
  useEffect(() => {
    const triggerMotivating = () => {
      setIsMotivating(true);
      showRandomMessage(STATES.MOTIVATING);
      motivatingTimeoutRef.current = setTimeout(() => {
        setIsMotivating(false);
      }, 8000);
    };

    const interval = setInterval(triggerMotivating, 300000);
    return () => {
      clearInterval(interval);
      if (motivatingTimeoutRef.current) clearTimeout(motivatingTimeoutRef.current);
    };
  }, [showRandomMessage]);

  const handleClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      showRandomMessage(state);
    }
  };

  const getEyeColor = () => {
    switch (state) {
      case STATES.CELEBRATING: return '#eab308'; // Yellow/Orange
      case STATES.HAPPY: return '#22c55e';       // Green
      case STATES.MOTIVATING: return '#3b82f6';  // Blue
      case STATES.SLEEPING: return '#a855f7';    // Purple
      case STATES.ALERT: return '#ef4444';       // Red
      default: return '#64748b';                 // Slate
    }
  };

  const getAnimationClass = () => {
    if (isMinimized) return '';
    switch (state) {
      case STATES.CELEBRATING: return 'mascote-celebrate';
      case STATES.SLEEPING: return 'mascote-sleep';
      case STATES.ALERT: return 'mascote-alert';
      default: return 'mascote-float';
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[150] flex flex-col items-end gap-2 pointer-events-none">
      {message && !isMinimized && (
        <div className="bg-hub-surface border border-hub-border rounded-2xl px-4 py-3 max-w-[200px] text-[11px] font-bold text-hub-strong shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 relative pointer-events-auto">
          {message}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-hub-surface border-r border-b border-hub-border rotate-45" />
        </div>
      )}
      
      <button
        onClick={handleClick}
        className={`relative cursor-pointer transition-all duration-500 pointer-events-auto ${isMinimized ? 'scale-50 opacity-60 translate-y-4' : 'scale-100 opacity-100'}`}
        title="HubBot — clique para uma dica!"
      >
        <div className={getAnimationClass()}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="15" x2="40" y2="25" stroke="#64748b" strokeWidth="2" />
            <circle cx="40" cy="12" r="3" fill={getEyeColor()} className="mascote-antenna" />
            <rect x="15" y="45" width="8" height="15" rx="4" fill="currentColor" className="text-hub-border" />
            <rect x="57" y="45" width="8" height="15" rx="4" fill="currentColor" className="text-hub-border" />
            <rect x="25" y="40" width="30" height="25" rx="8" fill="currentColor" className="text-hub-surface" stroke={state === STATES.CELEBRATING ? '#eab308' : 'var(--hub-border)'} strokeWidth="2" />
            <rect x="28" y="25" width="24" height="18" rx="6" fill="currentColor" className="text-hub-inner" stroke={state === STATES.CELEBRATING ? '#eab308' : 'var(--hub-border)'} strokeWidth="1" />
            <circle cx="35" cy="34" r="2.5" fill={getEyeColor()} className="transition-colors duration-500" />
            <circle cx="45" cy="34" r="2.5" fill={getEyeColor()} className="transition-colors duration-500" />
            <line x1="36" y1="39" x2="44" y2="39" stroke="#64748b" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => setIsMinimized(v => !v)}
        className="text-[9px] text-hub-faint hover:text-hub-strong font-black uppercase tracking-[0.2em] transition-colors pointer-events-auto bg-hub-base/40 backdrop-blur-sm px-2 py-1 rounded-full border border-hub-border/50"
      >
        {isMinimized ? 'mostrar' : 'minimizar'}
      </button>
    </div>
  );
};
