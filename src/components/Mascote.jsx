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

  // --- NOVO SISTEMA DE ETAPAS (StepTour) ---
  const [tourSteps, setTourSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);

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
        const diasTreino = {
          2: 'Upper A — Peito e Costas',
          4: 'Lower A — Quadríceps',
          5: 'Upper B — Ombros e Braços',
          0: 'Lower B — Glúteos e Posterior'
        };
        const hoje = new Date().getDay();
        const treinoHoje = diasTreino[hoje] || null;
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
      // tour não ativo — frase aleatória via AI
      const randomQuestions = [
        "Dê uma análise geral do meu dia como assistente de performance.",
        "Faça uma piada ácida sobre eu estar procrastinando.",
        "Dê uma dica de produtividade focada em ADM.",
        "Motive meu treino como se fosse um coach sério.",
        "O que um futuro profissional de tech deveria estar fazendo agora?"
      ];
      const p = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
      askHubBot(p);
    }
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
              <div className="flex flex-col gap-2">
                <p className="leading-normal">{displayText}</p>
                {isTourActive && tourSteps.length > 1 && (
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-hub-border/50">
                    <div className="flex gap-1 justify-center">
                      {tourSteps.map((_, i) => (
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