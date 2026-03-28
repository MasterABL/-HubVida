import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckSquare, Edit3, Calendar, Clock } from 'lucide-react';

import { ContentTab } from './Tabs/ContentTab';
import { ProgressTab } from './Tabs/ProgressTab';
import { FreeNotesTab } from './Tabs/FreeNotesTab';
import { ReviewsTab } from './Tabs/ReviewsTab';
import { PomodoroTab } from './Tabs/PomodoroTab';

export const DisciplineDetail = ({ discipline, session, onBack }) => {
  const [activeTab, setActiveTab] = useState('content');

  const tabs = [
    { id: 'content', label: 'Tópicos', icon: BookOpen },
    { id: 'progress', label: 'Progresso & AS', icon: CheckSquare },
    { id: 'notes', label: 'Anotações', icon: Edit3 },
    { id: 'reviews', label: 'Revisão', icon: Calendar },
    { id: 'pomodoro', label: 'Pomodoro', icon: Clock }
  ];

  return (
    <div className="w-full min-w-0 max-w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-hub-surface border border-hub-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-hub-inner hover:bg-hub-hover text-hub-muted hover:text-white rounded-xl transition-all"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl text-white border border-white/5"
              style={{ backgroundColor: discipline.color }}
            >
              {discipline.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-hub-strong leading-tight">{discipline.name}</h2>
              {discipline.semester && (
                <span className="text-xs font-semibold text-hub-faint uppercase tracking-wider">
                  {discipline.semester}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="w-full bg-hub-surface border border-hub-border rounded-2xl p-2 flex overflow-x-auto no-scrollbar gap-2 shadow-sm">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all shrink-0 sm:flex-1 justify-center ${
                isActive 
                  ? 'bg-hub-inner text-white shadow-sm ring-1 ring-white/10' 
                  : 'text-hub-muted hover:text-hub-strong hover:bg-hub-hover'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-hub-muted'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="w-full bg-hub-surface border border-hub-border rounded-2xl p-4 md:p-6 shadow-sm min-h-[500px]">
        {activeTab === 'content' && <ContentTab discipline={discipline} session={session} />}
        {activeTab === 'progress' && <ProgressTab discipline={discipline} session={session} />}
        {activeTab === 'notes' && <FreeNotesTab discipline={discipline} session={session} />}
        {activeTab === 'reviews' && <ReviewsTab discipline={discipline} session={session} />}
        {activeTab === 'pomodoro' && <PomodoroTab discipline={discipline} session={session} />}
      </div>
    </div>
  );
};
