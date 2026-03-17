'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    if (!dot || !ring) return;

    let ctx: any;
    let cleanup: (() => void) | undefined;

    import('gsap').then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        const onMouseMove = (e: MouseEvent) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          
          if (dot) {
            gsap.to(dot, {
              x: mouseX,
              y: mouseY,
              duration: 0.1,
              ease: 'power2.out',
            });
          }
        };

        let animationFrameId: number;

        const animateRing = () => {
          ringX += (mouseX - ringX) * 0.15;
          ringY += (mouseY - ringY) * 0.15;
          
          if (ring) {
            gsap.set(ring, {
              x: ringX,
              y: ringY,
            });
          }
          
          animationFrameId = requestAnimationFrame(animateRing);
        };

        window.addEventListener('mousemove', onMouseMove);
        animateRing();

        const handleHover = () => {
          if (dot) gsap.to(dot, { scale: 0, duration: 0.2 });
          if (ring) gsap.to(ring, { scale: 1.5, borderColor: '#EC4899', duration: 0.2 });
        };

        const handleHoverOut = () => {
          if (dot) gsap.to(dot, { scale: 1, duration: 0.2 });
          if (ring) gsap.to(ring, { scale: 1, borderColor: '#7C3AED', duration: 0.2 });
        };

        const addHoverListeners = () => {
          const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
          interactables.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleHoverOut);
          });
        };

        addHoverListeners();
        
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        cleanup = () => {
          window.removeEventListener('mousemove', onMouseMove);
          cancelAnimationFrame(animationFrameId);
          observer.disconnect();
          const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
          interactables.forEach(el => {
            el.removeEventListener('mouseenter', handleHover);
            el.removeEventListener('mouseleave', handleHoverOut);
          });
        };
      });
    });

    return () => {
      if (cleanup) cleanup();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-pink rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-purple rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
