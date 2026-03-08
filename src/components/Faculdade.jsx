import React from 'react';
import {
  Library,
  ChevronUp,
  ChevronDown,
  CheckSquare,
  CheckCircle2,
  Activity,
  NotebookText,
} from 'lucide-react';

export const Faculdade = ({
  faculdadeData,
  expandedSubject,
  setExpandedSubject,
  handleUpdateFaculdade,
  calculateFinalGrade,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black italic tracking-wider text-white">
            FACULDADE <span className="text-yellow-500">(ADM)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
            Gestão Acadêmica Cruzeiro do Sul
          </p>
        </div>
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl px-4 py-2 text-right shadow-lg">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Média de Aprovação
          </p>
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
            <div
              key={disc.id}
              className="bg-[#12141a] border border-[#1f222a] rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              {/* Row Header (Clickable) */}
              <div
                onClick={() => setExpandedSubject(isExpanded ? null : disc.id)}
                className={`p-5 flex items-center justify-between cursor-pointer hover:bg-[#16181e] transition-colors ${
                  isExpanded ? 'border-b border-[#1f222a] bg-[#16181e]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <Library
                    className={`w-5 h-5 ${
                      isExpanded ? 'text-yellow-500' : 'text-slate-500'
                    }`}
                  />
                  <h3 className="font-bold text-white text-sm md:text-base">
                    {disc.name}
                  </h3>
                </div>

                <div className="flex items-center gap-6">
                  {/* Badge Média Dinâmica no Header */}
                  {finalGrade !== null && (
                    <div
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        isApproved
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-rose-500/10 text-rose-500'
                      }`}
                    >
                      NF: {finalGrade}
                    </div>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </div>
              </div>

              {/* Expanded Panel */}
              {isExpanded && (
                <div className="p-6 bg-[#0a0b0e] grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-top-2">
                  {/* Coluna 1: Checklist AS */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
                      <CheckSquare className="w-3.5 h-3.5" /> Checklist de
                      Unidades
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['as1', 'as2', 'as3', 'as4'].map((asKey, idx) => (
                        <label
                          key={asKey}
                          className="flex items-center gap-3 cursor-pointer group bg-[#12141a] p-3 rounded-lg border border-[#1f222a] hover:border-yellow-500/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={disc.checks[asKey]}
                            onChange={(e) =>
                              handleUpdateFaculdade(
                                disc.id,
                                'checks',
                                asKey,
                                e.target.checked
                              )
                            }
                          />
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              disc.checks[asKey]
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500'
                                : 'border-slate-600 group-hover:border-slate-400'
                            }`}
                          >
                            {disc.checks[asKey] && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              disc.checks[asKey]
                                ? 'text-emerald-500'
                                : 'text-slate-400 group-hover:text-slate-300'
                            }`}
                          >
                            AS-{idx + 1}
                          </span>
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
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                          Média AS (40%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          value={disc.notas.as}
                          onChange={(e) =>
                            handleUpdateFaculdade(
                              disc.id,
                              'notas',
                              'as',
                              e.target.value
                            )
                          }
                          className="w-full bg-[#0a0b0e] border border-[#1f222a] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                          Prova A1 (60%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="0.0"
                          value={disc.notas.a1}
                          onChange={(e) =>
                            handleUpdateFaculdade(
                              disc.id,
                              'notas',
                              'a1',
                              e.target.value
                            )
                          }
                          className="w-full bg-[#0a0b0e] border border-[#1f222a] rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-[#1f222a] pt-4 mt-auto">
                      <span className="text-xs text-slate-400 font-bold uppercase">
                        Nota Final:
                      </span>
                      <span
                        className={`text-2xl font-black ${
                          finalGrade === null
                            ? 'text-slate-600'
                            : isApproved
                            ? 'text-emerald-500'
                            : 'text-rose-500'
                        }`}
                      >
                        {finalGrade !== null ? finalGrade : '-.-'}
                      </span>
                    </div>
                  </div>

                  {/* Coluna 3: Caderno de Anotações */}
                  <div className="flex flex-col">
                    <h4 className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                      <NotebookText className="w-3.5 h-3.5" /> Caderno de
                      Anotações
                    </h4>
                    <textarea
                      value={disc.notes}
                      onChange={(e) =>
                        handleUpdateFaculdade(
                          disc.id,
                          'notes',
                          null,
                          e.target.value
                        )
                      }
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
};
