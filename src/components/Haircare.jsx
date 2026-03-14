import React, { useState } from 'react';
import {
    Scissors, Droplets, Wind, Sparkles, CheckSquare,
    ShoppingCart, RefreshCw, AlertCircle, Info
} from 'lucide-react';

const PRODUCTS = [
    { id: 1, name: 'Shampoo (Qualquer Limpeza)', brand: 'Diversos', price: 20.0, status: 'ok', type: 'Limpeza' },
    { id: 2, name: 'Máscara Morte Súbita (Nutrição)', brand: 'Lola Cosmetics', price: 45.9, status: 'buy', type: 'Nutrição' },
    { id: 3, name: 'Máscara Dream Cream (Reconstrução)', brand: 'Lola Cosmetics', price: 48.9, status: 'ok', type: 'Reconstrução' },
    { id: 4, name: 'Máscara Hidratação (Ex: Elseve Hialurônico)', brand: 'Elseve', price: 25.0, status: 'buy', type: 'Hidratação' },
    { id: 5, name: 'Creme de Pentear Hidra', brand: 'Salon Line', price: 18.5, status: 'ok', type: 'Finalização' },
    { id: 6, name: 'Óleo Reparador', brand: 'Elseve / Niely', price: 35.0, status: 'buy', type: 'Reparação' },
    { id: 7, name: 'Borrifador (Água + Creme)', brand: 'Acessório', price: 15.0, status: 'ok', type: 'Acessório' },
];

