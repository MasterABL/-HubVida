import { 
  FileText, 
  Briefcase, 
  Search, 
  Target,
  Calendar,
  Network,
  GitBranch,
  BarChart2,
  Layers,
  Users,
  TrendingUp,
} from 'lucide-react';

export const STUDY_CONTENT = {
  sistemas_adm: {
    id: 'sistemas_adm',
    title: 'Sistemas Administrativos',
    description: 'Teoria Geral dos Sistemas, SIG e Tomada de Decisão',
    sections: [
      {
        id: 'visao-geral',
        title: 'Visão Geral',
        icon: Target,
        content: `
          <h3>Sistemas Administrativos</h3>
          <p>O estudo de sistemas administrativos integra três eixos fundamentais para a gestão moderna.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div class="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
              <div class="text-blue-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 1</div>
              <h4 class="font-bold text-white mb-2">TGS</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Teoria Geral dos Sistemas — visão holística da organização como sistema aberto.</p>
            </div>
            <div class="bg-purple-600/10 border border-purple-500/20 p-5 rounded-2xl">
              <div class="text-purple-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 2</div>
              <h4 class="font-bold text-white mb-2">SIG</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Sistemas de Informações Gerenciais — suporte à gestão com dados estruturados.</p>
            </div>
            <div class="bg-emerald-600/10 border border-emerald-500/20 p-5 rounded-2xl">
              <div class="text-emerald-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 3</div>
              <h4 class="font-bold text-white mb-2">Decisão</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Processos de tomada de decisão — modelos racionais e comportamentais.</p>
            </div>
          </div>
        `
      },
      {
        id: 'tgs',
        title: 'Teoria Geral dos Sistemas',
        icon: Network,
        content: `
          <h3>TGS — Visão Sistêmica</h3>
          <p class="mb-6">A <strong>Teoria Geral dos Sistemas</strong> (Bertalanffy, 1968) propõe que organizações são sistemas abertos que interagem com o ambiente.</p>

          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Conceitos Fundamentais</h4>
          <div class="space-y-3 mb-8">
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Sistema:</span><span class="text-xs text-slate-400"> Conjunto de elementos inter-relacionados que formam um todo organizado com objetivo comum.</span></div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Subsistema:</span><span class="text-xs text-slate-400"> Parte do sistema com função específica (ex: RH, Financeiro, Marketing).</span></div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Sinergia:</span><span class="text-xs text-slate-400"> O todo é maior que a soma das partes — resultado da integração dos subsistemas.</span></div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Entropia:</span><span class="text-xs text-slate-400"> Tendência à desorganização; gerenciada por meio de informação e controle (negentropia).</span></div>
            </div>
          </div>

          <div class="p-6 bg-gradient-to-r from-blue-600/20 to-indigo-600/5 border border-blue-500/20 rounded-[2rem]">
            <h4 class="font-black text-white uppercase tracking-tighter mb-3">Sistema Aberto vs. Fechado</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Sistema Aberto</p>
                <p class="text-xs text-slate-300">Interage com o ambiente. Recebe inputs (entradas), processa e gera outputs (saídas). Modelo das organizações reais.</p>
              </div>
              <div>
                <p class="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2">Sistema Fechado</p>
                <p class="text-xs text-slate-300">Não interage com o ambiente. Conceito teórico, raramente aplicável a organizações humanas.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'sig',
        title: 'Sistemas de Informação Gerencial',
        icon: BarChart2,
        content: `
          <h3>SIG — Informação como Recurso Estratégico</h3>
          <p class="mb-6">O <strong>Sistema de Informação Gerencial</strong> coleta, processa e distribui dados para apoiar decisões nas organizações.</p>

          <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">Hierarquia da Informação</h4>
          <div class="flex flex-col gap-2 mb-8">
            <div class="p-4 bg-hub-surface border border-hub-border rounded-xl flex items-center gap-4">
              <span class="text-2xl font-black text-slate-700">01</span>
              <div>
                <h5 class="text-xs font-black text-white uppercase">Dados</h5>
                <p class="text-[10px] text-slate-400">Fatos brutos sem contexto. Ex: "200", "João", "15/03".</p>
              </div>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-xl flex items-center gap-4">
              <span class="text-2xl font-black text-slate-700">02</span>
              <div>
                <h5 class="text-xs font-black text-white uppercase">Informação</h5>
                <p class="text-[10px] text-slate-400">Dados contextualizados. Ex: "João vendeu 200 unidades em 15/03".</p>
              </div>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-xl flex items-center gap-4">
              <span class="text-2xl font-black text-slate-700">03</span>
              <div>
                <h5 class="text-xs font-black text-white uppercase">Conhecimento</h5>
                <p class="text-[10px] text-slate-400">Informação interpretada e aplicada para decisão estratégica.</p>
              </div>
            </div>
          </div>

          <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">Tipos de Sistemas por Nível</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
              <p class="text-[9px] font-black text-yellow-400 uppercase tracking-widest mb-2">Estratégico</p>
              <p class="text-xs font-bold text-white mb-1">EIS / SIE</p>
              <p class="text-[10px] text-slate-400">Suporte à alta administração. Visão de longo prazo e ambiente externo.</p>
            </div>
            <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Tático</p>
              <p class="text-xs font-bold text-white mb-1">SIG / MIS</p>
              <p class="text-[10px] text-slate-400">Suporte à gerência média. Relatórios periódicos e indicadores de desempenho.</p>
            </div>
            <div class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Operacional</p>
              <p class="text-xs font-bold text-white mb-1">SPT / TPS</p>
              <p class="text-[10px] text-slate-400">Controle de transações do dia a dia: compras, vendas, estoques.</p>
            </div>
          </div>
        `
      },
      {
        id: 'decisao',
        title: 'Tomada de Decisão',
        icon: Layers,
        content: `
          <h3>Processo Decisório</h3>
          <p class="mb-6">A <strong>tomada de decisão</strong> é o processo de escolher entre alternativas para resolver um problema ou aproveitar uma oportunidade.</p>

          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Modelo Racional (Simon)</h4>
          <div class="flex flex-col md:flex-row gap-3 mb-8">
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-blue-500 font-black text-xs">1</span>
              <p class="text-xs font-bold mt-1 text-white">Identificar o Problema</p>
            </div>
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-indigo-500 font-black text-xs">2</span>
              <p class="text-xs font-bold mt-1 text-white">Coletar Informações</p>
            </div>
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-purple-500 font-black text-xs">3</span>
              <p class="text-xs font-bold mt-1 text-white">Gerar Alternativas</p>
            </div>
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-emerald-500 font-black text-xs">4</span>
              <p class="text-xs font-bold mt-1 text-white">Escolher e Implementar</p>
            </div>
          </div>

          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Tipos de Decisão</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Decisões Programadas</h5>
              <p class="text-[11px] text-slate-400">Rotineiras, repetitivas. Regras e procedimentos pré-estabelecidos. Ex: reposição de estoque por ponto de pedido.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Decisões Não-Programadas</h5>
              <p class="text-[11px] text-slate-400">Inéditas, complexas, sem resposta prévia. Exigem julgamento e criatividade. Ex: fusão, novo mercado.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Decisão sob Certeza</h5>
              <p class="text-[11px] text-slate-400">Resultado completamente previsível para cada alternativa.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Decisão sob Risco/Incerteza</h5>
              <p class="text-[11px] text-slate-400">Resultados probabilísticos ou totalmente desconhecidos. Ferramentas: árvore de decisão, análise de cenários.</p>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        q: "O que é 'sinergia' na Teoria Geral dos Sistemas?",
        options: [
          "A tendência do sistema à desorganização",
          "A capacidade do sistema de manter equilíbrio interno",
          "O fenômeno em que o todo produz resultado maior que a soma das partes",
          "A hierarquia entre os subsistemas"
        ],
        correct: 2
      },
      {
        q: "Qual tipo de sistema de informação apoia a alta administração com visão de longo prazo?",
        options: [
          "SPT (Sistema de Processamento de Transações)",
          "SIG (Sistema de Informação Gerencial)",
          "EIS (Executive Information System)",
          "CRM (Customer Relationship Management)"
        ],
        correct: 2
      },
      {
        q: "Decisões 'não-programadas' são caracterizadas por:",
        options: [
          "Serem rotineiras e repetitivas com procedimentos pré-definidos",
          "Serem complexas, inéditas e sem resposta padrão disponível",
          "Terem resultado completamente previsível",
          "Serem exclusivamente operacionais"
        ],
        correct: 1
      },
      {
        q: "Qual é a diferença entre 'dado' e 'informação'?",
        options: [
          "Dado é mais complexo que informação",
          "Informação é dado interpretado e contextualizado para tomada de decisão",
          "São sinônimos na gestão moderna",
          "Dado é estratégico e informação é operacional"
        ],
        correct: 1
      },
      {
        q: "A 'entropia' em organizações refere-se a:",
        options: [
          "O crescimento acelerado do sistema",
          "A sinergia entre os subsistemas",
          "A tendência à desorganização que pode ser contida por informação e controle",
          "A hierarquia de autoridade formal"
        ],
        correct: 2
      }
    ]
  },

  estrutura_org: {
    id: 'estrutura_org',
    title: 'Estrutura Organizacional e Departamentização',
    description: 'Estrutura formal/informal, autoridade, responsabilidade e organogramas',
    sections: [
      {
        id: 'visao-geral',
        title: 'Visão Geral',
        icon: Target,
        content: `
          <h3>Estrutura Organizacional</h3>
          <p>Como as organizações se organizam internamente para coordenar esforços e alcançar objetivos.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div class="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
              <div class="text-blue-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 1</div>
              <h4 class="font-bold text-white mb-2">Estruturas</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Formal vs. informal — a estrutura desenhada e a que realmente existe na prática.</p>
            </div>
            <div class="bg-purple-600/10 border border-purple-500/20 p-5 rounded-2xl">
              <div class="text-purple-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 2</div>
              <h4 class="font-bold text-white mb-2">Autoridade</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Linha, Staff e delegação de responsabilidade nos níveis hierárquicos.</p>
            </div>
            <div class="bg-emerald-600/10 border border-emerald-500/20 p-5 rounded-2xl">
              <div class="text-emerald-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 3</div>
              <h4 class="font-bold text-white mb-2">Organogramas</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Representação gráfica da estrutura — tipos e como interpretar.</p>
            </div>
          </div>
        `
      },
      {
        id: 'formal-informal',
        title: 'Estrutura Formal e Informal',
        icon: Layers,
        content: `
          <h3>Dois Lados da Organização</h3>
          <p class="mb-6">Toda organização possui uma estrutura <strong>planejada</strong> e outra que <strong>emerge espontaneamente</strong> das relações humanas.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] border border-hub-border mb-8">
            <div class="bg-blue-500/10 p-6 border-b md:border-b-0 md:border-r border-hub-border">
              <h5 class="text-blue-500 font-bold uppercase text-[10px] tracking-widest mb-4">Estrutura Formal</h5>
              <ul class="space-y-2 text-[11px] text-blue-400/80 font-medium">
                <li>• Definida oficialmente pela administração</li>
                <li>• Representada pelo organograma</li>
                <li>• Cargos, funções e hierarquias explícitas</li>
                <li>• Canais de comunicação oficiais</li>
                <li>• Base para direitos e responsabilidades</li>
              </ul>
            </div>
            <div class="bg-purple-500/10 p-6">
              <h5 class="text-purple-500 font-bold uppercase text-[10px] tracking-widest mb-4">Estrutura Informal</h5>
              <ul class="space-y-2 text-[11px] text-purple-400/80 font-medium">
                <li>• Surge das relações sociais e afetivas</li>
                <li>• Não está no organograma</li>
                <li>• Líderes informais e grupos de afinidade</li>
                <li>• Boato (grapevine) como canal informal</li>
                <li>• Pode apoiar ou resistir à estrutura formal</li>
              </ul>
            </div>
          </div>

          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Tipos de Departamentização</h4>
          <div class="space-y-3">
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">Por Função</h5>
              <p class="text-[11px] text-slate-400">Agrupa atividades similares: Depto. de Vendas, Financeiro, RH. Mais comum e simples.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">Por Produto/Serviço</h5>
              <p class="text-[11px] text-slate-400">Organiza unidades em torno de produtos ou linhas de negócio específicas.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">Por Território</h5>
              <p class="text-[11px] text-slate-400">Unidades regionais ou geográficas. Ideal para empresas com operações distribuídas.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">Matricial</h5>
              <p class="text-[11px] text-slate-400">Combina funcional + projeto. Funcionário tem dois chefes. Maior flexibilidade, maior conflito potencial.</p>
            </div>
          </div>
        `
      },
      {
        id: 'autoridade',
        title: 'Autoridade e Responsabilidade',
        icon: Users,
        content: `
          <h3>Conceitos de Autoridade</h3>
          <p class="mb-6">Autoridade é o direito formal de tomar decisões e emitir ordens. <strong>Responsabilidade</strong> é a obrigação de cumprir essas ordens e prestar contas.</p>

          <h4 class="text-xs font-black text-amber-400 uppercase tracking-widest mb-4">Tipos de Autoridade</h4>
          <div class="space-y-4 mb-8">
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl hover:border-yellow-500/30 transition-all">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-6 h-6 bg-yellow-500 text-black text-[10px] font-black rounded flex items-center justify-center">L</span>
                <h5 class="font-bold text-white">Autoridade de Linha</h5>
              </div>
              <p class="text-[11px] text-slate-400">Relação direta entre superior e subordinado. Fluxo vertical de comando. Gerente → Supervisor → Operador.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl hover:border-blue-500/30 transition-all">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-6 h-6 bg-blue-500 text-white text-[10px] font-black rounded flex items-center justify-center">S</span>
                <h5 class="font-bold text-white">Autoridade de Staff</h5>
              </div>
              <p class="text-[11px] text-slate-400">Assessoria especializada sem poder de comando direto. Ex: Jurídico, Consultoria, P&D. Aconselha, não ordena.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl hover:border-purple-500/30 transition-all">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-6 h-6 bg-purple-500 text-white text-[10px] font-black rounded flex items-center justify-center">F</span>
                <h5 class="font-bold text-white">Autoridade Funcional</h5>
              </div>
              <p class="text-[11px] text-slate-400">Direito de controlar processos específicos em outros departamentos. Ex: RH define normas de treinamento para toda empresa.</p>
            </div>
          </div>

          <div class="p-6 bg-gradient-to-r from-amber-600/20 to-orange-600/5 border border-amber-500/20 rounded-[2rem]">
            <h4 class="font-black text-white uppercase tracking-tighter mb-3">Princípio da Paridade</h4>
            <p class="text-sm text-slate-300 leading-relaxed font-medium">
              <strong>Autoridade</strong> e <strong>responsabilidade</strong> devem ser equivalentes. Não se pode responsabilizar alguém por algo sobre o qual não tem poder de decisão — e vice-versa.
            </p>
          </div>
        `
      },
      {
        id: 'organogramas',
        title: 'Organogramas',
        icon: GitBranch,
        content: `
          <h3>Representação da Estrutura</h3>
          <p class="mb-6">O <strong>organograma</strong> é a representação gráfica e simplificada da estrutura formal da organização.</p>

          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Tipos de Organograma</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Clássico / Vertical</h5>
              <p class="text-[11px] text-slate-400">Mais comum. Hierarquia de cima para baixo. Presidente no topo, operacional na base.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Horizontal</h5>
              <p class="text-[11px] text-slate-400">Fluxo da esquerda para direita. Enfatiza o nível hierárquico com menos impressão de subordinação.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Circular / Radial</h5>
              <p class="text-[11px] text-slate-400">Alta direção no centro, demais unidades em círculos concêntricos. Reduz a sensação de hierarquia rígida.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-2">Matricial</h5>
              <p class="text-[11px] text-slate-400">Combina estrutura funcional com projetos. Duplo comando representado por eixos horizontal e vertical.</p>
            </div>
          </div>

          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">O que o Organograma mostra</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span class="text-xs font-bold text-slate-300">Divisão do trabalho e departamentos</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span class="text-xs font-bold text-slate-300">Níveis hierárquicos e amplitude de controle</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span class="text-xs font-bold text-slate-300">Linhas de autoridade e responsabilidade</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span class="text-xs font-bold text-slate-300">Canais de comunicação formal</span>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        q: "Qual é a principal diferença entre estrutura formal e informal?",
        options: [
          "A formal é mais eficiente; a informal é mais segura",
          "A formal é definida oficialmente e representada no organograma; a informal surge das relações espontâneas",
          "A formal é proibida por lei; a informal é incentivada",
          "São sinônimos utilizados em contextos diferentes"
        ],
        correct: 1
      },
      {
        q: "O que caracteriza a 'autoridade de Staff'?",
        options: [
          "Poder de comando direto sobre todos os departamentos",
          "Relação hierárquica direta entre superior e subordinado",
          "Assessoria especializada sem poder de comando direto",
          "Controle funcional sobre processos específicos"
        ],
        correct: 2
      },
      {
        q: "O 'Princípio da Paridade' determina que:",
        options: [
          "Todos os funcionários devem ter o mesmo salário",
          "Autoridade e responsabilidade devem ser equivalentes",
          "O organograma deve ser simétrico",
          "Linha e Staff devem ter o mesmo nível hierárquico"
        ],
        correct: 1
      },
      {
        q: "Qual tipo de departamentização é mais comum e agrupa atividades similares como Vendas, RH e Financeiro?",
        options: [
          "Por Produto",
          "Matricial",
          "Por Função",
          "Por Território"
        ],
        correct: 2
      },
      {
        q: "Em um organograma circular, onde fica a alta direção?",
        options: [
          "No topo, acima de todos os outros níveis",
          "À esquerda, no início do fluxo",
          "No centro, com as demais unidades em círculos ao redor",
          "Na base, por ser o mais próximo do cliente"
        ],
        correct: 2
      }
    ]
  },

  processos: {
    id: 'processos',
    title: 'Processos Empresariais',
    description: 'Conceitos, ferramentas de análise, melhoria de processos e fluxogramas',
    sections: [
      {
        id: 'visao-geral',
        title: 'Visão Geral',
        icon: Target,
        content: `
          <h3>Processos Empresariais</h3>
          <p>O mapeamento e melhoria de processos é base para a eficiência operacional e vantagem competitiva.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div class="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
              <div class="text-blue-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 1</div>
              <h4 class="font-bold text-white mb-2">Conceitos</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Definição, tipos e elementos que compõem um processo empresarial.</p>
            </div>
            <div class="bg-purple-600/10 border border-purple-500/20 p-5 rounded-2xl">
              <div class="text-purple-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 2</div>
              <h4 class="font-bold text-white mb-2">Ferramentas</h4>
              <p class="text-xs text-slate-400 leading-relaxed">BPMN, Diagrama de Ishikawa, 5W2H e outras ferramentas de análise.</p>
            </div>
            <div class="bg-emerald-600/10 border border-emerald-500/20 p-5 rounded-2xl">
              <div class="text-emerald-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 3</div>
              <h4 class="font-bold text-white mb-2">Fluxogramas</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Simbologia, tipos e como modelar fluxos de trabalho visualmente.</p>
            </div>
          </div>
        `
      },
      {
        id: 'conceitos',
        title: 'Conceitos de Processos',
        icon: Briefcase,
        content: `
          <h3>O que é um Processo?</h3>
          <p class="mb-6">Um <strong>processo</strong> é um conjunto de atividades inter-relacionadas que transforma <em>entradas</em> (inputs) em <em>saídas</em> (outputs) com valor para o cliente.</p>

          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Elementos do Processo</h4>
          <div class="space-y-3 mb-8">
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Entradas (Inputs):</span><span class="text-xs text-slate-400"> Recursos, informações ou materiais que iniciam o processo.</span></div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Atividades:</span><span class="text-xs text-slate-400"> Conjunto de tarefas que transformam as entradas. Cada atividade agrega valor.</span></div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Saídas (Outputs):</span><span class="text-xs text-slate-400"> Produto ou serviço resultante entregue ao cliente interno ou externo.</span></div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
              <div><span class="text-xs font-bold text-white">Feedback:</span><span class="text-xs text-slate-400"> Retorno sobre o resultado que permite controle e melhoria contínua.</span></div>
            </div>
          </div>

          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Tipos de Processos</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <p class="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Finalísticos</p>
              <p class="text-xs text-slate-300">Entregam valor direto ao cliente. Ex: produção, vendas, atendimento.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <p class="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-2">De Suporte</p>
              <p class="text-xs text-slate-300">Apoiam os finalísticos. Ex: TI, RH, contabilidade, manutenção.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <p class="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Gerenciais</p>
              <p class="text-xs text-slate-300">Planejamento, controle e governança. Ex: planejamento estratégico, auditoria.</p>
            </div>
          </div>
        `
      },
      {
        id: 'ferramentas',
        title: 'Ferramentas de Análise',
        icon: TrendingUp,
        content: `
          <h3>Ferramentas para Melhoria de Processos</h3>
          <p class="mb-6">A análise de processos utiliza ferramentas estruturadas para identificar causas de problemas e orientar melhorias.</p>

          <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">5W2H</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div class="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
              <p class="font-black text-blue-400 text-sm">What?</p>
              <p class="text-[10px] text-slate-400">O que fazer?</p>
            </div>
            <div class="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
              <p class="font-black text-purple-400 text-sm">Why?</p>
              <p class="text-[10px] text-slate-400">Por quê?</p>
            </div>
            <div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
              <p class="font-black text-emerald-400 text-sm">Who?</p>
              <p class="text-[10px] text-slate-400">Quem fará?</p>
            </div>
            <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
              <p class="font-black text-amber-400 text-sm">Where?</p>
              <p class="text-[10px] text-slate-400">Onde?</p>
            </div>
            <div class="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
              <p class="font-black text-rose-400 text-sm">When?</p>
              <p class="text-[10px] text-slate-400">Quando?</p>
            </div>
            <div class="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-center">
              <p class="font-black text-sky-400 text-sm">How?</p>
              <p class="text-[10px] text-slate-400">Como?</p>
            </div>
            <div class="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-center md:col-span-2">
              <p class="font-black text-indigo-400 text-sm">How Much?</p>
              <p class="text-[10px] text-slate-400">Quanto custa?</p>
            </div>
          </div>

          <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">Diagrama de Ishikawa (Espinha de Peixe)</h4>
          <div class="p-6 bg-hub-surface border border-hub-border rounded-2xl mb-8">
            <p class="text-sm text-slate-300 mb-4">Identifica as causas-raiz de um problema, organizadas em categorias (6M):</p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div class="p-3 border border-hub-border rounded-xl"><p class="text-[10px] font-black text-white uppercase">Método</p><p class="text-[10px] text-slate-400">Processos e procedimentos</p></div>
              <div class="p-3 border border-hub-border rounded-xl"><p class="text-[10px] font-black text-white uppercase">Máquina</p><p class="text-[10px] text-slate-400">Equipamentos e tecnologia</p></div>
              <div class="p-3 border border-hub-border rounded-xl"><p class="text-[10px] font-black text-white uppercase">Material</p><p class="text-[10px] text-slate-400">Matéria-prima e insumos</p></div>
              <div class="p-3 border border-hub-border rounded-xl"><p class="text-[10px] font-black text-white uppercase">Mão de Obra</p><p class="text-[10px] text-slate-400">Pessoas e competências</p></div>
              <div class="p-3 border border-hub-border rounded-xl"><p class="text-[10px] font-black text-white uppercase">Medida</p><p class="text-[10px] text-slate-400">Indicadores e controles</p></div>
              <div class="p-3 border border-hub-border rounded-xl"><p class="text-[10px] font-black text-white uppercase">Meio Ambiente</p><p class="text-[10px] text-slate-400">Condições do trabalho</p></div>
            </div>
          </div>

          <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">Ciclo PDCA</h4>
          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center"><span class="text-blue-500 font-black">P</span><p class="text-xs font-bold mt-1 text-white">Plan</p><p class="text-[10px] text-slate-400">Planejar</p></div>
            <div class="flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center"><span class="text-emerald-500 font-black">D</span><p class="text-xs font-bold mt-1 text-white">Do</p><p class="text-[10px] text-slate-400">Executar</p></div>
            <div class="flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center"><span class="text-amber-500 font-black">C</span><p class="text-xs font-bold mt-1 text-white">Check</p><p class="text-[10px] text-slate-400">Verificar</p></div>
            <div class="flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center"><span class="text-rose-500 font-black">A</span><p class="text-xs font-bold mt-1 text-white">Act</p><p class="text-[10px] text-slate-400">Agir</p></div>
          </div>
        `
      },
      {
        id: 'fluxogramas',
        title: 'Fluxogramas',
        icon: GitBranch,
        content: `
          <h3>Representação Visual de Processos</h3>
          <p class="mb-6">O <strong>fluxograma</strong> é a representação gráfica do fluxo sequencial de atividades, decisões e documentos de um processo.</p>

          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Simbologia Básica</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="flex items-center gap-4 p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <div class="w-12 h-8 bg-blue-500/20 border-2 border-blue-500 rounded flex items-center justify-center shrink-0">
                <span class="text-[8px] font-black text-blue-400">PROC</span>
              </div>
              <div>
                <p class="text-xs font-bold text-white">Retângulo</p>
                <p class="text-[10px] text-slate-400">Atividade ou processo a ser executado.</p>
              </div>
            </div>
            <div class="flex items-center gap-4 p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <div class="w-12 h-10 bg-amber-500/20 border-2 border-amber-500 rotate-45 shrink-0 flex items-center justify-center">
                <span class="text-[7px] font-black text-amber-400 -rotate-45">DEC</span>
              </div>
              <div>
                <p class="text-xs font-bold text-white">Losango</p>
                <p class="text-[10px] text-slate-400">Decisão / ponto de bifurcação (Sim/Não).</p>
              </div>
            </div>
            <div class="flex items-center gap-4 p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <div class="w-12 h-8 bg-emerald-500/20 border-2 border-emerald-500 rounded-full shrink-0 flex items-center justify-center">
                <span class="text-[8px] font-black text-emerald-400">INI</span>
              </div>
              <div>
                <p class="text-xs font-bold text-white">Oval / Elipse</p>
                <p class="text-[10px] text-slate-400">Início ou fim do processo (terminal).</p>
              </div>
            </div>
            <div class="flex items-center gap-4 p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <div class="w-12 h-8 bg-purple-500/20 border-2 border-purple-500 shrink-0 flex items-center justify-center" style="clip-path: polygon(0 100%, 0 0, 100% 0, 100% 70%, 85% 100%)">
                <span class="text-[8px] font-black text-purple-400">DOC</span>
              </div>
              <div>
                <p class="text-xs font-bold text-white">Documento</p>
                <p class="text-[10px] text-slate-400">Indica a criação ou uso de um documento no processo.</p>
              </div>
            </div>
          </div>

          <h4 class="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Tipos de Fluxogramas</h4>
          <div class="space-y-3">
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">Vertical</h5>
              <p class="text-[11px] text-slate-400">Fluxo de cima para baixo. Simples, para processos lineares sem muitas decisões.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">Horizontal (Swimlane)</h5>
              <p class="text-[11px] text-slate-400">Raias horizontais por departamento/responsável. Ideal para mostrar a passagem de responsabilidade entre áreas.</p>
            </div>
            <div class="p-4 bg-hub-surface border border-hub-border rounded-2xl">
              <h5 class="font-bold text-white mb-1">BPMN (Business Process Model and Notation)</h5>
              <p class="text-[11px] text-slate-400">Notação padronizada internacionalmente. Mais rica em símbolos, usada em automação e sistemas ERP.</p>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        q: "O que são 'outputs' em um processo empresarial?",
        options: [
          "Os recursos e informações que iniciam o processo",
          "Os problemas encontrados durante a execução",
          "O produto ou serviço resultante entregue ao cliente",
          "Os custos associados às atividades do processo"
        ],
        correct: 2
      },
      {
        q: "O que o símbolo de losango representa em um fluxograma?",
        options: [
          "Uma atividade ou processo",
          "O início ou fim do processo",
          "Um documento gerado",
          "Uma decisão com bifurcação Sim/Não"
        ],
        correct: 3
      },
      {
        q: "No Ciclo PDCA, a letra 'C' corresponde a:",
        options: [
          "Create (Criar)",
          "Check (Verificar)",
          "Control (Controlar)",
          "Continue (Continuar)"
        ],
        correct: 1
      },
      {
        q: "O Diagrama de Ishikawa (Espinha de Peixe) é utilizado para:",
        options: [
          "Mapear o fluxo sequencial de atividades",
          "Identificar as causas-raiz de um problema",
          "Calcular o custo de um processo",
          "Definir os responsáveis por cada atividade"
        ],
        correct: 1
      },
      {
        q: "Qual tipo de processo entrega valor diretamente ao cliente externo?",
        options: [
          "Processo de Suporte",
          "Processo Gerencial",
          "Processo Finalístico",
          "Processo de Controle"
        ],
        correct: 2
      }
    ]
  },


  osm: {
    id: 'osm',
    title: 'Organização, Sistemas e Métodos',
    description: 'Métodos Empresariais e Manuais Administrativos (Unidade 4)',
    sections: [
      {
        id: 'visao-geral',
        title: 'Visão Geral',
        icon: Target,
        content: `
          <h3>Métodos Empresariais</h3>
          <p>O foco desta unidade é entender os métodos e rotinas de trabalho como base para o desenvolvimento organizacional contemporâneo.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div class="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
              <div class="text-blue-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 1</div>
              <h4 class="font-bold text-white mb-2">Métodos</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Conceitos, definições fundamentais e aplicação prática na estruturação.</p>
            </div>
            <div class="bg-purple-600/10 border border-purple-500/20 p-5 rounded-2xl">
              <div class="text-purple-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 2</div>
              <h4 class="font-bold text-white mb-2">Manuais</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Características, tipos e importância dos instrumentos formais de documentação.</p>
            </div>
            <div class="bg-emerald-600/10 border border-emerald-500/20 p-5 rounded-2xl">
              <div class="text-emerald-400 font-black mb-2 uppercase text-[10px] tracking-widest">Tópico 3</div>
              <h4 class="font-bold text-white mb-2">Metodologia</h4>
              <p class="text-xs text-slate-400 leading-relaxed">Análise, desenvolvimento e implementação de sistemas administrativos.</p>
            </div>
          </div>
        `
      },
      {
        id: 'metodos',
        title: 'Métodos e Rotinas',
        icon: Briefcase,
        content: `
          <h3>Conceitos de Trabalho</h3>
          <p class="mb-6">O <strong>Método</strong> é a maneira de executar uma rotina de trabalho. Sem métodos, a empresa perde o "como fazer".</p>
          
          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Rotina de Trabalho</h4>
          <div class="space-y-3 mb-8">
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <span class="text-xs font-bold text-slate-300">Forma pela qual as tarefas são realizadas</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <span class="text-xs font-bold text-slate-300">Execução por procedimentos padronizados</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <span class="text-xs font-bold text-slate-300">Sequência de atos observados pela força do hábito</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-hub-inner/30 border border-hub-border rounded-xl">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <span class="text-xs font-bold text-slate-300">Conjunto de procedimentos para execução de uma atividade</span>
            </div>
          </div>
          
          <div class="p-6 bg-gradient-to-r from-amber-600/20 to-orange-600/5 border border-amber-500/20 rounded-[2rem] relative overflow-hidden">
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-3">
                <span class="px-2 py-0.5 bg-amber-500 text-slate-900 text-[8px] font-black uppercase rounded">Card Especial</span>
                <h4 class="font-black text-white uppercase tracking-tighter">O que é um Projeto?</h4>
              </div>
              <p class="text-sm text-slate-300 leading-relaxed font-medium">
                Diferente da rotina, o projeto é um trabalho com <strong>responsabilidades específicas</strong>, resultado esperado, benefícios claros e <strong>prazos preestabelecidos</strong>, envolvendo recursos limitados.
              </p>
            </div>
          </div>
        `
      },
      {
        id: 'manuais',
        title: 'Manuais Administrativos',
        icon: FileText,
        content: `
          <h3>Instrumentos de Padronização</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div class="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl">
              <p class="italic text-[10px] text-slate-400 mb-2">Oliveira (2011)</p>
              <p class="text-xs text-slate-200">"Documentos elaborados para uniformizar procedimentos e racionalizar métodos."</p>
            </div>
            <div class="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
              <p class="italic text-[10px] text-slate-400 mb-2">Cury (2010)</p>
              <p class="text-xs text-slate-200">"Ferramenta de comunicação oficial que expressa as regras de funcionamento."</p>
            </div>
          </div>

          <h4 class="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">Tipos de Manuais (Frentre & Verso)</h4>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="text-[10px] font-black uppercase tracking-widest">Manual de</span><span class="text-xs font-bold mt-1">Organização</span></div>
                <div class="flip-card-back"><p class="text-[10px] leading-relaxed">Mostra organogramas, níveis de autoridade e estrutura formal da empresa.</p></div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="text-[10px] font-black uppercase tracking-widest">Manual de</span><span class="text-xs font-bold mt-1">Procedimentos</span></div>
                <div class="flip-card-back"><p class="text-[10px] leading-relaxed">Descreve como cada passo das tarefas deve ser executado.</p></div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="text-[10px] font-black uppercase tracking-widest">Manual de</span><span class="text-xs font-bold mt-1">Políticas</span></div>
                <div class="flip-card-back"><p class="text-[10px] leading-relaxed">Fixa diretrizes sobre áreas como RH, Marketing e Financeiro.</p></div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="text-[10px] font-black uppercase tracking-widest">Manual de</span><span class="text-xs font-bold mt-1">Instruções Especializadas</span></div>
                <div class="flip-card-back"><p class="text-[10px] leading-relaxed">Focado em nichos técnicos ou ferramentas específicas da operação.</p></div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="text-[10px] font-black uppercase tracking-widest">Manual do</span><span class="text-xs font-bold mt-1">Funcionário</span></div>
                <div class="flip-card-back"><p class="text-[10px] leading-relaxed">Recepciona o colaborador com direitos, deveres e missão da empresa.</p></div>
              </div>
            </div>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front"><span class="text-[10px] font-black uppercase tracking-widest">Manual de</span><span class="text-xs font-bold mt-1">Finalidade Múltipla</span></div>
                <div class="flip-card-back"><p class="text-[10px] leading-relaxed">Combina vários dos manuais acima em um único volume integrado.</p></div>
              </div>
            </div>
          </div>

          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Análise Crítica</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] border border-hub-border">
            <div class="bg-emerald-500/10 p-6 border-b md:border-b-0 md:border-r border-hub-border">
              <h5 class="text-emerald-500 font-bold uppercase text-[10px] tracking-widest mb-4">Fatores Positivos</h5>
              <ul class="space-y-2 text-[11px] text-emerald-400/80 font-medium">
                <li>• Legado histórico / Fonte de informação</li>
                <li>• Treinamento de pessoal facilitado</li>
                <li>• Fixam critérios e padrões</li>
                <li>• Evitam improvisações</li>
              </ul>
            </div>
            <div class="bg-rose-500/10 p-6">
              <h5 class="text-rose-500 font-bold uppercase text-[10px] tracking-widest mb-4">Fatores Negativos</h5>
              <ul class="space-y-2 text-[11px] text-rose-400/80 font-medium">
                <li>• Podem inibir a iniciativa pessoal</li>
                <li>• Alto custo de manutenção</li>
                <li>• Redação muitas vezes pouco clara</li>
                <li>• Difícil atualização constante</li>
              </ul>
            </div>
          </div>
        `
      },
      {
        id: 'metodologia',
        title: 'Metodologia de Análise',
        icon: Search,
        content: `
          <h3>Fluxo da Metodologia</h3>
          <div class="flex flex-col md:flex-row gap-4 mb-16 mt-8">
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-blue-500 font-black text-xs">1</span>
              <p class="text-xs font-bold mt-1">Preparação</p>
            </div>
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-indigo-500 font-black text-xs">2</span>
              <p class="text-xs font-bold mt-1">Execução da Análise</p>
            </div>
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-purple-500 font-black text-xs">3</span>
              <p class="text-xs font-bold mt-1">Implantação</p>
            </div>
            <div class="flow-step flex-1 p-4 bg-hub-surface border border-hub-border rounded-xl text-center">
              <span class="text-emerald-500 font-black text-xs">4</span>
              <p class="text-xs font-bold mt-1">Controle</p>
            </div>
          </div>

          <h4 class="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Técnicas de Levantamento</h4>
          <div class="space-y-4">
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl hover:border-blue-500/50 transition-all group">
              <h5 class="font-bold text-white mb-1">Entrevista</h5>
              <p class="text-[11px] text-slate-400">Qualitativa. Face a face. <strong>Restrição:</strong> Elevado custo e tempo.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl hover:border-emerald-500/50 transition-all group">
              <h5 class="font-bold text-white mb-1">Questionário</h5>
              <p class="text-[11px] text-slate-400">Quantitativa. Independente do pesquisador. <strong>Restrição:</strong> Interpretável erros e baixa resposta.</p>
            </div>
            <div class="p-5 bg-hub-surface border border-hub-border rounded-2xl hover:border-purple-500/50 transition-all group">
              <h5 class="font-bold text-white mb-1">Observação Pessoal</h5>
              <p class="text-[11px] text-slate-400">Direta no local. Entende o clima. <strong>Restrição:</strong> Envolvimento emocional e tempo.</p>
            </div>
          </div>
        `
      },
      {
        id: 'cronograma',
        title: 'Cronograma e Controle',
        icon: Calendar,
        content: `
          <h3>Ferramenta de Controle</h3>
          <p class="mb-8">O cronograma serve para acompanhar se o planejado está de acordo com o realizado.</p>

          <div class="space-y-4">
            <div class="flex items-center gap-6 p-4 rounded-xl border border-hub-border bg-hub-inner/30">
              <span class="text-3xl font-black text-slate-700">01</span>
              <div>
                <h4 class="text-xs font-black uppercase text-blue-400">Definição de Padrões</h4>
                <p class="text-[10px] text-slate-400">Estabelecer o que é esperado do processo.</p>
              </div>
            </div>
            <div class="flex items-center gap-6 p-4 rounded-xl border border-hub-border bg-hub-inner/30">
              <span class="text-3xl font-black text-slate-700">02</span>
              <div>
                <h4 class="text-xs font-black uppercase text-blue-400">Medida de Desempenho</h4>
                <p class="text-[10px] text-slate-400">Capturar os dados reais da operação atual.</p>
              </div>
            </div>
            <div class="flex items-center gap-6 p-4 rounded-xl border border-hub-border bg-hub-inner/30">
              <span class="text-3xl font-black text-slate-700">03</span>
              <div>
                <h4 class="text-xs font-black uppercase text-blue-400">Comparação</h4>
                <p class="text-[10px] text-slate-400">Analisar desvios entre previsto vs realizado.</p>
              </div>
            </div>
            <div class="flex items-center gap-6 p-4 rounded-xl border border-hub-border bg-hub-inner/30">
              <span class="text-3xl font-black text-slate-700">04</span>
              <div>
                <h4 class="text-xs font-black uppercase text-blue-400">Ação Corretiva</h4>
                <p class="text-[10px] text-slate-400">Ajustar os métodos para retornar ao padrão.</p>
              </div>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        q: "O que é uma Rotina de Trabalho segundo OSM?",
        options: [
          "Um projeto com prazo definido",
          "A sequência padronizada de procedimentos para executar uma atividade",
          "Um manual de instruções especializadas",
          "Um sistema de informação integrado"
        ],
        correct: 1
      },
      {
        q: "Qual tipo de manual apresenta organogramas e níveis de autoridade?",
        options: [
          "Manual do Funcionário",
          "Manual de Finalidade Múltipla",
          "Manual de Organização",
          "Manual de Políticas e Diretrizes"
        ],
        correct: 2
      },
      {
        q: "Qual técnica de levantamento é melhor para dados quantitativos e estatísticos?",
        options: [
          "Observação Pessoal",
          "Entrevista",
          "Questionário",
          "Fluxograma"
        ],
        correct: 2
      },
      {
        q: "Qual é a ordem correta das etapas da Metodologia de Análise de Sistemas?",
        options: [
          "Implantação → Preparação → Execução → Controle",
          "Preparação → Execução → Implantação → Controle",
          "Controle → Preparação → Execução → Implantação",
          "Execução → Controle → Preparação → Implantação"
        ],
        correct: 1
      },
      {
        q: "O que é 'personificação' de procedimentos e por que é um problema?",
        options: [
          "Quando o manual tem muitas páginas",
          "Quando só uma pessoa sabe executar o trabalho, paralisando a empresa se ela se ausentar",
          "Quando o manual tem linguagem muito técnica",
          "Quando o organograma tem muitos níveis"
        ],
        correct: 1
      }
    ]
  }
};
