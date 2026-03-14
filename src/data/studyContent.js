import { 
  FileText, 
  Briefcase, 
  Search, 
  Target
} from 'lucide-react';

export const STUDY_CONTENT = {
  osm: {
    id: 'osm',
    title: 'Organização, Sistemas e Métodos',
    description: 'Métodos Empresariais e Manuais Administrativos',
    sections: [
      {
        id: 'visao-geral',
        title: 'Visão Geral',
        icon: Target,
        content: `
          <h3>Objetivos de Aprendizado</h3>
          <p>Entender os aspectos relevantes dos Métodos Empresariais necessários para o desenvolvimento das empresas contemporâneas. A organização é analisada na perspectiva dos seus métodos e rotinas de trabalho.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
              <h4 class="font-bold text-blue-400 mb-2">Métodos</h4>
              <p class="text-xs">Conceitos e definições fundamentais para a estruturação do trabalho.</p>
            </div>
            <div class="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
              <h4 class="font-bold text-purple-400 mb-2">Manuais</h4>
              <p class="text-xs">Uso de instrumentos formais para documentação e padronização.</p>
            </div>
          </div>
        `
      },
      {
        id: 'metodos',
        title: 'Métodos e Rotinas',
        icon: Briefcase,
        content: `
          <h3>Conceitos e Definições</h3>
          <p>Os Métodos consistem na maneira ou forma de se executar uma rotina de trabalho.</p>
          
          <div class="space-y-4 mt-6">
            <div class="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h4 class="font-bold text-sm mb-2">Rotina de Trabalho</h4>
              <ul class="list-disc list-inside text-xs space-y-1 text-slate-400">
                <li>Forma pela qual as tarefas são realizadas</li>
                <li>Execução por meio de procedimentos padronizados</li>
                <li>Sequência de atos observados pela força do hábito</li>
                <li>Conjunto de procedimentos para execução de uma atividade</li>
              </ul>
            </div>
            
            <div class="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
              <h4 class="font-bold text-sm text-amber-400 mb-2">Projeto</h4>
              <p class="text-xs">Trabalho a ser executado com responsabilidades, resultados esperados, benefícios e prazos preestabelecidos, considerando recursos e áreas envolvidas.</p>
            </div>
          </div>
        `
      },
      {
        id: 'manuais',
        title: 'Manuais Administrativos',
        icon: FileText,
        content: `
          <h3>Tipos de Manuais</h3>
          <p>Documentos elaborados para uniformizar procedimentos e racionalizar métodos.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
              <strong class="text-blue-400">Manual de Organização:</strong> Estrutura, organogramas e níveis de autoridade.
            </div>
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
              <strong class="text-emerald-400">Normas e Procedimentos:</strong> Fluxogramas e execução de processos.
            </div>
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
              <strong class="text-purple-400">Políticas e Diretrizes:</strong> Descreve políticas internas (RH, Mkt).
            </div>
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
              <strong class="text-orange-400">Manual do Funcionário:</strong> Direitos, deveres e histórico da empresa.
            </div>
          </div>

          <div class="mt-8 overflow-hidden rounded-xl border border-slate-800">
            <table class="w-full text-xs">
              <thead>
                <tr class="bg-slate-800">
                  <th class="p-3 text-left">Fatores Positivos</th>
                  <th class="p-3 text-left">Fatores Negativos</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800">
                <tr>
                  <td class="p-3 text-emerald-400/80">Legado histórico / Fonte de informação</td>
                  <td class="p-3 text-rose-400/80">Inibem a iniciativa</td>
                </tr>
                <tr>
                  <td class="p-3 text-emerald-400/80">Treinamento de pessoal</td>
                  <td class="p-3 text-rose-400/80">Alto custo e manutenção constante</td>
                </tr>
                <tr>
                  <td class="p-3 text-emerald-400/80">Fixam critérios e padrões</td>
                  <td class="p-3 text-rose-400/80">Podem ser pouco flexíveis</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        id: 'metodologia',
        title: 'Metodologia de Análise',
        icon: Search,
        content: `
          <h3>Técnicas de Levantamento</h3>
          <div class="space-y-4 mt-6">
            <div class="group bg-slate-800/40 p-4 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-all">
              <div class="flex items-center gap-3 mb-2">
                <Users class="text-blue-400 w-4 h-4" />
                <h4 class="font-bold text-sm">Entrevista</h4>
              </div>
              <p class="text-xs text-slate-400">Contato face a face. Ótima para detalhes profundos. Restrições: Custo elevado e tempo consumido.</p>
            </div>
            
            <div class="group bg-slate-800/40 p-4 rounded-xl border border-slate-700 hover:border-emerald-500/30 transition-all">
              <div class="flex items-center gap-3 mb-2">
                <ClipboardCheck class="text-emerald-400 w-4 h-4" />
                <h4 class="font-bold text-sm">Questionário</h4>
              </div>
              <p class="text-xs text-slate-400">Independente da presença do pesquisador. Excelente para dados quantitativos. Restrições: Altas taxas de não-resposta.</p>
            </div>
            
            <div class="group bg-slate-800/40 p-4 rounded-xl border border-slate-700 hover:border-purple-500/30 transition-all">
              <div class="flex items-center gap-3 mb-2">
                <Search class="text-purple-400 w-4 h-4" />
                <h4 class="font-bold text-sm">Observação Direta</h4>
              </div>
              <p class="text-xs text-slate-400">Analista acompanha a rotina no local. Ideal para entender o clima e relações. Restrições: Perda de objetividade.</p>
            </div>
          </div>
        `
      }
    ],
    quiz: [
      {
        q: "O que caracteriza os manuais administrativos?",
        options: [
          "Documentos informais para sugestões da gerência",
          "Instrumentos formais que expressam regras de funcionamento",
          "Livros de história sobre a fundação da empresa",
          "Apenas planilhas de gastos mensais"
        ],
        correct: 1
      },
      {
        q: "Quais são os dois momentos da análise administrativa segundo Cury (2010)?",
        options: [
          "Planejamento financeiro e Execução de vendas",
          "Contratação de pessoal e Treinamento operacional",
          "Diagnóstico situacional e Intervenção planejada",
          "Marketing digital e Pesquisa de mercado"
        ],
        correct: 2
      },
      {
        q: "Qual conceito define o trabalho com responsabilidades e benefícios preestabelecidos?",
        options: [
          "Rotina maquinal",
          "Hábito organizacional",
          "Fluxograma de processos",
          "Projeto"
        ],
        correct: 3
      },
      {
        q: "Qual manual apresenta organogramas e níveis de autoridade?",
        options: [
          "Manual de Organização",
          "Manual do Funcionário",
          "Manual de Políticas",
          "Manual de Instruções Especializadas"
        ],
        correct: 0
      },
      {
        q: "Qual técnica de levantamento é ideal para entender o clima mas consome muito tempo?",
        options: [
          "Questionário estatístico",
          "Entrevista rápida",
          "Observação Pessoal Direta",
          "Leitura de manuais antigos"
        ],
        correct: 2
      }
    ]
  }
};
