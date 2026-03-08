import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Brain, 
  Wallet, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Trash2, 
  Plus,
  ChevronDown,
  PieChart,
  ExternalLink,
  User,
  Search,
  BookOpen,
  Calendar as CalendarIcon,
  Lightbulb,
  Sun,
  Bus,
  Briefcase,
  Coffee,
  Moon,
  Dumbbell,
  MapPin,
  Target,
  LayoutGrid, 
  Medal, 
  CalendarDays, 
  ChevronUp, 
  Zap, 
  List, 
  Users,
  Activity,
  Library,
  AlertTriangle,
  Clock,
  CheckSquare,
  NotebookText
} from 'lucide-react';

// --- CONFIGURAÇÕES INICIAIS E DADOS MOCKADOS ---

const INITIAL_HARD_SKILLS = [
  { id: 1, category: 'Gestão (ADM)', name: 'Gestão Ágil', level: 100, cert: 'Scrum.org' },
  { id: 2, category: 'Ferramentas Digitais', name: 'Excel Avançado', level: 50, cert: 'Udemy' },
  { id: 3, category: 'Pesquisa Científica', name: 'Metodologia', level: 50, cert: 'Universidade' },
];

const SOFT_SKILLS_DATA = {
  comunicacao: [
    { id: 'c1', text: 'Apresentar 1 seminário/reunião', checked: true },
    { id: 'c2', text: 'Escrever 1 abstract em Inglês', checked: true },
    { id: 'c3', text: 'Participar ativamente de debates', checked: true },
  ],
  organizacao: [
    { id: 'o1', text: 'Dashboard atualizado por 30 dias', checked: false },
    { id: 'o2', text: 'Lattes documentado sem atrasos', checked: false },
    { id: 'o3', text: 'Cronograma EAD cumprido no prazo', checked: false },
  ],
  lideranca: [
    { id: 'l1', text: 'Propor melhoria no [Trabalho Atual]', checked: false },
    { id: 'l2', text: 'Liderar trabalho em grupo EAD', checked: false },
    { id: 'l3', text: 'Contato com orientador do PIC', checked: false },
  ]
};

const INITIAL_FINANCES = [
  { id: 11, month: 'MARÇO', type: 'income', title: 'Adiantamento', date: '15/03', category: 'RECEITAS', amount: 600.00, status: 'paid' },
  { id: 12, month: 'MARÇO', type: 'expense', title: 'Equipamento', date: '15/03', category: 'FIXOS', amount: 300.00, status: 'pending' },
  { id: 13, month: 'MARÇO', type: 'expense', title: 'Cuidado Pessoal', date: '15/03', category: 'VARIÁVEIS', amount: 50.00, status: 'pending' },
  { id: 14, month: 'MARÇO', type: 'expense', title: 'Fatura [Banco A]', date: '20/03', category: 'CARTÕES', amount: 700.00, status: 'pending' },
  { id: 15, month: 'MARÇO', type: 'expense', title: 'Academia', date: '20/03', category: 'FIXOS', amount: 150.00, status: 'pending' },
  { id: 16, month: 'MARÇO', type: 'income', title: 'Salário Líquido', date: '31/03', category: 'RECEITAS', amount: 750.00, status: 'paid' },
  { id: 21, month: 'ABRIL', type: 'expense', title: 'Fatura [Banco B]', date: '07/04', category: 'CARTÕES', amount: 700.00, status: 'pending' },
  { id: 22, month: 'ABRIL', type: 'expense', title: 'Equipamento', date: '10/04', category: 'FIXOS', amount: 300.00, status: 'pending' },
  { id: 23, month: 'ABRIL', type: 'income', title: 'Adiantamento', date: '15/04', category: 'RECEITAS', amount: 600.00, status: 'paid' },
  { id: 24, month: 'ABRIL', type: 'expense', title: 'Fatura [Banco A]', date: '20/04', category: 'CARTÕES', amount: 500.00, status: 'pending' },
  { id: 25, month: 'ABRIL', type: 'expense', title: 'Academia', date: '20/04', category: 'FIXOS', amount: 150.00, status: 'pending' },
  { id: 26, month: 'ABRIL', type: 'expense', title: '[App Pagamento]', date: '20/04', category: 'EMPRÉSTIMOS', amount: 100.00, status: 'pending' },
  { id: 27, month: 'ABRIL', type: 'income', title: 'Salário Líquido', date: '30/04', category: 'RECEITAS', amount: 750.00, status: 'paid' },
  { id: 31, month: 'MAIO', type: 'expense', title: 'Fatura [Banco B]', date: '07/05', category: 'CARTÕES', amount: 650.00, status: 'pending' },
  { id: 32, month: 'MAIO', type: 'expense', title: 'Equipamento', date: '10/05', category: 'FIXOS', amount: 300.00, status: 'pending' },
  { id: 33, month: 'MAIO', type: 'income', title: 'Adiantamento', date: '15/05', category: 'RECEITAS', amount: 600.00, status: 'paid' },
  { id: 34, month: 'MAIO', type: 'expense', title: 'Fatura [Banco A]', date: '20/05', category: 'CARTÕES', amount: 450.00, status: 'pending' },
  { id: 35, month: 'MAIO', type: 'expense', title: 'Academia', date: '20/05', category: 'FIXOS', amount: 150.00, status: 'pending' },
  { id: 36, month: 'MAIO', type: 'expense', title: '[App Pagamento]', date: '20/05', category: 'EMPRÉSTIMOS', amount: 100.00, status: 'pending' },
  { id: 37, month: 'MAIO', type: 'income', title: 'Salário Líquido', date: '31/05', category: 'RECEITAS', amount: 750.00, status: 'paid' },
  { id: 41, month: 'JUNHO', type: 'expense', title: 'Fatura [Banco B]', date: '07/06', category: 'CARTÕES', amount: 350.00, status: 'pending' },
  { id: 42, month: 'JUNHO', type: 'expense', title: 'Equipamento', date: '10/06', category: 'FIXOS', amount: 300.00, status: 'pending' },
  { id: 43, month: 'JUNHO', type: 'income', title: 'Adiantamento', date: '15/06', category: 'RECEITAS', amount: 600.00, status: 'paid' },
  { id: 44, month: 'JUNHO', type: 'expense', title: 'Fatura [Banco A]', date: '20/06', category: 'CARTÕES', amount: 300.00, status: 'pending' },
  { id: 45, month: 'JUNHO', type: 'expense', title: 'Academia', date: '20/06', category: 'FIXOS', amount: 150.00, status: 'pending' },
  { id: 46, month: 'JUNHO', type: 'expense', title: '[App Pagamento]', date: '20/06', category: 'EMPRÉSTIMOS', amount: 100.00, status: 'pending' },
  { id: 47, month: 'JUNHO', type: 'income', title: 'Salário Líquido', date: '30/06', category: 'RECEITAS', amount: 750.00, status: 'paid' },
];

const MONTHS = ['MARÇO', 'ABRIL', 'MAIO', 'JUNHO'];

const INITIAL_PRODUCTIONS = [];
const INITIAL_IDEAS = [];

const ROUTINE_DATA = {
  'Seg/Qua': {
    meta: 'Foco total nos blocos de estudo e trabalho.',
    timeline: [
      { time: '06:15', title: 'Despertar e Oração', type: 'purple', icon: Sun, checked: false },
      { time: '07:00', title: 'Trajeto Ida (Podcast Inglês)', type: 'yellow', icon: Bus, checked: false },
      { time: '08:00', title: 'Trabalho ([Cargo Atual])', type: 'blue', icon: Briefcase, checked: false },
      { time: '15:20', title: 'Retorno: Bloco de Leitura Científica', type: 'green', icon: BookOpen, checked: false },
      { time: '17:50', title: 'Curso de Idiomas', type: 'blue', icon: FileText, checked: false },
      { time: '19:30', title: 'Retorno Final / Jantar', type: 'gray', icon: Coffee, checked: false },
      { time: '21:00', title: 'Revisão Rápida (30min)', type: 'teal', icon: Target, checked: false },
      { time: '23:00', title: 'Descompressão e Bíblia', type: 'purple', icon: Moon, checked: false },
    ]
  },
  'Ter/Qui': {
    meta: 'Foco total nos blocos de estudo e trabalho.',
    timeline: [
      { time: '06:15', title: 'Despertar e Oração', type: 'purple', icon: Sun, checked: false },
      { time: '07:00', title: 'Trajeto Ida (Audiobook ADM)', type: 'yellow', icon: Bus, checked: false },
      { time: '08:00', title: 'Trabalho ([Cargo Atual])', type: 'blue', icon: Briefcase, checked: false },
      { time: '15:20', title: 'Retorno: Estudo EAD', type: 'green', icon: BookOpen, checked: false },
      { time: '18:00', title: 'Academia (Foco e Peso)', type: 'red', icon: Dumbbell, checked: false },
      { time: '20:30', title: 'Chegada / Jantar Leve', type: 'gray', icon: Coffee, checked: false },
      { time: '21:30', title: 'Organização de Lattes', type: 'teal', icon: Target, checked: false },
      { time: '23:00', title: 'Descompressão e Bíblia', type: 'purple', icon: Moon, checked: false },
    ]
  },
  'Sexta': {
    meta: 'Foco total nos blocos de estudo e trabalho.',
    timeline: [
      { time: '06:15', title: 'Despertar e Oração', type: 'purple', icon: Sun, checked: false },
      { time: '08:00', title: 'Capacitação Profissional', type: 'blue', icon: GraduationCap, checked: false },
      { time: '12:00', title: 'Trajeto Curso → Academia (1h)', type: 'yellow', icon: Bus, checked: false },
      { time: '13:00', title: 'Academia (Treino Focado)', type: 'red', icon: Dumbbell, checked: false },
      { time: '14:30', title: 'Trajeto Academia → Local de Estudo (50m)', type: 'yellow', icon: Bus, checked: false },
      { time: '15:20', title: 'Biblioteca/Local de Estudo (3.5h)', type: 'green', icon: BookOpen, checked: false },
      { time: '19:00', title: 'Retorno / Lazer Livre', type: 'gray', icon: Coffee, checked: false },
      { time: '23:00', title: 'Higiene do Sono', type: 'purple', icon: Moon, checked: false },
    ]
  },
  'Sabado': {
    meta: 'Manhã para a casa, tarde para o futuro Doutor.',
    timeline: [
      { time: '08:30', title: 'Acordar sem alarme / Oração', type: 'purple', icon: Sun, checked: false },
      { time: '09:30', title: 'Organização da Casa', type: 'gray', icon: Home, checked: false },
      { time: '11:00', title: 'Estudo ADM / Revisão Semanal', type: 'green', icon: BookOpen, checked: false },
      { time: '13:00', title: 'Almoço e Descanso', type: 'gray', icon: Coffee, checked: false },
      { time: '15:00', title: 'Produção Acadêmica / Lattes', type: 'teal', icon: Target, checked: false },
      { time: '18:00', title: 'Tempo Livre / Social', type: 'gray', icon: MapPin, checked: false },
      { time: '23:00', title: 'Protocolo de Sono', type: 'purple', icon: Moon, checked: false },
    ]
  },
  'Domingo': {
    meta: 'Treino intenso para liberar endorfina.',
    timeline: [
      { time: '08:30', title: 'Oração / Espiritualidade', type: 'purple', icon: Sun, checked: false },
      { time: '10:00', title: 'Academia (Treino Intenso)', type: 'red', icon: Dumbbell, checked: false },
      { time: '12:30', title: 'Almoço em Família', type: 'gray', icon: Coffee, checked: false },
      { time: '14:00', title: 'DESCANSO TOTAL (Off-line)', type: 'gray', icon: Moon, checked: false },
      { time: '19:00', title: 'Planejamento da Semana', type: 'teal', icon: Target, checked: false },
      { time: '22:30', title: 'Preparação para Segunda', type: 'purple', icon: Moon, checked: false },
    ]
  }
};

