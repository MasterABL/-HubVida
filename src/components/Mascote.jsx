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

const POSITIONS = [
  { bottom: 96, right: 24 },    // canto direito (subi para 96 para mobile nav)
  { bottom: 96, right: 180 },   // um pouco mais para dentro
  { bottom: 200, right: 24 },   // mais alto no canto
  { bottom: 96, right: '35%' }, // centro-direita
];

export const Mascote = ({ 
  activeTab,
  gymAttendance,
  englishStreak,
  sleepData,
  financeSummary,
  visaoGeralMetrics,
  nutritionTracker
}) => {
  const [state, setState] = useState(STATES.NEUTRAL);
  const [message, setMessage] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMotivating, setIsMotivating] = useState(false);
  const [positionIndex, setPositionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const lastGymStatusRef = useRef(null);
  const celebrationTimeRef = useRef(0);
  const timeoutRef = useRef(null);
  const motivatingTimeoutRef = useRef(null);
  const prevTabRef = useRef(activeTab);

  const showMessage = useCallback((text, duration = 4000) => {
    setMessage(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, duration);
  }, []);

  const generateSectionSummary = useCallback((tab) => {
    switch(tab) {
      case 'Finanças': {
        if (!financeSummary) return null;
        const { available, income } = financeSummary;
        if (available < 0) return `⚠️ Saldo negativo de R$${Math.abs(available).toFixed(0)}! Hora de revisar os gastos.`;
        if (available > income * 0.3) return `💰 Boa situação! Sobrou R$${available.toFixed(0)} este mês. Considere investir!`;
        return `📊 Saldo disponível: R$${available.toFixed(0)} de R$${income.toFixed(0)} em receitas.`;
      }
      
      case 'Controle de Sono': {
        if (!sleepData || sleepData.length === 0) return '😴 Sem registros de sono ainda. Começa a registrar!';
        const last3 = sleepData.slice(-3);
        const avg = last3.reduce((a, b) => a + (Number(b.hours) || 0), 0) / last3.length;
        if (avg < 6) return `😩 Média de ${avg.toFixed(1)}h nos últimos dias. Você precisa dormir mais!`;
        if (avg >= 8) return `🌟 Excelente! Dormindo ${avg.toFixed(1)}h em média. Mente afiada!`;
        return `😴 Dormindo ${avg.toFixed(1)}h em média. Tenta chegar em 8h!`;
      }
      
      case 'Academia (Treino)': {
        const today = new Date().getDay();
        const todayStatus = gymAttendance?.[today];
        const weekDone = Object.values(gymAttendance || {}).filter(v => v === 'done').length;
        if (todayStatus === 'done') return `💪 Treino de hoje registrado! ${weekDone} treinos essa semana. Bora!`;
        return `🏋️ ${weekDone} treinos essa semana. ${todayStatus === 'missed' ? 'Faltou hoje, recupera amanhã!' : 'Vai treinar hoje?'}`;
      }
      
      case 'Faculdade ADM': {
        if (!visaoGeralMetrics) return null;
        const { progressoMes, disciplinasAprovadas, totalDisciplinas } = visaoGeralMetrics;
        if (progressoMes === 100) return `🎓 Todas as AS do mês concluídas! Você arrasou!`;
        if (progressoMes < 30) return `📚 Só ${progressoMes}% das AS feitas. Corre que o mês não espera!`;
        return `📖 ${progressoMes}% das AS concluídas. ${disciplinasAprovadas}/${totalDisciplinas} disciplinas aprovadas.`;
      }
      
      case 'Competências': {
        const streak = englishStreak?.count || 0;
        if (streak === 0) return '🇬🇧 Sem streak de inglês. Que tal praticar hoje?';
        if (streak >= 7) return `🔥 ${streak} dias de streak de inglês! Incrível consistência!`;
        return `📘 ${streak} dias de streak de inglês. Continua assim!`;
      }
      
      case 'Nutrição & Base': {
        const { water, creatine, meals } = nutritionTracker || {};
        const done = [water, creatine, meals].filter(Boolean).length;
        if (done === 3) return '✅ Nutrição 100% hoje! Água, creatina e refeições. Perfeito!';
        if (done === 0) return '💧 Nenhum hábito nutricional marcado hoje ainda!';
        return `🥗 ${done}/3 hábitos nutricionais completos hoje.`;
      }
      
      case 'Rotina Diária': return '📅 Aqui está sua rotina. Cada bloco checado é um passo pro doutor!';
      case 'Visão Geral': return '👋 Oi! Sou o HubBot. Clica em mim pra dicas!';
      default: return null;
    }
  }, [financeSummary, sleepData, gymAttendance, visaoGeralMetrics, englishStreak, nutritionTracker]);

  // Handle Tab Change Summary
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      const summary = generateSectionSummary(activeTab);
      if (summary) {
        const tid = setTimeout(() => showMessage(summary, 6000), 800);
        return () => clearTimeout(tid);
      }
    }
  }, [activeTab, generateSectionSummary, showMessage]);

  // Handle Position Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setPositionIndex(i => (i + 1) % POSITIONS.length);
        setIsTransitioning(false);
      }, 400);
    }, 12000);
    return () => clearInterval(interval);
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
        setTimeout(() => showMessage(MESSAGES.celebrating[0]), 0);
      }
      lastGymStatusRef.current = todayStatus;

      // 2. Determine Current State Priority
      let nextState = STATES.NEUTRAL;

      if (now - celebrationTimeRef.current < 30000) {
        nextState = STATES.CELEBRATING;
      } 
      else {
        const last3DaysSleep = sleepData?.slice(-3) || [];
        const avgSleep = last3DaysSleep.length > 0 
          ? last3DaysSleep.reduce((acc, d) => acc + parseFloat(d.hours || 0), 0) / last3DaysSleep.length 
          : 8;
        
        if (avgSleep < 6) nextState = STATES.SLEEPING;
        else if ((financeSummary?.available || 0) < 0 || (visaoGeralMetrics?.progressoMes ?? 100) < 30) nextState = STATES.ALERT;
        else if ((financeSummary?.available || 0) > 0 && avgSleep >= 7 && (englishStreak?.count || 0) > 0) nextState = STATES.HAPPY;
        else if (isMotivating) nextState = STATES.MOTIVATING;
      }

      if (nextState !== state) setState(nextState);
    };

    updateState();
    const interval = setInterval(updateState, 5000);
    return () => clearInterval(interval);
  }, [gymAttendance, sleepData, financeSummary, visaoGeralMetrics, englishStreak, isMotivating, state, showMessage]);

  // Motivational interval (every 5 mins for 8s)
  useEffect(() => {
    const triggerMotivating = () => {
      setIsMotivating(true);
      const msgs = MESSAGES.motivating;
      showMessage(msgs[Math.floor(Math.random() * msgs.length)], 8000);
      motivatingTimeoutRef.current = setTimeout(() => setIsMotivating(false), 8000);
    };

    const interval = setInterval(triggerMotivating, 300000);
    return () => {
      clearInterval(interval);
      if (motivatingTimeoutRef.current) clearTimeout(motivatingTimeoutRef.current);
    };
  }, [showMessage]);

  const getEyeColor = () => {
    switch (state) {
      case STATES.CELEBRATING: return '#eab308';
      case STATES.HAPPY: return '#22c55e';
      case STATES.MOTIVATING: return '#3b82f6';
      case STATES.SLEEPING: return '#a855f7';
      case STATES.ALERT: return '#ef4444';
      default: return '#64748b';
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
    <div 
      className="fixed pointer-events-none"
      style={{
        bottom: POSITIONS[positionIndex].bottom,
        right: POSITIONS[positionIndex].right,
        transition: 'bottom 1.5s cubic-bezier(0.4,0,0.2,1), right 1.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
        opacity: isTransitioning ? 0 : 1,
        zIndex: 30,
      }}
    >
      <div className="flex flex-col items-end gap-2">
        {message && !isMinimized && (
          <div className="bg-hub-surface border border-hub-border rounded-2xl px-4 py-3 max-w-[200px] text-[11px] font-bold text-hub-strong shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 relative pointer-events-auto">
            {message}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-hub-surface border-r border-b border-hub-border rotate-45" />
          </div>
        )}
        
        <button
          onClick={() => isMinimized ? setIsMinimized(false) : showMessage(MESSAGES[state][Math.floor(Math.random() * MESSAGES[state].length)])}
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
    </div>
  );
};
