import React, { useState, useEffect, useCallback, useRef } from 'react';

const STATES = {
  CELEBRATING: 'celebrating',
  HAPPY: 'happy',
  MOTIVATING: 'motivating',
  SLEEPING: 'sleeping',
  ALERT: 'alert',
  NEUTRAL: 'neutral',
  THINKING: 'thinking',
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
  const [state, setState] = useState(STATES.NEUTRAL);
  const [fullMessage, setFullMessage] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [position, setPosition] = useState({ bottom: 96, right: 24 });
  const [isCiganoMode] = useState(true); // Se true, muda de posição sozinho

  const typingTimeoutRef = useRef(null);
  const prevTabRef = useRef(null);
  const isThinkingRef = useRef(false);

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

  // --- MOVIMENTO ATÉ ELEMENTO ---
  const moveToElement = useCallback((dataId) => {
    const el = document.querySelector(`[data-hubbot="${dataId}"]`);
    if (!el) {
      // Volta para a posição padrão se não achar
      setPosition({ bottom: 96, right: 24 });
      return;
    }

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calcula posição aproximada (perto do elemento, mas não em cima)
    const targetBottom = viewportHeight - rect.bottom - 20;
    const targetRight = viewportWidth - rect.right - 80;

    setPosition({ 
      bottom: Math.max(96, targetBottom), 
      right: Math.max(24, targetRight) 
    });

    // Efeito de Glow temporário no elemento
    el.classList.add('hubbot-target-glow');
    setTimeout(() => el.classList.remove('hubbot-target-glow'), 5000);
  }, []);

  // --- INTEGRAÇÃO COM GROQ API (LLAMA 3.1) ---
  const askHubBot = useCallback(async (prompt, targetId = null) => {
    if (isThinkingRef.current) return;
    
    isThinkingRef.current = true;
    setIsThinking(true);
    setFullMessage("");
    if (targetId) moveToElement(targetId);

    const systemPrompt = `Você é o HubBot, assistente pessoal do Abimael.

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

    const userContext = `Seção atual: ${activeTab}. Dê um comentário rápido sobre isso.`;

    console.log('[HubBot] Chamando Worker...');
    const PROXY_URL = 'https://hubbot-proxy.abimaelbalbino12.workers.dev';

    try {
      const bodyData = {
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
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
  }, [moveToElement, activeTab]);

  // --- EFEITO: BOOT INICIAL ---
  useEffect(() => {
    askHubBot("Diga: HubBot online!");
  }, [askHubBot]); // Adicionado askHubBot como dependência

  // --- LÓGICA DE CONTEXTO POR SEÇÃO ---
  const getSectionContext = useCallback((tab) => {
    switch(tab) {
      case 'Finanças':
        return {
          id: 'financas-mes-atual',
          prompt: `Analise minhas finanças: Saldo disponível R$${financeSummary?.available}, Receita R$${financeSummary?.income}. O que me diz sobre meu planejamento de casamento?`
        };
      case 'Controle de Sono': {
        const last3Slp = sleepData?.slice(0, 3) || [];
        const avgS = last3Slp.length ? (last3Slp.reduce((acc, c) => acc + c.hours, 0) / last3Slp.length).toFixed(1) : 0;
        return {
          id: 'sono-media',
          prompt: `Minha média de sono recente é ${avgS}h. Como isso afeta minha transição para tech?`
        };
      }
      case 'Academia (Treino)': {
        const diasTreino = {
          2: 'Upper A — Peito e Costas (Supino, Puxada, Remada)',
          4: 'Lower A — Quadríceps (Agachamento, Leg Press, Cadeira)',
          5: 'Upper B — Ombros e Braços (Desenvolvimento, Rosca, Tríceps)',
          0: 'Lower B — Glúteos e Posterior (Stiff, Leg Curl, Abdutora)'
        };
        const hoje = new Date().getDay();
        const treinoHoje = diasTreino[hoje] || 'Dia de descanso';
        const todayStatus = gymAttendance?.[hoje] || 'não registrado';
        const done = gymAttendance ? Object.values(gymAttendance).filter(v => v === 'treinado').length : 0;

        return {
          id: 'academia-semana',
          prompt: `Dia atual: ${['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][hoje]}
Treino de hoje: ${treinoHoje}
Treinos feitos essa semana: ${done}/4
Status hoje: ${todayStatus}`
        };
      }
      case 'Faculdade ADM':
        return {
          id: 'faculdade-progresso',
          prompt: `Completei ${visaoGeralMetrics?.progressoMes}% das AS da faculdade este mês. Dê um puxão de orelha ou parabéns.`
        };
      case 'Competências':
        return {
          id: 'competencias-streak',
          prompt: `Estou com ${englishStreak?.count} dias de streak no inglês. Foco C1/TOEFL. Dê uma dica rápida.`
        };
      case 'Nutrição & Base':
        return {
          id: 'nutricao-hoje',
          prompt: `Tracker de hoje: Água(${nutritionTracker?.water}), Creatina(${nutritionTracker?.creatine}), Refeições(${nutritionTracker?.meals}). Analise minha aderência biológica.`
        };
      default:
        return null;
    }
  }, [financeSummary, sleepData, visaoGeralMetrics, englishStreak, nutritionTracker, gymAttendance]);

  // --- EFEITO: REAÇÃO À TROCA DE TAB ---
  useEffect(() => {
    if (!activeTab) return;
    if (prevTabRef.current === activeTab) return;
    prevTabRef.current = activeTab;
    
    const ctx = getSectionContext(activeTab);
    if (!ctx) return;
    
    setTimeout(() => {
      if (ctx.id) moveToElement(ctx.id);
      askHubBot(ctx.prompt);
    }, 800);
  }, [activeTab, getSectionContext, askHubBot, moveToElement]);

  // --- EFEITO: ROTAÇÃO DE POSIÇÃO (CIGANO MODE) ---
  useEffect(() => {
    if (!isCiganoMode || isThinking || fullMessage) return;

    const interval = setInterval(() => {
      // Se não estivermos em uma aba específica com target, movemos aleatoriamente
      const currentCtx = getSectionContext(activeTab);
      if (!currentCtx) {
        const randomX = Math.random() * 40 + 20; // 20% a 60% da tela
        const randomY = Math.random() * 30 + 10; // 10% a 40% de altura
        setPosition({ bottom: Math.floor(randomY * 10), right: Math.floor(randomX * 10) });
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isCiganoMode, isThinking, fullMessage, activeTab, getSectionContext]);

  // --- HANDLERS ---
  const handleMascotClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }

    const randomPrompts = [
      "Dê uma análise geral do meu dia como assistente de performance.",
      "Faça uma piada ácida sobre eu estar procrastinando.",
      "O que um futuro Doutor em Tech deveria estar fazendo agora?",
      "Como economizar mais para o meu casamento hoje?",
      "Motive meu treino como se fosse o Arnold Schwarzenegger irônico."
    ];
    const p = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    askHubBot(p);
  };

  const getEyeColor = () => {
    if (isThinking) return '#facc15'; // Amarelo pensando
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
    if (isThinking) return 'mascote-float animate-pulse';
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
              <p className="leading-normal">{displayText}</p>
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
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="40" y1="15" x2="40" y2="25" stroke="#64748b" strokeWidth="2" />
              <circle cx="40" cy="12" r="3" fill={getEyeColor()} className="mascote-antenna" />
              {/* Corpo */}
              <rect x="15" y="45" width="8" height="15" rx="4" fill="currentColor" className="text-hub-border" />
              <rect x="57" y="45" width="8" height="15" rx="4" fill="currentColor" className="text-hub-border" />
              <rect x="25" y="40" width="30" height="25" rx="8" fill="currentColor" className="text-hub-surface" stroke={state === STATES.CELEBRATING ? '#eab308' : 'var(--hub-border)'} strokeWidth="2" />
              {/* Cabeça */}
              <rect x="28" y="25" width="24" height="18" rx="6" fill="currentColor" className="text-hub-inner" stroke={state === STATES.CELEBRATING ? '#eab308' : 'var(--hub-border)'} strokeWidth="1" />
              {/* Olhos (LEDs) */}
              <circle cx="35" cy="34" r="2.5" fill={getEyeColor()} className={`transition-colors duration-500 ${isThinking ? 'animate-pulse' : ''}`} />
              <circle cx="45" cy="34" r="2.5" fill={getEyeColor()} className={`transition-colors duration-500 ${isThinking ? 'animate-pulse' : ''}`} />
              {/* Boca */}
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