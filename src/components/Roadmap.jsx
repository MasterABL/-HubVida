import React from 'react';
import {
  LayoutGrid,
  Medal,
  CalendarDays,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Search,
  Users,
  FileText,
  Zap,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  User,
  Trash2,
} from 'lucide-react';

export const Roadmap = ({
  crData,
  newCr,
  setNewCr,
  handleAddCr,
  handleDeleteCr,
  activeRoadmapTab,
  setActiveRoadmapTab,
  expandedYear,
  setExpandedYear,
}) => {
  const ROADMAP_TABS = [
    { name: 'Visão Geral', icon: LayoutGrid },
    { name: 'Contador de CR', icon: Medal },
    { name: 'Plano 2 Anos', icon: CalendarDays },
    { name: 'Plano 5 Anos', icon: TrendingUp },
    { name: 'Hub de Recursos', icon: BookOpen },
  ];

  const renderVisaoGeral = () => (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
        <LayoutGrid className="w-4 h-4" /> Processos de Elite
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <h3 className="text-hub-strong font-bold flex items-center gap-3 mb-5 text-sm">
            <GraduationCap className="w-5 h-5 text-hub-muted" /> Doutorado Sanduíche
          </h3>
          <div className="space-y-4 text-xs leading-relaxed">
            <p>
              <span className="text-hub-faint font-bold">O que é:</span>{' '}
              <span className="text-hub-content">
                Realizar parte da sua tese (6 a 12 meses) no exterior com bolsa paga (CAPES/PDSE).
              </span>
            </p>
            <p>
              <span className="text-hub-faint font-bold">Requisitos:</span>{' '}
              <span className="text-hub-content">
                Fluência comprovada (TOEFL), projeto de pesquisa sólido e convite formal de um professor estrangeiro.
              </span>
            </p>
            <p>
              <span className="text-hub-faint font-bold">Passo a Passo:</span>{' '}
              <span className="text-hub-content">
                Entrar num Doutorado nota 6 ou 7 → Publicar artigos → Networking com prof. gringo → Pedir Bolsa.
              </span>
            </p>
          </div>
        </div>
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <h3 className="text-hub-strong font-bold flex items-center gap-3 mb-5 text-sm">
            <Search className="w-5 h-5 text-hub-muted" /> Exame ANPAD
          </h3>
          <div className="space-y-4 text-xs leading-relaxed">
            <p>
              <span className="text-hub-faint font-bold">O que é:</span>{' '}
              <span className="text-hub-content">
                O teste padrão de entrada para os melhores mestrados do Brasil.
              </span>
            </p>
            <p>
              <span className="text-hub-faint font-bold">A Prova:</span>{' '}
              <span className="text-hub-content">
                Foca em Raciocínio Lógico-Quantitativo, Português e Inglês. A nota vale por 2 anos.
              </span>
            </p>
            <p>
              <span className="text-hub-faint font-bold">Passo a Passo:</span>{' '}
              <span className="text-hub-content">
                Baixar provas anteriores → Focar em Lógica e Estatística → Treinar tempo de prova → Alcançar Percentil 90+.
              </span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" /> Rotina Deep Work (Produtividade Real)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <p className="text-[10px] text-hub-faint font-bold mb-3 uppercase tracking-widest">
            Manhã (08h - 15h)
          </p>
          <h3 className="text-hub-strong font-black text-sm mb-2 tracking-wide">
            Trabalho Aprendiz
          </h3>
          <p className="text-xs text-hub-muted">
            Aproveite para observar problemas de gestão reais. Isso gera ótimas teses.
          </p>
        </div>
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <p className="text-[10px] text-hub-faint font-bold mb-3 uppercase tracking-widest">
            Tarde (16h - 18h)
          </p>
          <h3 className="text-hub-strong font-black text-sm mb-2 tracking-wide">
            Produção Acadêmica
          </h3>
          <p className="text-xs text-hub-muted">
            Não é só ler a aula da Cruzeiro. É ler 1 artigo científico, anotar no Notion e atualizar o Lattes.
          </p>
        </div>
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <p className="text-[10px] text-hub-faint font-bold mb-3 uppercase tracking-widest">
            Noite (18h - 19h)
          </p>
          <h3 className="text-hub-strong font-black text-sm mb-2 tracking-wide">
            Inglês Instrumental
          </h3>
          <p className="text-xs text-hub-muted">
            Argos para base gramatical + Escuta de podcasts acadêmicos (HBR IdeaCast).
          </p>
        </div>
      </div>

      {/* === CAMINHO DO DOUTOR — Timeline === */}
      <div className="mt-10">
        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-6 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" /> Caminho do Doutor — Sua Jornada
        </h2>
        {(() => {
          const milestones = [
            { year: '2024–2026', title: 'Graduação em ADM', sub: 'Cruzeiro do Sul (EAD) — Semestre atual', status: 'active', desc: 'Construindo a base: CR alto, Lattes atualizado, primeiras leituras científicas.' },
            { year: '2025',      title: 'Inglês C1 — Argos', sub: 'Meta TOEFL / Leitura de papers', status: 'active', desc: 'Fundamental para publicar, candidatar bolsas e doutorado sanduíche no exterior.' },
            { year: '2026',      title: 'Iniciação Científica (PIC)', sub: 'Primeira publicação acadêmica', status: 'future', desc: 'Submissão de artigo para evento ANPAD ou revista Qualis B.' },
            { year: '2026–2027', title: 'Exame ANPAD', sub: 'Percentil 90+ — entrada no Mestrado', status: 'future', desc: 'Preparo: lógica, estatística, inglês acadêmico. Nota válida por 2 anos.' },
            { year: '2027–2029', title: 'Mestrado Acadêmico (PPGA)', sub: 'Programa nota 5+ CAPES', status: 'future', desc: 'Dissertação, 2 artigos publicados, networking com orientador de doutorado.' },
            { year: '2029–2033', title: 'Doutorado (Ph.D.)', sub: 'Com possibilidade de Sanduíche no exterior', status: 'future', desc: 'Tese original. Construção da carreira como pesquisador ou professor.' },
            { year: '2033+',     title: '🎓 Doutor em Administração', sub: 'Dr. Abimael Balbino', status: 'dream', desc: 'O título que abre portas para docência, pesquisa internacional e impacto real.' },
          ];
          const colorMap = {
            active: { ring: 'border-yellow-500', dot: 'bg-yellow-500', text: 'text-yellow-500', pulse: true },
            future: { ring: 'border-hub-border',  dot: 'bg-hub-hover',   text: 'text-hub-faint',  pulse: false },
            dream:  { ring: 'border-yellow-400', dot: 'bg-yellow-400', text: 'text-yellow-400', pulse: false },
          };
          return (
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                {milestones.map((m, i) => {
                  const c = colorMap[m.status];
                  const isLast = i === milestones.length - 1;
                  return (
                    <div key={i} className="flex gap-5 relative">
                      <div className="flex flex-col items-center flex-shrink-0 w-5">
                        <div className="relative z-10 mt-0.5">
                          <div className={`w-4 h-4 rounded-full border-2 ${c.ring} ${c.dot} ${m.status !== 'future' ? 'shadow-lg shadow-yellow-500/30' : ''}`}>
                            {c.pulse && <span className="absolute inset-0 rounded-full animate-ping bg-yellow-500 opacity-40" />}
                          </div>
                        </div>
                        {!isLast && <div className={`w-px flex-1 mt-1 mb-1 ${m.status === 'active' ? 'bg-yellow-500/25' : 'bg-hub-border'}`} style={{backgroundColor: m.status !== 'active' ? 'var(--hub-hover)' : undefined}} />}
                      </div>
                      <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-7'}`}>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>{m.year}</span>
                          {m.status === 'active' && <span className="text-[8px] font-black bg-yellow-500/15 text-yellow-500 px-1.5 py-0.5 rounded-full">AGORA</span>}
                          {m.status === 'dream'  && <span className="text-[8px] font-black bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 rounded-full">META FINAL</span>}
                        </div>
                        <h3 className={`font-black text-sm mb-0.5 ${m.status === 'dream' ? 'text-yellow-400 text-base' : m.status === 'active' ? 'text-hub-strong' : 'text-hub-muted'}`}>{m.title}</h3>
                        <p className="text-[10px] text-hub-faint font-bold uppercase tracking-wider mb-1">{m.sub}</p>
                        <p className="text-[11px] text-hub-faint leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );


  const renderContadorCR = () => {
    const totalCreditos = crData.reduce((acc, cur) => acc + Number(cur.creditos), 0);
    const somaPonderada = crData.reduce((acc, cur) => acc + Number(cur.nota) * Number(cur.creditos), 0);
    const media = totalCreditos > 0 ? (somaPonderada / totalCreditos).toFixed(2) : '0';

    return (
      <div className="animate-in fade-in duration-500">
        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-6 flex items-center gap-2">
          <Medal className="w-4 h-4" /> Performance Acadêmica
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-hub-surface border border-hub-border rounded-xl p-8 shadow-xl flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-4">
              Média Ponderada
            </p>
            <p className="text-5xl font-black text-hub-strong mb-4">{media}</p>
          </div>
          <div className="lg:col-span-2 bg-hub-surface border border-hub-border rounded-xl p-8 shadow-xl flex flex-col justify-center">
            <p className="text-xs text-hub-muted mb-6 uppercase tracking-wider">Novo Registro de Disciplina</p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Disciplina (Cruzeiro do Sul)"
                value={newCr.disciplina}
                onChange={(e) => setNewCr({ ...newCr, disciplina: e.target.value })}
                className="flex-1 bg-hub-base border border-hub-border rounded-lg px-4 py-3 text-sm text-hub-strong focus:border-yellow-500 focus:outline-none transition-colors"
              />
              <input
                type="number"
                placeholder="Nota"
                value={newCr.nota}
                onChange={(e) => setNewCr({ ...newCr, nota: e.target.value })}
                className="w-full md:w-32 bg-hub-base border border-hub-border rounded-lg px-4 py-3 text-sm text-hub-strong focus:border-yellow-500 focus:outline-none transition-colors"
              />
              <select
                value={newCr.creditos}
                onChange={(e) => setNewCr({ ...newCr, creditos: e.target.value })}
                className="w-full md:w-40 bg-hub-base border border-hub-border rounded-lg px-4 py-3 text-sm text-hub-content focus:border-yellow-500 focus:outline-none transition-colors"
              >
                <option value="2">2 Créditos</option>
                <option value="4">4 Créditos</option>
                <option value="6">6 Créditos</option>
              </select>
            </div>
            <button
              onClick={handleAddCr}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#111111] font-black text-xs py-4 rounded-lg uppercase tracking-wider transition-colors"
            >
              Registrar no Histórico
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-hub-surface border border-hub-border rounded-xl shadow-xl">
          <table className="w-full text-left text-sm text-hub-content">
            <thead className="text-[10px] uppercase text-hub-faint border-b border-hub-border">
              <tr>
                <th className="py-4 px-6 font-semibold w-1/2">Disciplina</th>
                <th className="py-4 px-6 font-semibold text-center">Créditos</th>
                <th className="py-4 px-6 font-semibold text-center">Nota</th>
                <th className="py-4 px-6 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hub-border">
              {crData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-hub-faint text-xs italic uppercase tracking-widest">
                    Nenhuma disciplina registrada.
                  </td>
                </tr>
              ) : (
                crData.map((item) => (
                  <tr key={item.id} className="hover:bg-hub-hover transition-colors">
                    <td className="py-4 px-6 font-medium text-hub-strong">{item.disciplina}</td>
                    <td className="py-4 px-6 text-center text-hub-muted">{item.creditos}</td>
                    <td className="py-4 px-6 text-center font-bold text-hub-strong">{item.nota}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteCr(item.id)}
                        className="text-hub-faint hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPlano2Anos = () => (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-8 flex items-center gap-2">
        <CalendarDays className="w-4 h-4" /> A Jornada do Graduando de Elite
      </h2>
      <div className="relative border-l border-hub-border ml-4 space-y-16 pb-8">
        <div className="relative pl-10">
          <div className="absolute -left-2.5 top-1 w-5 h-5 bg-hub-base border-4 border-yellow-500 rounded-full"></div>
          <h3 className="text-2xl font-black italic text-hub-strong mb-6 tracking-wide">
            Semestre 1 & 2 <span className="text-hub-muted font-medium text-lg not-italic">(Fundação e Escaneamento)</span>
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
              <Medal className="w-5 h-5 text-hub-faint mb-4" />
              <h4 className="text-hub-strong font-bold mb-2">Manter CR &gt; 9.0</h4>
              <p className="text-xs text-hub-muted leading-relaxed">
                Prioridade Zero. No EAD, a nota é o único critério objetivo inicial para bolsas FAPESP/CAPES. Estude para gabaritar.
              </p>
            </div>
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
              <BookOpen className="w-5 h-5 text-hub-faint mb-4" />
              <h4 className="text-hub-strong font-bold mb-2">Curadoria de Fontes</h4>
              <p className="text-xs text-hub-muted leading-relaxed">
                Vá além do Google. Use Spell.org.br (específico de ADM) e Scielo. Busque por &quot;State of the Art&quot; no seu tema de interesse.
              </p>
            </div>
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
              <div className="text-hub-faint mb-4 font-bold text-lg leading-none">文A</div>
              <h4 className="text-hub-strong font-bold mb-2">Inglês: O Método 1-1-1</h4>
              <p className="text-xs text-hub-muted leading-relaxed">
                1 Artigo internacional/semana, 1 Vídeo da HBR/TED por dia, 1 Abstract escrito/mês. Valide a gramática no Argos.
              </p>
            </div>
          </div>
        </div>

        <div className="relative pl-10">
          <div className="absolute -left-2.5 top-1 w-5 h-5 bg-hub-base border-4 border-yellow-500 rounded-full"></div>
          <h3 className="text-2xl font-black italic text-hub-strong mb-6 tracking-wide">
            Semestre 3 & 4 <span className="text-hub-muted font-medium text-lg not-italic">(Ataque e Networking)</span>
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
              <Search className="w-5 h-5 text-hub-faint mb-4" />
              <h4 className="text-hub-strong font-bold mb-2">Iniciação Científica (PIC)</h4>
              <p className="text-xs text-hub-muted leading-relaxed">
                Mês 06: Abordar a coordenação da Cruzeiro do Sul. Objetivo: Ter um orientador Ph.D. para aprender o método científico.
              </p>
            </div>
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
              <Users className="w-5 h-5 text-hub-faint mb-4" />
              <h4 className="text-hub-strong font-bold mb-2">Mapeamento de Eventos</h4>
              <p className="text-xs text-hub-muted leading-relaxed">
                Acesse semead.com.br (USP) e anpad.org.br. Leia os anais dos eventos para entender o que está sendo pesquisado hoje.
              </p>
            </div>
            <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
              <FileText className="w-5 h-5 text-hub-faint mb-4" />
              <h4 className="text-hub-strong font-bold mb-2">Escrita Científica</h4>
              <p className="text-xs text-hub-muted leading-relaxed">
                Não faça apenas resumos. Aprenda a estruturar um &quot;Paper&quot;: Introdução, Referencial, Metodologia e Resultados Esperados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlano5Anos = () => {
    const renderAccordion = (id, number, title, subtitle, items) => (
      <div className="mb-4 animate-in fade-in">
        <button
          onClick={() => setExpandedYear(expandedYear === id ? null : id)}
          className="w-full bg-hub-surface border border-hub-border rounded-xl p-6 flex justify-between items-center hover:border-hub-muted/30 transition-colors shadow-lg"
        >
          <div className="text-left">
            <h3 className="text-xl font-black text-hub-strong flex items-center gap-4">
              <span className="text-yellow-500 text-2xl">{number}</span> {title}
            </h3>
            <p className="text-xs text-hub-muted mt-2">{subtitle}</p>
          </div>
          {expandedYear === id ? (
            <ChevronUp className="w-5 h-5 text-yellow-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-yellow-500" />
          )}
        </button>
        {expandedYear === id && (
          <div className="mt-4 px-2 pb-2 animate-in slide-in-from-top-4 duration-300">
            <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Plano de Ação Detalhado
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-hub-surface border border-hub-border rounded-xl p-5 shadow-sm flex gap-3 ${
                    item.fullWidth ? 'md:col-span-2' : ''
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-hub-strong mb-1">{item.title}</h5>
                    <p className="text-xs text-hub-muted">{item.desc}</p>
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
        <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-8 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Visão de Longo Prazo (Acordeão)
        </h2>
        {renderAccordion(
          'Ano 3',
          '03',
          'Ano 3: O Especialista',
          'Foco Total em TCC e Produção Científica.',
          [
            { title: 'Definição do Nicho:', desc: 'Marketing, Finanças, Estratégia ou Comportamento Organizacional.' },
            { title: 'TCC Acadêmico:', desc: 'Desenvolver um projeto com coleta de dados reais (pesquisa de campo ou banco de dados).' },
            { title: 'Inglês de Transição:', desc: 'Abandonar o básico e focar em certificações (preparatórios para TOEFL/IELTS).' },
            { title: 'Submissão em Congressos:', desc: 'Enviar seu primeiro trabalho para o SEMEAD USP ou ENANPAD como autor.' },
            { title: 'Networking:', desc: 'Seguir pesquisadores no ResearchGate e comentar em suas publicações.', fullWidth: true },
          ]
        )}
        {renderAccordion(
          'Ano 4',
          '04',
          'Ano 4: O Candidato',
          'Transição Graduação → Pós-Graduação de Elite.',
          [
            { title: 'Treinamento ANPAD:', desc: 'Mínimo de 6 meses resolvendo provas antigas. Foco em Raciocínio Quantitativo e Lógico.' },
            { title: 'Certificação de Proficiência:', desc: 'Realizar o TOEFL iBT (Meta: 90+ pontos) ou IELTS (Meta: 7.0+).' },
            { title: 'Filtro de Mestrados:', desc: 'Selecionar apenas programas nota 6 ou 7 da CAPES (USP, FGV, EAESP, UFMG).' },
            { title: 'Processo Seletivo:', desc: 'Inscrições costumam abrir entre agosto e setembro para ingresso no ano seguinte.' },
            { title: 'Projeto de Mestrado:', desc: 'Ter um anteprojeto de pesquisa pronto e alinhado aos professores da instituição alvo.', fullWidth: true },
          ]
        )}
        {renderAccordion(
          'Ano 5',
          '05',
          'Ano 5: O Pesquisador',
          'Mestrado e Planejamento Internacional.',
          [
            { title: 'Ingresso no Mestrado Stricto Sensu:', desc: 'Início da vida acadêmica profissional com bolsa de pesquisa.' },
            { title: 'Qualificação:', desc: 'Defender seu projeto de mestrado no 1º ano para liberar o foco na tese.' },
            { title: 'Draft do Ph.D. Sanduíche:', desc: 'Identificar universidades no exterior (EUA/Europa) que têm convênio com seu mestrado.' },
            { title: 'Publicação em Inglês:', desc: 'Submeter um artigo em revista internacional (Journal) para fortalecer o currículo do Sanduíche.' },
            { title: 'Contato Internacional:', desc: 'E-mail para possíveis orientadores estrangeiros apresentando seus resultados iniciais.', fullWidth: true },
          ]
        )}
      </div>
    );
  };

  const renderHubRecursos = () => (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-8 flex items-center gap-2">
        <BookOpen className="w-4 h-4" /> Hub de Inteligência Acadêmica
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-hub-surface border border-hub-border rounded-xl p-8 shadow-xl">
          <h3 className="text-hub-strong font-bold text-sm mb-6 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-yellow-500" /> Bases de Busca de Artigos
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Spell.org.br', desc: 'FOCO: ADMINISTRAÇÃO BRASIL', url: 'https://www.spell.org.br/' },
              { name: 'Google Scholar', desc: 'DICA: USE TERMOS EM INGLÊS PARA MELHORES RESULTADOS.', url: 'https://scholar.google.com.br/' },
              { name: 'Scielo', desc: 'FOCO: ARTIGOS COM ALTO FATOR DE IMPACTO.', url: 'https://www.scielo.br/' },
              { name: 'ScienceDirect', desc: 'BASE INTERNACIONAL — ELSEVIER.', url: 'https://www.sciencedirect.com/' },
            ].map((base, i) => (
              <a
                key={i}
                href={base.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-hub-border bg-hub-base hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group"
              >
                <div>
                  <h4 className="font-bold text-hub-strong text-sm mb-1 group-hover:text-yellow-500 transition-colors">{base.name}</h4>
                  <p className="text-[9px] text-hub-faint font-bold uppercase tracking-widest">{base.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-hub-faint group-hover:text-yellow-500 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-hub-surface border border-hub-border rounded-xl p-8 shadow-xl">
          <h3 className="text-hub-strong font-bold text-sm mb-6 flex items-center gap-3">
            <User className="w-5 h-5 text-yellow-500" /> Calendário de Eventos
          </h3>
          <div className="space-y-4">
            <a
              href="https://www.anpad.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-hub-border bg-hub-base hover:border-yellow-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-hub-strong text-sm group-hover:text-yellow-500 transition-colors">ANPAD - ENANPAD</h4>
                <ExternalLink className="w-3.5 h-3.5 text-hub-faint group-hover:text-yellow-500 transition-colors" />
              </div>
              <p className="text-xs text-hub-muted">O principal evento científico de ADM do país. Geralmente em Setembro.</p>
            </a>
            <a
              href="https://semead.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-yellow-500/50 bg-hub-base shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:border-yellow-500 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-yellow-500 text-sm">SEMEAD USP</h4>
                <ExternalLink className="w-3.5 h-3.5 text-yellow-600 group-hover:text-yellow-400 transition-colors" />
              </div>
              <p className="text-xs text-hub-muted">Outubro/Novembro. Ideal para submeter trabalhos de iniciação científica.</p>
            </a>
            <a
              href="https://www.sympla.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-hub-border bg-hub-base hover:border-yellow-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-hub-strong text-sm uppercase tracking-wide group-hover:text-yellow-500 transition-colors">Eventos Locais (SYMPLA)</h4>
                <ExternalLink className="w-3.5 h-3.5 text-hub-faint group-hover:text-yellow-500 transition-colors" />
              </div>
              <p className="text-xs text-hub-muted">Busque por &quot;Congresso Nacional de Administração&quot;.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start h-full">
      <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-0">
        <div className="mb-8">
          <h1 className="text-3xl font-black italic tracking-wider text-yellow-500 uppercase">
            PH.D. ROADMAP
          </h1>
          <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mt-1">
            Administração | Trajetória
          </p>
        </div>
        <nav className="space-y-2">
          {ROADMAP_TABS.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveRoadmapTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                activeRoadmapTab === tab.name
                  ? 'border border-yellow-500/50 text-yellow-500 bg-yellow-500/5 shadow-md'
                  : 'border border-transparent text-hub-muted hover:text-hub-strong hover:bg-hub-hover'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 w-full min-w-0 pb-12 overflow-x-hidden">
        {activeRoadmapTab === 'Visão Geral' && renderVisaoGeral()}
        {activeRoadmapTab === 'Contador de CR' && renderContadorCR()}
        {activeRoadmapTab === 'Plano 2 Anos' && renderPlano2Anos()}
        {activeRoadmapTab === 'Plano 5 Anos' && renderPlano5Anos()}
        {activeRoadmapTab === 'Hub de Recursos' && renderHubRecursos()}
      </div>
    </div>
  );
};
