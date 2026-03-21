'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Check, X, ArrowRight } from 'lucide-react';

const servicesData = [
  { id: 'b1', category: 'Brand & Logo', name: 'Logo Design', desc: '2 concepts + 1 revision' },
  { id: 'b2', category: 'Brand & Logo', name: 'Brand Starter Kit', desc: 'Logo + colors + fonts' },
  { id: 'b3', category: 'Brand & Logo', name: 'Brand Full Package', desc: 'Logo + card + post + banner' },
  { id: 'b4', category: 'Brand & Logo', name: 'Business Card Design', desc: 'Front + back, print-ready' },
  
  { id: 's1', category: 'Social & Graphics', name: 'Social Media Post Design', desc: 'Instagram, LinkedIn, Facebook' },
  { id: 's2', category: 'Social & Graphics', name: 'YouTube Thumbnail', desc: 'Delivered in 24 hours' },
  { id: 's3', category: 'Social & Graphics', name: 'Poster / Flyer Design', desc: 'Events, promos, digital or print' },
  { id: 's4', category: 'Social & Graphics', name: 'Banner / Ad Creative', desc: 'Any platform, any size' },
  
  { id: 'p1', category: 'Presentations', name: 'Presentation Design', desc: 'Per 10 slides, PPT or PDF' },
  { id: 'p2', category: 'Presentations', name: 'Resume / CV Design', desc: 'Clean, modern, ATS-friendly' },
  { id: 'p3', category: 'Presentations', name: 'Canva Template Design', desc: 'Reusable, fully editable' },
  
  { id: 'w1', category: 'Web & App', name: 'App Screen Design', desc: 'Per screen, Figma or Canva' },
  { id: 'w2', category: 'Web & App', name: 'Landing Page Design', desc: 'Full page, Figma or HTML/CSS' },
  { id: 'w3', category: 'Web & App', name: 'App Wireframe', desc: 'Structured flow, low to mid fidelity' },
  
  { id: 'c1', category: 'Campaigns & AI', name: 'Ready-to-Post Social Media Campaign', desc: 'Brand analyzed → posts + banners + video + copy' },
  { id: 'c2', category: 'Campaigns & AI', name: 'AI Product Ad Video', desc: '15–30 sec AI-generated video' },
  { id: 'c3', category: 'Campaigns & AI', name: 'Monthly Content Pack', desc: '10 posts + copy, ongoing retainer' },
  { id: 'c4', category: 'Campaigns & AI', name: 'Ad Copywriting', desc: '3 persuasive ad copy variations' },
  { id: 'c5', category: 'Campaigns & AI', name: 'AI Prompt Set', desc: 'Custom prompt library for any tool' },
];

const categories = ['All', 'Brand & Logo', 'Social & Graphics', 'Presentations', 'Web & App', 'Campaigns & AI'];

export default function Services() {
  const [activeTab, setActiveTab] = useState('All');
  const [cart, setCart] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx: any;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      
      ctx = gsap.context(() => {
        const validCards = cardsRef.current.filter(el => el !== null);
        if (validCards.length > 0) {
          gsap.fromTo(
            validCards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
              },
            }
          );
        }
      }, sectionRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, [activeTab]);

  const filteredServices = activeTab === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  const toggleCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const getRelatedServices = (category: string, currentId: string) => {
    return servicesData
      .filter(s => s.category === category && s.id !== currentId)
      .slice(0, 2);
  };

  const handleSendEnquiry = () => {
    const selectedServiceNames = cart.map(id => servicesData.find(s => s.id === id)?.name).filter(Boolean);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cart-enquiry', { 
      detail: { services: selectedServiceNames } 
    }));

    setIsCartOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            <span className="font-light">My</span> <span className="font-bold italic text-gradient">Services</span>
          </h2>
          <p className="text-muted font-mono text-sm uppercase tracking-widest max-w-2xl">
            Select the services you need to build your custom package. No hidden fees, just clear deliverables.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat 
                  ? 'bg-white text-bg' 
                  : 'border border-white/10 text-muted hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const inCart = cart.includes(service.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  ref={el => { cardsRef.current[index] = el; }}
                  className={`glass-panel p-8 rounded-2xl flex flex-col h-full transition-all duration-300 ${
                    inCart ? 'border-purple/50 bg-purple/5' : 'hover:border-white/20'
                  }`}
                >
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-muted font-mono text-[10px] uppercase tracking-widest mb-4">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-muted text-sm">{service.desc}</p>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <button
                      onClick={() => toggleCart(service.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                        inCart 
                          ? 'bg-purple text-white' 
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {inCart ? (
                        <><Check size={16} /> Added to Enquiry</>
                      ) : (
                        <><Plus size={16} /> Add to Enquiry</>
                      )}
                    </button>

                    {/* Related Chips */}
                    <AnimatePresence>
                      {inCart && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-white/10"
                        >
                          <p className="text-[10px] text-muted font-mono uppercase tracking-widest mb-2">Frequently added together:</p>
                          <div className="flex flex-wrap gap-2">
                            {getRelatedServices(service.category, service.id).map(related => (
                              <button
                                key={related.id}
                                onClick={() => toggleCart(related.id)}
                                className={`text-[10px] px-2 py-1 rounded border transition-colors ${
                                  cart.includes(related.id)
                                    ? 'border-pink text-pink bg-pink/10'
                                    : 'border-white/20 text-muted hover:border-white/50'
                                }`}
                              >
                                + {related.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-to-r from-purple to-pink rounded-full flex items-center justify-center shadow-lg shadow-purple/20 hover:scale-110 transition-transform"
          >
            <ShoppingCart className="text-white" />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-bg rounded-full flex items-center justify-center font-bold text-xs">
              {cart.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-serif text-2xl">Your Enquiry</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-muted hover:text-white rounded-full hover:bg-white/5">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted text-center mt-10">Your enquiry list is empty.</p>
                ) : (
                  cart.map(id => {
                    const service = servicesData.find(s => s.id === id);
                    if (!service) return null;
                    return (
                      <div key={id} className="flex justify-between items-start p-4 rounded-xl bg-white/5 border border-white/5">
                        <div>
                          <p className="text-[10px] text-purple font-mono uppercase tracking-widest mb-1">{service.category}</p>
                          <h4 className="font-bold text-sm">{service.name}</h4>
                        </div>
                        <button 
                          onClick={() => toggleCart(id)}
                          className="text-muted hover:text-pink p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-bg/50">
                <button
                  onClick={handleSendEnquiry}
                  disabled={cart.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white text-bg rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-purple hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Enquiry <ArrowRight size={16} />
                </button>
                <p className="text-center text-xs text-muted mt-4">
                  No payment required. We&apos;ll discuss details first.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
