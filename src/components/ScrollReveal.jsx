import React, { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, delay = 0 }) => {
  // Initialize isVisible to true if IntersectionObserver is not available,
  // ensuring content is visible as a fallback.
  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && !window.IntersectionObserver);
  const [scrollDir, setScrollDir] = useState('down');
  const domRef = useRef();
  // Initialize lastScrollY only once, outside of render, using useRef.
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    // Prevent issues in SSR or environments without IntersectionObserver
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // If no IntersectionObserver, and we're in a browser, ensure it's visible.
      // The initial state already handles the !window.IntersectionObserver case.
      // If window is undefined (SSR), the initial state will be false, which is fine.
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Use a functional update for setIsVisible to avoid stale closures
          // if this effect were to depend on isVisible (though it doesn't currently).
          // Also, batch state updates to prevent cascading renders.
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
          
          if (currentScrollY !== lastScrollY.current) {
            lastScrollY.current = currentScrollY;
          }

          // Only update scroll direction if it has actually changed
          // and the element is intersecting.
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
