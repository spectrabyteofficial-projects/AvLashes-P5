import { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Link } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActiveTab, onOpenBooking }: FooterProps) {
  const [logoError, setLogoError] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyClick = (sectionId: string) => {
    setActiveTab('services');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <footer id="main-application-footer" className="bg-[#121212] text-white pt-16 pb-8 border-t border-gold-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Editorial Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-12 h-12 rounded-full border border-gold-300/60 overflow-hidden flex items-center justify-center bg-white">
                {!logoError ? (
                  <img
                    src="https://res.cloudinary.com/dqffphhit/image/upload/v1780162967/Gemini_Generated_Image_xn1fvuxn1fvuxn1f_dsimfn.png"
                    alt="AV Lashes Logo"
                    className="w-full h-full p-1 object-contain block"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="font-serif text-[11px] text-gold-700 font-semibold uppercase">AV</span>
                )}
              </div>
              <div className="flex flex-col justify-center select-none">
                <h3 className="font-joining-cursive text-3xl sm:text-[45px] text-gold-300 font-normal leading-[0.8] tracking-normal pr-2">AV Lashes</h3>
                <span className="text-[8px] font-mono tracking-widest text-neutral-400 font-semibold uppercase mt-2 block">BEAUTY STUDIO</span>
              </div>
            </div>
            <p className="text-[#999999] text-xs leading-relaxed max-w-xs font-light">
              Exquisite lash artistry for the modern individual. Redefining beauty one lash at a time. Defining luxury in every blink.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gold-500/80 space-y-1.5">
              <p>📍 Sewall Highway, Coventry, CV6 7JD</p>
              <p>
                📞 <a href="tel:+447951541965" className="hover:text-gold-400 hover:underline transition-all">+44 7951 541965</a>
              </p>
              <p>
                💬 <a href="https://api.whatsapp.com/send/?phone=447951541965&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" referrerPolicy="no-referrer" className="text-emerald-400 hover:text-emerald-300 hover:underline transition-all">WhatsApp Chat</a>
              </p>
              <p>
                ✉️ <a href="mailto:srtaamaliabeauty@gmail.com" className="hover:text-gold-400 hover:underline transition-all">srtaamaliabeauty@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-[#666666] font-bold uppercase mb-4">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-[#999999] font-medium">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform"
                >
                  Home Lobby
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform"
                >
                  Amalia Vasile & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform"
                >
                  Our Treatment List
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('gallery')}
                  className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform"
                >
                  Artistry Gallery & Feed
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('testimonials')}
                  className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform"
                >
                  Client Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support Policies */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-[#666666] font-bold uppercase mb-4">
              OUR SERVICES & LAWS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#999999] font-medium">
              <li>
                <a
                  href="https://lashmap.ai/s/avlashes"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform inline-block"
                >
                  Request Appointment
                </a>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('deposit-policy')} className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform">
                  Refund & Deposit Policy
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('aftercare')} className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform">
                  Care Guidelines after Treatment
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('privacy')} className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform">
                  Privacy Regulations
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('terms')} className="hover:text-gold-400 hover:translate-x-1 duration-300 transition-transform">
                  Terms of Service Agreement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Boutique Social Connections */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest text-[#666666] font-bold uppercase mb-4">
              STUDIO SOCIAL CONNECTIONS
            </h4>
            <p className="text-xs text-[#999999] leading-relaxed mb-4 font-light">
              Follow our work for lash health insights, design mappings, and luxury transformations.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://linktr.ee/SrtaAVlashes"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-gold-500 hover:text-gold-500 rounded-full flex items-center justify-center transition-all duration-300"
                title="Follow us on Linktree"
              >
                <Link className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/srta.amalia_beauty_?igsh=OTNwbjg5bXYydGxr&utm_source=qr"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-gold-500 hover:text-gold-500 rounded-full flex items-center justify-center transition-all duration-300"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@srta.amalia_beauty_"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-gold-500 hover:text-gold-500 rounded-full flex items-center justify-center transition-all duration-300"
                title="Follow us on TikTok"
              >
                {/* TikTok custom note icon using standard music symbol */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.22.95 1.15 2.27 1.95 3.73 2.22v3.86a11.1 11.1 0 0 1-5.18-1.55c-.06 2.65-.01 5.3-.04 7.95a6.52 6.52 0 0 1-5.63 6.27c-3.53.51-6.91-1.92-7.14-5.46a6.52 6.52 0 0 1 5.86-6.89c.36-.04.72-.03 1.08.01v3.82c-.36-.11-.74-.13-1.12-.06-1.54.21-2.5 1.74-2.12 3.23.36 1.41 1.83 2.24 3.19 1.78a2.53 2.53 0 0 0 1.63-2.31c.04-3.52.01-7.05.02-10.58.01-2.22.01-4.44.01-6.66z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/Srta.Amaliabeauty?mibextid=wwXIfr&rdid=7c0O92WibqQesCC4&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EKPuUpM6m%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-gold-500 hover:text-gold-500 rounded-full flex items-center justify-center transition-all duration-300"
                title="Connect with us on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#666666] hover:text-gold-400 duration-300 uppercase font-medium"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Scroll to Top</span>
            </button>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#666666] space-y-4 sm:space-y-0">
          <p>© 2026 AV LASHES BEAUTY STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <button onClick={() => handlePolicyClick('privacy')} className="hover:text-gold-400">PRIVACY REGULATION</button>
            <button onClick={() => handlePolicyClick('terms')} className="hover:text-gold-400">TERMS OF SERVICE</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
