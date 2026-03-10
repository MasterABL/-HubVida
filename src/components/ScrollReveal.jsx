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

  // Parallax leve no header de cada módulo
  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      if (!isVisible || !domRef.current) return;

      rafId = requestAnimationFrame(() => {
        if (!domRef.current) return;
        const rect = domRef.current.getBoundingClientRect();

        // Aplica o efeito apenas enquanto o container está na viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Headers: h1, h2, e banners com fundo gradient (assumindo que representam headers visuais)
          const headers = domRef.current.querySelectorAll('h1, h2, .bg-gradient-to-r');
          if (!headers || headers.length === 0) return;

          // Efeito: O usuário quer que o título mova 30% mais devagar que o resto.
          const viewportCenter = window.innerHeight / 2;
          const elementCenter = rect.top + rect.height / 2;
          const distance = elementCenter - viewportCenter;

          // Fator de movimento parallax sutil
          const translateY = distance * 0.15;

          headers.forEach(h => {
            // Limita a um intervalo seguro para não quebrar o layout
            const clampedY = Math.max(-50, Math.min(50, translateY));
            h.style.transform = `translateY(${clampedY}px)`;
            h.style.transition = 'none'; // Sem transição de CSS durante scroll para evitar lag
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Chama uma vez para posição inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

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
