import React, { useState, useEffect } from 'react';
import {
  Zap,
  Activity,
  ExternalLink,
  Wallet,
  Calendar,
  CheckSquare,
  Clock,
  PieChart,
  AlertTriangle,
  Sun, Bus, Briefcase, BookOpen, FileText, Coffee, Target, Moon, Dumbbell, GraduationCap, Home, MapPin,
  Plus,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { RadarChart } from './RadarChart';

const iconMap = {
  Sun, Bus, Briefcase, BookOpen, FileText, Coffee, Target, Moon, Dumbbell, GraduationCap, Home, MapPin
};

// Formata data dd/mm para objeto Date (ano corrente)
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [day, month] = dateStr.split('/').map(Number);
  if (!day || !month) return null;
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day);
};

const getDaysUntil = (dateStr) => {
  const target = parseDate(dateStr);
  if (!target) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) {
    target.setFullYear(target.getFullYear() + 1);
    diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  }
  
  return diff;
};

export const VisaoGeral = ({
  setActiveTab,
  radarData,
  englishLevel,
  activeMonth,
  financeSummary,
  routinesData,
  activeRoutine,
  visaoGeralMetrics,
  avisosPortal,
  setAvisosPortal,
  provas,
  setProvas,
}) => {
  // Estado de cotações
  const [cotacoes, setCotacoes] = useState({ USD: null, EUR: null, GBP: null });
  const [cotacoesLoading, setCotacoesLoading] = useState(true);
  const [cotacoesErro, setCotacoesErro] = useState(false);

  // Estado do formulário de provas
  const [novaProva, setNovaProva] = useState({ titulo: '', data: '', disciplina: '' });
  const [showProvasForm, setShowProvasForm] = useState(false);

  // Busca cotações na API pública AwesomeAPI
  const fetchCotacoes = async () => {
    setCotacoesLoading(true);
    setCotacoesErro(false);
    try {
      const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
      const data = await res.json();
      setCotacoes({
        USD: parseFloat(data.USDBRL.bid).toFixed(2),
        EUR: parseFloat(data.EURBRL.bid).toFixed(2),
        GBP: parseFloat(data.GBPBRL.bid).toFixed(2),
      });
    } catch {
      setCotacoesErro(true);
    } finally {
      setCotacoesLoading(false);
    }
  };

  useEffect(() => {
    fetchCotacoes();
  }, []);

  // Calcula a próxima prova (primeira com dias >= 0)
  const proximaProva = [...(provas || [])]
    .map(p => ({ ...p, dias: getDaysUntil(p.data) }))
    .filter(p => p.dias !== null && p.dias >= 0)
    .sort((a, b) => a.dias - b.dias)[0];

  const handleAddProva = () => {
    if (!novaProva.titulo || !novaProva.data) return;
    setProvas([...(provas || []), { id: Date.now(), ...novaProva }]);
    setNovaProva({ titulo: '', data: '', disciplina: '' });
  };

  const handleDeleteProva = (id) => setProvas((provas || []).filter(p => p.id !== id));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-[#12141a] to-[#1a1d24] border border-yellow-500/20 rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-yellow-500 uppercase flex items-center gap-3">
            <Zap className="w-6 h-6" /> Comando Central
          </h1>
          <p className="text-sm text-hub-muted mt-2 font-medium">
            Visão Estratégica e Controle de Performance Pessoal
          </p>
        </div>
        {/* Cotações em Tempo Real */}
        <div className="flex gap-3 text-xs font-bold font-mono text-hub-content w-full md:w-auto justify-center md:justify-end flex-wrap">
          {[
            { label: 'USD', key: 'USD' },
            { label: 'EUR', key: 'EUR' },
            { label: 'GBP', key: 'GBP' },
          ].map(({ label, key }) => (
            <div key={key} className="bg-hub-inner px-4 py-2 rounded-lg border border-hub-border shadow-inner flex flex-col items-center min-w-[72px]">
              <span className="text-hub-faint text-[9px] uppercase tracking-widest mb-1">{label}</span>
              {cotacoesLoading ? (
                <span className="text-hub-faint text-sm animate-pulse">···</span>
              ) : cotacoesErro ? (
                <span className="text-rose-500 text-[10px]">Erro</span>
              ) : (
                <span className="text-emerald-500 text-sm">R$ {cotacoes[key]}</span>
              )}
            </div>
          ))}
          <button
            onClick={fetchCotacoes}
            title="Atualizar cotações"
            className="bg-hub-inner px-3 py-2 rounded-lg border border-hub-border text-hub-faint hover:text-yellow-500 hover:border-yellow-500/40 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${cotacoesLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Grade de 6 Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget 1: Radar de Progresso */}
        <div
          onClick={() => setActiveTab('Competências')}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl flex flex-col items-center justify-between cursor-pointer group hover:border-yellow-500/50 transition-all h-72"
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" /> Radar de Progresso
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-yellow-500 transition-colors" />
          </div>
          <div className="scale-75 origin-center pointer-events-none -my-8">
            <RadarChart data={radarData} />
          </div>
          <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest w-full text-center">
            Foco C1: {englishLevel}%
          </p>
        </div>

        {/* Widget 2: Resumo Financeiro */}
        <div
          onClick={() => setActiveTab('Finanças')}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-emerald-500/50 transition-all flex flex-col justify-between h-72"
        >
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Caixa Mensal ({activeMonth})
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-emerald-500 transition-colors" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[10px] text-hub-faint uppercase tracking-widest font-bold mb-1">
              Saldo Disponível
            </p>
            <p className="text-4xl font-black text-hub-strong mb-6">
              R${' '}
              {financeSummary.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-hub-border pt-4">
              <div>
                <p className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold mb-1">Receitas</p>
                <p className="text-sm font-bold text-hub-content">
                  R$ {financeSummary.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-rose-500 uppercase tracking-widest font-bold mb-1">Despesas</p>
                <p className="text-sm font-bold text-hub-content">
                  R$ {financeSummary.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Widget 3: Próximas Tarefas da Rotina */}
        <div
          onClick={() => setActiveTab('Rotina Diária')}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-indigo-500/50 transition-all flex flex-col h-72"
        >
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Próximas Tarefas
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-3">
            {routinesData[activeRoutine].timeline
              .slice(0, 3)
              .map((item, idx) => {
                const IconComponent = iconMap[item.icon] || React.Fragment;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-hub-inner p-3 rounded-lg border border-hub-border group-hover:border-hub-border-hover transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-indigo-400 opacity-80" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-hub-strong truncate">{item.title}</p>
                    </div>
                    <span className="text-[10px] font-mono text-hub-faint bg-hub-hover px-2 py-1 rounded">
                      {item.time}
                    </span>
                  </div>
                );
              })}
            {routinesData[activeRoutine].timeline.length > 3 && (
              <p className="text-[10px] text-hub-faint text-center font-bold uppercase tracking-widest mt-2">
                + {routinesData[activeRoutine].timeline.length - 3} tarefas no dia
              </p>
            )}
          </div>
        </div>

        {/* Widget 4: Status do Mês (AS) */}
        <div
          onClick={() => setActiveTab('Faculdade (ADM)')}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-yellow-500/50 transition-all flex flex-col justify-between h-72"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-4 h-4" /> Status do Mês
              </h2>
              <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-yellow-500 transition-colors" />
            </div>
            <p className="text-sm text-hub-muted font-medium leading-tight">
              Unidades de Sistematização (AS) resolvidas neste mês.
            </p>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xl font-black text-hub-strong mb-2">
              <span>{visaoGeralMetrics.progressoMes}%</span>
              <span className="text-hub-faint text-sm font-bold pt-1">Meta: 100%</span>
            </div>
            <div className="w-full h-2 bg-[#1f222a] rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all duration-1000"
                style={{ width: `${visaoGeralMetrics.progressoMes}%` }}
              />
            </div>
          </div>
        </div>

        {/* Widget 5: Próxima Prova (Dinâmico) */}
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden h-72">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Clock className="w-32 h-32" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" /> Próxima Prova
              </h2>
              <button
                onClick={() => setShowProvasForm(v => !v)}
                className="text-hub-faint hover:text-yellow-500 transition-colors"
                title="Gerenciar provas"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {showProvasForm ? (
              <div className="space-y-2 overflow-y-auto max-h-44">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Prova/Atividade"
                    value={novaProva.titulo}
                    onChange={e => setNovaProva({ ...novaProva, titulo: e.target.value })}
                    className="flex-1 bg-hub-base border border-hub-border rounded px-2 py-1 text-xs text-hub-strong focus:outline-none focus:border-yellow-500"
                  />
                  <input
                    type="text"
                    placeholder="dd/mm"
                    value={novaProva.data}
                    onChange={e => setNovaProva({ ...novaProva, data: e.target.value })}
                    className="w-20 bg-hub-base border border-hub-border rounded px-2 py-1 text-xs text-hub-strong focus:outline-none focus:border-yellow-500"
                  />
                  <button onClick={handleAddProva} className="bg-yellow-500 text-slate-900 rounded px-2 py-1 text-xs font-bold hover:bg-yellow-400">+</button>
                </div>
                {[...(provas || [])].sort((a,b) => {
                  const dA = parseDate(a.data);
                  const dB = parseDate(b.data);
                  if (!dA && !dB) return 0;
                  if (!dA) return 1;
                  if (!dB) return -1;
                  return dA - dB;
                }).map(p => {
                  const dias = getDaysUntil(p.data);
                  return (
                    <div key={p.id} className="flex items-center justify-between bg-hub-base rounded px-2 py-1.5 border border-hub-border">
                      <div>
                        <p className="text-xs font-bold text-hub-strong">{p.titulo}</p>
                        <p className="text-[10px] text-hub-faint">{p.data} — {dias !== null ? (dias < 0 ? 'Passou' : `${dias}d`) : '—'}</p>
                      </div>
                      <button onClick={() => handleDeleteProva(p.id)} className="text-hub-faint hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : proximaProva ? (
              <>
                <p className="text-sm text-hub-muted font-medium">{proximaProva.titulo}</p>
                <div className="mt-4">
                  <p className="text-[10px] text-hub-faint uppercase tracking-widest font-bold mb-1">Contagem Regressiva</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-hub-strong">{proximaProva.dias}</span>
                    <span className="text-lg text-emerald-500 font-bold uppercase">Dias</span>
                  </div>
                  <p className="text-[10px] text-hub-faint mt-1">Data: {proximaProva.data}</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 h-32 text-center">
                <p className="text-hub-faint text-xs">Nenhuma prova cadastrada.</p>
                <p className="text-slate-700 text-[10px] mt-1">Clique em + para adicionar.</p>
              </div>
            )}
          </div>
        </div>

        {/* Widget 6: Progresso do Semestre */}
        <div
          onClick={() => setActiveTab('Faculdade (ADM)')}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-indigo-500/50 transition-all flex flex-col justify-between items-center text-center h-72"
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4" /> Progresso Semestral
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="relative w-28 h-28 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#1f222a" strokeWidth="12" />
              <circle
                cx="56" cy="56" r="48" fill="none" stroke="#818cf8" strokeWidth="12"
                strokeDasharray="301"
                strokeDashoffset={
                  301 - 301 * (visaoGeralMetrics.disciplinasAprovadas / visaoGeralMetrics.totalDisciplinas)
                }
                className="transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-hub-strong">{visaoGeralMetrics.disciplinasAprovadas}</span>
              <span className="text-[10px] text-hub-faint font-bold">/ {visaoGeralMetrics.totalDisciplinas}</span>
            </div>
          </div>
          <p className="text-[10px] text-hub-muted font-bold uppercase tracking-widest">
            Disciplinas Aprovadas
          </p>
        </div>
      </div>

      {/* Mural de Avisos */}
      <div className="bg-hub-surface border border-yellow-500/30 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-yellow-500/10 border-r border-yellow-500/20 p-6 md:w-48 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
          <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider">
            Avisos do Portal
          </h2>
        </div>
        <textarea
          value={avisosPortal}
          onChange={(e) => setAvisosPortal(e.target.value)}
          placeholder="Cole aqui os avisos importantes do portal Cruzeiro do Sul..."
          className="flex-1 bg-transparent p-6 text-sm text-hub-content resize-none focus:outline-none focus:bg-hub-hover min-h-[120px] transition-colors leading-relaxed"
        />
      </div>
    </div>
  );
};
