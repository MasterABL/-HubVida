import React, { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState('down');
  const domRef = useRef();
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    // Evitar quebra em SSR/Ambientes sem IntersectionObserver
    if (typeof window !== 'undefined' && !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          // Descobre a direção baseada no scrollY anterior
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
          // Se for na mesma posição (ex: load da página), assume down como default
          if (currentScrollY !== lastScrollY.current) {
            lastScrollY.current = currentScrollY;
          }

          if (entry.isIntersecting) {
            setScrollDir(direction);
            setIsVisible(true);
          } else {
            // Reverte o estado quando sai da tela
            // Assim ele anima novamente quando entrar (cima ou baixo)
            setIsVisible(false);
          }
        });
      },
      // RootMargin permite antecipar a animação logo antes de aparecer na tela
      { rootMargin: '0px 0px -50px 0px', threshold: 0.05 }
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

  // Aplica as classes CSS criadas no index.css
  const directionClass = scrollDir === 'down' ? 'scrolling-down' : 'scrolling-up';
  const visibilityClass = isVisible ? 'is-visible' : 'is-hidden';

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-wrapper will-change-[opacity,transform] ${directionClass} ${visibilityClass}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
