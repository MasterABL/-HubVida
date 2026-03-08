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
        <h1 className="text-xl font-black italic tracking-wider text-white">
          PRODUÇÃO ACADÊMICA
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-yellow-500 font-bold italic mb-6">
              RASTREADOR DE PRODUÇÃO
            </h2>
            <div className="flex flex-col md:flex-row gap-3 mb-8 bg-[#0f1115] p-3 rounded-lg border border-[#1f222a]">
              <input
                type="text"
                placeholder="Título do Artigo"
                value={newProd.title}
                onChange={(e) =>
                  setNewProd({ ...newProd, title: e.target.value })
                }
                className="flex-1 bg-transparent border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              />
              <select
                value={newProd.type}
                onChange={(e) =>
                  setNewProd({ ...newProd, type: e.target.value })
                }
                className="bg-transparent border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="Artigo" className="bg-slate-900">
                  Artigo
                </option>
                <option value="Resumo" className="bg-slate-900">
                  Resumo Expandido
                </option>
                <option value="Tese" className="bg-slate-900">
                  Tese/Dissertação
                </option>
              </select>
              <select
                value={newProd.status}
                onChange={(e) =>
                  setNewProd({ ...newProd, status: e.target.value })
                }
                className="bg-transparent border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="Ideia" className="bg-slate-900">
                  Ideia
                </option>
                <option value="Escrevendo" className="bg-slate-900">
                  Escrevendo
                </option>
                <option value="Revisão" className="bg-slate-900">
                  Em Revisão
                </option>
                <option value="Publicado" className="bg-slate-900">
                  Publicado
                </option>
              </select>
              <button
                onClick={handleAddProduction}
                className="bg-yellow-500 text-slate-900 font-bold px-6 py-2 rounded text-xs hover:bg-yellow-400 transition-colors"
              >
                LANÇAR ARTIGO
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-[10px] uppercase text-slate-500 border-b border-[#1f222a]">
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
                        className="py-8 text-center text-slate-600 text-sm italic"
                      >
                        Nenhum artigo em produção.
                      </td>
                    </tr>
                  ) : (
                    productions.map((prod) => (
                      <tr
                        key={prod.id}
                        className="group hover:bg-[#16181e] transition-colors"
                      >
                        <td className="py-4 font-medium text-white">
                          {prod.title}
                        </td>
                        <td className="py-4 text-slate-400 text-xs">
                          {prod.type}
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-[#1f222a] text-yellow-500 rounded text-xs font-semibold">
                            {prod.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => handleDeleteProduction(prod.id)}
                            className="text-slate-600 hover:text-rose-500 transition-colors"
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
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-yellow-500" /> BANCO DE IDEIAS
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Nova ideia de tema para artigo..."
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddIdea()}
                className="flex-1 bg-transparent border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
              />
              <button
                onClick={handleAddIdea}
                className="bg-yellow-500 text-slate-900 p-2 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-dashed border-[#1f222a] rounded-lg p-4 min-h-[80px] space-y-2">
              {ideas.length === 0 ? (
                <p className="text-center text-slate-600 text-xs italic mt-2 uppercase tracking-widest">
                  Espaço para novos insights...
                </p>
              ) : (
                ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex justify-between items-center bg-[#16181e] p-3 rounded text-sm text-slate-300"
                  >
                    <span>{idea.text}</span>
                    <button
                      onClick={() =>
                        setIdeas(ideas.filter((i) => i.id !== idea.id))
                      }
                      className="text-slate-600 hover:text-rose-500"
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
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
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
                    className="flex items-center justify-between p-3 rounded-lg border border-[#1f222a] hover:border-yellow-500/50 hover:bg-[#16181e] transition-all group"
                  >
                    <div className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white font-medium">
                      <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-yellow-500" />{' '}
                      {link.name}
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-yellow-500" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
              <CalendarIcon className="w-4 h-4 text-yellow-500" /> Calendário de
              Editais
            </h2>
            <div className="space-y-3">
              <div className="bg-[#0f1115] p-4 rounded-lg border border-[#1f222a]">
                <h3 className="text-yellow-500 font-bold text-xs uppercase tracking-wider">
                  ENANPAD 2026
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submissões: Março/Abril
                </p>
              </div>
              <div className="bg-[#0f1115] p-4 rounded-lg border border-[#1f222a]">
                <h3 className="text-white font-bold text-xs uppercase tracking-wider">
                  SEMEAD USP
                </h3>
                <p className="text-xs text-slate-500 mt-1">Submissões: Junho</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
