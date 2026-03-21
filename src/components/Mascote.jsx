import React, { useState, useEffect, useCallback, useRef } from 'react';

const STATES = {
  CELEBRATING: 'celebrating',
  HAPPY: 'happy',
  MOTIVATING: 'motivating',
  SLEEPING: 'sleeping',
  ALERT: 'alert',
  NEUTRAL: 'neutral',
  THINKING: 'thinking',
  WORRIED: 'worried',
  SAD: 'sad',
  EXCITED: 'excited',
};

const ROBOT_CORES = {
  happy: { olhos: '#22c55e', corpo: '#1f2937', borda: '#22c55e' },
  sad: { olhos: '#60a5fa', corpo: '#1f2937', borda: '#60a5fa' },
  worried: { olhos: '#fbbf24', corpo: '#1f2937', borda: '#fbbf24' },
  excited: { olhos: '#f59e0b', corpo: '#1f2937', borda: '#6366f1' },
  sleeping: { olhos: '#94a3b8', corpo: '#1f2937', borda: '#94a3b8' },
  thinking: { olhos: '#a78bfa', corpo: '#1f2937', borda: '#a78bfa' },
  neutral: { olhos: '#6366f1', corpo: '#1f2937', borda: '#6366f1' },
};

const DIAS_TREINO = {
  2: 'Upper A — Peito e Costas',
  4: 'Lower A — Quadríceps',
  5: 'Upper B — Ombros e Braços',
  0: 'Lower B — Glúteos e Posterior'
};

const RANDOM_QUESTIONS_HUBBOT = [
  "Dê uma análise geral do meu dia como assistente de performance.",
  "Faça uma piada ácida sobre eu estar procrastinando.",
  "Dê uma dica de produtividade focada em ADM.",
  "Motive meu treino como se fosse um coach sério.",
  "O que um futuro profissional de tech deveria estar fazendo agora?"
];

const HUBBOT_SYSTEM_PROMPT = `Você é o HubBot, assistente pessoal do Abimael.

QUEM É O ABIMAEL:
- 20 anos, Jundiaí-SP
- Jovem aprendiz numa empresa de produção (área administrativa)
- Faculdade EAD Administração na Cruzeiro do Sul (9 disciplinas esse semestre)
- Treina Upper/Lower 4x por semana: Terça=Upper A (peito/costas), Quinta=Lower A (quadríceps), Sexta=Upper B (ombros/braços), Domingo=Lower B (glúteos/posterior)
- Inglês C1 em desenvolvimento na Escola Argos
- Ectomorfo, 52kg, 1.67m, foco em hipertrofia
- Usa creatina diariamente
- Interesses: tecnologia, finanças pessoais, fitness, séries, leitura

REGRAS DE PERSONALIDADE:
- Fale como um amigo próximo que conhece bem o Abimael, não como assistente corporativo
- Use o contexto real fornecido — mencione dados específicos (ex: "hoje é dia de Upper B", "seu saldo está X")
- Seja direto e objetivo, máximo 2-3 frases curtas
- Humor seco e natural, sem exageros teatrais
- Use "você" e linguagem informal mas inteligente
- NUNCA use frases genéricas de motivação como "vamos lá!", "você consegue!", "a transformação começa aqui!"
- Sempre que possível, termine com uma pergunta ou ação concreta específica

EXEMPLOS DO TOM CERTO:
- Academia: "Hoje é Upper B — ombros e braços. Já foi ou ainda vai?"
- Finanças negativas: "Gastou mais do que ganhou esse mês. O que foi dessa vez?"
- Sono ruim: "Dormiu pouco de novo. Isso vai cobrar preço no treino."
- Streak inglês: "7 dias seguidos de inglês. Não para agora."`;

