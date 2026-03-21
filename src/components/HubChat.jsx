import React, { useState, useEffect, useRef } from 'react';
import { HUBBOT_PROXY_URL } from '../config/hubbot';

export const HubChat = ({ 
  financeSummary, 
  sleepData, 
  gymAttendance, 
  englishStreak, 
  nutritionTracker, 
  visaoGeralMetrics 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const PROXY_URL = HUBBOT_PROXY_URL;

  const chatSystemPrompt = `Você é o HubBot, assistente pessoal inteligente do Abimael.

PERFIL COMPLETO:
- Abimael, 20 anos, Jundiaí-SP
- Jovem aprendiz (área administrativa, empresa de produção)
- Faculdade EAD Administração — Cruzeiro do Sul (9 disciplinas)
- Treino Upper/Lower 4x/semana — Terça=Upper A, Quinta=Lower A, Sexta=Upper B, Domingo=Lower B
- Ectomorfo 52kg/1.67m, foco hipertrofia, usa creatina
- Inglês C1 em desenvolvimento (Escola Argos)
- Interesses: tecnologia/IA, finanças pessoais, fitness, séries, leitura

DADOS ATUAIS DO APP:
${JSON.stringify({
  financas: financeSummary,
  sono: sleepData?.slice(0,7),
  treinos: gymAttendance,
  ingles: englishStreak,
  nutricao: nutritionTracker,
  faculdade: visaoGeralMetrics
}, null, 2)}

CAPACIDADES:
- Analise padrões nos dados fornecidos
- Dê recomendações específicas e acionáveis
- Responda perguntas sobre qualquer aspecto da vida do Abimael
- Seja direto, analítico, sem enrolação
- Use dados reais nas respostas — nunca invente números
- Máximo 4 frases por resposta, a menos que uma análise detalhada seja pedida`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome = "Olá Abimael! Já analisei seus dados de hoje. Suas finanças estão sob controle e seu treino de hoje está pendente. O que gostaria de focar agora?";
      setMessages([{ role: 'assistant', content: welcome, timestamp: new Date() }]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const bodyData = {
        model: 'llama-3.1-8b-instant',
        max_tokens: 500,
        system: chatSystemPrompt,
        messages: [...messages, userMsg].map(m => ({
          role: m.role,
          content: m.content
        }))
      };

      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      const aiContent = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: aiContent, timestamp: new Date() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Houve um erro na conexão neural, chefe. Tente novamente.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão Flutuante (Bottom Left) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-6 z-50 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 pointer-events-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold">1</span>
      </button>

      {/* Painel de Chat */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-hub-surface border-l border-hub-border z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-hub-border flex items-center justify-between bg-hub-inner">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">HB</div>
            <div>
              <h3 className="text-sm font-bold text-hub-strong">HubBot Intelligence</h3>
              <div className="flex items-center gap-1.5 transition-all">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-hub-faint font-semibold uppercase tracking-wider">Online</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-hub-faint hover:text-hub-strong p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-hub-inner text-hub-content border border-hub-border rounded-tl-none'
              }`}>
                {m.content}
                <div className={`text-[9px] mt-1 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-hub-inner border border-hub-border p-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sugestões */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
          {["Como estão minhas finanças?", "Qual treino hoje?", "Resumo do dia"].map((q, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-3 py-1.5 bg-hub-inner border border-hub-border rounded-full text-[10px] text-hub-muted hover:bg-hub-hover hover:text-hub-strong transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-hub-border bg-hub-inner">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte qualquer coisa..."
              className="flex-1 bg-hub-surface border border-hub-border rounded-xl px-4 py-2 text-sm text-hub-strong focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 text-white p-2 rounded-xl disabled:opacity-50 hover:bg-indigo-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
