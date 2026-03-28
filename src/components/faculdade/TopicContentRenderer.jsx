import React, { useRef, useEffect, useState } from 'react';
import { Lightbulb, Briefcase, Target, HelpCircle, BookOpen } from 'lucide-react';

const FormattedText = ({ text }) => {
  if (!text) return null;
  // Parse `backticks` into styled tags
  const parts = text.split(/`([^`]+)`/g);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is a matched term
          return (
            <span key={index} className="mx-1 font-mono text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md bg-hub-surface text-yellow-500 font-bold border border-hub-border uppercase tracking-widest shadow-sm">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export const TopicContentRenderer = ({ blocks, disciplineColor }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element has been scrolled past
      // To make progress bar smooth within the visible area:
      const totalHeight = rect.height;
      const amountScrolled = windowHeight - rect.top;
      
      if (rect.top > windowHeight) {
        setProgress(0);
      } else if (rect.bottom < 0) {
        setProgress(100);
      } else {
        let p = (amountScrolled / totalHeight) * 100;
        if (p < 0) p = 0;
        if (p > 100) p = 100;
        setProgress(p);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="relative mb-8" ref={containerRef}>
      {/* Progresso de leitura */}
      <div className="sticky top-[80px] md:top-[90px] left-0 right-0 z-20 h-1 bg-hub-base rounded-full mb-6 overflow-hidden border border-hub-border opacity-80 backdrop-blur-sm shadow-sm transition-opacity">
        <div 
          className="h-full transition-all duration-150 ease-out"
          style={{ width: `${progress}%`, backgroundColor: disciplineColor || '#eab308' }}
        />
      </div>

      <div className="space-y-6">
        {blocks.map((block, idx) => {
          switch(block.type) {
            case 'concept':
              return (
                <div key={idx} className="p-5 md:p-6 rounded-2xl border border-hub-border shadow-sm"
                     style={{ 
                       borderLeftWidth: '4px', 
                       borderLeftColor: disciplineColor || '#8b5cf6',
                       backgroundColor: disciplineColor ? `color-mix(in srgb, ${disciplineColor} 6%, transparent)` : 'var(--hub-base)'
                     }}>
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: disciplineColor || '#8b5cf6' }} />
                    <h4 className="font-black text-hub-strong text-base md:text-lg">{block.title}</h4>
                  </div>
                  <p className="text-sm text-hub-content leading-relaxed">
                    <FormattedText text={block.text} />
                  </p>
                </div>
              );

            case 'example':
              return (
                <div key={idx} className="p-5 md:p-6 rounded-2xl bg-hub-base border border-hub-border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-hub-faint" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-hub-muted border border-hub-border/50 px-2 py-0.5 rounded-md bg-hub-inner">Case Real</span>
                  </div>
                  {block.title && <h4 className="font-bold text-hub-strong text-sm mb-2">{block.title}</h4>}
                  <p className="text-sm text-hub-content leading-relaxed">
                    <FormattedText text={block.text} />
                  </p>
                </div>
              );

            case 'analogy':
              return (
                <div key={idx} className="p-5 md:p-6 rounded-2xl border-2 border-dashed border-hub-border shadow-sm bg-hub-inner/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded-md bg-yellow-500/10">Analogia</span>
                  </div>
                  <p className="text-sm md:text-base italic text-hub-content leading-relaxed">
                    <FormattedText text={block.text} />
                  </p>
                </div>
              );

            case 'sidebar':
              return (
                <blockquote key={idx} className="pl-4 py-1 border-l-4" style={{ borderLeftColor: disciplineColor || '#8b5cf6' }}>
                  <p className="text-sm text-hub-content leading-relaxed italic border border-hub-border p-4 rounded-xl bg-hub-base shadow-sm">
                    <FormattedText text={block.text} />
                  </p>
                </blockquote>
              );

            case 'takeaway':
              return (
                <div key={idx} className="p-5 rounded-xl bg-hub-inner border border-hub-border flex items-start gap-4 shadow-sm mt-8">
                  <div className="bg-hub-base p-2 rounded-lg border border-hub-border flex-shrink-0">
                    <Target className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-hub-strong mb-1">Takeaway / Ponto-Chave</h5>
                    <p className="text-sm text-hub-muted font-medium">
                      <FormattedText text={block.text} />
                    </p>
                  </div>
                </div>
              );

            case 'question':
              return (
                <div key={idx} className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 flex items-start gap-4 shadow-sm">
                  <div className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-1">Reflexão Ativa</h5>
                    <p className="text-sm text-hub-strong italic font-medium">
                      <FormattedText text={block.text} />
                    </p>
                  </div>
                </div>
              );

            default:
              return (
                <p key={idx} className="text-sm text-hub-content leading-relaxed">
                  <FormattedText text={block.text} />
                </p>
              );
          }
        })}
      </div>
    </div>
  );
};
