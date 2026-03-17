'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx: any;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (leftColRef.current) {
          gsap.fromTo(
            leftColRef.current,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
              },
            }
          );
        }

        if (rightColRef.current) {
          gsap.fromTo(
            rightColRef.current,
            { x: 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
              },
            }
          );
        }

        if (statsRef.current) {
          gsap.fromTo(
            Array.from(statsRef.current.children),
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%',
              },
            }
          );
        }
      }, sectionRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Text */}
          <div ref={leftColRef} className="space-y-8">
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              <span className="font-light">Hello, I&apos;m</span> <br />
              <span className="font-bold italic text-gradient">Indaratri.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted font-light leading-relaxed">
              <p>
                I&apos;m a designer and AI creative specialist based in India.
              </p>
              <p>
                I work at the intersection of strategy, aesthetics, and modern AI tools to build brands and digital experiences that don&apos;t just look good — they perform.
              </p>
              <p>
                Every project I take on gets my full attention, from the first brief to the final file. I combine formal design training with years of self-directed practice — which means I bring both structure and creative instinct to everything I make.
              </p>
              <p className="text-white font-medium">
                Clean process. Fast delivery. Results that speak for themselves.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {['Brand Design', 'UI/UX', 'AI Creative'].map(skill => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Orbital Animation */}
          <div ref={rightColRef} className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-pink/10 rounded-full blur-3xl opacity-50" />
            
            {/* Orbital CSS Animation */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Central Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple to-pink shadow-[0_0_40px_rgba(124,58,237,0.5)] z-10" />
              
              {/* Ring 1 */}
              <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
              </div>
              
              {/* Ring 2 */}
              <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
              </div>
              
              {/* Ring 3 */}
              <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-4xl md:text-5xl text-white mb-2">15+</h4>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Services Offered</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif text-4xl md:text-5xl text-white mb-2">24hr</h4>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Fastest Delivery</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif text-4xl md:text-5xl text-white mb-2">100%</h4>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Satisfaction Goal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