export const Haircare = ({ haircareStatus, haircareMessage, isWashDay, isHaircareDoneToday, toggleHaircareDone }) => {
    const [products, setProducts] = useState(PRODUCTS);

    const totalToBuy = products
        .filter(p => p.status === 'buy')
        .reduce((acc, curr) => acc + curr.price, 0);

    const toggleStatus = (id) => {
        setProducts(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, status: p.status === 'ok' ? 'buy' : 'ok' };
            }
            return p;
        }));
    };

    return (
        <div id="Haircare" className="module-section space-y-6 pt-16 mt-[-4rem] animate-in fade-in duration-500">

            {/* Header Premium Haircare */}
            <div className="bg-gradient-to-r from-[#1d1226] to-[#251336] border border-fuchsia-500/20 rounded-xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black italic tracking-wider text-fuchsia-500 uppercase flex items-center gap-3">
                        <Scissors className="w-6 h-6" /> Haircare Routine
                    </h1>
                    <p className="text-sm text-hub-muted mt-2 font-medium">
                        Protocolo ondulado 2A/2B de Alta Porosidade
                    </p>
                </div>
                <div className="bg-hub-inner px-6 py-3 rounded-xl border border-fuchsia-500/30 flex items-center gap-4 w-full md:w-auto">
                    <Sparkles className="w-8 h-8 text-fuchsia-500 hidden md:block" />
                    <div>
                        <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest mb-1">Status Cabelo</p>
                        <p className="text-sm font-black text-hub-strong tracking-wide">Desalinhado / Alto Frizz</p>
                    </div>
                </div>
            </div>

            {/* Grade Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-reveal-wrapper">

                {/* Painel do Dia (Esquerda) */}
                <div className="lg:col-span-1 space-y-6">

                    <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-fuchsia-500/50 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Droplets className="w-32 h-32" />
                        </div>

                        <h2 className="text-fuchsia-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-6">
                            <RefreshCw className="w-4 h-4" /> Ação Diária
                        </h2>

                        <div className="text-center md:text-left mb-8 z-10 relative">
                            <p className="text-[10px] font-bold text-hub-muted uppercase tracking-widest mb-2">Cronograma Atual</p>
                            <h3 className={`text-2xl font-black mb-2 ${isWashDay ? 'text-fuchsia-400' : 'text-sky-400'}`}>
                                {haircareStatus}
                            </h3>
                            <p className="text-xs font-medium text-hub-content leading-relaxed">
                                {haircareMessage}
                            </p>
                        </div>

                        <button
                            onClick={toggleHaircareDone}
                            className={`w-full py-4 rounded-xl border-2 flex items-center justify-center gap-3 transition-all font-bold tracking-wider z-10 relative ${isHaircareDoneToday
                                    ? 'bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)]'
                                    : 'bg-hub-hover border-hub-border text-hub-faint hover:border-fuchsia-500/50 hover:text-fuchsia-400'
                                }`}
                        >
                            <CheckSquare className="w-5 h-5" />
                            {isHaircareDoneToday ? 'TRATO CONCLUÍDO' : 'MARCAR COMO FEITO'}
                        </button>
                    </div>

                    {/* Card Resumo Financeiro */}
                    <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl flex flex-col">
                        <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-4">
                            <ShoppingCart className="w-4 h-4" /> Compras Pendentes
                        </h2>
                        <div className="flex-1 flex flex-col justify-center items-center py-4 border-2 border-dashed border-emerald-500/20 rounded-xl bg-emerald-500/5">
                            <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-1">Total Estimado</p>
                            <p className="text-3xl font-black text-emerald-500">
                                R$ {totalToBuy.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Tabela de Produtos (Meio/Direita) */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-hub-surface border border-hub-border rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-hub-border flex justify-between items-center bg-hub-base">
                            <h2 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                <Scissors className="w-4 h-4" /> Inventário de Produtos
                            </h2>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="bg-hub-inner">
                                        <th className="p-4 text-[10px] text-hub-faint font-bold uppercase tracking-widest border-b border-hub-border">Produto</th>
                                        <th className="p-4 text-[10px] text-hub-faint font-bold uppercase tracking-widest border-b border-hub-border">Categoria</th>
                                        <th className="p-4 text-[10px] text-hub-faint font-bold uppercase tracking-widest border-b border-hub-border text-right">Valor Aprox.</th>
                                        <th className="p-4 text-[10px] text-hub-faint font-bold uppercase tracking-widest border-b border-hub-border text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-hub-border/50">
                                    {products.map(p => (
                                        <tr key={p.id} className="hover:bg-hub-hover/50 transition-colors group">
                                            <td className="p-4">
                                                <p className="text-sm font-bold text-hub-strong">{p.name}</p>
                                                <p className="text-[10px] text-hub-muted font-medium mt-0.5">{p.brand}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                                                    {p.type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className="text-sm font-bold text-hub-content">R$ {p.price.toFixed(2)}</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => toggleStatus(p.id)}
                                                    className={`px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-wider transition-colors border ${p.status === 'ok'
                                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20'
                                                            : 'bg-rose-500/10 text-rose-500 border-rose-500/30 hover:bg-rose-500/20'
                                                        }`}
                                                >
                                                    {p.status === 'ok' ? 'TENHO ✓' : 'COMPRAR'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* Guias Rápidos de Tratamento */}
            <h2 className="text-sm font-black italic uppercase tracking-wider text-hub-strong mb-6 mt-12 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-400" /> Manuais de Execução
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-reveal-wrapper">

                {/* Guia 1 */}
                <div className="bg-hub-surface border border-hub-border p-6 rounded-xl hover:border-yellow-500/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                        <Droplets className="w-5 h-5 text-yellow-500" />
                    </div>
                    <h3 className="text-hub-strong font-bold mb-2">1. Pré-Poo</h3>
                    <p className="text-xs text-hub-muted leading-relaxed">
                        **Obrigatório antes do shampoo.** Aplique o creme Yamasterol (ou de pentear simples) no comprimento e pontas 15 minutos antes do banho. Protege contra o ressecamento do sulfato.
                    </p>
                </div>

                {/* Guia 2 */}
                <div className="bg-hub-surface border border-hub-border p-6 rounded-xl hover:border-fuchsia-500/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center mb-4">
                        <Wind className="w-5 h-5 text-fuchsia-500" />
                    </div>
                    <h3 className="text-hub-strong font-bold mb-2">2. Secagem Cuidadosa</h3>
                    <p className="text-xs text-hub-muted leading-relaxed">
                        **Nunca friccionar toalha grossa.** Cabelo poroso perde água fácil. Amasse gentilmente com uma camisa de algodão (método plopping) para remover o excesso sem romper a cutícula.
                    </p>
                </div>

                {/* Guia 3 */}
                <div className="bg-hub-surface border border-hub-border p-6 rounded-xl hover:border-sky-500/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
                        <AlertCircle className="w-5 h-5 text-sky-500" />
                    </div>
                    <h3 className="text-hub-strong font-bold mb-2">3. Técnica de Fitagem</h3>
                    <p className="text-xs text-hub-muted leading-relaxed">
                        Para reter a definição, com o cabelo gotejando creme de pentear, separe as mechas em fitas nos dedos e amasse de baixo para cima. Desmanche a &quot;casinha&quot; dura depois com óleo secante.
                    </p>
                </div>

            </div>

        </div>
    );
};
