import React, { useState, useMemo, useEffect } from 'react';
import {
  Home,
  GraduationCap,
  Calendar,
  FileText,
  Brain,
  Wallet,
  Library,
  Sun,
  Bus,
  Briefcase,
  BookOpen,
  Coffee,
  Target,
  Moon,
  Dumbbell,
  MapPin,
  Menu,
  X,
  Cloud,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Lock,
  ChevronRight,
  Utensils,
  Lightbulb,
  Scissors,
} from 'lucide-react';

import { VisaoGeral } from './components/VisaoGeral';
import { Competencias } from './components/Competencias';
import { Faculdade } from './components/Faculdade';
import { Financas } from './components/Financas';
import { Producao } from './components/Producao';
import { Roadmap } from './components/Roadmap';
import { Rotina } from './components/Rotina';
import { Treino } from './components/Treino';
import { Sono } from './components/Sono';
import { Nutricao } from './components/Nutricao';
import { BrainDump } from './components/BrainDump';
import { Auth } from './components/Auth';
import { SplashScreen } from './components/SplashScreen';
import { ScrollReveal } from './components/ScrollReveal';
import { supabase } from './supabase';
import { Haircare } from './components/Haircare';

import { InstallPWA } from './components/InstallPWA';
import { Changelog } from './components/Changelog';
import { Onboarding } from './components/Onboarding';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';

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
    { id: 'l1', text: 'Propor melhoria no Jovem Aprendiz', checked: false },
    { id: 'l2', text: 'Liderar trabalho em grupo EAD', checked: false },
    { id: 'l3', text: 'Contato com orientador do PIC', checked: false },
  ],
};

const INITIAL_FINANCES = [
  { id: 11, month: 'MARÇO', type: 'income', title: 'Adiantamento', date: '15/03', category: 'RECEITAS', amount: 648.4, status: 'paid' },
  { id: 12, month: 'MARÇO', type: 'expense', title: 'Notebook (Atrasado)', date: '15/03', category: 'FIXOS', amount: 292.0, status: 'pending' },
  { id: 13, month: 'MARÇO', type: 'expense', title: 'Cabelo', date: '15/03', category: 'VARIÁVEIS', amount: 30.0, status: 'pending' },
  { id: 14, month: 'MARÇO', type: 'expense', title: 'Fatura Nubank', date: '20/03', category: 'CARTÕES', amount: 741.64, status: 'pending' },
  { id: 15, month: 'MARÇO', type: 'expense', title: 'Academia', date: '20/03', category: 'FIXOS', amount: 150.0, status: 'pending' },
  { id: 16, month: 'MARÇO', type: 'income', title: 'Salário Líquido', date: '31/03', category: 'RECEITAS', amount: 718.77, status: 'paid' },
  { id: 21, month: 'ABRIL', type: 'expense', title: 'Fatura Inter', date: '07/04', category: 'CARTÕES', amount: 704.65, status: 'pending' },
  { id: 22, month: 'ABRIL', type: 'expense', title: 'Notebook', date: '10/04', category: 'FIXOS', amount: 292.0, status: 'pending' },
  { id: 23, month: 'ABRIL', type: 'income', title: 'Adiantamento', date: '15/04', category: 'RECEITAS', amount: 648.4, status: 'paid' },
  { id: 24, month: 'ABRIL', type: 'expense', title: 'Fatura Nubank', date: '20/04', category: 'CARTÕES', amount: 507.43, status: 'pending' },
  { id: 25, month: 'ABRIL', type: 'expense', title: 'Academia', date: '20/04', category: 'FIXOS', amount: 150.0, status: 'pending' },
  { id: 26, month: 'ABRIL', type: 'expense', title: 'PicPay', date: '20/04', category: 'EMPRÉSTIMOS', amount: 100.25, status: 'pending' },
  { id: 27, month: 'ABRIL', type: 'income', title: 'Salário Líquido', date: '30/04', category: 'RECEITAS', amount: 718.77, status: 'paid' },
  { id: 28, month: 'ABRIL', type: 'income', title: 'Bônus (1/5)', date: '30/04', category: 'RECEITAS', amount: 345.0, status: 'paid' },
  { id: 31, month: 'MAIO', type: 'expense', title: 'Fatura Inter', date: '07/05', category: 'CARTÕES', amount: 689.65, status: 'pending' },
  { id: 32, month: 'MAIO', type: 'expense', title: 'Notebook', date: '10/05', category: 'FIXOS', amount: 292.0, status: 'pending' },
  { id: 33, month: 'MAIO', type: 'income', title: 'Adiantamento', date: '15/05', category: 'RECEITAS', amount: 648.4, status: 'paid' },
  { id: 34, month: 'MAIO', type: 'expense', title: 'Fatura Nubank', date: '20/05', category: 'CARTÕES', amount: 445.65, status: 'pending' },
  { id: 35, month: 'MAIO', type: 'expense', title: 'Academia', date: '20/05', category: 'FIXOS', amount: 150.0, status: 'pending' },
  { id: 36, month: 'MAIO', type: 'expense', title: 'PicPay', date: '20/05', category: 'EMPRÉSTIMOS', amount: 100.25, status: 'pending' },
  { id: 37, month: 'MAIO', type: 'income', title: 'Salário Líquido', date: '31/05', category: 'RECEITAS', amount: 718.77, status: 'paid' },
  { id: 38, month: 'MAIO', type: 'income', title: 'Bônus (2/5)', date: '31/05', category: 'RECEITAS', amount: 345.0, status: 'paid' },
  { id: 41, month: 'JUNHO', type: 'expense', title: 'Fatura Inter', date: '07/06', category: 'CARTÕES', amount: 345.07, status: 'pending' },
  { id: 42, month: 'JUNHO', type: 'expense', title: 'Notebook', date: '10/06', category: 'FIXOS', amount: 292.0, status: 'pending' },
  { id: 43, month: 'JUNHO', type: 'income', title: 'Adiantamento', date: '15/06', category: 'RECEITAS', amount: 648.4, status: 'paid' },
  { id: 44, month: 'JUNHO', type: 'expense', title: 'Fatura Nubank', date: '20/06', category: 'CARTÕES', amount: 290.54, status: 'pending' },
  { id: 45, month: 'JUNHO', type: 'expense', title: 'Academia', date: '20/06', category: 'FIXOS', amount: 150.0, status: 'pending' },
  { id: 46, month: 'JUNHO', type: 'expense', title: 'PicPay', date: '20/06', category: 'EMPRÉSTIMOS', amount: 100.25, status: 'pending' },
  { id: 47, month: 'JUNHO', type: 'income', title: 'Salário Líquido', date: '30/06', category: 'RECEITAS', amount: 718.77, status: 'paid' },
  { id: 48, month: 'JUNHO', type: 'income', title: 'Bônus (3/5)', date: '30/06', category: 'RECEITAS', amount: 345.0, status: 'paid' },
  // Meses sem despesas específicas — apenas receitas recorrentes
  { id: 101, month: 'JANEIRO', type: 'income', title: 'Adiantamento', date: '15/01', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 102, month: 'JANEIRO', type: 'income', title: 'Salário Líquido', date: '31/01', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 111, month: 'FEVEREIRO', type: 'income', title: 'Adiantamento', date: '15/02', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 112, month: 'FEVEREIRO', type: 'income', title: 'Salário Líquido', date: '28/02', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 121, month: 'JULHO', type: 'income', title: 'Adiantamento', date: '15/07', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 122, month: 'JULHO', type: 'income', title: 'Salário Líquido', date: '31/07', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 131, month: 'AGOSTO', type: 'income', title: 'Adiantamento', date: '15/08', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 132, month: 'AGOSTO', type: 'income', title: 'Salário Líquido', date: '31/08', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 141, month: 'SETEMBRO', type: 'income', title: 'Adiantamento', date: '15/09', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 142, month: 'SETEMBRO', type: 'income', title: 'Salário Líquido', date: '30/09', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 151, month: 'OUTUBRO', type: 'income', title: 'Adiantamento', date: '15/10', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 152, month: 'OUTUBRO', type: 'income', title: 'Salário Líquido', date: '31/10', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 161, month: 'NOVEMBRO', type: 'income', title: 'Adiantamento', date: '15/11', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 162, month: 'NOVEMBRO', type: 'income', title: 'Salário Líquido', date: '30/11', category: 'RECEITAS', amount: 718.77, status: 'pending' },
  { id: 171, month: 'DEZEMBRO', type: 'income', title: 'Adiantamento', date: '15/12', category: 'RECEITAS', amount: 648.4, status: 'pending' },
  { id: 172, month: 'DEZEMBRO', type: 'income', title: 'Salário Líquido', date: '31/12', category: 'RECEITAS', amount: 718.77, status: 'pending' },
];

