import React from 'react';
import {
  Trash2,
  Plus,
  Lightbulb,
  ExternalLink,
  User,
  Search,
  BookOpen,
  GraduationCap,
  Calendar as CalendarIcon,
} from 'lucide-react';

export const Producao = ({
  newProd,
  setNewProd,
  productions,
  handleAddProduction,
  handleDeleteProduction,
  newIdea,
  setNewIdea,
  handleAddIdea,
  ideas,
  setIdeas,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-black italic tracking-wider text-hub-strong">
          PRODUÇÃO ACADÊMICA
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
            <h2 className="text-yellow-500 font-bold italic mb-6">
              RASTREADOR DE PRODUÇÃO
            </h2>
            <div className="flex flex-col md:flex-row gap-3 mb-8 bg-hub-inner p-3 rounded-lg border border-hub-border">
              <input
                type="text"
                placeholder="Título do Artigo"
                value={newProd.title}
                onChange={(e) =>
                  setNewProd({ ...newProd, title: e.target.value })
                }
                className="flex-1 bg-transparent border border-hub-border rounded px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500"
              />
              <select
                value={newProd.type}
                onChange={(e) =>
                  setNewProd({ ...newProd, type: e.target.value })
                }
                className="bg-transparent border border-hub-border rounded px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500"
              >
                <option value="Artigo" className="bg-[#141414]">
                  Artigo
                </option>
                <option value="Resumo" className="bg-[#141414]">
                  Resumo Expandido
                </option>
                <option value="Tese" className="bg-[#141414]">
                  Tese/Dissertação
                </option>
              </select>
              <select
                value={newProd.status}
                onChange={(e) =>
                  setNewProd({ ...newProd, status: e.target.value })
                }
                className="bg-transparent border border-hub-border rounded px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500"
              >
                <option value="Ideia" className="bg-[#141414]">
                  Ideia
                </option>
                <option value="Escrevendo" className="bg-[#141414]">
                  Escrevendo
                </option>
                <option value="Revisão" className="bg-[#141414]">
                  Em Revisão
                </option>
                <option value="Publicado" className="bg-[#141414]">
                  Publicado
                </option>
              </select>
              <button
                onClick={handleAddProduction}
                className="bg-yellow-500 text-[#111111] font-bold px-6 py-2 rounded text-xs hover:bg-yellow-400 transition-colors"
              >
                LANÇAR ARTIGO
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-hub-content">
                <thead className="text-[10px] uppercase text-hub-faint border-b border-hub-border">
                  <tr>
                    <th className="pb-3 font-semibold w-1/2">Título</th>
                    <th className="pb-3 font-semibold">Tipo</th>
                    <th className="pb-3 font-semibold">Status Atual</th>
                    <th className="pb-3 font-semibold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f222a]">
                  {productions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-8 text-center text-hub-faint text-sm italic"
                      >
                        Nenhum artigo em produção.
                      </td>
                    </tr>
                  ) : (
                    productions.map((prod) => (
                      <tr
                        key={prod.id}
                        className="group hover:bg-hub-hover transition-colors"
                      >
                        <td className="py-4 font-medium text-hub-strong">
                          {prod.title}
                        </td>
                        <td className="py-4 text-hub-muted text-xs">
                          {prod.type}
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-hub-inner text-yellow-500 rounded text-xs font-semibold">
                            {prod.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => handleDeleteProduction(prod.id)}
                            className="text-hub-faint hover:text-rose-500 transition-colors"
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
          <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
            <h2 className="text-hub-strong font-bold mb-4 flex items-center gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-yellow-500" /> BANCO DE IDEIAS
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Nova ideia de tema para artigo..."
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddIdea()}
                className="flex-1 bg-transparent border border-hub-border rounded-lg px-4 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500"
              />
              <button
                onClick={handleAddIdea}
                className="bg-yellow-500 text-[#111111] p-2 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-dashed border-hub-border rounded-lg p-4 min-h-[80px] space-y-2">
              {ideas.length === 0 ? (
                <p className="text-center text-hub-faint text-xs italic mt-2 uppercase tracking-widest">
                  Espaço para novos insights...
                </p>
              ) : (
                ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex justify-between items-center bg-hub-hover p-3 rounded text-sm text-hub-content"
                  >
                    <span>{idea.text}</span>
                    <button
                      onClick={() =>
                        setIdeas(ideas.filter((i) => i.id !== idea.id))
                      }
                      className="text-hub-faint hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
            <h2 className="text-hub-strong font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
              <ExternalLink className="w-4 h-4 text-yellow-500" /> Recursos de
              Pesquisa
            </h2>
            <div className="space-y-2">
              {[
                {
                  name: 'Plataforma Lattes',
                  icon: User,
                  url: 'http://lattes.cnpq.br/',
                },
                {
                  name: 'Google Acadêmico',
                  icon: Search,
                  url: 'https://scholar.google.com/',
                },
                {
                  name: 'Periódicos CAPES',
                  icon: BookOpen,
                  url: 'https://www.periodicos.capes.gov.br/',
                },
                {
                  name: 'ORCID iD',
                  icon: GraduationCap,
                  url: 'https://orcid.org/',
                },
              ].map((link, i) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-hub-border hover:border-yellow-500/50 hover:bg-hub-hover transition-all group"
                  >
                    <div className="flex items-center gap-3 text-sm text-hub-content group-hover:text-hub-strong font-medium">
                      <IconComponent className="w-4 h-4 text-hub-faint group-hover:text-yellow-500" />{' '}
                      {link.name}
                    </div>
                    <ExternalLink className="w-3 h-3 text-hub-faint group-hover:text-yellow-500" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
            <h2 className="text-hub-strong font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
              <CalendarIcon className="w-4 h-4 text-yellow-500" /> Calendário de
              Editais
            </h2>
            <div className="space-y-3">
              <div className="bg-hub-inner p-4 rounded-lg border border-hub-border">
                <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-wider">
                  ENANPAD 2026
                </h3>
                <p className="text-xs text-hub-faint mt-1">
                  Submissões: Março/Abril
                </p>
              </div>
              <div className="bg-hub-inner p-4 rounded-lg border border-hub-border">
                <h3 className="text-hub-strong font-bold text-xs uppercase tracking-wider">
                  SEMEAD USP
                </h3>
                <p className="text-xs text-hub-faint mt-1">Submissões: Junho</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
