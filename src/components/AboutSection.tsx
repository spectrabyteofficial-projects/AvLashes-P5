import { useState, useRef, useCallback } from 'react';
import { Check, Shield, Award, Heart, Sparkles, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, Instagram, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import salonInterior from '../assets/images/salon_interior_1779994342569.png';

interface AboutSectionProps {
  onOpenBooking: () => void;
  onOpenServices: () => void;
  onOpenConsultation: () => void;
}

export default function AboutSection({ onOpenBooking, onOpenServices, onOpenConsultation }: AboutSectionProps) {
  const [logoError, setLogoError] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [prevBgIndex, setPrevBgIndex] = useState(0);
  const touchStartX = useRef(0);

  const bgImages = [
    'https://res.cloudinary.com/dqffphhit/image/upload/v1781006092/KtCMCd_akmtxb.jpg',
    'https://res.cloudinary.com/dqffphhit/image/upload/v1781006092/KcPwal_bqm9sh.jpg',
  ];

  const swapImage = useCallback((direction: number) => {
    setPrevBgIndex(currentBgIndex);
    setCurrentBgIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return bgImages.length - 1;
      if (next >= bgImages.length) return 0;
      return next;
    });
  }, [currentBgIndex, bgImages.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      swapImage(diff > 0 ? 1 : -1);
    }
  };
  
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="space-y-24">
      
      {/* Banner introduction details */}
      <motion.div
        id="about-bio-introduction"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center w-20 h-20 border border-gold-500/40 rounded-full bg-white overflow-hidden shadow-xs hover:scale-105 transition-transform duration-500 mb-2">
            {!logoError ? (
              <img
                src="https://res.cloudinary.com/dqffphhit/image/upload/v1780162967/Gemini_Generated_Image_xn1fvuxn1fvuxn1f_dsimfn.png"
                alt="AV Lashes Logo"
                className="w-full h-full p-1.5 object-contain block"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="font-serif text-lg font-semibold text-gold-700">AV</span>
            )}
            <div className="absolute -inset-0.5 rounded-full border border-dashed border-gold-300 opacity-20 pointer-events-none"></div>
          </div>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          Redefining Modern Glamour
        </h2>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto my-3" />
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed font-light">
          A bespoke lash experience curated for the modern woman who values precision, luxury, and the subtle art of enhancement.
        </p>
      </motion.div>

      {/* Amalia Brand Banner Section - Fully Responsive and Mobile Friendly stacked layout */}
      <div 
        className="flex flex-col lg:relative lg:block rounded-3xl border border-[#E8DCCB]/60 overflow-hidden shadow-xl bg-[#FAF9F5] select-none group lg:min-h-[580px] lg:flex lg:items-center" 
        id="amalia-artistry-deep-bio"
      >
        {/* Full Banner Image Container - fully responsive aspect ratio on mobile, absolute layer on desktop */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:absolute lg:inset-0 lg:w-full lg:h-full lg:aspect-none overflow-hidden z-0">
          <img
            src="https://res.cloudinary.com/dqffphhit/image/upload/v1780499551/Blue_White_Modern_Dental_Clinic_Banner_Landscape_3_syka21.png"
            alt="AV Lashes Brand Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-left block transition-transform duration-700 group-hover:scale-[1.01]"
          />
          {/* Subtle gradient overlay to enhance visual depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Soft elegant gradient overlay (desktop only) to ensure text readability with full opacity behind the overlay card */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent pointer-events-none z-10" />

        {/* Elegantly Overlaid Text Card: Overlaps on bottom of image for mobile editorial touch, absolute on desktop */}
        <div className="relative z-20 w-auto max-w-[92%] sm:max-w-md lg:max-w-[400px] mx-auto lg:mx-0 -mt-16 sm:-mt-20 md:-mt-24 lg:mt-0 ml-4 lg:ml-8 p-5 sm:p-8 lg:p-8 mb-8 lg:my-6 bg-white/95 sm:bg-white/90 backdrop-blur-md rounded-2xl border border-[#E8DCCB]/60 lg:border-white/40 shadow-xl space-y-5 text-[#111111] lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 cursor-auto animate-fadeIn">
          <div>
            <h3 className="font-joining-cursive text-3xl sm:text-4xl lg:text-5xl text-gold-900 tracking-wide leading-none">
              Meet your lash artist
            </h3>
            <span className="font-mono text-[10px] tracking-widest text-[#666666] font-bold uppercase mt-1.5 block">
              Amalia Vasile
            </span>
          </div>

          <div className="space-y-3.5">
            <p className="text-xs sm:text-sm md:text-[14px] leading-relaxed font-light text-zinc-950">
              I am passionate about eyelash extensions and the perfection of every detail. I carefully analyse each client’s eye shape and facial features to create a harmonious set that enhances their natural beauty.
            </p>
            <p className="text-xs sm:text-sm md:text-[14px] leading-relaxed font-light text-zinc-900 font-medium italic">
              Relax, enjoy the moment and let me take care of your eyes.
            </p>
            <p className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-800 uppercase pt-2 border-t border-gold-950/10">
              YOUR EYES are my business card!
            </p>
          </div>
        </div>
      </div>

      {/* Elegant Brands trusted & used section (Premium Materials) */}
      <motion.div
        id="about-trusted-brands"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#FAF9F5]/40 border border-gold-100 rounded-3xl p-6 sm:p-10 space-y-6 text-center shadow-xs"
      >
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-gold-700 font-bold uppercase block">
            PREMIUM PARTNERSHIPS
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold">
            Bespoke Products & Trusted Quality
          </h3>
          <p className="text-xs text-[#555555] font-light max-w-xl mx-auto leading-relaxed">
            Beautiful artistry warrants beautiful ingredients. Amalia exclusively utilizes professional-grade, premium lash extensions and hypoallergenic bonding agents sourced from elite, certified global pioneers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
          <a
            href="https://londonlashpro.com/collections/classic-lashes"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="group flex flex-col items-center justify-center p-5 bg-white border border-[#E8DCCB]/45 hover:border-gold-400 rounded-2xl transition-all duration-300 hover:shadow-xs active:scale-98"
            id="brand-link-london-lash"
          >
            <span className="font-serif text-sm font-bold text-[#111111] group-hover:text-gold-700 transition-colors">
              London Lash Pro
            </span>
            <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-widest group-hover:text-gold-600 transition-colors">
              Classic Collection
            </span>
          </a>
          
          <a
            href="https://lashbase.co.uk/?smile_ref=eyJzbWlsZV9zb3VyY2UiOiJzbWlsZV91aSIsInNtaWxl_ZGl1bSI6IiIsInNtaWxlX2NhbXBhaWduIjoicmVmZXJyYWxfcHJvZ3JhbSIsInNtaWxlX2N1c3RvbWVyX2lkIjozMjE5NzAyOTg0fQ%3D%3D&smile_referral_code=uczhcTxk&st_intent=st%3Areferrals%3Acustomer-offers%3AuczhcTxk&utm_campaign=smileio_referrals&utm_medium=referral_url"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="group flex flex-col items-center justify-center p-5 bg-white border border-[#E8DCCB]/45 hover:border-gold-400 rounded-2xl transition-all duration-300 hover:shadow-xs active:scale-98"
            id="brand-link-lashbase"
          >
            <span className="font-serif text-sm font-bold text-[#111111] group-hover:text-gold-700 transition-colors">
              Lash Base
            </span>
            <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-widest group-hover:text-gold-600 transition-colors">
              Premium Lashes
            </span>
          </a>

          <a
            href="https://gemuinelashes.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAQdCpRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadS3ZrXaBkpTHOadpWuqhVOPsZwslJ7Q-LHgpg6twuZHmD9kve4P0iAF8skgg_aem_9Sf6iNz6hNXaIIxFxpdBWg"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="group flex flex-col items-center justify-center p-5 bg-white border border-[#E8DCCB]/45 hover:border-gold-400 rounded-2xl transition-all duration-300 hover:shadow-xs active:scale-98"
            id="brand-link-gemuine"
          >
            <span className="font-serif text-sm font-bold text-[#111111] group-hover:text-gold-700 transition-colors">
              Gemuine Lashes
            </span>
            <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-widest group-hover:text-gold-600 transition-colors">
              Luxury Fibers
            </span>
          </a>

          <a
            href="https://www.kolybellash.com/?ref=AMALIAVASILE"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="group flex flex-col items-center justify-center p-5 bg-white border border-[#E8DCCB]/45 hover:border-gold-400 rounded-2xl transition-all duration-300 hover:shadow-xs active:scale-98"
            id="brand-link-kolybel"
          >
            <span className="font-serif text-sm font-bold text-[#111111] group-hover:text-gold-700 transition-colors">
              Kolybel Lash
            </span>
            <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-widest group-hover:text-gold-600 transition-colors">
              Professional Grade
            </span>
          </a>
        </div>
      </motion.div>

      {/* Philosophy segments */}
      <div className="space-y-12">
        <div className="text-center">
          <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block mb-2">
            CORE PRINCIPLES
          </span>
          <h3 className="font-serif text-3xl text-[#111111] font-semibold">Our Philosophy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Integrity */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 border border-gold-100 rounded-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-gold-50 text-gold-700 flex items-center justify-center mb-6">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#111111] mb-3">Integrity</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                We never compromise on the health of your natural lashes. Our meticulous application techniques ensure long-term lash vitality and natural regrowth cycles remain pristine.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-50 flex items-center text-[10px] font-mono tracking-widest text-gold-600 font-bold uppercase">
              <span>ZERO COMPROMISE</span>
            </div>
          </motion.div>

          {/* Card 2: Luxury (Centered Card in dark tone from image) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#121212] text-white p-8 border border-gold-950 rounded-lg flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-gold-950 text-gold-400 flex items-center justify-center mb-6 border border-gold-700">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-gold-300 mb-3">Luxury</h4>
              <p className="text-xs text-[#dddddd] leading-relaxed font-light">
                Premium materials sourced globally to provide the lightest, softest, and most natural-feeling extensions available. Weightless fiber structures that never tire the eyelid.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/5">
              <button
                onClick={onOpenServices}
                className="text-[10px] font-mono tracking-widest text-gold-400 font-bold uppercase hover:text-gold-300 flex items-center gap-1.5 transition-colors"
              >
                DISCOVER QUALITY <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Customization */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 border border-gold-100 rounded-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-gold-50 text-gold-700 flex items-center justify-center mb-6">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#111111] mb-3">Customization</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                No two sets are the same. Your lashes are engineered specifically for your face shape, facial structure, eyelid posture, and personal lifestyle traits.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-50 flex items-center text-[10px] font-mono tracking-widest text-gold-600 font-bold uppercase">
              <span>BESPOKE ENGINEERING</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Immersive Interior Lounge Section with Image Swapper */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black select-none">
        <div
          className="relative w-full h-[360px] sm:h-[400px] md:h-[460px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentBgIndex}
              src={bgImages[currentBgIndex]}
              alt="Luxury Salon Interior Lounge"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, x: currentBgIndex > prevBgIndex ? 80 : -80 }}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: currentBgIndex > prevBgIndex ? -80 : 80 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => swapImage(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => swapImage(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrevBgIndex(currentBgIndex); setCurrentBgIndex(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentBgIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>

        {/* Overlay blur card info panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent flex items-center px-6 sm:px-12 pointer-events-none">
          <div className="max-w-md space-y-4 text-white">
            <span className="text-[9px] font-mono tracking-widest text-gold-400 font-bold uppercase">
              EXPERIENCE EXCELLENCE
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
              Where Formulation Meets Perfection
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Step inside our serene, neutral-toned studio environment which incorporates sterilization protocols with ambient soundscapes for the ultimate lash self-care session.
            </p>
            <div className="pt-3 flex space-x-4 pointer-events-auto">
              <a
                href="https://wa.me/447951541965"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="px-6 py-3 bg-[#111111] hover:bg-gold-600 border border-gold-500/30 text-white font-mono text-[10px] tracking-widest uppercase font-bold transition-all flex items-center justify-center text-center animate-fadeIn"
              >
                WHATSAPP CONSULTATION
              </a>
              <button
                onClick={onOpenServices}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] tracking-widest uppercase font-bold transition-all border border-white/20"
              >
                VIEW SERVICES
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
