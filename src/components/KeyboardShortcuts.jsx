import React, { useEffect, useState } from 'react';
import { HelpCircle, Command, X } from 'lucide-react';

const SHORTCUTS = [
    { key: 'Alt + 1', label: 'Academia (Treino)', id: 'Academia (Treino)' },
    { key: 'Alt + 2', label: 'Finanças', id: 'Finanças' },
    { key: 'Alt + 3', label: 'Rotina Diária', id: 'Rotina Diária' },
    { key: 'Alt + 4', label: 'Nutrição & Base', id: 'Nutrição & Base' },
    { key: 'Alt + 5', label: 'Controle de Sono', id: 'Controle de Sono' },
    { key: 'Alt + 6', label: 'Brain Dump', id: 'Brain Dump' },
    { key: 'Alt + 7', label: 'Competências', id: 'Competências' },
    { key: 'Alt + 8', label: 'Faculdade (ADM)', id: 'Faculdade (ADM)' },
    { key: 'Alt + 9', label: 'Visão Geral', id: 'Visão Geral' },
];

export function KeyboardShortcuts({ isMobileMenuOpen, setIsMobileMenuOpen }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Evitar bloquear input texts
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
                return;
            }

            // Atalho '?': exibe o modal
            if (e.key === '?' && !e.altKey && !e.ctrlKey && !e.metaKey) {
                setIsOpen(true);
            }

            // Atalho 'Esc': fechar menu ou modal
            if (e.key === 'Escape') {
                if (isOpen) setIsOpen(false);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            }

            // Atalhos Alt + 1 a 9
            if (e.altKey && !e.ctrlKey && !e.shiftKey) {
                const num = parseInt(e.key);
                if (num >= 1 && num <= 9) {
                    e.preventDefault();
                    const shortcut = SHORTCUTS.find(s => s.key === `Alt + ${num}`);
                    if (shortcut) {
                        const el = document.getElementById(shortcut.id);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isMobileMenuOpen, setIsMobileMenuOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-8 h-8 rounded-lg bg-hub-base flex items-center justify-center text-hub-faint hover:text-indigo-400 hover:bg-indigo-500/10 transition-all font-bold group"
                title="Atalhos do Teclado (?)"
            >
                <Command className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                    <div className="bg-hub-surface border border-hub-border w-full max-w-sm rounded-[2rem] shadow-2xl relative z-10 flex flex-col p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-3 text-hub-strong">
                                <Command className="w-6 h-6 text-indigo-400" /> Atalhos (Alt + #)
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-hub-muted hover:text-rose-500 transition-colors bg-hub-base p-1.5 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 pb-2">
                            {SHORTCUTS.map((s) => (
                                <div key={s.key} className="flex justify-between items-center group cursor-pointer" onClick={() => {
                                    const el = document.getElementById(s.id);
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    setIsOpen(false);
                                }}>
                                    <span className="text-hub-muted font-medium text-sm group-hover:text-hub-strong transition-colors">{s.label}</span>
                                    <div className="bg-hub-base border border-hub-border px-3 py-1 rounded text-xs font-black text-hub-content uppercase tracking-widest shadow-sm">
                                        {s.key}
                                    </div>
                                </div>
                            ))}

                            <div className="w-full h-px bg-hub-border my-4" />

                            <div className="flex justify-between items-center group">
                                <span className="text-hub-muted font-medium text-sm group-hover:text-hub-strong transition-colors">Abrir este Menu</span>
                                <div className="bg-hub-base border border-hub-border px-3 py-1 rounded text-xs font-black text-hub-content uppercase tracking-widest shadow-sm">
                                    ?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