const INITIAL_FACULDADE = [
  { id: 1, name: 'GESTÃO DE MARKETING', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 2, name: 'LÍNGUA BRASILEIRA DE SINAIS', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 3, name: 'ORGANIZAÇÃO, SISTEMAS E MÉTODOS', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 4, name: 'PROBABILIDADE E ESTATÍSTICA', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 5, name: 'MODELOS INOVADORES EM NEGÓCIOS', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 6, name: 'PROJETO MULTIDISCIPLINAR EM ADMINISTRAÇÃO II', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 7, name: 'PLANO DE ACOMPANHAMENTO DE CARREIRA EM ADMINISTRAÇÃO II', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 8, name: 'AVALIAÇÃO INTEGRADA DE COMPETÊNCIAS EM ADMINISTRAÇÃO II', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
  { id: 9, name: 'ATIVIDADES DE EXTENSÃO', checks: { as1: false, as2: false, as3: false, as4: false }, notas: { as: '', a1: '' }, notes: '' },
];

// --- HOOK DE PERSISTÊNCIA (LocalStorage Global) ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Erro ao ler do localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("Erro ao salvar no localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

// --- COMPONENTES AUXILIARES ---
const RadarChart = ({ data }) => {
  const size = 260;
  const center = size / 2;
  const radius = (size / 2) - 30;
  const levels = 5;
  const axes = [
    { key: 'gestao', label: 'GESTÃO (ADM)' },
    { key: 'ingles', label: 'INGLÊS' },
    { key: 'pesquisa', label: 'PESQUISA CIENTÍFICA' },
    { key: 'ferramentas', label: 'FERRAMENTAS DIGITAIS' },
    { key: 'comunicacao', label: 'COMUNICAÇÃO' }
  ];

  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const webLines = Array.from({ length: levels }).map((_, levelIndex) => {
    const levelRadius = (radius / levels) * (levelIndex + 1);
    const points = axes.map((_, i) => {
      const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
      return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
    }).join(' ');
    return <polygon key={levelIndex} points={points} fill="none" stroke="#2d333b" strokeWidth="1" />;
  });

  const axisLines = axes.map((_, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    return (
      <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="#2d333b" strokeWidth="1" />
    );
  });

  const dataPoints = axes.map((axis, i) => getPoint(data[axis.key] || 0, i)).join(' ');

  const labels = axes.map((axis, i) => {
    const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const labelRadius = radius + 20;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    return (
      <text key={i} x={x} y={y} fill="#9ca3af" fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
        {axis.label}
      </text>
    );
  });

  return (
    <svg width={size} height={size} className="mx-auto block">
      {webLines}
      {axisLines}
      <polygon points={dataPoints} fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2" />
      {axes.map((axis, i) => (
        <circle key={`dot-${i}`} cx={getPoint(data[axis.key], i).split(',')[0]} cy={getPoint(data[axis.key], i).split(',')[1]} r="4" fill="#eab308" />
      ))}
      {labels}
    </svg>
  );
};


// --- COMPONENTE PRINCIPAL APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Visão Geral');
  
  // Estados Persistentes - Global
  const [hardSkills, setHardSkills] = useLocalStorage('hubvida_hardSkills', INITIAL_HARD_SKILLS);
  const [englishLevel, setEnglishLevel] = useLocalStorage('hubvida_englishLevel', 100);
  const [softSkills, setSoftSkills] = useLocalStorage('hubvida_softSkills', SOFT_SKILLS_DATA);
  const [finances, setFinances] = useLocalStorage('hubvida_finances', INITIAL_FINANCES);
  const [productions, setProductions] = useLocalStorage('hubvida_productions', INITIAL_PRODUCTIONS);
  const [ideas, setIdeas] = useLocalStorage('hubvida_ideas', INITIAL_IDEAS);
  const [routinesData, setRoutinesData] = useLocalStorage('hubvida_routinesData', ROUTINE_DATA);
  const [crData, setCrData] = useLocalStorage('hubvida_crData', []);
  
  // Novos Estados Persistentes - Faculdade & Avisos
  const [faculdadeData, setFaculdadeData] = useLocalStorage('hubvida_faculdade', INITIAL_FACULDADE);
  const [avisosPortal, setAvisosPortal] = useLocalStorage('hubvida_avisos', 'Fique atento aos prazos de submissão no portal da [Sua Universidade].');

  // Estados Locais (UI Control)
  const [newSkill, setNewSkill] = useState({ category: 'Gestão (ADM)', name: '', level: 50, cert: '' });
  const [activeMonth, setActiveMonth] = useState('ABRIL');
  const [newTransaction, setNewTransaction] = useState({ title: '', amount: '', type: 'expense', date: '', category: 'FIXOS' });
  const [newProd, setNewProd] = useState({ title: '', type: 'Artigo', status: 'Ideia' });
  const [newIdea, setNewIdea] = useState('');
  const [activeRoutine, setActiveRoutine] = useState('Seg/Qua');
  const [newRoutineTask, setNewRoutineTask] = useState({ time: '', title: '' });
  const [activeRoadmapTab, setActiveRoadmapTab] = useState('Visão Geral');
  const [expandedYear, setExpandedYear] = useState('Ano 3');
  const [newCr, setNewCr] = useState({ disciplina: '', nota: '', creditos: '4' });
  
  const [expandedSubject, setExpandedSubject] = useState(null); // Controle sanfona Faculdade

  // Auto-Correção do LocalStorage para evitar conflito com as disciplinas antigas
  useEffect(() => {
    if (faculdadeData && faculdadeData[0] && faculdadeData[0].name === 'Teoria Geral da Administração') {
      setFaculdadeData(INITIAL_FACULDADE);
    }
  }, []);

  // --- LÓGICAS INTOCADAS (Competências, Produção, Roadmap) ---
  const calculateCategoryAvg = (category) => {
    const skills = hardSkills.filter(s => s.category === category);
    if (skills.length === 0) return 0;
    const sum = skills.reduce((acc, curr) => acc + Number(curr.level), 0);
    return sum / skills.length;
  };

  const calculateSoftSkillProgress = (category) => {
    const items = softSkills[category];
    const checkedCount = items.filter(item => item.checked).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  const radarData = useMemo(() => ({
    gestao: calculateCategoryAvg('Gestão (ADM)'),
    ingles: englishLevel,
    pesquisa: calculateCategoryAvg('Pesquisa Científica'),
    ferramentas: calculateCategoryAvg('Ferramentas Digitais'),
    comunicacao: calculateSoftSkillProgress('comunicacao')
  }), [hardSkills, englishLevel, softSkills]);

  const handleToggleSoftSkill = (category, id) => setSoftSkills(prev => ({ ...prev, [category]: prev[category].map(item => item.id === id ? { ...item, checked: !item.checked } : item) }));
  const handleAddHardSkill = () => { if (!newSkill.name) return; setHardSkills([...hardSkills, { ...newSkill, id: Date.now() }]); setNewSkill({ category: 'Gestão (ADM)', name: '', level: 50, cert: '' }); };
  const handleRemoveHardSkill = (id) => setHardSkills(hardSkills.filter(s => s.id !== id));
  const handleUpdateHardSkill = (id, field, value) => setHardSkills(hardSkills.map(s => s.id === id ? { ...s, [field]: value } : s));
  
  const handleAddProduction = () => { if (!newProd.title) return; setProductions([...productions, { id: Date.now(), ...newProd }]); setNewProd({ title: '', type: 'Artigo', status: 'Ideia' }); };
  const handleDeleteProduction = (id) => setProductions(productions.filter(p => p.id !== id));
  const handleAddIdea = () => { if (!newIdea) return; setIdeas([...ideas, { id: Date.now(), text: newIdea }]); setNewIdea(''); };
  
  const handleAddCr = () => { if (!newCr.disciplina || !newCr.nota) return; setCrData([...crData, { id: Date.now(), ...newCr }]); setNewCr({ disciplina: '', nota: '', creditos: '4' }); };
  const handleDeleteCr = (id) => setCrData(crData.filter(item => item.id !== id));

  // --- LÓGICA FINANÇAS (Regra de Abril Automatizada) ---
  const currentMonthFinances = useMemo(() => {
    let filtered = finances.filter(f => f.month === activeMonth);
    const monthIndex = MONTHS.indexOf(activeMonth);
    
    // Regra de Abril: Se o mês for >= Abril (índice 1+), injeta automaticamente o bônus se não existir
    if (monthIndex >= 1) {
      const hasBonus = filtered.some(f => f.title.includes('Bônus'));
      if (!hasBonus) {
        filtered = [...filtered, {
          id: `auto-bonus-${activeMonth}`,
          month: activeMonth,
          type: 'income',
          title: `Bônus (${monthIndex}/5)`,
          date: `30/0${monthIndex + 3}`,
          category: 'RECEITAS',
          amount: 345.00,
          status: 'paid'
        }];
      }
    }
    return filtered;
  }, [finances, activeMonth]);

  const financeSummary = useMemo(() => {
    let income = 0; let expense = 0; let paidIncome = 0; let paidExpense = 0; 
    currentMonthFinances.forEach(t => {
      if (t.type === 'income') { income += Number(t.amount); if (t.status === 'paid') paidIncome += Number(t.amount); } 
      else { expense += Number(t.amount); if (t.status === 'paid') paidExpense += Number(t.amount); }
    });
    const prevBalances = { 'MARÇO': 185.00, 'ABRIL': 338.53, 'MAIO': 296.37, 'JUNHO': 330.99 };
    const prevMonthBalance = prevBalances[activeMonth] || 0;
    const available = prevMonthBalance + paidIncome - paidExpense;
    return { income, expense, prevMonthBalance, available };
  }, [currentMonthFinances, activeMonth]);

  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.amount) return;
    setFinances([...finances, { id: Date.now(), month: activeMonth, type: newTransaction.type, title: newTransaction.title, amount: Number(newTransaction.amount), date: newTransaction.date || 'Hoje', category: newTransaction.category, status: 'pending' }]);
    setNewTransaction({ title: '', amount: '', type: 'expense', date: '', category: 'FIXOS' });
  };
  const handleToggleFinanceStatus = (id) => setFinances(finances.map(f => f.id === id ? { ...f, status: f.status === 'paid' ? 'pending' : 'paid' } : f));
  const handleDeleteFinance = (id) => setFinances(finances.filter(f => f.id !== id));

  // --- LÓGICA ROTINA (Atualizada para Check-to-Toggle) ---
  const handleAddRoutineTask = () => {
    if (!newRoutineTask.time || !newRoutineTask.title) return;
    setRoutinesData(prev => ({
      ...prev, [activeRoutine]: {
        ...prev[activeRoutine], 
        timeline: [...prev[activeRoutine].timeline, { time: newRoutineTask.time, title: newRoutineTask.title, type: 'gray', icon: Target, checked: false }].sort((a,b) => a.time.localeCompare(b.time))
      }
    }));
    setNewRoutineTask({ time: '', title: '' });
  };
  const handleRemoveRoutineTask = (index) => {
    setRoutinesData(prev => {
      const newTimeline = [...prev[activeRoutine].timeline]; newTimeline.splice(index, 1);
      return { ...prev, [activeRoutine]: { ...prev[activeRoutine], timeline: newTimeline } };
    });
  };
  const handleToggleRoutineTask = (index) => {
    setRoutinesData(prev => {
      const newTimeline = [...prev[activeRoutine].timeline]; 
      newTimeline[index].checked = !newTimeline[index].checked; // Alternar estado concluído
      return { ...prev, [activeRoutine]: { ...prev[activeRoutine], timeline: newTimeline } };
    });
  };

  // --- LÓGICA FACULDADE (Nova) ---
  const handleUpdateFaculdade = (id, field, subfield, value) => {
    setFaculdadeData(prev => prev.map(d => {
      if (d.id !== id) return d;
      if (subfield) return { ...d, [field]: { ...d[field], [subfield]: value } };
      return { ...d, [field]: value };
    }));
  };

  const calculateFinalGrade = (as, a1) => {
    if (!as || !a1) return null;
    return (Number(as) * 0.4 + Number(a1) * 0.6).toFixed(1);
  };

  // Cálculos dinâmicos para a Visão Geral
  const visaoGeralMetrics = useMemo(() => {
    let checkedAS = 0;
    let approvedSubjects = 0;
    const totalAS = faculdadeData.length * 4; // 9 materias * 4 AS

    faculdadeData.forEach(d => {
      if(d.checks.as1) checkedAS++;
      if(d.checks.as2) checkedAS++;
      if(d.checks.as3) checkedAS++;
      if(d.checks.as4) checkedAS++;
      
      const grade = calculateFinalGrade(d.notas.as, d.notas.a1);
      if (grade && Number(grade) >= 7) approvedSubjects++;
    });

    return {
      progressoMes: totalAS > 0 ? Math.round((checkedAS / totalAS) * 100) : 0,
      disciplinasAprovadas: approvedSubjects,
      totalDisciplinas: faculdadeData.length
    };
  }, [faculdadeData]);


  // --- RENDERIZAÇÃO DAS VIEWS ---

  const renderVisaoGeral = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Premium (Mente de Elite) */}
      <div className="bg-gradient-to-r from-[#12141a] to-[#1a1d24] border border-yellow-500/20 rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-yellow-500 uppercase flex items-center gap-3">
            <Zap className="w-6 h-6" /> Mente de Elite
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">Centro de Comando e Visão Estratégica Acadêmica</p>
        </div>
        <div className="flex gap-4 text-xs font-bold font-mono text-slate-300 w-full md:w-auto justify-center md:justify-end">
          <div className="bg-[#0f1115] px-4 py-2 rounded-lg border border-[#1f222a] shadow-inner flex flex-col items-center">
            <span className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">Dólar (USD)</span>
            <span className="text-emerald-500 text-sm">R$ 5,12</span>
          </div>
          <div className="bg-[#0f1115] px-4 py-2 rounded-lg border border-[#1f222a] shadow-inner flex flex-col items-center">
            <span className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">Euro (EUR)</span>
            <span className="text-emerald-500 text-sm">R$ 5,54</span>
          </div>
          <div className="bg-[#0f1115] px-4 py-2 rounded-lg border border-[#1f222a] shadow-inner flex flex-col items-center hidden sm:flex">
            <span className="text-slate-500 text-[9px] uppercase tracking-widest mb-1">Libra (GBP)</span>
            <span className="text-emerald-500 text-sm">R$ 6,45</span>
          </div>
        </div>
      </div>

      {/* Grade de 6 Widgets Unificada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Radar de Progresso */}
        <div onClick={() => setActiveTab('Competências')} className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl flex flex-col items-center justify-between cursor-pointer group hover:border-yellow-500/50 transition-all h-72">
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2"><Activity className="w-4 h-4" /> Radar de Progresso</h2>
            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-yellow-500 transition-colors" />
          </div>
          <div className="scale-75 origin-center pointer-events-none -my-8"><RadarChart data={radarData} /></div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest w-full text-center">Foco C1: {englishLevel}%</p>
        </div>

        {/* Widget 2: Resumo Financeiro */}
        <div onClick={() => setActiveTab('Finanças')} className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl cursor-pointer group hover:border-emerald-500/50 transition-all flex flex-col justify-between h-72">
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2"><Wallet className="w-4 h-4" /> Caixa Mensal ({activeMonth})</h2>
            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Saldo Disponível</p>
            <p className="text-4xl font-black text-white mb-6">R$ {financeSummary.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#1f222a] pt-4">
              <div><p className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold mb-1">Receitas</p><p className="text-sm font-bold text-slate-300">R$ {financeSummary.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
              <div className="text-right"><p className="text-[9px] text-rose-500 uppercase tracking-widest font-bold mb-1">Despesas</p><p className="text-sm font-bold text-slate-300">R$ {financeSummary.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
            </div>
          </div>
        </div>

        {/* Widget 3: Próximas Tarefas da Rotina */}
        <div onClick={() => setActiveTab('Rotina Diária')} className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl cursor-pointer group hover:border-indigo-500/50 transition-all flex flex-col h-72">
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2"><Calendar className="w-4 h-4" /> Próximas Tarefas</h2>
            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-3">
            {routinesData[activeRoutine].timeline.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-[#0f1115] p-3 rounded-lg border border-[#1f222a] group-hover:border-[#2d333b] transition-colors">
                <item.icon className="w-4 h-4 text-indigo-400 opacity-80" />
                <div className="flex-1 overflow-hidden"><p className="text-xs font-bold text-white truncate">{item.title}</p></div>
                <span className="text-[10px] font-mono text-slate-500 bg-[#1a1d24] px-2 py-1 rounded">{item.time}</span>
              </div>
            ))}
            {routinesData[activeRoutine].timeline.length > 3 && (
              <p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest mt-2">+ {routinesData[activeRoutine].timeline.length - 3} tarefas no dia</p>
            )}
          </div>
        </div>

        {/* Widget 4: Status do Mês (AS) */}
        <div onClick={() => setActiveTab('Faculdade (ADM)')} className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl cursor-pointer group hover:border-yellow-500/50 transition-all flex flex-col justify-between h-72">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2"><CheckSquare className="w-4 h-4" /> Status do Mês</h2>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-yellow-500 transition-colors" />
            </div>
            <p className="text-sm text-slate-400 font-medium leading-tight">Unidades de Sistematização (AS) resolvidas neste mês.</p>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xl font-black text-white mb-2">
              <span>{visaoGeralMetrics.progressoMes}%</span>
              <span className="text-slate-500 text-sm font-bold pt-1">Meta: 100%</span>
            </div>
            <div className="w-full h-2 bg-[#1f222a] rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full transition-all duration-1000" style={{ width: `${visaoGeralMetrics.progressoMes}%` }}></div>
            </div>
          </div>
        </div>

        {/* Widget 5: Próxima Prova (Contador) */}
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden h-72">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Clock className="w-32 h-32" /></div>
          <div>
            <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-4"><Clock className="w-4 h-4" /> Próxima Prova</h2>
            <p className="text-sm text-slate-400 font-medium">Semana de Provas A1</p>
          </div>
          <div className="mt-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Contagem Regressiva</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">14</span>
              <span className="text-lg text-emerald-500 font-bold uppercase">Dias</span>
            </div>
          </div>
        </div>

        {/* Widget 6: Progresso do Semestre (Gráfico Circular) */}
        <div onClick={() => setActiveTab('Faculdade (ADM)')} className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl cursor-pointer group hover:border-indigo-500/50 transition-all flex flex-col justify-between items-center text-center h-72">
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2"><PieChart className="w-4 h-4" /> Progresso Semestral</h2>
            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="relative w-28 h-28 my-2 flex items-center justify-center">
            {/* SVG Circular Graph */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" fill="none" stroke="#1f222a" strokeWidth="12" />
              <circle cx="56" cy="56" r="48" fill="none" stroke="#818cf8" strokeWidth="12" strokeDasharray="301" strokeDashoffset={301 - (301 * (visaoGeralMetrics.disciplinasAprovadas / visaoGeralMetrics.totalDisciplinas))} className="transition-all duration-1000" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{visaoGeralMetrics.disciplinasAprovadas}</span>
              <span className="text-[10px] text-slate-500 font-bold">/ {visaoGeralMetrics.totalDisciplinas}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Disciplinas Aprovadas</p>
        </div>
      </div>

      {/* Mural de Avisos do Portal */}
      <div className="bg-[#12141a] border border-yellow-500/30 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="bg-yellow-500/10 border-r border-yellow-500/20 p-6 md:w-48 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
          <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider">Avisos do Portal</h2>
        </div>
        <textarea 
          value={avisosPortal}
          onChange={(e) => setAvisosPortal(e.target.value)}
          placeholder="Cole aqui os avisos importantes do portal da sua faculdade..."
          className="flex-1 bg-transparent p-6 text-sm text-slate-300 resize-none focus:outline-none focus:bg-[#16181e] min-h-[120px] transition-colors leading-relaxed"
        />
      </div>
    </div>
  );

  const renderFaculdade = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-white">
            FACULDADE <span className="text-yellow-500">(ADM)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Gestão Acadêmica</p>
        </div>
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl px-4 py-2 text-right shadow-lg">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Média de Aprovação</p>
          <p className="text-xl font-bold text-emerald-500">≥ 7.0</p>
        </div>
      </div>

      <div className="space-y-4">
        {faculdadeData.map((disc) => {
          const isExpanded = expandedSubject === disc.id;
          const finalGrade = calculateFinalGrade(disc.notas.as, disc.notas.a1);
          const isApproved = finalGrade !== null && Number(finalGrade) >= 7.0;
          const isFailed = finalGrade !== null && Number(finalGrade) < 7.0;

          return (
            <div key={disc.id} className="bg-[#12141a] border border-[#1f222a] rounded-xl shadow-md overflow-hidden transition-all duration-300">
              
              {/* Row Header (Clickable) */}
              <div 
                onClick={() => setExpandedSubject(isExpanded ? null : disc.id)}
                className={`p-5 flex items-center justify-between cursor-pointer hover:bg-[#16181e] transition-colors ${isExpanded ? 'border-b border-[#1f222a] bg-[#16181e]' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <Library className={`w-5 h-5 ${isExpanded ? 'text-yellow-500' : 'text-slate-500'}`} />
                  <h3 className="font-bold text-white text-sm md:text-base">{disc.name}</h3>
                </div>
                
                <div className="flex items-center gap-6">
                  {/* Badge Média Dinâmica no Header */}
                  {finalGrade !== null && (
                     <div className={`px-3 py-1 rounded text-xs font-bold ${isApproved ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                       NF: {finalGrade}
                     </div>
                  )}
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-yellow-500" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
                </div>
              </div>

              {/* Expanded Panel */}
              {isExpanded && (
                <div className="p-6 bg-[#0a0b0e] grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-top-2">
                  
                  {/* Coluna 1: Checklist AS */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
                      <CheckSquare className="w-3.5 h-3.5" /> Checklist de Unidades
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['as1', 'as2', 'as3', 'as4'].map((asKey, idx) => (
                        <label key={asKey} className="flex items-center gap-3 cursor-pointer group bg-[#12141a] p-3 rounded-lg border border-[#1f222a] hover:border-yellow-500/50 transition-colors">
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={disc.checks[asKey]}
                            onChange={(e) => handleUpdateFaculdade(disc.id, 'checks', asKey, e.target.checked)}
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${disc.checks[asKey] ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'border-slate-600 group-hover:border-slate-400'}`}>
                            {disc.checks[asKey] && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                          <span className={`text-xs font-bold ${disc.checks[asKey] ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-300'}`}>AS-{(idx+1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Coluna 2: Calculadora */}
                  <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-5 shadow-inner flex flex-col justify-between">
                    <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Activity className="w-3.5 h-3.5" /> Calculadora de Média
                    </h4>
                    
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Média AS (40%)</label>
                        <input 
                          type="number" 
                          step="0.1"
                          placeholder="0.0" 
                          value={disc.notas.as}
                          onChange={(e) => handleUpdateFaculdade(disc.id, 'notas', 'as', e.target.value)}
                          className="w-full bg-[#0a0b0e] border border-[#1f222a] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Prova A1 (60%)</label>
                        <input 
                          type="number" 
                          step="0.1"
                          placeholder="0.0" 
                          value={disc.notas.a1}
                          onChange={(e) => handleUpdateFaculdade(disc.id, 'notas', 'a1', e.target.value)}
                          className="w-full bg-[#0a0b0e] border border-[#1f222a] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-[#1f222a] pt-4 mt-auto">
                      <span className="text-xs text-slate-400 font-bold uppercase">Nota Final:</span>
                      <span className={`text-2xl font-black ${finalGrade === null ? 'text-slate-600' : (isApproved ? 'text-emerald-500' : 'text-rose-500')}`}>
                        {finalGrade !== null ? finalGrade : '-.-'}
                      </span>
                    </div>
                  </div>

                  {/* Coluna 3: Caderno de Anotações */}
                  <div className="flex flex-col">
                    <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                      <NotebookText className="w-3.5 h-3.5" /> Caderno de Anotações
                    </h4>
                    <textarea 
                      value={disc.notes}
                      onChange={(e) => handleUpdateFaculdade(disc.id, 'notes', null, e.target.value)}
                      placeholder="Datas de provas, avisos dos tutores, resumos rápidos..."
                      className="flex-1 bg-[#12141a] border border-[#1f222a] rounded-xl p-3 text-xs text-slate-300 resize-none focus:outline-none focus:border-yellow-500/50 transition-colors w-full min-h-[100px]"
                    />
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCompetencias = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-xl font-black italic tracking-wider text-white mb-6">COMPETÊNCIAS</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
          <h2 className="text-yellow-500 font-bold italic mb-1">RADAR DE COMPETÊNCIAS</h2>
          <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider">Conectado a dados reais</p>
          <RadarChart data={radarData} />
        </div>
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2"><span className="text-yellow-500">文A</span><h2 className="text-white font-bold">Foco Internacional</h2></div>
            <p className="text-xs text-yellow-500 font-bold mb-8 leading-relaxed">Meta Alcançar: Nível C1 / Preparatório TOEFL</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>PROFICIÊNCIA (CURSO)</span>
                <div className="flex items-center gap-2"><input type="number" value={englishLevel} onChange={(e) => setEnglishLevel(Math.min(100, Math.max(0, e.target.value)))} className="bg-[#1f222a] border border-slate-700 text-white w-14 text-center rounded py-1"/><span className="text-yellow-500">%</span></div>
              </div>
              <div>
                <input type="range" min="0" max="100" value={englishLevel} onChange={(e) => setEnglishLevel(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"/>
                <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2 px-1">
                  <span className={englishLevel < 20 ? "text-white" : ""}>A1</span><span className={englishLevel >= 20 && englishLevel < 40 ? "text-white" : ""}>A2</span><span className={englishLevel >= 40 && englishLevel < 60 ? "text-white" : ""}>B1</span><span className={englishLevel >= 60 && englishLevel < 80 ? "text-white" : ""}>B2</span><span className="text-yellow-500 bg-yellow-500/10 px-1 rounded">C1</span><span>C2</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-8">
            <span className="text-[10px] font-bold px-3 py-1 border border-slate-700 rounded-full text-slate-300">META C1</span><span className="text-[10px] font-bold px-3 py-1 border border-yellow-500/30 text-yellow-500 rounded-full">TOEFL PREP</span>
          </div>
        </div>
      </div>
      {/* Tabela de Hard Skills */}
      <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div><h2 className="text-yellow-500 font-bold italic flex items-center gap-2"><Brain className="w-4 h-4" /> HARD SKILLS & CERTIFICAÇÕES</h2><p className="text-xs text-slate-500 mt-1">Registros técnicos.</p></div>
          <span className="text-[10px] px-3 py-1 border border-slate-700 rounded-full text-slate-400">LATTES-READY</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[10px] uppercase text-slate-500 border-b border-[#1f222a]">
              <tr><th className="pb-3 font-semibold">Categoria</th><th className="pb-3 font-semibold">Habilidade</th><th className="pb-3 font-semibold">Nível (%)</th><th className="pb-3 font-semibold">Certificação</th><th className="pb-3 font-semibold text-right">Ação</th></tr>
            </thead>
            <tbody className="divide-y divide-[#1f222a]">
              {hardSkills.map(skill => (
                <tr key={skill.id} className="group hover:bg-[#16181e] transition-colors">
                  <td className="py-3 pr-4 pl-2"><select value={skill.category} onChange={(e) => handleUpdateHardSkill(skill.id, 'category', e.target.value)} className="bg-transparent text-xs w-full focus:outline-none focus:border-yellow-500"><option className="bg-slate-900" value="Gestão (ADM)">Gestão (ADM)</option><option className="bg-slate-900" value="Ferramentas Digitais">Ferramentas Digitais</option><option className="bg-slate-900" value="Pesquisa Científica">Pesquisa Científica</option></select></td>
                  <td className="py-3 pr-4"><input type="text" value={skill.name} onChange={(e) => handleUpdateHardSkill(skill.id, 'name', e.target.value)} className="bg-transparent border border-transparent hover:border-slate-700 rounded p-1 w-full text-white font-medium focus:outline-none"/></td>
                  <td className="py-3 pr-4"><div className="flex items-center gap-2"><input type="number" value={skill.level} onChange={(e) => handleUpdateHardSkill(skill.id, 'level', Math.min(100, Math.max(0, e.target.value)))} className="bg-[#1f222a] border border-slate-700 rounded py-1 px-2 w-16 text-center focus:outline-none focus:border-yellow-500"/><span className="text-slate-500 text-xs">%</span></div></td>
                  <td className="py-3 pr-4"><input type="text" value={skill.cert} onChange={(e) => handleUpdateHardSkill(skill.id, 'cert', e.target.value)} className="bg-transparent border border-transparent hover:border-slate-700 rounded p-1 w-full focus:outline-none"/></td>
                  <td className="py-3 text-right pr-2"><button onClick={() => handleRemoveHardSkill(skill.id)} className="text-slate-600 hover:text-rose-500 transition-colors p-1 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
              <tr className="bg-[#16181e]">
                <td className="py-3 pr-4 pl-2"><select value={newSkill.category} onChange={(e) => setNewSkill({...newSkill, category: e.target.value})} className="bg-[#0f1115] border border-slate-700 rounded p-2 text-xs w-full text-white focus:outline-none"><option value="Gestão (ADM)">Gestão (ADM)</option><option value="Ferramentas Digitais">Ferramentas Digitais</option><option value="Pesquisa Científica">Pesquisa Científica</option></select></td>
                <td className="py-3 pr-4"><input type="text" placeholder="Nova Habilidade..." value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} className="bg-[#0f1115] border border-slate-700 rounded p-2 text-sm w-full text-white focus:outline-none"/></td>
                <td className="py-3 pr-4"><div className="flex items-center gap-2"><input type="number" value={newSkill.level} onChange={(e) => setNewSkill({...newSkill, level: e.target.value})} className="bg-[#0f1115] border border-slate-700 rounded py-2 px-2 w-16 text-center text-white focus:outline-none"/><span className="text-slate-500 text-xs">%</span></div></td>
                <td className="py-3 pr-4"><input type="text" placeholder="Certificado" value={newSkill.cert} onChange={(e) => setNewSkill({...newSkill, cert: e.target.value})} className="bg-[#0f1115] border border-slate-700 rounded p-2 text-sm w-full text-white focus:outline-none"/></td>
                <td className="py-3 text-right pr-2"><button onClick={handleAddHardSkill} className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 transition-colors text-xs font-bold px-4 py-2 rounded">ADICIONAR</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Soft Skills */}
      <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
        <h2 className="text-white font-bold mb-1 flex items-center gap-2"><Brain className="w-5 h-5 text-yellow-500" /> AUTOAVALIAÇÃO SEMESTRAL (SOFT SKILLS)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Object.entries(softSkills).map(([category, items]) => {
            const progress = calculateSoftSkillProgress(category);
            const isCom = category === 'comunicacao';
            return (
              <div key={category} className={`border ${isCom ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-[#1f222a] bg-[#0f1115]'} rounded-xl p-5`}>
                <div className="flex justify-between items-center mb-2"><h3 className="text-white font-bold uppercase tracking-wide text-sm">{category}</h3><span className={`text-xs font-bold ${progress === 100 ? 'text-yellow-500' : 'text-slate-400'}`}>{progress}%</span></div>
                <div className="h-1 w-full bg-slate-800 rounded-full mb-6 overflow-hidden"><div className={`h-full transition-all duration-500 ${isCom ? 'bg-yellow-500' : 'bg-slate-400'}`} style={{ width: `${progress}%` }}></div></div>
                <div className="space-y-3">
                  {items.map(item => (
                    <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="hidden" checked={item.checked} onChange={() => handleToggleSoftSkill(category, item.id)} />
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-colors ${item.checked ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'border-slate-600 group-hover:border-slate-400'}`}>
                        {item.checked && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={`text-sm ${item.checked ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-300 group-hover:text-white transition-colors'}`}>{item.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderProducao = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-black italic tracking-wider text-white">PRODUÇÃO ACADÊMICA</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-yellow-500 font-bold italic mb-6">RASTREADOR DE PRODUÇÃO</h2>
            <div className="flex flex-col md:flex-row gap-3 mb-8 bg-[#0f1115] p-3 rounded-lg border border-[#1f222a]">
              <input type="text" placeholder="Título do Artigo" value={newProd.title} onChange={e => setNewProd({...newProd, title: e.target.value})} className="flex-1 bg-transparent border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500" />
              <select value={newProd.type} onChange={e => setNewProd({...newProd, type: e.target.value})} className="bg-transparent border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500">
                <option value="Artigo" className="bg-slate-900">Artigo</option><option value="Resumo" className="bg-slate-900">Resumo Expandido</option><option value="Tese" className="bg-slate-900">Tese/Dissertação</option>
              </select>
              <select value={newProd.status} onChange={e => setNewProd({...newProd, status: e.target.value})} className="bg-transparent border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500">
                <option value="Ideia" className="bg-slate-900">Ideia</option><option value="Escrevendo" className="bg-slate-900">Escrevendo</option><option value="Revisão" className="bg-slate-900">Em Revisão</option><option value="Publicado" className="bg-slate-900">Publicado</option>
              </select>
              <button onClick={handleAddProduction} className="bg-yellow-500 text-slate-900 font-bold px-6 py-2 rounded text-xs hover:bg-yellow-400 transition-colors">LANÇAR ARTIGO</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-[#1f222a]">
                  <tr><th className="pb-3 font-semibold w-1/2">Título</th><th className="pb-3 font-semibold">Tipo</th><th className="pb-3 font-semibold">Status Atual</th><th className="pb-3 font-semibold text-right">Ação</th></tr>
                </thead>
                <tbody className="divide-y divide-[#1f222a]">
                  {productions.length === 0 ? (
                    <tr><td colSpan="4" className="py-8 text-center text-slate-600 text-sm italic">Nenhum artigo em produção.</td></tr>
                  ) : (
                    productions.map(prod => (
                      <tr key={prod.id} className="group hover:bg-[#16181e] transition-colors">
                        <td className="py-4 font-medium text-white">{prod.title}</td><td className="py-4 text-slate-400 text-xs">{prod.type}</td>
                        <td className="py-4"><span className="px-2 py-1 bg-[#1f222a] text-yellow-500 rounded text-xs font-semibold">{prod.status}</span></td>
                        <td className="py-4 text-right"><button onClick={() => handleDeleteProduction(prod.id)} className="text-slate-600 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-sm"><Lightbulb className="w-4 h-4 text-yellow-500" /> BANCO DE IDEIAS</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Nova ideia de tema para artigo..." value={newIdea} onChange={e => setNewIdea(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddIdea()} className="flex-1 bg-transparent border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"/>
              <button onClick={handleAddIdea} className="bg-yellow-500 text-slate-900 p-2 rounded-lg hover:bg-yellow-400 transition-colors"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="border border-dashed border-[#1f222a] rounded-lg p-4 min-h-[80px] space-y-2">
              {ideas.length === 0 ? <p className="text-center text-slate-600 text-xs italic mt-2 uppercase tracking-widest">Espaço para novos insights...</p> : ideas.map(idea => (
                <div key={idea.id} className="flex justify-between items-center bg-[#16181e] p-3 rounded text-sm text-slate-300">
                  <span>{idea.text}</span><button onClick={() => setIdeas(ideas.filter(i => i.id !== idea.id))} className="text-slate-600 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><ExternalLink className="w-4 h-4 text-yellow-500" /> Recursos de Pesquisa</h2>
            <div className="space-y-2">
              {[{ name: 'Plataforma Lattes', icon: User, url: 'http://lattes.cnpq.br/' },{ name: 'Google Acadêmico', icon: Search, url: 'https://scholar.google.com/' },{ name: 'Periódicos CAPES', icon: BookOpen, url: 'https://www.periodicos.capes.gov.br/' },{ name: 'ORCID iD', icon: GraduationCap, url: 'https://orcid.org/' }].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-[#1f222a] hover:border-yellow-500/50 hover:bg-[#16181e] transition-all group">
                  <div className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white font-medium"><link.icon className="w-4 h-4 text-slate-500 group-hover:text-yellow-500" /> {link.name}</div>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-yellow-500" />
                </a>
              ))}
            </div>
          </div>
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><CalendarIcon className="w-4 h-4 text-yellow-500" /> Calendário de Editais</h2>
            <div className="space-y-3">
              <div className="bg-[#0f1115] p-4 rounded-lg border border-[#1f222a]"><h3 className="text-yellow-500 font-bold text-xs uppercase tracking-wider">ENANPAD 2026</h3><p className="text-xs text-slate-500 mt-1">Submissões: Março/Abril</p></div>
              <div className="bg-[#0f1115] p-4 rounded-lg border border-[#1f222a]"><h3 className="text-white font-bold text-xs uppercase tracking-wider">SEMEAD USP</h3><p className="text-xs text-slate-500 mt-1">Submissões: Junho</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoadmap = () => {
    const ROADMAP_TABS = [
      { name: 'Visão Geral', icon: LayoutGrid },
      { name: 'Contador de CR', icon: Medal },
      { name: 'Plano 2 Anos', icon: CalendarDays },
      { name: 'Plano 5 Anos', icon: TrendingUp },
      { name: 'Hub de Recursos', icon: BookOpen },
    ];

    const renderVisaoGeral = () => (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Processos de Elite</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h3 className="text-white font-bold flex items-center gap-3 mb-5 text-sm"><GraduationCap className="w-5 h-5 text-slate-400" /> Doutorado Sanduíche</h3>
            <div className="space-y-4 text-xs leading-relaxed">
              <p><span className="text-slate-500 font-bold">O que é:</span> <span className="text-slate-300">Realizar parte da sua tese (6 a 12 meses) no exterior com bolsa paga (CAPES/PDSE).</span></p>
              <p><span className="text-slate-500 font-bold">Requisitos:</span> <span className="text-slate-300">Fluência comprovada (TOEFL), projeto de pesquisa sólido e convite formal de um professor estrangeiro.</span></p>
              <p><span className="text-slate-500 font-bold">Passo a Passo:</span> <span className="text-slate-300">Entrar num Doutorado nota 6 ou 7 → Publicar artigos → Networking com prof. gringo → Pedir Bolsa.</span></p>
            </div>
          </div>
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h3 className="text-white font-bold flex items-center gap-3 mb-5 text-sm"><Search className="w-5 h-5 text-slate-400" /> Exame ANPAD</h3>
            <div className="space-y-4 text-xs leading-relaxed">
              <p><span className="text-slate-500 font-bold">O que é:</span> <span className="text-slate-300">O teste padrão de entrada para os melhores mestrados do Brasil.</span></p>
              <p><span className="text-slate-500 font-bold">A Prova:</span> <span className="text-slate-300">Foca em Raciocínio Lógico-Quantitativo, Português e Inglês. A nota vale por 2 anos.</span></p>
              <p><span className="text-slate-500 font-bold">Passo a Passo:</span> <span className="text-slate-300">Baixar provas anteriores → Focar em Lógica e Estatística → Treinar tempo de prova → Alcançar Percentil 90+.</span></p>
            </div>
          </div>
        </div>

        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2"><Target className="w-4 h-4" /> Rotina Deep Work (Produtividade Real)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-widest">Manhã (08h - 15h)</p>
            <h3 className="text-white font-black text-sm mb-2 tracking-wide">Trabalho Integral</h3>
            <p className="text-xs text-slate-400">Aproveite para observar problemas de gestão reais. Isso gera ótimas teses.</p>
          </div>
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-widest">Tarde (16h - 18h)</p>
            <h3 className="text-white font-black text-sm mb-2 tracking-wide">Produção Acadêmica</h3>
            <p className="text-xs text-slate-400">Não é só ler a aula da faculdade. É ler 1 artigo científico, anotar no Notion e atualizar o Lattes.</p>
          </div>
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-widest">Noite (18h - 19h)</p>
            <h3 className="text-white font-black text-sm mb-2 tracking-wide">Inglês Instrumental</h3>
            <p className="text-xs text-slate-400">Curso para base gramatical + Escuta de podcasts acadêmicos (HBR IdeaCast).</p>
          </div>
        </div>
      </div>
    );

    const renderContadorCR = () => {
      const totalCreditos = crData.reduce((acc, cur) => acc + Number(cur.creditos), 0);
      const somaPonderada = crData.reduce((acc, cur) => acc + (Number(cur.nota) * Number(cur.creditos)), 0);
      const media = totalCreditos > 0 ? (somaPonderada / totalCreditos).toFixed(2) : '0';

      return (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-6 flex items-center gap-2"><Medal className="w-4 h-4" /> Performance Acadêmica</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-8 shadow-xl flex flex-col items-center justify-center text-center"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">Média Ponderada</p><p className="text-5xl font-black text-white mb-4">{media}</p></div>
            <div className="lg:col-span-2 bg-[#12141a] border border-[#1f222a] rounded-xl p-8 shadow-xl flex flex-col justify-center">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input type="text" placeholder="Disciplina (Sua Faculdade)" value={newCr.disciplina} onChange={e => setNewCr({...newCr, disciplina: e.target.value})} className="flex-1 bg-[#0a0b0e] border border-[#1f222a] rounded-lg px-4 py-3 text-sm text-white focus:border-yellow-500 focus:outline-none transition-colors" />
                <input type="number" placeholder="Nota" value={newCr.nota} onChange={e => setNewCr({...newCr, nota: e.target.value})} className="w-full md:w-32 bg-[#0a0b0e] border border-[#1f222a] rounded-lg px-4 py-3 text-sm text-white focus:border-yellow-500 focus:outline-none transition-colors" />
                <select value={newCr.creditos} onChange={e => setNewCr({...newCr, creditos: e.target.value})} className="w-full md:w-40 bg-[#0a0b0e] border border-[#1f222a] rounded-lg px-4 py-3 text-sm text-slate-300 focus:border-yellow-500 focus:outline-none transition-colors"><option value="2">2 Créditos</option><option value="4">4 Créditos</option><option value="6">6 Créditos</option></select>
              </div>
              <button onClick={handleAddCr} className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-xs py-4 rounded-lg uppercase tracking-wider transition-colors">Registrar no Histórico</button>
            </div>
          </div>
          <div className="overflow-x-auto bg-[#12141a] border border-[#1f222a] rounded-xl shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-[10px] uppercase text-slate-500 border-b border-[#1f222a]"><tr><th className="py-4 px-6 font-semibold w-1/2">Disciplina</th><th className="py-4 px-6 font-semibold text-center">Créditos</th><th className="py-4 px-6 font-semibold text-center">Nota</th><th className="py-4 px-6 font-semibold text-right">Ação</th></tr></thead>
              <tbody className="divide-y divide-[#1f222a]">
                {crData.length === 0 ? ( <tr><td colSpan="4" className="py-12 text-center text-slate-600 text-xs italic uppercase tracking-widest">Nenhuma disciplina registrada.</td></tr> ) : ( crData.map(item => ( <tr key={item.id} className="hover:bg-[#16181e] transition-colors"><td className="py-4 px-6 font-medium text-white">{item.disciplina}</td><td className="py-4 px-6 text-center text-slate-400">{item.creditos}</td><td className="py-4 px-6 text-center font-bold text-white">{item.nota}</td><td className="py-4 px-6 text-right"><button onClick={() => handleDeleteCr(item.id)} className="text-slate-600 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button></td></tr> )) )}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    const renderPlano2Anos = () => (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-8 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> A Jornada do Graduando de Elite</h2>
        <div className="relative border-l border-[#1f222a] ml-4 space-y-16 pb-8">
          <div className="relative pl-10"><div className="absolute -left-2.5 top-1 w-5 h-5 bg-[#0a0b0e] border-4 border-yellow-500 rounded-full"></div><h3 className="text-2xl font-black italic text-white mb-6 tracking-wide">Semestre 1 & 2 <span className="text-slate-400 font-medium text-lg not-italic">(Fundação e Escaneamento)</span></h3>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><Medal className="w-5 h-5 text-slate-500 mb-4" /><h4 className="text-white font-bold mb-2">Manter CR &gt; 9.0</h4><p className="text-xs text-slate-400 leading-relaxed">Prioridade Zero. No EAD, a nota é o único critério objetivo inicial para bolsas FAPESP/CAPES. Estude para gabaritar.</p></div>
              <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><List className="w-5 h-5 text-slate-500 mb-4" /><h4 className="text-white font-bold mb-2">Curadoria de Fontes</h4><p className="text-xs text-slate-400 leading-relaxed">Vá além do Google. Use Spell.org.br (específico de ADM) e Scielo. Busque por "State of the Art" no seu tema de interesse.</p></div>
              <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><div className="text-slate-500 mb-4 font-bold text-lg leading-none">文A</div><h4 className="text-white font-bold mb-2">Inglês: O Método 1-1-1</h4><p className="text-xs text-slate-400 leading-relaxed">1 Artigo internacional/semana, 1 Vídeo da HBR/TED por dia, 1 Abstract escrito/mês. Valide a gramática com professores.</p></div>
            </div>
          </div>
          
          <div className="relative pl-10"><div className="absolute -left-2.5 top-1 w-5 h-5 bg-[#0a0b0e] border-4 border-yellow-500 rounded-full"></div><h3 className="text-2xl font-black italic text-white mb-6 tracking-wide">Semestre 3 & 4 <span className="text-slate-400 font-medium text-lg not-italic">(Ataque e Networking)</span></h3>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><Search className="w-5 h-5 text-slate-500 mb-4" /><h4 className="text-white font-bold mb-2">Iniciação Científica (PIC)</h4><p className="text-xs text-slate-400 leading-relaxed">Mês 06: Abordar a coordenação da sua faculdade. Objetivo: Ter um orientador Ph.D. para aprender o método científico.</p></div>
              <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><Users className="w-5 h-5 text-slate-500 mb-4" /><h4 className="text-white font-bold mb-2">Mapeamento de Eventos</h4><p className="text-xs text-slate-400 leading-relaxed">Acesse semead.com.br (USP) e anpad.org.br. Leia os anais dos eventos para entender o que está sendo pesquisado hoje.</p></div>
              <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><FileText className="w-5 h-5 text-slate-500 mb-4" /><h4 className="text-white font-bold mb-2">Escrita Científica</h4><p className="text-xs text-slate-400 leading-relaxed">Não faça apenas resumos. Aprenda a estruturar um "Paper": Introdução, Referencial, Metodologia e Resultados Esperados.</p></div>
            </div>
          </div>
        </div>
      </div>
    );

    const renderPlano5Anos = () => {
      const renderAccordion = (id, number, title, subtitle, items) => (
        <div className="mb-4 animate-in fade-in">
          <button onClick={() => setExpandedYear(expandedYear === id ? null : id)} className="w-full bg-[#12141a] border border-[#1f222a] rounded-xl p-6 flex justify-between items-center hover:border-slate-700 transition-colors shadow-lg">
            <div className="text-left"><h3 className="text-xl font-black text-white flex items-center gap-4"><span className="text-yellow-500 text-2xl">{number}</span> {title}</h3><p className="text-xs text-slate-400 mt-2">{subtitle}</p></div>
            {expandedYear === id ? <ChevronUp className="w-5 h-5 text-yellow-500" /> : <ChevronDown className="w-5 h-5 text-yellow-500" />}
          </button>
          {expandedYear === id && (
            <div className="mt-4 px-2 pb-2 animate-in slide-in-from-top-4 duration-300">
              <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> Plano de Ação Detalhado
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, idx) => (
                  <div key={idx} className={`bg-[#12141a] border border-[#1f222a] rounded-xl p-5 shadow-sm flex gap-3 ${item.fullWidth ? 'md:col-span-2' : ''}`}>
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
      return (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-8 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Visão de Longo Prazo (Acordeão)</h2>
          {renderAccordion('Ano 3', '03', 'Ano 3: O Especialista', 'Foco Total em TCC e Produção Científica.', [
            { title: 'Definição do Nicho:', desc: 'Marketing, Finanças, Estratégia ou Comportamento Organizacional.' },
            { title: 'TCC Acadêmico:', desc: 'Desenvolver um projeto com coleta de dados reais (pesquisa de campo ou banco de dados).' },
            { title: 'Inglês de Transição:', desc: 'Abandonar o básico e focar em certificações (preparatórios para TOEFL/IELTS).' },
            { title: 'Submissão em Congressos:', desc: 'Enviar seu primeiro trabalho para os principais congressos do país como autor.' },
            { title: 'Networking:', desc: 'Seguir pesquisadores no ResearchGate e comentar em suas publicações.', fullWidth: true }
          ])}
          {renderAccordion('Ano 4', '04', 'Ano 4: O Candidato', 'Transição Graduação → Pós-Graduação de Elite.', [
            { title: 'Treinamento ANPAD:', desc: 'Mínimo de 6 meses resolvendo provas antigas. Foco em Raciocínio Quantitativo e Lógico.' },
            { title: 'Certificação de Proficiência:', desc: 'Realizar o TOEFL iBT (Meta: 90+ pontos) ou IELTS (Meta: 7.0+).' },
            { title: 'Filtro de Mestrados:', desc: 'Selecionar apenas programas de excelência acadêmica com nota máxima.' },
            { title: 'Processo Seletivo:', desc: 'Inscrições costumam abrir entre agosto e setembro para ingresso no ano seguinte.' },
            { title: 'Projeto de Mestrado:', desc: 'Ter um anteprojeto de pesquisa pronto e alinhado aos professores da instituição alvo.', fullWidth: true }
          ])}
          {renderAccordion('Ano 5', '05', 'Ano 5: O Pesquisador', 'Mestrado e Planejamento Internacional.', [
            { title: 'Ingresso no Mestrado Stricto Sensu:', desc: 'Início da vida acadêmica profissional com bolsa de pesquisa.' },
            { title: 'Qualificação:', desc: 'Defender seu projeto de mestrado no 1º ano para liberar o foco na tese.' },
            { title: 'Draft do Ph.D. Sanduíche:', desc: 'Identificar universidades no exterior (EUA/Europa) que têm convênio com seu mestrado.' },
            { title: 'Publicação em Inglês:', desc: 'Submeter um artigo em revista internacional (Journal) para fortalecer o currículo do Sanduíche.' },
            { title: 'Contato Internacional:', desc: 'E-mail para possíveis orientadores estrangeiros apresentando seus resultados iniciais.', fullWidth: true }
          ])}
        </div>
      );
    };

    const renderHubRecursos = () => (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-8 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Hub de Inteligência Acadêmica</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-8 shadow-xl">
            <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-500" /> Bases de Busca de Artigos
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Spell.org.br', desc: 'FOCO: ADMINISTRAÇÃO BRASIL' },
                { name: 'Google Scholar', desc: 'DICA: USE TERMOS EM INGLÊS PARA MELHORES RESULTADOS.' },
                { name: 'ScienceDirect / Scielo', desc: 'FOCO: ARTIGOS COM ALTO FATOR DE IMPACTO.' }
              ].map((base, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#1f222a] bg-[#0a0b0e] hover:border-slate-600 transition-colors group cursor-pointer">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{base.name}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{base.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-yellow-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-8 shadow-xl">
            <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-3">
              <User className="w-5 h-5 text-yellow-500" /> Calendário de Eventos
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#1f222a] bg-[#0a0b0e]">
                <h4 className="font-bold text-white text-sm mb-1">ANPAD - ENANPAD</h4>
                <p className="text-xs text-slate-400">O principal evento científico de ADM do país. Geralmente em Setembro.</p>
              </div>
              <div className="p-4 rounded-xl border border-yellow-500/50 bg-[#0a0b0e] shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                <h4 className="font-bold text-yellow-500 text-sm mb-1">SEMEAD USP</h4>
                <p className="text-xs text-slate-400">Outubro/Novembro. Ideal para submeter trabalhos de iniciação científica.</p>
              </div>
              <div className="p-4 rounded-xl border border-[#1f222a] bg-[#0a0b0e]">
                <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">Eventos Locais (SYMPLA/EVEN3)</h4>
                <p className="text-xs text-slate-400">Busque por "Congresso Nacional de Administração".</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col lg:flex-row gap-8 items-start h-full">
        <div className="w-full lg:w-64 flex-shrink-0 sticky top-0">
          <div className="mb-8"><h1 className="text-3xl font-black italic tracking-wider text-yellow-500 uppercase">PH.D. ROADMAP</h1><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Administração | Trajetória</p></div>
          <nav className="space-y-2">
            {ROADMAP_TABS.map(tab => (
              <button key={tab.name} onClick={() => setActiveRoadmapTab(tab.name)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${ activeRoadmapTab === tab.name ? 'border border-yellow-500/50 text-yellow-500 bg-yellow-500/5 shadow-md' : 'border border-transparent text-slate-400 hover:text-white hover:bg-[#16181e]' }`}>
                <tab.icon className="w-5 h-5" />{tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 w-full min-w-0 pb-12">
          {activeRoadmapTab === 'Visão Geral' && renderVisaoGeral()}
          {activeRoadmapTab === 'Contador de CR' && renderContadorCR()}
          {activeRoadmapTab === 'Plano 2 Anos' && renderPlano2Anos()}
          {activeRoadmapTab === 'Plano 5 Anos' && renderPlano5Anos()}
          {activeRoadmapTab === 'Hub de Recursos' && renderHubRecursos()}
        </div>
      </div>
    );
  };


  const renderFinancas = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-2xl font-black italic tracking-wider text-white">[SEU NOME] <span className="text-yellow-500">FINANCE</span></h1>
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl px-4 py-2 text-right shadow-lg">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Disponível Agora</p>
          <p className="text-xl font-bold text-white">R$ {financeSummary.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="flex bg-[#12141a] border border-[#1f222a] rounded-xl overflow-hidden p-1 shadow-md">
        {MONTHS.map(month => (
          <button key={month} onClick={() => setActiveMonth(month)} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${ activeMonth === month ? 'bg-yellow-500 text-slate-900 shadow' : 'text-slate-500 hover:text-white hover:bg-[#1a1d24]' }`}>{month}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl relative overflow-hidden"><div className="relative z-10"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Vindo do Mês Anterior</p><p className="text-2xl font-bold text-yellow-500">R$ {financeSummary.prevMonthBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div></div>
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-2">Total a Receber</p><p className="text-2xl font-bold text-white">R$ {financeSummary.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl"><p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider mb-2">Total de Contas</p><p className="text-2xl font-bold text-white">R$ {financeSummary.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p></div>
      </div>
      
      <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-5 shadow-xl flex items-center gap-4">
        <PieChart className="text-slate-600 w-8 h-8" />
        <div className="flex-1">
            <div className="flex justify-between text-xs font-bold mb-2"><span className="text-emerald-500">Receitas ({((financeSummary.income / (financeSummary.income + financeSummary.expense || 1)) * 100).toFixed(0)}%)</span><span className="text-rose-500">Despesas ({((financeSummary.expense / (financeSummary.income + financeSummary.expense || 1)) * 100).toFixed(0)}%)</span></div>
            <div className="w-full h-3 bg-[#1f222a] rounded-full overflow-hidden flex"><div style={{ width: `${(financeSummary.income / (financeSummary.income + financeSummary.expense || 1)) * 100}%` }} className="h-full bg-emerald-500"></div><div style={{ width: `${(financeSummary.expense / (financeSummary.income + financeSummary.expense || 1)) * 100}%` }} className="h-full bg-rose-500"></div></div>
            <p className="text-[10px] text-slate-500 mt-2 text-center uppercase">Gráfico Dinâmico de Fluxo do Mês (Entradas vs Saídas)</p>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {currentMonthFinances.map(transaction => (
          <div 
            key={transaction.id} 
            onClick={() => handleToggleFinanceStatus(transaction.id)}
            className={`cursor-pointer bg-[#12141a] border border-[#1f222a] rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition-all shadow-sm select-none ${transaction.status === 'paid' ? 'opacity-60 hover:opacity-100' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full transition-colors ${transaction.type === 'income' ? 'text-emerald-500 bg-emerald-500/10 group-hover:bg-emerald-500/20' : (transaction.status === 'paid' ? 'text-yellow-500 bg-yellow-500/10 group-hover:bg-yellow-500/20' : 'text-slate-500 bg-[#1f222a] group-hover:bg-slate-800')}`}>
                {transaction.type === 'income' ? <TrendingUp className="w-5 h-5" /> : (transaction.status === 'paid' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />)}
              </div>
              <div>
                <h3 className={`font-bold text-sm ${
                    transaction.status === 'paid' && transaction.type === 'expense' 
                    ? 'text-slate-400 line-through' 
                    : transaction.type === 'income' 
                        ? 'text-emerald-500' // Regra: Receita é sempre verde, mesmo paga
                        : 'text-white' 
                }`}>{transaction.title}</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">{transaction.date} - {transaction.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`font-bold text-sm ${transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteFinance(transaction.id); }} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-500 transition-all p-1" title="Excluir Lançamento">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-[#0f1115] border border-dashed border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="p-2 rounded-full bg-[#1f222a] text-slate-400"><Plus className="w-5 h-5" /></div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
                <input type="text" placeholder="Nome (Ex: Netflix)" value={newTransaction.title} onChange={e => setNewTransaction({...newTransaction, title: e.target.value})} className="col-span-2 md:col-span-2 bg-[#1f222a] border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500" />
                <input type="number" placeholder="Valor" value={newTransaction.amount} onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})} className="bg-[#1f222a] border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500" />
                <select value={newTransaction.type} onChange={e => setNewTransaction({...newTransaction, type: e.target.value})} className="bg-[#1f222a] border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"><option value="expense">Saída</option><option value="income">Entrada</option></select>
                <button onClick={handleAddTransaction} className="bg-yellow-500 text-slate-900 font-bold rounded px-4 py-2 text-sm hover:bg-yellow-400 transition-colors">Lançar</button>
            </div>
        </div>
      </div>
    </div>
  );

  const renderRotina = () => {
    const routine = routinesData[activeRoutine];
    const dias = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const diasAtivos = [0, 2, 4, 5]; 

    const colorMap = {
      purple: 'bg-purple-100 border-purple-200 text-purple-800',
      yellow: 'bg-yellow-100 border-yellow-200 text-yellow-800',
      blue: 'bg-indigo-100 border-indigo-200 text-indigo-800',
      green: 'bg-emerald-100 border-emerald-200 text-emerald-800',
      red: 'bg-rose-100 border-rose-200 text-rose-800',
      gray: 'bg-slate-100 border-slate-200 text-slate-800',
      teal: 'bg-teal-100 border-teal-200 text-teal-800'
    };

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-inner">
          <h1 className="text-2xl font-black italic tracking-wider text-slate-900 mb-8">ROTINA DIÁRIA</h1>
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-6 lg:p-8">
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-6 mb-8">
              {Object.keys(routinesData).map(day => (
                <button 
                  key={day}
                  onClick={() => setActiveRoutine(day)}
                  className={`flex-1 min-w-[100px] py-2.5 px-4 text-sm font-semibold rounded-xl transition-all ${
                    activeRoutine === day ? 'bg-yellow-500 text-slate-900 shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-lg font-black italic tracking-wider uppercase text-slate-900">LINHA DO TEMPO: {activeRoutine}</h2>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sequência de Execução</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                  <input type="time" value={newRoutineTask.time} onChange={e => setNewRoutineTask({...newRoutineTask, time: e.target.value})} className="bg-transparent text-slate-800 text-sm focus:outline-none p-1 border-r border-slate-200" />
                  <input type="text" placeholder="Adicionar nova tarefa..." value={newRoutineTask.title} onChange={e => setNewRoutineTask({...newRoutineTask, title: e.target.value})} onKeyDown={e => e.key === 'Enter' && handleAddRoutineTask()} className="flex-1 bg-transparent text-slate-800 text-sm focus:outline-none p-1" />
                  <button onClick={handleAddRoutineTask} className="p-1.5 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500 hover:text-slate-900 rounded-lg transition-colors"><Plus className="w-4 h-4" /></button>
                </div>

                <div className="space-y-3">
                  {routine.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group cursor-pointer" onClick={() => handleToggleRoutineTask(index)}>
                      <span className="text-sm font-bold text-slate-500 w-12 text-right">{item.time}</span>
                      <div className={`flex-1 flex justify-between items-center p-3.5 rounded-xl font-bold text-sm transition-all shadow-sm border ${item.checked ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-60' : colorMap[item.type]}`}>
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${item.checked ? 'text-slate-400' : 'opacity-80'}`} />
                          <span className={item.checked ? 'line-through' : ''}>{item.title}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleRemoveRoutineTask(index); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-md text-white"><h3 className="font-bold flex items-center gap-2 mb-2"><Target className="w-5 h-5 text-yellow-400" /> Meta do Dia</h3><p className="text-sm text-slate-300">{routine.meta}</p></div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm"><h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 text-sm"><Dumbbell className="w-4 h-4 text-rose-500" /> Frequência Semanal</h3><div className="flex justify-between gap-1 mb-3">{dias.map((d, i) => (<div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm ${diasAtivos.includes(i) ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{d}</div>))}</div><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">* Academia: Ter, Qui, Sex e Domingo</p></div>
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-6"><h3 className="font-bold text-rose-600 flex items-center gap-2 mb-4 text-xs italic tracking-wider"><Briefcase className="w-4 h-4" /> GYM ESSENTIALS</h3><div className="space-y-2 text-xs text-rose-900 font-medium"><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-rose-500" /> Garrafinha de Água</div><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-rose-500" /> Shorts / Tênis</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className={`min-h-screen bg-[#0a0b0e] flex font-sans selection:bg-yellow-500/30 text-slate-300`}>
      <aside className="w-64 bg-white hidden md:flex flex-col border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center font-black text-slate-900 text-lg">H</div>
          <span className="font-black tracking-widest text-slate-900 text-lg">DASHBOARD</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { name: 'Visão Geral', icon: Home },
            { name: 'Ph.D. Roadmap', icon: GraduationCap },
            { name: 'Rotina Diária', icon: Calendar },
            { name: 'Produção Acadêmica', icon: FileText },
            { name: 'Competências', icon: Brain },
            { name: 'Faculdade (ADM)', icon: Library },
            { name: 'Finanças', icon: Wallet },
          ].map(item => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.name 
                ? 'bg-[#16181d] text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-yellow-500' : 'text-slate-400'}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-[#16181d] rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-yellow-500 font-bold text-sm rounded-full flex items-center justify-center border border-[#2d333b]">[IN]</div>
            <div>
              <p className="text-sm font-bold text-white">[Seu Nome]</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">[Sua Faculdade]</p>
            </div>
          </div>
        </div>
      </aside>

      <main className={`flex-1 p-8 lg:p-12 overflow-y-auto`}>
        <div className="max-w-6xl mx-auto">
          {activeTab === 'Visão Geral' ? renderVisaoGeral() :
           activeTab === 'Competências' ? renderCompetencias() : 
           activeTab === 'Faculdade (ADM)' ? renderFaculdade() :
           activeTab === 'Finanças' ? renderFinancas() : 
           activeTab === 'Produção Acadêmica' ? renderProducao() :
           activeTab === 'Rotina Diária' ? renderRotina() :
           activeTab === 'Ph.D. Roadmap' ? renderRoadmap() :
           <div className="text-center text-slate-500 mt-20">Módulo em desenvolvimento... Selecione um módulo válido no menu lateral.</div>}
        </div>
      </main>
    </div>
  );
}