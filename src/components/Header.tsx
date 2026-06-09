import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'HOME', value: 'home' },
    { label: 'SERVICES', value: 'services' },
    { label: 'ABOUT', value: 'about' },
    { label: 'GALLERY', value: 'gallery' },
    { label: 'TESTIMONIALS', value: 'testimonials' },
    { label: 'CONTACT', value: 'contact' },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gold-100/30'
          : 'bg-white/60 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          
          {/* Brand Logo Group */}
          <div
            id="brand-logo-container"
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-14 h-14 border border-gold-500/50 rounded-full bg-white overflow-hidden transition-all duration-500 group-hover:scale-105">
              {!logoError ? (
                <img
                  src="https://res.cloudinary.com/dqffphhit/image/upload/v1780162967/Gemini_Generated_Image_xn1fvuxn1fvuxn1f_dsimfn.png"
                  alt="AV Lashes Logo"
                  className="w-full h-full p-1 object-contain block"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="font-serif text-base font-semibold text-gold-700">AV</span>
              )}
              <div className="absolute -inset-0.5 rounded-full border border-dashed border-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col justify-center select-none">
              <h1 className="font-joining-cursive text-4xl sm:text-[48px] text-[#121212] leading-[0.8] tracking-normal font-normal pr-2">
                AV Lashes
              </h1>
              <span className="text-[9px] font-mono tracking-widest text-gold-600 font-medium uppercase mt-2 block">
                BEAUTY STUDIO
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => {
              const isActive = activeTab === item.value;
              return (
                <button
                  key={item.value}
                  id={`nav-link-${item.value}`}
                  onClick={() => {
                    setActiveTab(item.value);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-2 text-xs font-medium tracking-widest transition-colors duration-300 hover:text-gold-700 ${
                    isActive ? 'text-gold-700 font-semibold' : 'text-[#666666]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Booking CTA Button Group */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/447951541965?text=Hi%20Amalia,%20I%20would%20like%20to%20get%20a%20lash%20consultation."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 border border-gold-300 hover:bg-gold-50 text-gold-700 font-mono text-xs tracking-widest font-semibold uppercase transition-all duration-300 hover:-translate-y-0.5 shadow-xs flex items-center gap-1.5"
            >
              <span>CONSULTATION</span>
            </a>
            <a
              id="header-booking-button"
              href="https://lashmap.ai/s/avlashes"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="relative overflow-hidden px-6 py-3 bg-[#111111] text-white font-mono text-xs tracking-widest font-medium uppercase transition-all duration-300 hover:bg-[#333333] hover:-translate-y-0.5 shadow-md flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>BOOKING</span>
            </a>
          </div>

          {/* Mobile Hamburg/Drawer Action Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <a
              id="mobile-quick-booking-btn"
              href="https://lashmap.ai/s/avlashes"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="p-2 border border-gold-200 bg-[#111111] text-white rounded-md shadow-xs block sm:hidden"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#111111] hover:text-gold-600 hover:bg-gold-50/50 rounded-md transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Side-Drawer with Transitions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-20 sm:top-24 left-0 right-0 bg-white border-b border-gold-100 shadow-xl z-50 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 bg-[#fdfdfd]">
              {menuItems.map((item) => {
                const isActive = activeTab === item.value;
                return (
                  <button
                    key={item.value}
                    id={`mobile-nav-link-${item.value}`}
                    onClick={() => {
                      setActiveTab(item.value);
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md text-xs font-medium tracking-widest transition-all ${
                      isActive
                        ? 'bg-gold-50 text-gold-700 border-l-2 border-gold-500 pl-6'
                        : 'text-[#555555] hover:bg-neutral-50 hover:text-[#111111]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-neutral-100 px-4 space-y-2.5">
                <a
                  href="https://wa.me/447951541965?text=Hi%20Amalia,%20I%2520would%20like%2520to%2520get%2520a%2520lash%2520consultation."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 border border-gold-300 text-gold-700 hover:bg-gold-50 font-mono text-center text-xs tracking-widest uppercase font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  💬 CONSULT ON WHATSAPP
                </a>
                <a
                  id="mobile-nav-booking-btn"
                  href="https://lashmap.ai/s/avlashes"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-gold-600 hover:bg-gold-700 text-white font-mono text-center text-xs tracking-widest uppercase font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-100" />
                  REQUEST BOOKING
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
