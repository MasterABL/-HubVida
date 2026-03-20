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
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
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
  gymAttendance,
  sleepData,
  workoutProfile,
  haircareStatus,
  haircareMessage,
  isWashDay,
  isHaircareDoneToday,
  toggleHaircareDone,
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
      <div className="bg-gradient-to-r from-[#000000] to-[#0d0d0d] border border-yellow-500/20 rounded-xl p-4 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 overflow-hidden max-w-full">
        <div className="text-center md:text-left w-full md:w-auto">
          <h1 className="text-[clamp(18px,5.5vw,28px)] font-black italic tracking-wider text-yellow-500 uppercase flex items-center justify-center md:justify-start gap-2 break-words">
            <Zap className="w-5 h-5 shrink-0" /> Comando Central
          </h1>
          <p className="text-[clamp(9px,2.5vw,11px)] text-hub-muted mt-1.5 font-medium uppercase tracking-widest">
            Visão Estratégica e Controle de Performance
          </p>
        </div>
        {/* Cotações em Tempo Real */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-bold font-mono text-hub-content w-full md:w-auto">
          {[
            { label: 'USD', key: 'USD' },
            { label: 'EUR', key: 'EUR' },
            { label: 'GBP', key: 'GBP' },
          ].map(({ label, key }) => (
            <div key={key} className="bg-hub-inner px-2 py-1.5 rounded-lg border border-hub-border shadow-inner flex flex-col items-center">
              <span className="text-hub-faint text-[8px] uppercase tracking-widest mb-0.5">{label}</span>
              {cotacoesLoading ? (
                <span className="text-hub-faint text-xs animate-pulse">···</span>
              ) : cotacoesErro ? (
                <span className="text-rose-500 text-[8px]">Erro</span>
              ) : (
                <span className="text-emerald-500 text-[clamp(10px,3vw,12px)]">R${cotacoes[key]}</span>
              )}
            </div>
          ))}
          <button
            onClick={fetchCotacoes}
            title="Atualizar cotações"
            className="bg-hub-inner px-2 py-2 rounded-lg border border-hub-border text-hub-faint hover:text-yellow-500 hover:border-yellow-500/40 transition-all flex items-center justify-center"
          >
            <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${cotacoesLoading ? 'animate-spin' : ''}`} />
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
            <p className="text-[clamp(10px,3vw,12px)] text-hub-faint uppercase tracking-widest font-bold mb-1">
              Saldo Disponível
            </p>
            <p className="text-[clamp(28px,8vw,40px)] font-black text-hub-strong mb-6 leading-none">
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
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-yellow-500/50 transition-all flex flex-col h-72"
        >
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Próximas Tarefas
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-yellow-500 transition-colors" />
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
                    <IconComponent className="w-4 h-4 text-yellow-500 opacity-80" />
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
          onClick={() => {
            const el = document.getElementById('Faculdade ADM');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveTab('Faculdade ADM');
          }}
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
            <div className="w-full h-2 bg-hub-inner rounded-full overflow-hidden">
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
                  <button onClick={handleAddProva} className="bg-yellow-500 text-[#111111] rounded px-2 py-1 text-xs font-bold hover:bg-yellow-400">+</button>
                </div>
                {[...(provas || [])].sort((a, b) => {
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
                  <p className="text-[clamp(10px,3vw,12px)] text-hub-faint uppercase tracking-widest font-bold mb-2">Contagem Regressiva</p>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-[clamp(48px,12vw,64px)] font-black text-hub-strong leading-none">{proximaProva.dias}</span>
                    <span className="text-[clamp(16px,4vw,20px)] text-emerald-500 font-bold uppercase">Dias</span>
                  </div>
                  <p className="text-[clamp(10px,3vw,12px)] text-hub-faint mt-1">Data: {proximaProva.data}</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 h-32 text-center">
                <p className="text-hub-faint text-[clamp(10px,3vw,12px)]">Nenhuma prova cadastrada.</p>
                <p className="text-hub-faint text-[clamp(9px,2.5vw,10px)] mt-1">Clique em + para adicionar.</p>
              </div>
            )}
          </div>
        </div>

        {/* Widget 6: Progresso do Semestre */}
        <div
          onClick={() => {
            const el = document.getElementById('Faculdade ADM');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveTab('Faculdade ADM');
          }}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-indigo-500/50 transition-all flex flex-col justify-between items-center text-center h-72"
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4" /> Progresso Semestral
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-emerald-500 transition-colors" />
          </div>
          <div className="relative w-24 h-24 md:w-28 md:h-28 my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#1f222a" strokeWidth="12" />
              <circle
                cx="56" cy="56" r="48" fill="none" stroke="#eab308" strokeWidth="12"
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

        {/* Widget 7: Status Capilar (Haircare) */}
        <div
          onClick={() => setActiveTab('Haircare')}
          className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl cursor-pointer group hover:border-fuchsia-500/50 transition-all flex flex-col justify-between h-72 md:col-span-2 lg:col-span-3"
        >
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-fuchsia-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" /> Status Capilar Hoje
            </h2>
            <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-fuchsia-500 transition-colors" />
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center gap-6 justify-between bg-hub-inner p-6 rounded-xl border border-hub-border">
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-bold text-hub-muted uppercase tracking-widest mb-2">Cronograma do Dia</p>
              <h3 className={`text-3xl font-black mb-3 ${isWashDay ? 'text-fuchsia-500' : 'text-sky-500'}`}>
                {haircareStatus}
              </h3>
              <p className="text-sm font-medium text-hub-content leading-relaxed">
                {haircareMessage}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleHaircareDone();
              }}
              className={`shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 flex flex-col items-center justify-center transition-all ${isHaircareDoneToday
                ? 'bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-500 scale-105 shadow-[0_0_20px_rgba(217,70,239,0.2)]'
                : 'bg-hub-base border-hub-border text-hub-faint hover:border-fuchsia-500/50 hover:text-fuchsia-400'
                }`}
            >
              <CheckSquare className={`w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 ${isHaircareDoneToday ? 'hidden' : 'block'}`} />
              <CheckSquare className={`w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 ${isHaircareDoneToday ? 'block' : 'hidden'}`} />
              <span className="font-bold text-[10px] md:text-sm tracking-wide">
                {isHaircareDoneToday ? 'CONCLUÍDO' : 'MARCAR'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SECÃO DE GRÁFICOS (RECHARTS) */}
      <h2 className="text-sm font-black italic uppercase tracking-wider text-hub-strong mb-6 mt-12 flex items-center gap-2">
        <Activity className="w-5 h-5 text-yellow-500" /> Métricas Ph.D. <span className="text-[10px] text-hub-faint bg-hub-inner px-2 py-0.5 rounded-full border border-hub-border">BETA</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* GRÁFICO 1: Evolução de Peso (LineChart) */}
        <div className="bg-hub-surface border border-hub-border rounded-xl p-5 shadow-xl flex flex-col h-72">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold text-hub-faint uppercase tracking-widest">Evolução de Peso (kg)</h3>
          </div>
          <div className="flex-1 w-full relative">
            {/* Como não temos histórico real salvo no app ainda, vamos criar um mock trend que leva ao peso atual */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { date: 'Sem 1', peso: Math.max(0, (workoutProfile?.peso || 70) - 1.5) },
                { date: 'Sem 2', peso: Math.max(0, (workoutProfile?.peso || 70) - 0.8) },
                { date: 'Sem 3', peso: Math.max(0, (workoutProfile?.peso || 70) - 0.2) },
                { date: 'Atual', peso: workoutProfile?.peso || 70 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={30} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1f222a', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0f1115' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 2: Frequência Semanal (BarChart) */}
        <div className="bg-hub-surface border border-hub-border rounded-xl p-5 shadow-xl flex flex-col h-72">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-4 h-4 text-rose-500" />
            <h3 className="text-xs font-bold text-hub-faint uppercase tracking-widest">Frequência Academia</h3>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Dom', status: gymAttendance?.[0] === 'done' ? 1 : 0 },
                { name: 'Seg', status: gymAttendance?.[1] === 'done' ? 1 : 0 },
                { name: 'Ter', status: gymAttendance?.[2] === 'done' ? 1 : 0 },
                { name: 'Qua', status: gymAttendance?.[3] === 'done' ? 1 : 0 },
                { name: 'Qui', status: gymAttendance?.[4] === 'done' ? 1 : 0 },
                { name: 'Sex', status: gymAttendance?.[5] === 'done' ? 1 : 0 },
                { name: 'Sáb', status: gymAttendance?.[6] === 'done' ? 1 : 0 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 1]} />
                <RechartsTooltip
                  cursor={{ fill: '#1f222a' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-hub-base border border-hub-border px-3 py-2 rounded-lg shadow-lg">
                          <p className="text-xs font-bold text-hub-strong uppercase">{payload[0].payload.name}</p>
                          <p className={`text-[10px] font-black uppercase mt-1 ${payload[0].value ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {payload[0].value ? 'TÁ PAGO ✓' : 'DESCANSO/FALTA'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="status" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 3: Horas de Sono (AreaChart) */}
        <div className="bg-hub-surface border border-hub-border rounded-xl p-5 shadow-xl flex flex-col h-72">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold text-hub-faint uppercase tracking-widest">Padrão de Sono (h)</h3>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'Dom', horas: parseFloat(sleepData?.[0]?.hours || 0) },
                { name: 'Seg', horas: parseFloat(sleepData?.[1]?.hours || 0) },
                { name: 'Ter', horas: parseFloat(sleepData?.[2]?.hours || 0) },
                { name: 'Qua', horas: parseFloat(sleepData?.[3]?.hours || 0) },
                { name: 'Qui', horas: parseFloat(sleepData?.[4]?.hours || 0) },
                { name: 'Sex', horas: parseFloat(sleepData?.[5]?.hours || 0) },
                { name: 'Sáb', horas: parseFloat(sleepData?.[6]?.hours || 0) },
              ]}>
                <defs>
                  <linearGradient id="colorHoras" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={20} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1f222a', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="horas" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHoras)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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
