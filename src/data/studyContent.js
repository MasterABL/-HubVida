import { 
  FileText, 
  Briefcase, 
  Search, 
  Target,
  Calendar
} from 'lucide-react';

export const STUDY_CONTENT = {
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
