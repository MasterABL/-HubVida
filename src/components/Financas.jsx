import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Circle,
  Trash2,
  Plus,
} from 'lucide-react';
import { Skeleton } from './Skeleton';

export const Financas = ({
  isLoaded = true,
  financeSummary,
  activeMonth,
  setActiveMonth,
  currentMonthFinances,
  handleToggleFinanceStatus,
  handleDeleteFinance,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  MONTHS,
}) => {
  if (!isLoaded) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-end mb-8">
          <Skeleton className="w-64 h-10" />
          <Skeleton className="w-32 h-16 rounded-xl" />
        </div>
        <Skeleton className="w-full h-12 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="w-full h-32 rounded-xl" />
          <Skeleton className="w-full h-32 rounded-xl" />
          <Skeleton className="w-full h-32 rounded-xl" />
        </div>
        <div className="space-y-3 mt-4">
          <Skeleton className="w-full h-20 rounded-xl" />
          <Skeleton className="w-full h-20 rounded-xl" />
          <Skeleton className="w-full h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-2xl font-black italic tracking-wider text-hub-strong">
          ABIMAEL <span className="text-yellow-500">FINANCE</span>
        </h1>
        <div className="bg-hub-surface border border-hub-border rounded-xl px-4 py-2 text-right shadow-lg">
          <p className="text-[10px] text-hub-faint uppercase font-bold tracking-wider">
            Disponível Agora
          </p>
          <p className="text-xl font-bold text-hub-strong">
            R${' '}
            {financeSummary.available.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto bg-hub-surface border border-hub-border rounded-xl p-1 shadow-md scrollbar-hide snap-x">
        {MONTHS.map((month) => (
          <button
            key={month}
            onClick={() => setActiveMonth(month)}
            className={`flex-none snap-start px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeMonth === month
                ? 'bg-yellow-500 text-[#111111] shadow'
                : 'text-hub-faint hover:text-hub-strong hover:bg-hub-hover'
              }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] text-hub-faint font-bold uppercase tracking-wider mb-2">
              Vindo do Mês Anterior
            </p>
            <p className="text-2xl font-bold text-yellow-500">
              R${' '}
              {financeSummary.prevMonthBalance.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-2">
            Total a Receber
          </p>
          <p className="text-2xl font-bold text-hub-strong">
            R${' '}
            {financeSummary.income.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-hub-surface border border-hub-border rounded-xl p-6 shadow-xl">
          <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider mb-2">
            Total de Contas
          </p>
          <p className="text-2xl font-bold text-hub-strong">
            R${' '}
            {financeSummary.expense.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>





      <div className="space-y-3 mt-4">
        {currentMonthFinances.map((transaction) => (
          <div
            key={transaction.id}
            onClick={() => handleToggleFinanceStatus(transaction.id)}
            className={`cursor-pointer bg-hub-surface border border-hub-border rounded-xl p-4 flex items-center justify-between group hover:border-hub-border-hover transition-all shadow-sm select-none ${transaction.status === 'paid'
                ? 'opacity-60 hover:opacity-100'
                : ''
              }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-full transition-colors ${transaction.type === 'income'
                    ? 'text-emerald-500 bg-emerald-500/10 group-hover:bg-emerald-500/20'
                    : transaction.status === 'paid'
                      ? 'text-yellow-500 bg-yellow-500/10 group-hover:bg-yellow-500/20'
                      : 'text-hub-faint bg-hub-hover group-hover:bg-hub-inner'
                  }`}
              >
                {transaction.type === 'income' ? (
                  <TrendingUp className="w-5 h-5" />
                ) : transaction.status === 'paid' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3
                  className={`font-bold text-sm ${transaction.status === 'paid' &&
                      transaction.type === 'expense'
                      ? 'text-hub-muted line-through'
                      : transaction.type === 'income'
                        ? 'text-emerald-500' // Regra: Receita é sempre verde, mesmo paga
                        : 'text-hub-strong'
                    }`}
                >
                  {transaction.title}
                </h3>
                <p className="text-[10px] text-hub-faint mt-0.5">
                  {transaction.date} - {transaction.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`font-bold text-sm ${transaction.type === 'income'
                    ? 'text-emerald-500'
                    : 'text-rose-500'
                  }`}
              >
                {transaction.type === 'income' ? '+' : '-'}R${' '}
                {transaction.amount.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFinance(transaction.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-hub-faint hover:text-rose-500 transition-all p-1"
                title="Excluir Lançamento"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-hub-inner border border-dashed border-hub-border rounded-xl p-4">
          <p className="text-[10px] text-hub-faint font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" /> Novo Lançamento
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Nome (Ex: Netflix)"
              value={newTransaction.title}
              onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
              className="col-span-2 md:col-span-1 bg-hub-hover border border-hub-border rounded-lg px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <input
              type="number"
              placeholder="Valor (R$)"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="bg-hub-hover border border-hub-border rounded-lg px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Data (ex: 15/05)"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="bg-hub-hover border border-hub-border rounded-lg px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              className="bg-hub-hover border border-hub-border rounded-lg px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="expense">Saída</option>
              <option value="income">Entrada</option>
            </select>
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="bg-hub-hover border border-hub-border rounded-lg px-3 py-2 text-sm text-hub-strong focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="FIXOS">Fixos</option>
              <option value="CARTÕES">Cartões</option>
              <option value="VARIÁVEIS">Variáveis</option>
              <option value="RECEITAS">Receitas</option>
              <option value="EMPRÉSTIMOS">Empréstimos</option>
            </select>
            <button
              onClick={handleAddTransaction}
              className="bg-yellow-500 text-[#111111] font-bold rounded-lg px-4 py-2 text-sm hover:bg-yellow-400 transition-colors"
            >
              Lançar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
