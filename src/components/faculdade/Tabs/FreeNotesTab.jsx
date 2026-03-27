import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { Loader2 } from 'lucide-react';
import { MarkdownEditor } from '../MarkdownEditor';

export const FreeNotesTab = ({ discipline, session }) => {
  const [noteId, setNoteId] = useState(null);
  const [initialContent, setInitialContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNote = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('free_notes')
        .select('id, content')
        .eq('discipline_id', discipline.id)
        .eq('user_id', session.id)
        .maybeSingle(); // Used maybeSingle because note might not exist yet

      if (error) throw error;
      
      if (data) {
        setNoteId(data.id);
        setInitialContent(data.content || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [discipline.id]);



  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-hub-muted" /></div>;

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-hub-strong">Anotações Livres</h3>
          <p className="text-xs text-hub-faint">Rascunhos, lembretes ou ideias gerais sobre a disciplina.</p>
        </div>
      </div>
      
      <div className="flex-1 min-h-[400px]">
        <MarkdownEditor 
          disciplineId={discipline.id}
          session={session}
          initialContent={initialContent}
          noteId={noteId}
        />
      </div>
    </div>
  );
};
