import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 relative z-10 bg-bg/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif italic font-bold text-gradient tracking-wide">
            Indaratri
          </Link>

          {/* Center Text */}
          <p className="font-mono text-xs uppercase tracking-widest text-muted text-center">
            Design crafted with intention.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/indaratri7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-pink transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/indaratri-kumari-8675123b4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted hover:text-purple transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 border-t border-white/5">
          <p className="font-mono text-[10px] text-muted/50 uppercase tracking-widest">
            © 2025 Indaratri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
