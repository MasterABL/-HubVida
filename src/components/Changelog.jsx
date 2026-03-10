import React, { useState } from 'react';
import { History, X, Sparkles, Code, Bug } from 'lucide-react';

const RELEASES = [
    {
        version: 'v1.4.0',
        date: '10 Mar 2026',
        changes: [
            { type: 'feat', text: 'Instalável (PWA) e navegação via teclas atalho 🎉' },
            { type: 'feat', text: 'Tour interativo de Onboarding pra quem está chegando' },
            { type: 'style', text: 'Design Glass Morphism refinado + Noise background' },
        ]
    },
    {
        version: 'v1.3.1',
        date: '10 Mar 2026',
        changes: [
            { type: 'fix', text: 'Tela de erro 404 espacial e ErrorBoundary infalível' },
            { type: 'feat', text: 'Theme Toggle rotaciona dinâmico e SEO turbinado' }
        ]
    },
    {
        version: 'v1.3.0',
        date: '10 Mar 2026',
        changes: [
            { type: 'feat', text: 'Skeletons de carregamento durante conexões lentas' },
            { type: 'style', text: 'Gráficos interativos maravilhosos (Recharts) implementados' },
            { type: 'fix', text: 'Resolução de telas em branco do Rect StrictMode' },
            { type: 'security', text: 'Scanner de Segurança GitHub Actions ativo 🔒' }
        ]
    },
    {
        version: 'v1.2.0',
        date: '09 Mar 2026',
        changes: [
            { type: 'feat', text: 'SplashScreen Dark Premium elegante (~800ms) ⏳' },
            { type: 'fix', text: 'Scroll reveal suavizado nos dois sentidos da página' }
        ]
    },
    {
        version: 'v1.0.0',
        date: '08 Mar 2026',
        changes: [
            { type: 'feat', text: 'Lançamento oficial do Dashboard HubVida 🚀' },
            { type: 'feat', text: 'Login Seguro integrado nativo de Supabase Auth' }
        ]
    }
];

export function Changelog() {
    const [isOpen, setIsOpen] = useState(false);
    const currentVersion = RELEASES[0].version;

    const getTypeIcon = (type) => {
        switch (type) {
            case 'feat': return <Sparkles className="w-3.5 h-3.5 text-yellow-500" />;
            case 'fix': return <Code className="w-3.5 h-3.5 text-emerald-500" />;
            case 'style': return <Sparkles className="w-3.5 h-3.5 text-purple-500" />;
            case 'security': return <Bug className="w-3.5 h-3.5 text-red-500" />;
            default: return <Code className="w-3.5 h-3.5 text-hub-muted" />;
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-4 text-center mt-8 border-t border-hub-border text-hub-muted hover:text-hub-strong font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
                <span className="text-sm">HubVida {currentVersion}</span>
                <History className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                    <div className="bg-hub-surface border border-hub-border max-w-lg w-full rounded-2xl shadow-2xl relative z-10 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-300">
                        <div className="flex justify-between items-center p-6 border-b border-hub-border shrink-0">
                            <h2 className="text-xl font-bold text-hub-strong flex items-center gap-3">
                                <History className="w-6 h-6 text-yellow-500" /> Histórico de Atualizações
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-hub-muted hover:text-rose-500 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-8 h-full">
                            {RELEASES.map((release) => (
                                <div key={release.version} className="relative pl-4 border-l-2 border-hub-border-hover">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-hub-surface border-2 border-yellow-500" />
                                    <div className="flex items-baseline gap-3 mb-3">
                                        <h3 className="text-lg font-bold text-hub-strong">{release.version}</h3>
                                        <span className="text-xs text-hub-faint font-semibold">{release.date}</span>
                                    </div>

                                    <ul className="space-y-3">
                                        {release.changes.map((change, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-hub-content leading-relaxed">
                                                <div className="mt-1 shrink-0 p-1 bg-hub-base rounded-md">
                                                    {getTypeIcon(change.type)}
                                                </div>
                                                {change.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
