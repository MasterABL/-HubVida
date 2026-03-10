import React, { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    // Evitar quebra em SSR/Ambientes sem IntersectionObserver
    if (typeof window !== 'undefined' && !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Aciona apenas uma vez (entrada na tela) e para de observar para focar na performance
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      // RootMargin permite antecipar a animação logo antes de aparecer na tela
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all ease-out will-change-[opacity,transform] duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
