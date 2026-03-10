import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X, Check, Hand } from 'lucide-react';

const TOUR_STEPS = [
    {
        title: "Bem-vindo ao HubVida! 👋",
        description: "Este é o seu novo dashboard pessoal para organizar absolutamente tudo na sua vida. Vamos fazer um tour rápido?",
        targetId: null, // Centro da tela
    },
    {
        title: "Visão Geral",
        description: "Aqui você acompanha o resumo diário: Progresso das suas Hard Skills, finanças essenciais e andamento acadêmico e das metas de sono.",
        targetId: "Visão Geral"
    },
    {
        title: "Sua Rotina",
        description: "Planeje seus blocos de foco matinais, vespertinos e noturnos. Crie rituais que mudam o jogo.",
        targetId: "Rotina Diária"
    },
    {
        title: "Treino Sincronizado",
        description: "Todos os seus treinos organizados com precisão: volume, ficha do dia e rotatividade ABCDE.",
        targetId: "Academia (Treino)"
    },
    {
        title: "Brain Dump e Ideias",
        description: "Não guarde na mente. Despeje pensamentos rápidos, tarefas ou insights geniais aqui antes que eles sumam.",
        targetId: "Brain Dump"
    },
    {
        title: "Você no Controle! 🚀",
        description: "O HubVida já está salvando automaticamente na nuvem sua evolução. Você também pode navegar pelos atalhos teclando '?' a qualquer momento. Boa jornada!",
        targetId: null
    }
];

export function Onboarding({ isVisible, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    // Impede o scroll de fundo durante o tour
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            // Mover suavemente para o target local, se existir
            const step = TOUR_STEPS[currentStep];
            if (step.targetId) {
                const el = document.getElementById(step.targetId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        } else {
            document.body.style.overflow = '';
        }
    }, [isVisible, currentStep]);

    if (!isVisible) return null;

    const step = TOUR_STEPS[currentStep];

    return (
        <div className="fixed inset-0 z-[999]">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 bg-hub-surface border border-yellow-500/20 max-w-sm w-full rounded-3xl p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-hub-muted hover:text-hub-strong z-20">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex gap-2 mb-6">
                    {TOUR_STEPS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${idx === currentStep ? 'bg-yellow-500' : idx < currentStep ? 'bg-yellow-500/40' : 'bg-hub-border'}`}
                        />
                    ))}
                </div>

                {step.targetId ? (
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 text-yellow-500 animate-pulse">
                        <Hand className="w-6 h-6" />
                    </div>
                ) : (
                    <div className="text-4xl mb-4">🚀</div>
                )}

                <h2 className="text-xl font-bold text-hub-strong mb-2 shadow-sm">{step.title}</h2>
                <p className="text-hub-muted text-sm font-medium leading-relaxed mb-8 min-h-[60px]">
                    {step.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                    {currentStep > 0 ? (
                        <button
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="text-hub-faint hover:text-hub-strong px-4 py-2 font-bold text-sm transition-colors"
                        >
                            Anterior
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="text-hub-faint hover:text-hub-strong px-2 py-2 font-bold text-sm transition-colors"
                        >
                            Pular tour
                        </button>
                    )}

                    {currentStep < TOUR_STEPS.length - 1 ? (
                        <button
                            onClick={() => setCurrentStep(prev => prev + 1)}
                            className="bg-yellow-500 text-slate-900 px-5 py-2 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            Avançar <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="bg-emerald-500 text-slate-900 px-5 py-2 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            Vamos lá! <Check className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
