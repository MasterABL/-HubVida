import React, { useState } from 'react';
import { Target, Clock, Timer, CheckCircle, BookOpen, Dumbbell, Flame, Info } from 'lucide-react';
import { Skeleton } from './Skeleton';

export function Treino({ isLoaded = true, workoutProfile, setWorkoutProfile, workouts, setWorkouts }) {
  // Estado local temporário para a edição do perfil (Peso/Altura)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ peso: '', altura: '' });





  const handleEditProfile = () => {
    setTempProfile({ peso: workoutProfile.peso, altura: workoutProfile.altura });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setWorkoutProfile({
      ...workoutProfile,
      peso: parseFloat(tempProfile.peso) || workoutProfile.peso,
      altura: parseFloat(tempProfile.altura) || workoutProfile.altura,
    });
    setIsEditingProfile(false);
  };

  // Atualizar Carga no Supabase (em tempo real ao perder foco do input)
  const handleUpdateWeight = (dayId, exIndex, newWeight) => {
    const updatedWorkouts = workouts.map(day => {
      if (day.id === dayId) {
        const updatedExercises = [...day.exercises];
        updatedExercises[exIndex] = { ...updatedExercises[exIndex], weight: newWeight };
        return { ...day, exercises: updatedExercises };
      }
      return day;
    });
    setWorkouts(updatedWorkouts);
    setWorkouts(updatedWorkouts);
  };

  const handleAddExercise = (dayId) => {
    const newEx = { name: "Novo Exercício", sets: "3", reps: "10-12", rest: "1.5m", weight: "" };
    const updatedWorkouts = workouts.map(day => {
      if (day.id === dayId) {
        return { ...day, exercises: [...day.exercises, newEx] };
      }
      return day;
    });
    setWorkouts(updatedWorkouts);
  };

  const handleRemoveExercise = (dayId, exIndex) => {
    const updatedWorkouts = workouts.map(day => {
      if (day.id === dayId) {
        const newExercises = day.exercises.filter((_, idx) => idx !== exIndex);
        return { ...day, exercises: newExercises };
      }
      return day;
    });
    setWorkouts(updatedWorkouts);
  };

  const handleEditExerciseName = (dayId, exIndex, newName) => {
    const updatedWorkouts = workouts.map(day => {
      if (day.id === dayId) {
        const updatedExercises = [...day.exercises];
        updatedExercises[exIndex] = { ...updatedExercises[exIndex], name: newName };
        return { ...day, exercises: updatedExercises };
      }
      return day;
    });
    setWorkouts(updatedWorkouts);
  };

  if (!isLoaded) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="w-64 h-12" />
          <Skeleton className="w-full md:w-64 h-24 rounded-2xl" />
        </header>
        <Skeleton className="w-full h-24 rounded-xl" />
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <Skeleton className="w-full h-96 rounded-2xl" />
          <Skeleton className="w-full h-96 rounded-2xl" />
          <Skeleton className="w-full h-96 rounded-2xl" />
          <Skeleton className="w-full h-96 rounded-2xl" />
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">



      {/* Cabeçalho do Dashboard */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-300">
            Módulo Academia
          </h1>
          <p className="text-hub-muted mt-1 flex items-center gap-2 font-semibold">
            <Target className="w-4 h-4 text-rose-500" /> Foco Atual: {workoutProfile.foco}
          </p>
        </div>

        {/* Perfil Editável */}
        <div className="bg-hub-surface border border-hub-border p-4 rounded-2xl flex items-center gap-6 shadow-xl w-full md:w-auto">
          {isEditingProfile ? (
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-1">Peso (kg)</p>
                <input
                  type="number" step="0.1"
                  value={tempProfile.peso} onChange={e => setTempProfile({ ...tempProfile, peso: e.target.value })}
                  className="w-16 bg-hub-base border border-yellow-500/50 rounded-lg px-2 py-1 text-hub-strong font-bold text-center focus:outline-none"
                />
              </div>
              <div className="h-8 w-px border-l border-hub-border"></div>
              <div>
                <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-1">Altura (m)</p>
                <input
                  type="number" step="0.01"
                  value={tempProfile.altura} onChange={e => setTempProfile({ ...tempProfile, altura: e.target.value })}
                  className="w-16 bg-hub-base border border-yellow-500/50 rounded-lg px-2 py-1 text-hub-strong font-bold text-center focus:outline-none"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="ml-2 bg-yellow-500 text-[#111111] rounded-lg p-2 hover:bg-yellow-400 transition-colors"
                title="Salvar"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6 cursor-pointer group" onClick={handleEditProfile} title="Clique para editar">
              <div className="text-center group-hover:text-yellow-500 transition-colors">
                <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest">Peso Atual</p>
                <p className="text-xl font-black text-hub-strong">{workoutProfile.peso} kg</p>
              </div>
              <div className="h-8 w-px border-l border-hub-border"></div>
              <div className="text-center group-hover:text-yellow-500 transition-colors">
                <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest">Altura</p>
                <p className="text-xl font-black text-hub-strong">{workoutProfile.altura} m</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Info Warning (Aviso de Adaptação) */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex gap-4">
        <Flame className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">Lembrete de Sobrecarga</h4>
          <p className="text-xs text-hub-muted mt-1 leading-relaxed">
            As cargas abaixo são persistentes na nuvem. Atualize-as sempre que conseguir fazer 2 repetições além da meta estipulada no último treino (Progressão Dupla).
          </p>
        </div>
      </div>

      {/* Grid de Treinos */}
      <section data-hubbot="academia-semana" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {workouts.map((day) => (
          <div key={day.id} className="bg-hub-surface border border-hub-border rounded-2xl flex flex-col h-full overflow-hidden shadow-xl group">

            {/* Header do Card */}
            <div className={`p-5 bg-gradient-to-br ${day.color} relative overflow-hidden`}>
              <div className="absolute -right-4 -top-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                <Dumbbell className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-black italic text-hub-strong relative z-10 uppercase tracking-tight">{day.day}</h3>
              <p className="text-hub-strong/90 text-[11px] font-bold tracking-widest uppercase relative z-10 mt-1">
                {day.title} • {day.focus}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-hub-strong text-[10px] font-black tracking-widest uppercase bg-black/20 w-max px-2.5 py-1.5 rounded-lg">
                <Clock className="w-3 h-3" /> {day.duration}
              </div>
            </div>

            {/* Lista de Exercícios */}
            <div className="p-4 flex-1 flex flex-col gap-3">
              {day.exercises.map((ex, exIndex) => (
                <div key={exIndex} className="bg-hub-base p-3 rounded-xl border border-hub-border hover:border-hub-border-hover transition-colors group/ex">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 flex items-center">
                      <span className="text-[11px] font-bold text-yellow-500 mr-2">{exIndex + 1}.</span>
                      <input
                        type="text"
                        value={ex.name}
                        onChange={(e) => handleEditExerciseName(day.id, exIndex, e.target.value)}
                        className="bg-transparent border-none text-[11px] font-bold text-hub-strong uppercase tracking-wide w-full focus:outline-none focus:text-yellow-500 transition-colors truncate"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(day.id, exIndex)}
                      className="text-hub-faint hover:text-rose-500 opacity-0 group-hover/ex:opacity-100 transition-opacity ml-2"
                      title="Remover Exercício"
                    >
                      <Target className="w-3 h-3 rotate-45" /> {/* Ícone X improvisado */}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-hub-hover text-hub-strong px-2 py-1 rounded-md" title="Séries x Reps">
                        {ex.sets}x {ex.reps}
                      </span>
                      <span className="text-[9px] font-bold flex items-center gap-1 text-hub-faint uppercase tracking-widest" title="Descanso">
                        <Timer className="w-3 h-3" /> {ex.rest}
                      </span>
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="kg"
                        value={ex.weight || ''}
                        onChange={(e) => handleUpdateWeight(day.id, exIndex, e.target.value)}
                        className="w-14 bg-hub-hover border border-hub-border rounded text-right text-xs font-black text-hub-strong px-2 py-1 focus:outline-none focus:border-yellow-500 focus:bg-hub-base transition-all placeholder:text-hub-faint"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleAddExercise(day.id)}
                className="w-full mt-2 py-2 border border-dashed border-hub-border rounded-xl text-[10px] font-bold text-hub-faint uppercase tracking-widest hover:border-yellow-500/50 hover:text-yellow-500 transition-all flex items-center justify-center gap-2"
              >
                + Adicionar Exercício
              </button>
            </div>

          </div>
        ))}
      </section>

      {/* Secção de Conhecimento e Fontes (Science Vault) */}
      <section className="bg-hub-surface border border-hub-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-xl relative overflow-hidden">
        {/* Decorator line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500"></div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-500" /> Science Vault
          </h2>
          <p className="text-xs font-bold text-hub-faint uppercase tracking-widest">Fundamentos do Treino</p>
        </div>

        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-hub-muted leading-relaxed">
          <div className="bg-hub-base p-5 rounded-xl border border-hub-border">
            <h3 className="text-hub-strong font-bold uppercase text-[11px] tracking-widest mb-3 flex items-center gap-2">
              <Info className="w-3 h-3 text-blue-500" /> Frequência
            </h3>
            <p className="text-xs">Estudos literários demonstram que estimular o mesmo grupo muscular duas vezes por semana maximiza a síntese proteica (MPS). A divisão <span className="text-hub-strong font-bold">Upper/Lower 2x</span> garante estímulo contínuo sem overtraining para ectomorfos.</p>
          </div>
          <div className="bg-hub-base p-5 rounded-xl border border-hub-border">
            <h3 className="text-hub-strong font-bold uppercase text-[11px] tracking-widest mb-3 flex items-center gap-2">
              <Clock className="w-3 h-3 text-blue-500" /> Descanso & ATP
            </h3>
            <p className="text-xs">O American College of Sports Medicine recomenda <span className="text-hub-strong font-bold">2 a 3 mins</span> de descanso em exercícios compostos pesados (Terra, Agachamento). Isso regenera o ATP-CP, essencial para manter a carga alta no dia pesado.</p>
          </div>
        </div>

        {/* Checklist Sidebar */}
        <div className="md:w-1/4 mt-8 md:mt-0 md:border-l md:border-hub-border md:pl-8">
          <h3 className="text-[10px] font-black text-hub-muted uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" /> Bolsa de Treino
          </h3>
          <ul className="space-y-3">
            {[
              "Garrafa de Água (1.5L)",
              "Toalha Rosto",
              "Fone de Ouvido (Bateria OK)",
              "Ténis de Base Reta (Terra/Agachamento)",
              "Creatina (Pós-treino)",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 group cursor-pointer">
                <div className="w-4 h-4 rounded border border-hub-border flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-emerald-500 transition-colors">
                  {/* Pseudo-checkbox visual */}
                  <div className="w-2 h-2 rounded-sm bg-emerald-500 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <span className="text-[11px] text-hub-muted font-medium group-hover:text-hub-strong transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}
