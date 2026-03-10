import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Atualiza o state para que a próxima renderização mostre a UI de fallback.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Você também pode registrar o erro em um serviço de relatórios de erro
        console.error("HubVida Runtime Error capturado:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-hub-base flex items-center justify-center p-6 transition-colors duration-300">
                    <div className="bg-hub-surface border border-red-500/20 max-w-md w-full rounded-3xl p-8 text-center shadow-xl animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-red-500 animate-pulse" />
                        </div>

                        <h1 className="text-2xl font-black italic text-hub-strong mb-2">
                            Algo deu errado...
                        </h1>
                        <p className="text-hub-muted font-medium mb-8">
                            Encontramos um problema inesperado de renderização. O aplicativo foi isolado para sua segurança.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 px-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 group"
                        >
                            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            Tentar novamente
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
