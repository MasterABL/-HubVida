import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';

// Custom hook to debounce saves
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export const MarkdownEditor = ({ session, topicId, disciplineId, initialContent = '', noteId = null }) => {
  const [content, setContent] = useState(initialContent);
  const debouncedContent = useDebounce(content, 1500);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, saved, error
  const [currentNoteId, setCurrentNoteId] = useState(noteId);

  // Auto-save effect
  useEffect(() => {
    // Only save if it has changed from initialContent (or prevent saving on first mount)
    if (debouncedContent === initialContent && !currentNoteId) return;
    
    const saveNote = async () => {
      setSaveStatus('saving');
      try {
        let payload = { content: debouncedContent, user_id: session.id };
        let table = '';
        
        if (topicId) {
          payload.topic_id = topicId;
          table = 'topic_notes';
        } else if (disciplineId) {
          payload.discipline_id = disciplineId;
          table = 'free_notes';
        }

        const { data, error } = await supabase
          .from(table)
          .upsert({ ...payload, id: currentNoteId || undefined }, { onConflict: currentNoteId ? 'id' : (topicId ? 'topic_id,user_id' : 'discipline_id,user_id') })
          .select()
          .single();

        if (error) throw error;
        
        if (!currentNoteId && data) {
          setCurrentNoteId(data.id);
        }
        
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (err) {
        console.error('Error saving note:', err);
        setSaveStatus('error');
      }
    };

    saveNote();
  }, [debouncedContent]); // Exclude other dependencies to only auto-save on content change

  return (
    <div className="flex flex-col border border-hub-border rounded-xl overflow-hidden bg-hub-surface relative">
      <div className="p-2 border-b border-hub-border bg-hub-inner flex items-center justify-between text-xs font-bold text-hub-muted">
        <span className="uppercase tracking-widest">Editor Markdown (Suporta texto bruto)</span>
        <div className="flex items-center">
          {saveStatus === 'saving' && <span className="flex items-center gap-1 text-yellow-500"><Loader2 className="w-3 h-3 animate-spin"/> Salvando...</span>}
          {saveStatus === 'saved' && <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 className="w-3 h-3"/> Salvo</span>}
          {saveStatus === 'error' && <span className="text-rose-500">Erro ao salvar</span>}
        </div>
      </div>
      <textarea
        className="w-full h-48 sm:h-64 p-4 bg-transparent outline-none text-sm text-hub-strong font-mono resize-none"
        placeholder="Escreva suas anotações aqui..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setSaveStatus('saving'); // immediate feedback
        }}
      />
    </div>
  );
};