const MONTHS = [
  'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
  'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
];

// Ajuda a descobrir o mês atual e o dia da rotina
const NOW = new Date();
const CURRENT_MONTH = MONTHS[NOW.getMonth()];
const CURRENT_DAY_OF_WEEK = NOW.getDay(); // 0=Dom,1=Seg,...,6=Sab
const getInitialRoutine = () => {
  if (CURRENT_DAY_OF_WEEK === 0) return 'Domingo';
  if (CURRENT_DAY_OF_WEEK === 1 || CURRENT_DAY_OF_WEEK === 3) return 'Seg/Qua';
  if (CURRENT_DAY_OF_WEEK === 2 || CURRENT_DAY_OF_WEEK === 4) return 'Ter/Qui';
  if (CURRENT_DAY_OF_WEEK === 5) return 'Sexta';
  return 'Sabado';
};
const INITIAL_PRODUCTIONS = [];
const INITIAL_IDEAS = [];

const ROUTINE_DATA = {
  'Seg/Qua': {
    meta: 'Foco total nos blocos de estudo e trabalho.',
    timeline: [
      { time: '06:15', title: 'Despertar e Oração', type: 'purple', icon: 'Sun', checked: false },
      { time: '07:00', title: 'Trajeto Ida (Podcast Inglês)', type: 'yellow', icon: 'Bus', checked: false },
      { time: '08:00', title: 'Trabalho (Jovem Aprendiz)', type: 'blue', icon: 'Briefcase', checked: false },
      { time: '15:20', title: 'Retorno: Bloco de Leitura Científica', type: 'green', icon: 'BookOpen', checked: false },
      { time: '17:50', title: 'Inglês na Argos', type: 'blue', icon: 'FileText', checked: false },
      { time: '19:30', title: 'Retorno Final / Jantar', type: 'gray', icon: 'Coffee', checked: false },
      { time: '21:00', title: 'Revisão Rápida (30min)', type: 'teal', icon: 'Target', checked: false },
      { time: '23:00', title: 'Descompressão e Bíblia', type: 'purple', icon: 'Moon', checked: false },
    ],
  },
  'Ter/Qui': {
    meta: 'Foco total nos blocos de estudo e trabalho.',
    timeline: [
      { time: '06:15', title: 'Despertar e Oração', type: 'purple', icon: 'Sun', checked: false },
      { time: '07:00', title: 'Trajeto Ida (Audiobook ADM)', type: 'yellow', icon: 'Bus', checked: false },
      { time: '08:00', title: 'Trabalho (Jovem Aprendiz)', type: 'blue', icon: 'Briefcase', checked: false },
      { time: '15:20', title: 'Retorno: Estudo EAD UNICID', type: 'green', icon: 'BookOpen', checked: false },
      { time: '18:00', title: 'Academia (Foco e Peso)', type: 'red', icon: 'Dumbbell', checked: false },
      { time: '20:30', title: 'Chegada / Jantar Leve', type: 'gray', icon: 'Coffee', checked: false },
      { time: '21:30', title: 'Organização de Lattes', type: 'teal', icon: 'Target', checked: false },
      { time: '23:00', title: 'Descompressão e Bíblia', type: 'purple', icon: 'Moon', checked: false },
    ],
  },
  Sexta: {
    meta: 'Foco total nos blocos de estudo e trabalho.',
    timeline: [
      { time: '06:15', title: 'Despertar e Oração', type: 'purple', icon: 'Sun', checked: false },
      { time: '08:00', title: 'CIEE - Formação Teórica', type: 'blue', icon: 'GraduationCap', checked: false },
      { time: '12:00', title: 'Trajeto CIEE → Academia (1h)', type: 'yellow', icon: 'Bus', checked: false },
      { time: '13:00', title: 'Academia (Treino Focado)', type: 'red', icon: 'Dumbbell', checked: false },
      { time: '14:30', title: 'Trajeto Academia → SESC (50m)', type: 'yellow', icon: 'Bus', checked: false },
      { time: '15:20', title: 'SESC Jundiaí - Estudo (3.5h)', type: 'green', icon: 'BookOpen', checked: false },
      { time: '19:00', title: 'Retorno / Lazer Livre', type: 'gray', icon: 'Coffee', checked: false },
      { time: '23:00', title: 'Higiene do Sono', type: 'purple', icon: 'Moon', checked: false },
    ],
  },
  Sabado: {
    meta: 'Manhã para a casa, tarde para o futuro Doutor.',
    timeline: [
      { time: '08:30', title: 'Acordar sem alarme / Oração', type: 'purple', icon: 'Sun', checked: false },
      { time: '09:30', title: 'Organização da Casa', type: 'gray', icon: 'Home', checked: false },
      { time: '11:00', title: 'Estudo ADM / Revisão Semanal', type: 'green', icon: 'BookOpen', checked: false },
      { time: '13:00', title: 'Almoço e Descanso', type: 'gray', icon: 'Coffee', checked: false },
      { time: '15:00', title: 'Produção Acadêmica / Lattes', type: 'teal', icon: 'Target', checked: false },
      { time: '18:00', title: 'Tempo Livre / Social', type: 'gray', icon: 'MapPin', checked: false },
      { time: '23:00', title: 'Protocolo de Sono', type: 'purple', icon: 'Moon', checked: false },
    ],
  },
  Domingo: {
    meta: 'Treino intenso para liberar endorfina.',
    timeline: [
      { time: '08:30', title: 'Oração / Espiritualidade', type: 'purple', icon: 'Sun', checked: false },
      { time: '10:00', title: 'Academia (Treino Intenso)', type: 'red', icon: 'Dumbbell', checked: false },
      { time: '12:30', title: 'Almoço em Família', type: 'gray', icon: 'Coffee', checked: false },
      { time: '14:00', title: 'DESCANSO TOTAL (Off-line)', type: 'gray', icon: 'Moon', checked: false },
      { time: '19:00', title: 'Planejamento da Semana', type: 'teal', icon: 'Target', checked: false },
      { time: '22:30', title: 'Preparação para Segunda', type: 'purple', icon: 'Moon', checked: false },
    ],
  },
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

const INITIAL_WORKOUT_PROFILE = {
  peso: 52,
  altura: 1.67,
  foco: 'Hipertrofia & Condicionamento'
};

const INITIAL_WORKOUTS = [
  {
    id: "terca",
    day: "Terça-feira",
    title: "Superiores A",
    focus: "Peito e Costas",
    duration: "1h10 - 1h20",
    color: "from-blue-500 to-cyan-500",
    exercises: [
      { name: "Supino Reto (Barra/Halteres)", sets: "4", reps: "8-10", rest: "2m", weight: "" },
      { name: "Puxada Aberta na Frente", sets: "4", reps: "8-12", rest: "2m", weight: "" },
      { name: "Desenvolvimento com Halteres", sets: "3", reps: "10-12", rest: "1.5m", weight: "" },
      { name: "Remada Curvada/Baixa", sets: "3", reps: "10-12", rest: "1.5m", weight: "" },
      { name: "Rosca Direta (Bíceps)", sets: "3", reps: "12-15", rest: "1m", weight: "" },
      { name: "Tríceps Corda", sets: "3", reps: "12-15", rest: "1m", weight: "" }
    ]
  },
  {
    id: "quinta",
    day: "Quinta-feira",
    title: "Inferiores A",
    focus: "Foco Quadríceps",
    duration: "1h15 - 1h20",
    color: "from-orange-500 to-amber-500",
    exercises: [
      { name: "Agachamento Livre/Smith", sets: "4", reps: "8-10", rest: "2-3m", weight: "" },
      { name: "Leg Press 45º", sets: "3", reps: "10-12", rest: "2m", weight: "" },
      { name: "Cadeira Extensora", sets: "3", reps: "12-15", rest: "1.5m", weight: "" },
      { name: "Cadeira Flexora", sets: "3", reps: "10-12", rest: "1.5m", weight: "" },
      { name: "Panturrilha em Pé", sets: "4", reps: "15-20", rest: "1m", weight: "" },
      { name: "Abdominal Supra", sets: "3", reps: "15-20", rest: "1m", weight: "" }
    ]
  },
  {
    id: "sexta",
    day: "Sexta-feira",
    title: "Superiores B",
    focus: "Ombros e Braços",
    duration: "1h10 - 1h20",
    color: "from-purple-500 to-pink-500",
    exercises: [
      { name: "Supino Inclinado (Halteres)", sets: "3", reps: "8-12", rest: "2m", weight: "" },
      { name: "Puxada Triângulo/Barra", sets: "3", reps: "8-12", rest: "2m", weight: "" },
      { name: "Elevação Lateral", sets: "4", reps: "12-15", rest: "1m", weight: "" },
      { name: "Crucifixo Inverso", sets: "3", reps: "12-15", rest: "1m", weight: "" },
      { name: "Rosca Martelo (Bíceps)", sets: "3", reps: "10-12", rest: "1m", weight: "" },
      { name: "Tríceps Testa/Francês", sets: "3", reps: "10-12", rest: "1m", weight: "" }
    ]
  },
  {
    id: "domingo",
    day: "Domingo",
    title: "Inferiores B",
    focus: "PESADO: Glúteos e Posterior",
    duration: "1h30 - 1h40",
    color: "from-red-500 to-rose-600",
    exercises: [
      { name: "Levantamento Terra/Stiff", sets: "4", reps: "6-8", rest: "3m", weight: "" },
      { name: "Elevação Pélvica", sets: "4", reps: "8-12", rest: "2m", weight: "" },
      { name: "Leg Press (Pés Altos)", sets: "3", reps: "10-12", rest: "2m", weight: "" },
      { name: "Mesa Flexora", sets: "3", reps: "10-15", rest: "1.5m", weight: "" },
      { name: "Cadeira Abdutora", sets: "3", reps: "15", rest: "1m", weight: "" },
      { name: "Panturrilha Sentado", sets: "4", reps: "15-20", rest: "1m", weight: "" }
    ]
  }
];


// --- HOOK DE PERSISTÊNCIA (Supabase Global) ---
const useSupabaseStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Usado para garantir que só disparamos save se o valor REALMENTE mudou (evita phantom saves do StrictMode)
  const lastSavedValue = React.useRef(JSON.stringify(initialValue));

  // 1. Buscar do Supabase ao abrir o site
  useEffect(() => {
    let isMounted = true;

    const fetchFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('app_state')
          .select('valor')
          .eq('chave', key)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.warn('Erro ao ler do Supabase:', error);
        }

        if (isMounted) {
          if (data && data.valor !== null) {
            // Atualiza nossa referência limpa com o que veio da nuvem
            lastSavedValue.current = JSON.stringify(data.valor);
            setStoredValue(data.valor);
          } else {
            await supabase.from('app_state').upsert({ chave: key, valor: initialValue });
          }
          setIsLoaded(true);
        }
      } catch (err) {
        console.warn('Erro crítico na leitura da nuvem:', err);
        if (isMounted) setIsLoaded(true);
      }
    };

    fetchFromSupabase();
    return () => { isMounted = false; };
  }, [key]);

  // 2. Salvar na nuvem com debounce e emitir eventos de status
  const isFirstMount = React.useRef(true);

  useEffect(() => {
    if (!isLoaded) return;

    // Ignora disparo bruto inicial
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // StrictMode pode causar múltiplos fetches e trocar a ref do storedValue, recriando arrays/objetos vazios ou idênticos.
    // Essa checagem final garante que o spinner só aparece se os dados de fato sofreram uma mudança manual do usuário
    const currentStringVal = JSON.stringify(storedValue);
    if (currentStringVal === lastSavedValue.current) {
      return;
    }

    lastSavedValue.current = currentStringVal;

    // Avisa a UI que está salvando
    window.dispatchEvent(new CustomEvent('hubvida_sync', { detail: 'saving' }));

    const updateSupabase = async () => {
      try {
        const { error } = await supabase
          .from('app_state')
          .upsert({ chave: key, valor: storedValue });

        if (error) {
          console.error('Erro ao salvar no Supabase:', error);
          window.dispatchEvent(new CustomEvent('hubvida_sync', { detail: 'error' }));
        } else {
          window.dispatchEvent(new CustomEvent('hubvida_sync', { detail: 'saved' }));
        }
      } catch (err) {
        console.error('Erro inesperado no save da nuvem:', err);
        window.dispatchEvent(new CustomEvent('hubvida_sync', { detail: 'error' }));
      }
    };

    const debounceId = setTimeout(updateSupabase, 1000);
    return () => clearTimeout(debounceId);
  }, [key, storedValue, isLoaded]);

  return [storedValue, setStoredValue, isLoaded];
};

