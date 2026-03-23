'use client';

import { useState, useRef, useEffect } from 'react';
import { Instagram, Linkedin, CheckCircle } from 'lucide-react';

const servicesList = [
  'Logo Design', 'Brand Starter Kit', 'Brand Full Package', 'Business Card Design',
  'Social Media Post Design', 'YouTube Thumbnail', 'Poster / Flyer Design', 'Banner / Ad Creative',
  'Presentation Design', 'Resume / CV Design', 'Canva Template Design',
  'App Screen Design', 'Landing Page Design', 'App Wireframe',
  'Ready-to-Post Social Media Campaign', 'AI Product Ad Video', 'Monthly Content Pack', 'Ad Copywriting', 'AI Prompt Set'
];

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [message, setMessage] = useState('');
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for service in URL parameters (cart/selection)
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam && servicesList.includes(serviceParam)) {
      setSelectedService(serviceParam);
    }
  }, []);

  useEffect(() => {
    const handleCartEnquiry = (e: any) => {
      const services = e.detail.services as string[];
      if (services.length > 0) {
        setSelectedService(services[0]);
        const messageText = `I am interested in the following services:\n\n${services.map(s => `- ${s}`).join('\n')}`;
        setMessage(messageText);
      }
    };

    window.addEventListener('cart-enquiry', handleCartEnquiry);
    return () => window.removeEventListener('cart-enquiry', handleCartEnquiry);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx: any;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
              },
            }
          );
        }

        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.2,
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
  }, []);

  useEffect(() => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;
      }

      const formData = new FormData(form);
      formData.append('access_key', '84f54ced-9fbe-4ee4-b513-385cf7a69b3d');

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setIsSuccess(true);
          setTimeout(() => {
            form.reset();
            setIsSuccess(false);
            if (submitBtn) {
              submitBtn.innerText = "Send Message →";
              submitBtn.disabled = false;
            }
          }, 4000);
        } else {
          alert(result.message || 'Something went wrong.');
          if (submitBtn) {
            submitBtn.innerText = "Send Message →";
            submitBtn.disabled = false;
          }
        }
      })
      .catch(error => {
        alert('Network error. Please try again later.');
        if (submitBtn) {
          submitBtn.innerText = "Send Message →";
          submitBtn.disabled = false;
        }
      });
    };

    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, [isSuccess]);

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            <span className="font-light">Ready to build something</span> <br />
            <span className="font-bold italic text-gradient">remarkable?</span>
          </h2>
          <p className="text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Share your vision — I&apos;ll bring the expertise, tools, and precision to make it real. Response within 24 hours.
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://www.instagram.com/indratree.kreations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-pink transition-colors p-3 rounded-full hover:bg-white/5 border border-white/10"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/indratree-kreations-8675123b4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-purple transition-colors p-3 rounded-full hover:bg-white/5 border border-white/10"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative glass-panel rounded-3xl overflow-hidden p-8 md:p-12">
          {/* Top Gradient Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple to-pink" />
          
          <form id="contact-form" ref={formRef} className={`space-y-6 ${isSuccess ? 'hidden' : 'block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full bg-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="font-mono text-xs uppercase tracking-widest text-muted">Service</label>
              <select 
                id="service" 
                name="service" 
                className="w-full bg-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-all appearance-none"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="" disabled>Select a service</option>
                {servicesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted">Message</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={4}
                className="w-full bg-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple transition-all resize-none"
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              id="submit-btn"
              className="w-full py-4 bg-white text-bg rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-purple hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              Send Message →
            </button>
          </form>

          {isSuccess && (
            <div id="form-success" className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-serif text-3xl mb-2 text-white">Message Sent!</h3>
              <p className="text-muted">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
