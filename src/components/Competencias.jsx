import React from 'react';
import { Brain, Trash2, CheckCircle2, Flame, Star, Trophy } from 'lucide-react';
import { RadarChart } from './RadarChart';

const getTodayStr = () => new Date().toISOString().slice(0, 10);
const getYesterdayStr = () => {
  const d = new Date(); d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

export const Competencias = ({
  radarData,
  englishLevel,
  setEnglishLevel,
  hardSkills,
  handleUpdateHardSkill,
  handleRemoveHardSkill,
  newSkill,
  setNewSkill,
  handleAddHardSkill,
  softSkills,
  calculateSoftSkillProgress,
  handleToggleSoftSkill,
  englishStreak,
  setEnglishStreak,
}) => {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const alreadyCheckedIn = englishStreak?.lastCheckin === today;

  const handleCheckin = () => {
    if (alreadyCheckedIn) return;
    const isConsecutive = englishStreak?.lastCheckin === yesterday;
    const newCount = isConsecutive ? (englishStreak.count || 0) + 1 : 1;
    const newLongest = Math.max(newCount, englishStreak?.longestStreak || 0);
    setEnglishStreak({ count: newCount, lastCheckin: today, longestStreak: newLongest });
  };

  const streak = englishStreak?.count || 0;
  const longest = englishStreak?.longestStreak || 0;

  // Nível CEFR pelo englishLevel %
  const getCEFR = (lvl) => {
    if (lvl < 20) return { label: 'A1', color: 'text-slate-400' };
    if (lvl < 40) return { label: 'A2', color: 'text-blue-400' };
    if (lvl < 60) return { label: 'B1', color: 'text-cyan-400' };
    if (lvl < 80) return { label: 'B2', color: 'text-emerald-400' };
    if (lvl < 95) return { label: 'C1', color: 'text-yellow-400' };
    return { label: 'C2', color: 'text-orange-400' };
  };
  const cefr = getCEFR(Number(englishLevel));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-xl font-black italic tracking-wider text-white mb-6">
        COMPETÊNCIAS
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
          <h2 className="text-yellow-500 font-bold italic mb-1">
            RADAR DE COMPETÊNCIAS
          </h2>
          <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider">
            Conectado a dados reais
          </p>
          <RadarChart data={radarData} />
        </div>

        {/* Card Inglês com Streak */}
        <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl flex flex-col gap-5">
          {/* Cabeçalho */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-500 text-lg">文A</span>
              <h2 className="text-white font-bold">Inglês (Argos)</h2>
            </div>
            <p className="text-xs text-slate-500">Meta: Nível C1 / Prep. TOEFL</p>
          </div>

          {/* Progresso CEFR */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
              <span>Proficiência</span>
              <div className="flex items-center gap-2">
                <span className={`font-black text-base ${cefr.color}`}>{cefr.label}</span>
                <input
                  type="number"
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(Math.min(100, Math.max(0, e.target.value)))}
                  className="bg-[#1f222a] border border-slate-700 text-white w-14 text-center rounded py-1 text-xs"
                />
                <span className="text-yellow-500">%</span>
              </div>
            </div>
            <input
              type="range" min="0" max="100" value={englishLevel}
              onChange={(e) => setEnglishLevel(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between text-[9px] text-slate-600 font-bold mt-1 px-0.5">
              {['A1','A2','B1','B2','C1','C2'].map(l => (
                <span key={l} className={cefr.label === l ? cefr.color + ' font-black' : ''}>{l}</span>
              ))}
            </div>
          </div>

          {/* Streak tracker */}
          <div className="bg-[#0f1115] border border-[#1f222a] rounded-xl p-4 space-y-3">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Sequência de Prática</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className={`w-7 h-7 ${streak > 0 ? 'text-orange-500' : 'text-slate-700'}`} />
                <div>
                  <p className="text-2xl font-black text-white leading-none">{streak}</p>
                  <p className="text-[9px] text-slate-500 font-bold">dias seguidos</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-0.5">
                  <Trophy className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-black text-yellow-500">{longest}</span>
                </div>
                <p className="text-[9px] text-slate-600 font-bold">recorde</p>
              </div>
            </div>

            {/* Botão check-in */}
            <button
              onClick={handleCheckin}
              disabled={alreadyCheckedIn}
              className={`w-full py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                alreadyCheckedIn
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 cursor-default'
                  : 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:scale-95'
              }`}
            >
              {alreadyCheckedIn ? '✓ Pratiquei Hoje!' : '🔥 Pratiquei Hoje'}
            </button>

            {/* Badges de marco */}
            <div className="flex gap-2 flex-wrap">
              {[7, 15, 30, 60, 100].map(marco => (
                <span
                  key={marco}
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                    longest >= marco
                      ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                      : 'border-slate-800 text-slate-700'
                  }`}
                >
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Hard Skills */}

      <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-yellow-500 font-bold italic flex items-center gap-2">
              <Brain className="w-4 h-4" /> HARD SKILLS & CERTIFICAÇÕES
            </h2>
            <p className="text-xs text-slate-500 mt-1">Registros técnicos.</p>
          </div>
          <span className="text-[10px] px-3 py-1 border border-slate-700 rounded-full text-slate-400">
            LATTES-READY
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[10px] uppercase text-slate-500 border-b border-[#1f222a]">
              <tr>
                <th className="pb-3 font-semibold">Categoria</th>
                <th className="pb-3 font-semibold">Habilidade</th>
                <th className="pb-3 font-semibold">Nível (%)</th>
                <th className="pb-3 font-semibold">Certificação</th>
                <th className="pb-3 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f222a]">
              {hardSkills.map((skill) => (
                <tr
                  key={skill.id}
                  className="group hover:bg-[#16181e] transition-colors"
                >
                  <td className="py-3 pr-4 pl-2">
                    <select
                      value={skill.category}
                      onChange={(e) =>
                        handleUpdateHardSkill(
                          skill.id,
                          'category',
                          e.target.value
                        )
                      }
                      className="bg-transparent text-xs w-full focus:outline-none focus:border-yellow-500"
                    >
                      <option className="bg-slate-900" value="Gestão (ADM)">
                        Gestão (ADM)
                      </option>
                      <option
                        className="bg-slate-900"
                        value="Ferramentas Digitais"
                      >
                        Ferramentas Digitais
                      </option>
                      <option
                        className="bg-slate-900"
                        value="Pesquisa Científica"
                      >
                        Pesquisa Científica
                      </option>
                    </select>
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleUpdateHardSkill(skill.id, 'name', e.target.value)
                      }
                      className="bg-transparent border border-transparent hover:border-slate-700 rounded p-1 w-full text-white font-medium focus:outline-none"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) =>
                          handleUpdateHardSkill(
                            skill.id,
                            'level',
                            Math.min(100, Math.max(0, e.target.value))
                          )
                        }
                        className="bg-[#1f222a] border border-slate-700 rounded py-1 px-2 w-16 text-center focus:outline-none focus:border-yellow-500"
                      />
                      <span className="text-slate-500 text-xs">%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <input
                      type="text"
                      value={skill.cert}
                      onChange={(e) =>
                        handleUpdateHardSkill(skill.id, 'cert', e.target.value)
                      }
                      className="bg-transparent border border-transparent hover:border-slate-700 rounded p-1 w-full focus:outline-none"
                    />
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button
                      onClick={() => handleRemoveHardSkill(skill.id)}
                      className="text-slate-600 hover:text-rose-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#16181e]">
                <td className="py-3 pr-4 pl-2">
                  <select
                    value={newSkill.category}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, category: e.target.value })
                    }
                    className="bg-[#0f1115] border border-slate-700 rounded p-2 text-xs w-full text-white focus:outline-none"
                  >
                    <option value="Gestão (ADM)">Gestão (ADM)</option>
                    <option value="Ferramentas Digitais">
                      Ferramentas Digitais
                    </option>
                    <option value="Pesquisa Científica">
                      Pesquisa Científica
                    </option>
                  </select>
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="text"
                    placeholder="Nova Habilidade..."
                    value={newSkill.name}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, name: e.target.value })
                    }
                    className="bg-[#0f1115] border border-slate-700 rounded p-2 text-sm w-full text-white focus:outline-none"
                  />
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newSkill.level}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, level: e.target.value })
                      }
                      className="bg-[#0f1115] border border-slate-700 rounded py-2 px-2 w-16 text-center text-white focus:outline-none"
                    />
                    <span className="text-slate-500 text-xs">%</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="text"
                    placeholder="Certificado"
                    value={newSkill.cert}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, cert: e.target.value })
                    }
                    className="bg-[#0f1115] border border-slate-700 rounded p-2 text-sm w-full text-white focus:outline-none"
                  />
                </td>
                <td className="py-3 text-right pr-2">
                  <button
                    onClick={handleAddHardSkill}
                    className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 transition-colors text-xs font-bold px-4 py-2 rounded"
                  >
                    ADICIONAR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Soft Skills */}
      <div className="bg-[#12141a] border border-[#1f222a] rounded-xl p-6 shadow-xl">
        <h2 className="text-white font-bold mb-1 flex items-center gap-2">
          <Brain className="w-5 h-5 text-yellow-500" /> AUTOAVALIAÇÃO SEMESTRAL
          (SOFT SKILLS)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Object.entries(softSkills).map(([category, items]) => {
            const progress = calculateSoftSkillProgress(category);
            const isCom = category === 'comunicacao';
            return (
              <div
                key={category}
                className={`border ${
                  isCom
                    ? 'border-yellow-500/30 bg-yellow-500/5'
                    : 'border-[#1f222a] bg-[#0f1115]'
                } rounded-xl p-5`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold uppercase tracking-wide text-sm">
                    {category}
                  </h3>
                  <span
                    className={`text-xs font-bold ${
                      progress === 100 ? 'text-yellow-500' : 'text-slate-400'
                    }`}
                  >
                    {progress}%
                  </span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full mb-6 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCom ? 'bg-yellow-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={item.checked}
                        onChange={() =>
                          handleToggleSoftSkill(category, item.id)
                        }
                      />
                      <div
                        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          item.checked
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500'
                            : 'border-slate-600 group-hover:border-slate-400'
                        }`}
                      >
                        {item.checked && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span
                        className={`text-sm ${
                          item.checked
                            ? 'text-slate-500 line-through decoration-slate-600'
                            : 'text-slate-300 group-hover:text-white transition-colors'
                        }`}
                      >
                        {item.text}
                      </span>
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
};