// --- COMPONENTE PRINCIPAL APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('hubvida_activeTab') || 'Visão Geral');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('hubvida_activeTab', activeTab);
  }, [activeTab]);

  // Estados Persistentes - Global
  const [hardSkills, setHardSkills] = useSupabaseStorage('hubvida_hardSkills', INITIAL_HARD_SKILLS);
  const [englishLevel, setEnglishLevel] = useSupabaseStorage('hubvida_englishLevel', 100);
  const [softSkills, setSoftSkills] = useSupabaseStorage('hubvida_softSkills', SOFT_SKILLS_DATA);
  const [finances, setFinances, isFinancasLoaded] = useSupabaseStorage('hubvida_finances', INITIAL_FINANCES);
  const [productions, setProductions] = useSupabaseStorage('hubvida_productions', INITIAL_PRODUCTIONS);
  const [ideas, setIdeas] = useSupabaseStorage('hubvida_ideas', INITIAL_IDEAS);
  const [routinesData, setRoutinesData, isRotinaLoaded] = useSupabaseStorage('hubvida_routines_v2', ROUTINE_DATA);
  const [faculdadeData, setFaculdadeData, isFaculdadeLoaded] = useSupabaseStorage('hubvida_faculdadeData', INITIAL_FACULDADE);
  const [avisosPortal, setAvisosPortal] = useSupabaseStorage(
    'hubvida_avisos',
    'Fique atento aos prazos de submissão da AS-I no portal da Cruzeiro do Sul.'
  );
  const [crData, setCrData] = useSupabaseStorage('hubvida_crData', []);
  const [provas, setProvas] = useSupabaseStorage('hubvida_provas', []);

  // -- ESTADOS DA ACADEMIA (TREINO) --
  const [workoutProfile, setWorkoutProfile] = useSupabaseStorage('hubvida_workout_profile', INITIAL_WORKOUT_PROFILE);
  const [workouts, setWorkouts, isTreinosLoaded] = useSupabaseStorage('hubvida_workouts', INITIAL_WORKOUTS);

  // -- ESTADOS DE SONO --
  const [sleepGoal, setSleepGoal] = useSupabaseStorage('hubvida_sleep_goal', 8);
  const [sleepData, setSleepData] = useSupabaseStorage('hubvida_sleep_data', []);

  const [englishStreak, setEnglishStreak] = useSupabaseStorage('hubvida_english_streak', {
    count: 0,
    lastCheckin: null,
    longestStreak: 0,
  });
  const [habits, setHabits] = useSupabaseStorage('hubvida_habits', {
    ingles: [], // array de strings ISO "2026-03-08"
    ginasio: [],
    leitura: [],
  });

  // -- BRAIN DUMP --
  const [brainDumpNotes, setBrainDumpNotes, isBrainDumpLoaded] = useSupabaseStorage('hubvida_braindump_notes', []);

  // -- ACADEMIA TRACKER (Rotina Diária) --
  const [gymAttendance, setGymAttendance] = useSupabaseStorage('hubvida_gym_tracker_v2', {
    0: 'pending', 1: 'pending', 2: 'pending', 3: 'pending', 4: 'pending', 5: 'pending', 6: 'pending'
  });

  // -- NUTRIÇÃO --
  const [nutritionTracker, setNutritionTracker, isNutritionLoaded] = useSupabaseStorage('hubvida_nutrition_tracker', {
    water: false,
    creatine: false,
    meals: false,
  });

  // -- HAIRCARE --
  const [haircareDateDone, setHaircareDateDone] = useSupabaseStorage('hubvida_haircare_done_date', '');

  // LÓGICA DO CRONOGRAMA CAPILAR
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

  let haircareStatus = 'Day After';
  let haircareMessage = 'Modo Day After: Borrifador + Óleo para frizz.';
  let isWashDay = false;

  if (dayOfWeek === 2) { // Terça
    haircareStatus = 'Nutrição';
    haircareMessage = 'Hoje é dia de Lavagem: Nutrição. Lembre-se do Pré-Poo!';
    isWashDay = true;
  } else if (dayOfWeek === 4) { // Quinta
    haircareStatus = 'Hidratação';
    haircareMessage = 'Hoje é dia de Lavagem: Hidratação. Lembre-se do Pré-Poo!';
    isWashDay = true;
  } else if (dayOfWeek === 0) { // Domingo
    haircareStatus = 'Reconstrução + Acidificação';
    haircareMessage = 'Hoje é dia de Lavagem pesada: Reconstrução + Acidificação.';
    isWashDay = true;
  }

  // Verifica se a data atual "esfriou" o reset (Meia-noite limpou)
  const haircareTodayStr = today.toISOString().split('T')[0];
  const isHaircareDoneToday = haircareDateDone === haircareTodayStr;

  const toggleHaircareDone = () => {
    if (isHaircareDoneToday) {
      setHaircareDateDone('');
    } else {
      setHaircareDateDone(haircareTodayStr);
    }
  };

  // Estados Locais (UI Control)
  const [newSkill, setNewSkill] = useState({ category: 'Gestão (ADM)', name: '', level: 50, cert: '' });
  const [activeMonth, setActiveMonth] = useState(CURRENT_MONTH);
  const [newTransaction, setNewTransaction] = useState({ title: '', amount: '', type: 'expense', date: '', category: 'FIXOS' });
  const [newProd, setNewProd] = useState({ title: '', type: 'Artigo', status: 'Ideia' });
  const [newIdea, setNewIdea] = useState('');
  const [activeRoutine, setActiveRoutine] = useState(getInitialRoutine());
  const [newRoutineTask, setNewRoutineTask] = useState({ time: '', title: '' });
  const [activeRoadmapTab, setActiveRoadmapTab] = useState('Visão Geral');
  const [expandedYear, setExpandedYear] = useState('Ano 3');
  const [newCr, setNewCr] = useState({ disciplina: '', nota: '', creditos: '4' });
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  const [session, setSession] = useState(null);
  const [showTour, setShowTour] = useState(false);
  // -- TEMA CLARO/ESCURO --
  const [theme, setTheme] = useState(() => localStorage.getItem('hubvida_theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hubvida_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const [isAppReady, setIsAppReady] = useState(false);

  // --- SCROLL SPY (Atualiza Aba Ativa ao rolar a página) ---
  useEffect(() => {
    if (!isAppReady) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    const sections = document.querySelectorAll('.module-section');
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isAppReady]);


  useEffect(() => {
    const minDelay = new Promise(resolve => setTimeout(resolve, 800));

    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
      } catch (err) {
        console.warn('Sessão expirada ou token inválido limpo:', err);
      }
    };

    Promise.all([initSession(), minDelay]).then(() => {
      setIsAppReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session) {
        // Verifica onboarding
        const hasSeenTour = localStorage.getItem('@hubvida/hasSeenTour');
        if (!hasSeenTour) {
          setShowTour(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem('@hubvida/hasSeenTour', 'true');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Listener de eventos de sync
  useEffect(() => {
    const handler = (e) => {
      setSyncStatus(e.detail);
      if (e.detail === 'saved') {
        setTimeout(() => setSyncStatus(null), 3000); // Apaga o "Salvo" depois de 3s
      }
    };
    window.addEventListener('hubvida_sync', handler);
    return () => window.removeEventListener('hubvida_sync', handler);
  }, []);


  // -- RESET DA ROTINA (LÓGICA TEMPORAL) --
  const [lastRoutineDate, setLastRoutineDate] = useSupabaseStorage('hubvida_last_routine_date', '');
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (lastRoutineDate && lastRoutineDate !== todayStr && Object.keys(routinesData).length > 0) {
      let newData = { ...routinesData };
      Object.keys(newData).forEach(day => {
        newData[day].timeline = newData[day].timeline.map(t => ({ ...t, checked: false }));
      });
      setRoutinesData(newData);
      setLastRoutineDate(todayStr);
    } else if (lastRoutineDate === '') {
      setLastRoutineDate(todayStr);
    }
  }, [lastRoutineDate, routinesData]);

  const calculateCategoryAvg = (category) => {
    const skills = hardSkills.filter((s) => s.category === category);
    if (skills.length === 0) return 0;
    const sum = skills.reduce((acc, curr) => acc + Number(curr.level), 0);
    return sum / skills.length;
  };

  const calculateSoftSkillProgress = (category) => {
    const items = softSkills[category];
    const checkedCount = items.filter((item) => item.checked).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  const radarData = useMemo(() => ({
    gestao: calculateCategoryAvg('Gestão (ADM)'),
    ingles: englishLevel,
    pesquisa: calculateCategoryAvg('Pesquisa Científica'),
    ferramentas: calculateCategoryAvg('Ferramentas Digitais'),
    comunicacao: calculateSoftSkillProgress('comunicacao'),
  }), [hardSkills, englishLevel, softSkills]);

  const handleToggleSoftSkill = (category, id) =>
    setSoftSkills((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => item.id === id ? { ...item, checked: !item.checked } : item),
    }));

  const handleAddHardSkill = () => {
    if (!newSkill.name) return;
    setHardSkills([...hardSkills, { ...newSkill, id: Date.now() }]);
    setNewSkill({ category: 'Gestão (ADM)', name: '', level: 50, cert: '' });
  };

  const handleRemoveHardSkill = (id) => setHardSkills(hardSkills.filter((s) => s.id !== id));
  const handleUpdateHardSkill = (id, field, value) =>
    setHardSkills(hardSkills.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const handleAddProduction = () => {
    if (!newProd.title) return;
    setProductions([...productions, { id: Date.now(), ...newProd }]);
    setNewProd({ title: '', type: 'Artigo', status: 'Ideia' });
  };
  const handleDeleteProduction = (id) => setProductions(productions.filter((p) => p.id !== id));

  const handleAddIdea = () => {
    if (!newIdea) return;
    setIdeas([...ideas, { id: Date.now(), text: newIdea }]);
    setNewIdea('');
  };

  const handleAddCr = () => {
    if (!newCr.disciplina || !newCr.nota) return;
    setCrData([...crData, { id: Date.now(), ...newCr }]);
    setNewCr({ disciplina: '', nota: '', creditos: '4' });
  };
  const handleDeleteCr = (id) => setCrData(crData.filter((item) => item.id !== id));

  const currentMonthFinances = useMemo(() => {
    return finances.filter((f) => f.month === activeMonth);
  }, [finances, activeMonth]);

  const financeSummary = useMemo(() => {
    let income = 0;
    let expense = 0;
    let paidIncome = 0;
    let paidExpense = 0;
    currentMonthFinances.forEach((t) => {
      if (t.type === 'income') {
        income += Number(t.amount);
        if (t.status === 'paid') paidIncome += Number(t.amount);
      } else {
        expense += Number(t.amount);
        if (t.status === 'paid') paidExpense += Number(t.amount);
      }
    });
    const prevBalances = {
      MARÇO: 185.0,
      ABRIL: 338.53,
      MAIO: 296.37,
      JUNHO: 330.99,
    };
    const prevMonthBalance = prevBalances[activeMonth] || 0;
    const available = prevMonthBalance + paidIncome - paidExpense;
    return { income, expense, prevMonthBalance, available };
  }, [currentMonthFinances, activeMonth]);

  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.amount) return;
    setFinances([
      ...finances,
      {
        id: Date.now(),
        month: activeMonth,
        type: newTransaction.type,
        title: newTransaction.title,
        amount: Number(newTransaction.amount),
        date: newTransaction.date || 'Hoje',
        category: newTransaction.category,
        status: 'pending',
      },
    ]);
    setNewTransaction({ title: '', amount: '', type: 'expense', date: '', category: 'FIXOS' });
  };

  const handleToggleFinanceStatus = (id) =>
    setFinances(finances.map((f) => f.id === id ? { ...f, status: f.status === 'paid' ? 'pending' : 'paid' } : f));

  const handleDeleteFinance = (id) => setFinances(finances.filter((f) => f.id !== id));

  const handleAddRoutineTask = () => {
    if (!newRoutineTask.time || !newRoutineTask.title) return;
    setRoutinesData((prev) => ({
      ...prev,
      [activeRoutine]: {
        ...prev[activeRoutine],
        timeline: [
          ...prev[activeRoutine].timeline,
          {
            time: newRoutineTask.time,
            title: newRoutineTask.title,
            type: 'gray',
            icon: 'Target',
            checked: false,
          },
        ].sort((a, b) => a.time.localeCompare(b.time)),
      },
    }));
    setNewRoutineTask({ time: '', title: '' });
  };
  const handleRemoveRoutineTask = (index) => {
    setRoutinesData((prev) => {
      const newTimeline = [...prev[activeRoutine].timeline];
      newTimeline.splice(index, 1);
      return { ...prev, [activeRoutine]: { ...prev[activeRoutine], timeline: newTimeline } };
    });
  };
  const handleToggleRoutineTask = (index) => {
    setRoutinesData((prev) => {
      const newTimeline = [...prev[activeRoutine].timeline];
      newTimeline[index].checked = !newTimeline[index].checked;
      return { ...prev, [activeRoutine]: { ...prev[activeRoutine], timeline: newTimeline } };
    });
  };

  const handleUpdateFaculdade = (id, field, subfield, value) => {
    setFaculdadeData((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        if (subfield) return { ...d, [field]: { ...d[field], [subfield]: value } };
        return { ...d, [field]: value };
      })
    );
  };

  const calculateFinalGrade = (as, a1) => {
    if (!as || !a1) return null;
    return (Number(as) * 0.4 + Number(a1) * 0.6).toFixed(1);
  };

  const visaoGeralMetrics = useMemo(() => {
    let checkedAS = 0;
    let approvedSubjects = 0;
    const totalAS = faculdadeData.length * 4;

    faculdadeData.forEach((d) => {
      if (d.checks.as1) checkedAS++;
      if (d.checks.as2) checkedAS++;
      if (d.checks.as3) checkedAS++;
      if (d.checks.as4) checkedAS++;

      const grade = calculateFinalGrade(d.notas.as, d.notas.a1);
      if (grade && Number(grade) >= 7) approvedSubjects++;
    });

    return {
      progressoMes: totalAS > 0 ? Math.round((checkedAS / totalAS) * 100) : 0,
      disciplinasAprovadas: approvedSubjects,
      totalDisciplinas: faculdadeData.length,
    };
  }, [faculdadeData]);

  // Use the merged components logic in return
  return (
    <>
      <SplashScreen isReady={isAppReady} />

      {!session ? (
        <Auth />
      ) : (
        <div className="min-h-screen bg-hub-base flex flex-col md:flex-row font-sans selection:bg-yellow-500/30 text-hub-content">
          <InstallPWA />
          {session && <Onboarding isVisible={showTour} onClose={handleCloseTour} />}
          {/* Mobile Header Toggle */}
          <div className="md:hidden bg-hub-surface p-4 flex justify-between items-center border-b border-hub-border sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center font-black text-slate-900 text-lg">
                H
              </div>
              <span className="font-black tracking-widest text-hub-strong text-lg">
                HUBVIDA
              </span>
              {syncStatus === 'saving' && (
                <span className="flex items-center gap-1 text-[10px] text-hub-faint font-bold">
                  <Loader2 className="w-3 h-3 animate-spin" /> Salvando...
                </span>
              )}
              {syncStatus === 'saved' && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Salvo
                </span>
              )}
              {syncStatus === 'error' && (
                <span className="flex items-center gap-1 text-[10px] text-rose-500 font-bold">
                  <Cloud className="w-3 h-3" /> Erro
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="text-hub-faint p-2 hover:text-yellow-500 transition-colors"
                title="Alternar Tema"
              >
                <div className="relative w-5 h-5">
                  <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-[350ms] ease-in-out ${theme === 'dark' ? 'rotate-[360deg] scale-100 opacity-100' : 'rotate-0 scale-50 opacity-0'}`} />
                  <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-[350ms] ease-in-out ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-[360deg] scale-50 opacity-0'}`} />
                </div>
              </button>
              <button
                className="text-hub-strong p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>


          {/* Overlay for mobile clicking */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`w-64 bg-hub-surface flex flex-col border-r border-hub-border fixed md:sticky md:top-0 h-screen z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="p-6 hidden md:flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-md flex items-center justify-center font-black text-slate-900 text-lg">
                  H
                </div>
                <span className="font-black tracking-widest text-hub-strong text-lg">
                  HUBVIDA
                </span>
              </div>
              {/* Badge de Sync */}
              {syncStatus === 'saving' && (
                <span className="flex items-center gap-1 text-[10px] text-hub-faint font-bold mt-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Salvando na nuvem...
                </span>
              )}
              {syncStatus === 'saved' && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold mt-1">
                  <CheckCircle2 className="w-3 h-3" /> Salvo na nuvem ✓
                </span>
              )}
              {syncStatus === 'error' && (
                <span className="flex items-center gap-1 text-[10px] text-rose-500 font-bold mt-1">
                  <Cloud className="w-3 h-3" /> Falha ao sincronizar
                </span>
              )}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {[
                { name: 'Visão Geral', icon: Home },
                { name: 'Ph.D. Roadmap', icon: GraduationCap },
                { name: 'Rotina Diária', icon: Calendar },
                { name: 'Nutrição & Base', icon: Utensils },
                { name: 'Controle de Sono', icon: Moon },
                { name: 'Academia (Treino)', icon: Dumbbell },
                { name: 'Haircare', icon: Scissors },
                { name: 'Brain Dump', icon: Lightbulb },
                { name: 'Produção Acadêmica', icon: FileText },
                { name: 'Competências', icon: Brain },
                { name: 'Faculdade (ADM)', icon: Library },
                { name: 'Finanças', icon: Wallet },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const element = document.getElementById(item.name);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    setIsMobileMenuOpen(false); // Fecha o menu no mobile após clicar
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.name
                    ? 'bg-yellow-500/10 text-yellow-500 shadow-sm'
                    : 'text-hub-muted hover:bg-hub-hover hover:text-hub-strong'
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${activeTab === item.name ? 'text-yellow-500' : 'text-hub-muted'
                      }`}
                  />
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Changelog />
              </div>
            </nav>

            {/* Profile / Status Card */}
            <div className="p-4 border-t border-hub-border">
              <div className="bg-hub-hover rounded-xl p-3 space-y-3">
                {/* Linha principal: avatar + nome */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-hub-base text-yellow-500 font-black text-sm rounded-full flex items-center justify-center border-2 border-yellow-500/40">
                      AB
                    </div>
                    {/* Bolinha de status online */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1a1d24] rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-hub-strong leading-none">Abimael</p>
                    <p className="text-[9px] font-bold text-hub-faint uppercase tracking-widest mt-0.5 truncate">
                      Cruzeiro do Sul · ADM
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={toggleTheme}
                      className="group relative w-8 h-8 rounded-lg bg-hub-base flex items-center justify-center text-hub-faint hover:text-yellow-500 transition-all duration-300"
                      title="Alternar Tema"
                    >
                      <Sun className={`absolute w-4 h-4 transition-all duration-[350ms] ease-in-out ${theme === 'dark' ? 'rotate-[360deg] scale-100 opacity-100' : 'rotate-[-90deg] scale-50 opacity-0'}`} />
                      <Moon className={`absolute w-4 h-4 transition-all duration-[350ms] ease-in-out ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-[90deg] scale-50 opacity-0'}`} />
                    </button>
                    <KeyboardShortcuts
                      isMobileMenuOpen={isMobileMenuOpen}
                      setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                    <button
                      onClick={handleLogout}
                      className="w-8 h-8 rounded-lg bg-hub-base flex items-center justify-center text-hub-faint hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                      title="Sair e Bloquear"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Linha de data */}
                <div className="bg-hub-inner rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-hub-faint uppercase tracking-widest">
                    {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                  </span>
                  {/* Status do sync */}
                  {syncStatus === 'saving' && (
                    <span className="flex items-center gap-1 text-[9px] text-hub-faint font-bold">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" /> Salvando
                    </span>
                  )}
                  {syncStatus === 'saved' && (
                    <span className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Salvo ✓
                    </span>
                  )}
                  {syncStatus === 'error' && (
                    <span className="flex items-center gap-1 text-[9px] text-rose-500 font-bold">
                      <Cloud className="w-2.5 h-2.5" /> Erro
                    </span>
                  )}
                  {!syncStatus && (
                    <span className="flex items-center gap-1 text-[9px] text-slate-700 font-bold">
                      <Cloud className="w-2.5 h-2.5" /> Nuvem
                    </span>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-8 lg:p-12 flex flex-col">
            <div className="max-w-6xl mx-auto">

              {/* ALL COMPONENTS RENDERED SEQUENTIALLY FOR SCROLL REVEAL */}
              <div className="space-y-32 pb-32">

                <div id="Visão Geral" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <VisaoGeral
                      setActiveTab={setActiveTab}
                      englishLevel={englishLevel}
                      financeSummary={financeSummary}
                      activeMonth={activeMonth}
                      routinesData={routinesData}
                      activeRoutine={activeRoutine}
                      visaoGeralMetrics={visaoGeralMetrics}
                      radarData={radarData}
                      avisosPortal={avisosPortal}
                      setAvisosPortal={setAvisosPortal}
                      provas={provas}
                      setProvas={setProvas}
                      gymAttendance={gymAttendance}
                      sleepData={sleepData}
                      workoutProfile={workoutProfile}
                    />
                  </ScrollReveal>
                </div>

                <div id="Ph.D. Roadmap" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Roadmap
                      crData={crData}
                      newCr={newCr}
                      setNewCr={setNewCr}
                      handleAddCr={handleAddCr}
                      handleDeleteCr={handleDeleteCr}
                      activeRoadmapTab={activeRoadmapTab}
                      setActiveRoadmapTab={setActiveRoadmapTab}
                      expandedYear={expandedYear}
                      setExpandedYear={setExpandedYear}
                    />
                  </ScrollReveal>
                </div>

                <div id="Rotina Diária" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Rotina
                      isLoaded={isRotinaLoaded}
                      routinesData={routinesData}
                      activeRoutine={activeRoutine}
                      setActiveRoutine={setActiveRoutine}
                      newRoutineTask={newRoutineTask}
                      setNewRoutineTask={setNewRoutineTask}
                      handleAddRoutineTask={handleAddRoutineTask}
                      handleToggleRoutineTask={handleToggleRoutineTask}
                      handleRemoveRoutineTask={handleRemoveRoutineTask}
                      gymAttendance={gymAttendance}
                      setGymAttendance={setGymAttendance}
                    />
                  </ScrollReveal>
                </div>

                <div id="Nutrição & Base" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Nutricao
                      isLoaded={isNutritionLoaded}
                      dailyTracker={nutritionTracker}
                      setDailyTracker={setNutritionTracker}
                    />
                  </ScrollReveal>
                </div>

                <div id="Controle de Sono" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Sono
                      sleepGoal={sleepGoal} setSleepGoal={setSleepGoal}
                      sleepData={sleepData} setSleepData={setSleepData}
                    />
                  </ScrollReveal>
                </div>

                <div id="Academia (Treino)" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Treino
                      isLoaded={isTreinosLoaded}
                      workoutProfile={workoutProfile}
                      setWorkoutProfile={setWorkoutProfile}
                      workouts={workouts}
                      setWorkouts={setWorkouts}
                    />
                  </ScrollReveal>
                </div>

                <div id="Haircare" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Haircare
                      haircareStatus={haircareStatus}
                      haircareMessage={haircareMessage}
                      isWashDay={isWashDay}
                      isHaircareDoneToday={isHaircareDoneToday}
                      toggleHaircareDone={toggleHaircareDone}
                    />
                  </ScrollReveal>
                </div>

                <div id="Brain Dump" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <BrainDump
                      isLoaded={isBrainDumpLoaded}
                      notes={brainDumpNotes}
                      setNotes={setBrainDumpNotes}
                    />
                  </ScrollReveal>
                </div>

                <div id="Produção Acadêmica" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Producao
                      newProd={newProd}
                      setNewProd={setNewProd}
                      productions={productions}
                      handleAddProduction={handleAddProduction}
                      handleDeleteProduction={handleDeleteProduction}
                      newIdea={newIdea}
                      setNewIdea={setNewIdea}
                      handleAddIdea={handleAddIdea}
                      ideas={ideas}
                      setIdeas={setIdeas}
                    />
                  </ScrollReveal>
                </div>

                <div id="Competências" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Competencias
                      radarData={radarData}
                      englishLevel={englishLevel}
                      setEnglishLevel={setEnglishLevel}
                      hardSkills={hardSkills}
                      handleUpdateHardSkill={handleUpdateHardSkill}
                      handleRemoveHardSkill={handleRemoveHardSkill}
                      newSkill={newSkill}
                      setNewSkill={setNewSkill}
                      handleAddHardSkill={handleAddHardSkill}
                      softSkills={softSkills}
                      calculateSoftSkillProgress={calculateSoftSkillProgress}
                      handleToggleSoftSkill={handleToggleSoftSkill}
                      englishStreak={englishStreak}
                      setEnglishStreak={setEnglishStreak}
                      habits={habits}
                      setHabits={setHabits}
                    />
                  </ScrollReveal>
                </div>

                <div id="Faculdade (ADM)" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Faculdade
                      isLoaded={isFaculdadeLoaded}
                      faculdadeData={faculdadeData}
                      expandedSubject={expandedSubject}
                      setExpandedSubject={setExpandedSubject}
                      handleUpdateFaculdade={handleUpdateFaculdade}
                      calculateFinalGrade={calculateFinalGrade}
                    />
                  </ScrollReveal>
                </div>

                <div id="Finanças" className="scroll-mt-24 module-section">
                  <ScrollReveal delay={50}>
                    <Financas
                      isLoaded={isFinancasLoaded}
                      financeSummary={financeSummary}
                      activeMonth={activeMonth}
                      setActiveMonth={setActiveMonth}
                      currentMonthFinances={currentMonthFinances}
                      handleToggleFinanceStatus={handleToggleFinanceStatus}
                      handleDeleteFinance={handleDeleteFinance}
                      newTransaction={newTransaction}
                      setNewTransaction={setNewTransaction}
                      handleAddTransaction={handleAddTransaction}
                      MONTHS={MONTHS}
                    />
                  </ScrollReveal>
                </div>

              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}