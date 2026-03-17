'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const subtext2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    import('gsap').then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

        if (labelRef.current) tl.fromTo(labelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: 0.2 });
        if (line1Ref.current) tl.fromTo(line1Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6');
        if (line2Ref.current) tl.fromTo(line2Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8');
        if (line3Ref.current) tl.fromTo(line3Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8');
        if (subtextRef.current) tl.fromTo(subtextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6');
        if (subtext2Ref.current) tl.fromTo(subtext2Ref.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8');
        if (ctaRef.current) tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6');
        if (socialRef.current) tl.fromTo(socialRef.current, { opacity: 0 }, { opacity: 1, duration: 2 }, '-=0.5');
      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10" ref={containerRef}>
        <div className="max-w-4xl">
          <div 
            ref={labelRef}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted">
              Creative Designer & AI Specialist
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
            <div ref={line1Ref} className="font-light text-white">Design that</div>
            <div ref={line2Ref} className="font-bold italic text-gradient">speaks</div>
            <div ref={line3Ref} className="font-light text-white">for itself.</div>
          </h1>

          <div className="space-y-4 mb-12 max-w-2xl">
            <p ref={subtextRef} className="text-lg md:text-xl text-muted font-light leading-relaxed">
              Every brand has a story worth seeing. I make sure yours is impossible to ignore.
            </p>
            <p ref={subtext2Ref} className="text-lg md:text-xl text-muted font-light leading-relaxed">
              I work around your brief, your budget, and your deadline. Not the other way around.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link 
              href="#services"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-bg rounded-full font-mono text-sm uppercase tracking-widest hover:bg-purple hover:text-white transition-all duration-300"
            >
              See My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#contact"
              className="px-8 py-4 border border-white/20 rounded-full font-mono text-sm uppercase tracking-widest text-white hover:border-pink hover:text-pink transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>

          <div ref={socialRef} className="mt-16 flex items-center gap-6">
            <a 
              href="https://www.instagram.com/indaratri.kreations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-pink transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/indaratri-kumari-8675123b4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-purple transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