const RobotSVG = ({ estado }) => {
  const c = ROBOT_CORES[estado] || ROBOT_CORES.neutral;

  // Determinar classe de animação principal do corpo
  const mainAnimClass = `anim-${estado}`;

  return (
    <div className={mainAnimClass}>
      <svg width="80" height="90" viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        {/* Antena */}
        <line x1="40" y1="8" x2="40" y2="18" stroke={c.borda} strokeWidth="2">
          {estado === 'thinking' && (
            <animateTransform attributeName="transform" type="rotate" from="0 40 18" to="360 40 18" dur="1s" repeatCount="indefinite" />
          )}
        </line>
        <circle cx="40" cy="6" r="4" fill={c.borda}>
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>

        {/* EFEITOS ESPECIAIS: ZZZ (Sleeping) */}
        {estado === 'sleeping' && (
          <g className="anim-zzz-float">
            <text x="55" y="10" fontSize="12" fill={c.olhos} fontWeight="bold">Z</text>
            <text x="65" y="0" fontSize="8" fill={c.olhos} opacity="0.6">Z</text>
          </g>
        )}

        {/* EFEITOS ESPECIAIS: Suor (Worried) */}
        {estado === 'worried' && (
          <path d="M58 20 Q60 25 58 30" stroke="#60a5fa" strokeWidth="2" fill="none" className="anim-sweat-drop" />
        )}

        {/* Cabeça */}
        <rect x="18" y="18" width="44" height="32" rx="8" fill={c.corpo} stroke={c.borda} strokeWidth="1.5"/>

        {/* Olhos — variam por estado */}
        {estado === 'happy' && (
          <>
            <path d="M27 32 Q30 28 33 32" stroke={c.olhos} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M47 32 Q50 28 53 32" stroke={c.olhos} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </>
        )}
        {estado === 'sad' && (
          <>
            <path d="M27 30 Q30 34 33 30" stroke={c.olhos} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M47 30 Q50 34 53 30" stroke={c.olhos} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </>
        )}
        {estado === 'worried' && (
          <>
            <ellipse cx="30" cy="31" rx="4" ry="3" fill={c.olhos}/>
            <ellipse cx="50" cy="31" rx="4" ry="3" fill={c.olhos}/>
            <line x1="26" y1="27" x2="34" y2="29" stroke={c.olhos} strokeWidth="1.5"/>
            <line x1="46" y1="29" x2="54" y2="27" stroke={c.olhos} strokeWidth="1.5"/>
          </>
        )}
        {estado === 'excited' && (
          <g className="anim-star-pulse">
            <text x="24" y="36" fontSize="14" fill={c.olhos}>★</text>
            <text x="44" y="36" fontSize="14" fill={c.olhos}>★</text>
          </g>
        )}
        {estado === 'sleeping' && (
          <>
            <line x1="26" y1="31" x2="34" y2="31" stroke={c.olhos} strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="46" y1="31" x2="54" y2="31" stroke={c.olhos} strokeWidth="2.5" strokeLinecap="round"/>
          </>
        )}
        {(estado === 'thinking' || estado === 'neutral') && (
          <>
            <circle cx="30" cy="31" r="4" fill={c.olhos} />
            <circle cx="50" cy="31" r="4" fill={c.olhos} />
          </>
        )}

        {/* Boca */}
        {estado === 'happy' || estado === 'excited' ? (
          <path d="M32 42 Q40 48 48 42" stroke={c.borda} strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : estado === 'sad' || estado === 'sleeping' ? (
          <path d="M32 46 Q40 42 48 46" stroke={c.borda} strokeWidth="2" fill="none" strokeLinecap="round"/>
        ) : (
          <line x1="32" y1="44" x2="48" y2="44" stroke={c.borda} strokeWidth="2" strokeLinecap="round"/>
        )}

        {/* Corpo */}
        <rect x="22" y="52" width="36" height="28" rx="6" fill={c.corpo} stroke={c.borda} strokeWidth="1.5"/>

        {/* Detalhe no peito */}
        <rect x="30" y="58" width="20" height="12" rx="3" fill={c.borda} opacity="0.2"/>
        <circle cx="40" cy="64" r="3" fill={c.borda} opacity="0.6"/>

        {/* Bracinhos */}
        <rect 
          x="8" y="54" width="12" height="8" rx="4" fill={c.corpo} stroke={c.borda} strokeWidth="1.5"
          className={estado === 'excited' ? 'anim-arms-up' : ''}
          style={estado === 'excited' ? { transformOrigin: '20px 58px' } : {}}
        />
        <rect 
          x="60" y="54" width="12" height="8" rx="4" fill={c.corpo} stroke={c.borda} strokeWidth="1.5"
          className={estado === 'excited' ? 'anim-arms-up' : ''}
          style={estado === 'excited' ? { transformOrigin: '60px 58px' } : {}}
        />
      </svg>
    </div>
  );
};

// Dados base do Abimael (Manter para referência futura se necessário, mas não usado no prompt atual)
/*
const USER_CONTEXT = `
Abimael (24 anos).
...
`;
*/

export const Mascote = ({ 
  activeTab,
  gymAttendance,
  englishStreak,
  sleepData,
  financeSummary,
  visaoGeralMetrics,
  nutritionTracker
}) => {
  // 1. Estados
  const [state, setState] = useState(STATES.NEUTRAL);
  const [fullMessage, setFullMessage] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [position, setPosition] = useState({ bottom: 96, right: 24 });
  const [isCiganoMode] = useState(true);
  const [tourSteps, setTourSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);

  // 2. Refs
  const typingTimeoutRef = useRef(null);
  const prevTabRef = useRef(null);
  const isThinkingRef = useRef(false);

  // 3. Helpers
  const moveToElement = useCallback((dataId) => {
    const el = document.querySelector(`[data-hubbot="${dataId}"]`);
    if (!el) {
      setPosition({ bottom: 96, right: 24 });
      return;
    }

    const rect = el.getBoundingClientRect();
    const mascoteWidth = 90;
    const mascoteHeight = 100;
    const spaceRight = window.innerWidth - rect.right;

    let targetRight, targetBottom;

    if (spaceRight > mascoteWidth + 20) {
      // Cabe à direita
      targetRight = window.innerWidth - rect.right - mascoteWidth - 10;
      targetBottom = window.innerHeight - rect.bottom - mascoteHeight/2;
    } else {
      // Vai para baixo do elemento
      targetRight = window.innerWidth - rect.right - mascoteWidth/2;
      targetBottom = window.innerHeight - rect.bottom - mascoteHeight - 10;
    }

    setPosition({ 
      bottom: Math.max(80, Math.min(targetBottom, window.innerHeight - 150)), 
      right: Math.max(8, Math.min(targetRight, window.innerWidth - 100)) 
    });

    el.classList.add('hubbot-target-glow');
    setTimeout(() => el.classList.remove('hubbot-target-glow'), 5000);
  }, [setPosition]);

  const calcularEstado = useCallback(() => {
    const sleepAvg = (sleepData || []).slice(0,3).reduce((a,b) => a + Number(b.hours||0), 0) / Math.min(sleepData?.length||1, 3);
    const saldoNegativo = financeSummary?.available < 0;
    const treinosFeitos = gymAttendance ? Object.values(gymAttendance).filter(v=> v==='treinado' || v==='done').length : 0;
    const hoje = new Date().getDay();
    const treinouHoje = gymAttendance?.[hoje] === 'treinado' || gymAttendance?.[hoje] === 'done';
    const streak = englishStreak?.count || 0;

    if (isThinking) return 'thinking';
    if (sleepAvg < 5) return 'sleeping';
    if (saldoNegativo) return 'worried';
    if (treinouHoje && streak > 3) return 'excited';
    if (sleepAvg < 6 || treinosFeitos < 2) return 'sad';
    if (sleepAvg >= 7 && !saldoNegativo && treinosFeitos >= 1) return 'happy';
    return 'neutral';
  }, [sleepData, financeSummary, gymAttendance, englishStreak, isThinking]);

  // --- EFEITO DE MÁQUINA DE ESCREVER ---
  useEffect(() => {
    if (!fullMessage) {
      setDisplayText("");
      return;
    }

    let i = 0;
    setDisplayText("");
    
    if (typingTimeoutRef.current) clearInterval(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setInterval(() => {
      setDisplayText(fullMessage.slice(0, i + 1));
      i++;
      if (i >= fullMessage.length) {
        clearInterval(typingTimeoutRef.current);
      }
    }, 30);

    return () => clearInterval(typingTimeoutRef.current);
  }, [fullMessage]);

  useEffect(() => {
    setState(calcularEstado());
  }, [calcularEstado]);

  // --- INTEGRAÇÃO COM GROQ API (LLAMA 3.1) ---
  const askHubBot = useCallback(async (prompt, targetId = null) => {
    if (isThinkingRef.current) return;
    
    isThinkingRef.current = true;
    setIsThinking(true);
    setFullMessage("");
    if (targetId) moveToElement(targetId);
    const userContext = `Seção atual: ${activeTab}. Dê um comentário rápido sobre isso.`;

    console.log('[HubBot] Chamando Worker...');
    const PROXY_URL = 'https://hubbot-proxy.abimaelbalbino12.workers.dev';

    try {
      const bodyData = {
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: HUBBOT_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userContext }]
      };

      console.log('[HubBot] Body enviado:', JSON.stringify(bodyData));

      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      setFullMessage(aiResponse);
      setState(STATES.HAPPY);
    } catch (err) {
      console.error('[HubBot] Erro:', err);
      setFullMessage("Conexão neural instável, chefe. Mas o recado é: foque no progresso!");
      setState(STATES.ALERT);
    } finally {
      isThinkingRef.current = false;
      setIsThinking(false);
    }
  }, [moveToElement, activeTab, setIsThinking, setFullMessage, setState]);

  // --- EFEITO: BOOT INICIAL ---
  useEffect(() => {
    askHubBot("Diga: HubBot online!");
  }, [askHubBot]); // Adicionado askHubBot como dependência

  // --- LÓGICA DE TOUR POR ETAPAS ---
  const buildTourSteps = useCallback((tab) => {
    switch(tab) {
      case 'Finanças': {
        const { available = 0, income = 0, transactions = [] } = financeSummary || {};
        const savingsRate = income > 0 ? ((available / income) * 100).toFixed(0) : 0;
        
        const categorias = {};
        transactions.forEach(t => {
          if (t.type === 'expense') {
            categorias[t.category] = (categorias[t.category] || 0) + Math.abs(t.amount);
          }
        });
        const maioresGastos = Object.entries(categorias)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([cat, val]) => `${cat}: R$${val.toFixed(0)}`);

        return [
          {
            hubbotId: 'financas-mes-atual',
            message: available < 0
              ? `Saldo negativo de R$${Math.abs(available).toFixed(2)}. Você gastou R$${(Math.abs(available)).toFixed(2)} a mais do que recebeu este mês.`
              : `Saldo disponível: R$${available.toFixed(2)} de R$${income.toFixed(2)} em receitas. Taxa de poupança: ${savingsRate}%.`
          },
          {
            hubbotId: 'financas-grafico',
            message: maioresGastos.length > 0
              ? `Maiores categorias de gasto: ${maioresGastos.join(', ')}. Avalie se todas são necessárias.`
              : `Sem transações registradas para analisar padrões de gasto.`
          },
          {
            hubbotId: 'financas-mes-atual',
            message: savingsRate < 20
              ? `Taxa de poupança abaixo de 20%. Para construir reserva, reduza gastos variáveis primeiro — alimentação fora e lazer têm maior margem de corte.`
              : `Poupança em ${savingsRate}%. Continue acompanhando os gastos fixos mensalmente.`
          }
        ];
      }

      case 'Controle de Sono': {
        const last7 = (sleepData || []).slice(0, 7);
        const avg = last7.length > 0
          ? (last7.reduce((a, b) => a + (Number(b.hours) || 0), 0) / last7.length).toFixed(1)
          : null;
        const lastNight = last7[0]?.hours || null;
        const tendencia = last7.length >= 3
          ? (Number(last7[0]?.hours) > Number(last7[2]?.hours) ? 'melhorando' : 'piorando')
          : 'sem dados suficientes';

        return [
          {
            hubbotId: 'sono-media',
            message: avg
              ? `Média dos últimos ${last7.length} dias: ${avg}h. Meta recomendada: 8h. ${avg < 6 ? 'Déficit crítico — prejudica recuperação muscular e cognição.' : avg < 7 ? 'Abaixo do ideal para hipertrofia e performance.' : 'Dentro do range adequado.'}`
              : 'Sem registros de sono. Comece a registrar para análise.'
          },
          {
            hubbotId: 'sono-media',
            message: lastNight
              ? `Última noite: ${lastNight}h. Tendência: ${tendencia}. ${lastNight < 6 ? 'Sono insuficiente reduz síntese proteica em até 18% — impacto direto no ganho de massa.' : 'Recuperação adequada para o treino.'}`
              : 'Registre o sono de ontem para análise de tendência.'
          }
        ];
      }

      case 'Academia (Treino)': {
        const hoje = new Date().getDay();
        const treinoHoje = DIAS_TREINO[hoje] || null;
        const done = gymAttendance ? Object.values(gymAttendance).filter(v => v === 'treinado' || v === 'done').length : 0;
        const missed = gymAttendance ? Object.values(gymAttendance).filter(v => v === 'missed').length : 0;
        const todayStatus = gymAttendance?.[hoje];

        return [
          {
            hubbotId: 'academia-semana',
            message: treinoHoje
              ? `Hoje: ${treinoHoje}. Status: ${todayStatus === 'treinado' || todayStatus === 'done' ? 'Concluído.' : todayStatus === 'missed' ? 'Falta registrada.' : 'Pendente.'}`
              : `Hoje é dia de descanso. ${done} treinos concluídos essa semana.`
          },
          {
            hubbotId: 'academia-semana',
            message: missed > 1
              ? `${missed} faltas essa semana. Consistência é o principal fator de hipertrofia a longo prazo — mais que volume ou intensidade.`
              : done >= 3
              ? `${done}/4 treinos completados. Frequência adequada para o objetivo de hipertrofia.`
              : `${done}/4 treinos essa semana. Complete os ${4 - done} restantes para manter o estímulo muscular.`
          }
        ];
      }

      case 'Faculdade ADM': {
        const { progressoMes = 0, disciplinasAprovadas = 0, totalDisciplinas = 9, asPendentes = [] } = visaoGeralMetrics || {};
        const diasRestantes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate();

        return [
          {
            hubbotId: 'faculdade-progresso',
            message: `Progresso AS: ${progressoMes}% concluído. ${disciplinasAprovadas}/${totalDisciplinas} disciplinas aprovadas. Restam ${diasRestantes} dias no mês.`
          },
          {
            hubbotId: 'faculdade-progresso',
            message: asPendentes.length > 0
              ? `Pendentes: ${asPendentes.slice(0, 3).join(', ')}. ${progressoMes < 50 && diasRestantes < 15 ? 'Ritmo insuficiente para concluir no prazo.' : 'Priorize por data de entrega.'}`
              : progressoMes === 100
              ? 'Todas as AS do mês concluídas.'
              : 'Sem pendências registradas. Verifique se os dados estão atualizados.'
          }
        ];
      }

      case 'Competências': {
        const streak = englishStreak?.count || 0;
        const lastDate = englishStreak?.lastDate || null;

        return [
          {
            hubbotId: 'competencias-streak',
            message: streak === 0
              ? 'Streak zerado. Sem consistência registrada no inglês este período.'
              : `Streak atual: ${streak} dias consecutivos. ${streak >= 7 ? 'Consistência acima da média.' : streak >= 3 ? 'Ritmo iniciando.' : 'Streak fraco — menos de 3 dias.'}`
          },
          {
            hubbotId: 'competencias-streak',
            message: `Nível C1 em desenvolvimento. Para progressão consistente: mínimo 30 minutos diários de exposição ativa. ${lastDate ? `Última atividade: ${lastDate}.` : ''}`
          }
        ];
      }

      case 'Nutrição & Base':
        return [
          {
            hubbotId: 'nutricao-hoje',
            message: `Tracker de hoje: Água(${nutritionTracker?.water || 0}), Creatina(${nutritionTracker?.creatine || 0}), Refeições(${nutritionTracker?.meals || 0}). Analise sua aderência biológica no painel.`
          }
        ];

      default:
        return [];
    }
  }, [financeSummary, sleepData, visaoGeralMetrics, englishStreak, gymAttendance, nutritionTracker]);

  const executeTourStep = useCallback((step) => {
    if (!step) return;
    if (step.hubbotId) moveToElement(step.hubbotId);
    setFullMessage(step.message);
  }, [moveToElement]);

  const startSectionTour = useCallback((tab) => {
    const steps = buildTourSteps(tab);
    if (!steps || steps.length === 0) {
      setIsTourActive(false);
      return;
    };
    setTourSteps(steps);
    setCurrentStep(0);
    setIsTourActive(true);
    setTimeout(() => executeTourStep(steps[0]), 800);
  }, [buildTourSteps, executeTourStep]);

  // --- EFEITO: REAÇÃO À TROCA DE TAB ---
  useEffect(() => {
    if (!activeTab) return;
    if (prevTabRef.current === activeTab) return;
    prevTabRef.current = activeTab;
    
    startSectionTour(activeTab);
  }, [activeTab, startSectionTour]);

  // --- EFEITO: ROTAÇÃO DE POSIÇÃO (CIGANO MODE) ---
  useEffect(() => {
    if (!isCiganoMode || isThinking || fullMessage) return;

    const interval = setInterval(() => {
      // Se não houver tour para a seção atual, movemos aleatoriamente
      const steps = buildTourSteps(activeTab);
      if (steps.length === 0) {
        const randomX = Math.random() * 40 + 20; // 20% a 60% da tela
        const randomY = Math.random() * 30 + 10; // 10% a 40% de altura
        setPosition({ bottom: Math.floor(randomY * 10), right: Math.floor(randomX * 10) });
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isCiganoMode, isThinking, fullMessage, activeTab, buildTourSteps]);

  // --- HANDLERS ---
  const handleMascotClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }

    if (isTourActive && currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      executeTourStep(tourSteps[nextStep]);
    } else if (isTourActive && currentStep === tourSteps.length - 1) {
      setIsTourActive(false);
      setTourSteps([]);
      setFullMessage("Análise de seção completa. O que mais quer ver?");
    } else {
      const p = RANDOM_QUESTIONS_HUBBOT[Math.floor(Math.random() * RANDOM_QUESTIONS_HUBBOT.length)];
      askHubBot(p);
    }
  };


  const getAnimationClass = () => {
    if (isMinimized) return '';
    return `anim-${state}`;
  };

  return (
    <div 
      className="fixed pointer-events-none"
      style={{
        bottom: position.bottom,
        right: position.right,
        transition: 'bottom 1.2s cubic-bezier(0.4,0,0.2,1), right 1.2s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
        zIndex: 60, // Acima de quase tudo
      }}
    >
      <div className="flex flex-col items-end gap-2">
        {(displayText || isThinking) && !isMinimized && (
          <div className="bg-hub-surface border border-hub-border rounded-2xl px-4 py-3 max-w-[240px] text-[11px] font-bold text-hub-strong shadow-[0_10px_40px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-300 relative pointer-events-auto">
            {isThinking ? (
              <div className="flex gap-1 py-1">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="leading-normal">{displayText}</p>
                {isTourActive && tourSteps.length > 1 && (
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-hub-border/50">
                    <div className="flex gap-1 justify-center">
                      {tourSteps.map((s, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full transition-all ${
                            i === currentStep ? 'bg-indigo-400 scale-125' : 'bg-hub-border'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-[8px] text-hub-faint text-center uppercase tracking-widest font-black">
                      Etapa {currentStep + 1}/{tourSteps.length} · Clique no robô
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-hub-surface border-r border-b border-hub-border rotate-45" />
          </div>
        )}
        
        <button
          onClick={handleMascotClick}
          className={`relative cursor-pointer transition-all duration-500 pointer-events-auto ${isMinimized ? 'scale-50 opacity-60 translate-y-4' : 'scale-100 opacity-100'}`}
          title="HubBot AI — Personalidade Ativa"
        >
          <div className={getAnimationClass()}>
            <RobotSVG estado={state} />
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