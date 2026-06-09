import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Eye, ShieldCheck, Heart } from 'lucide-react';

interface HomeHeroProps {
  onOpenBooking: () => void;
  onOpenPortfolio: () => void;
  onOpenServices: () => void;
  onSelectService: (id: string) => void;
  onOpenConsultation: () => void;
}

export default function HomeHero({ onOpenBooking, onOpenPortfolio, onOpenServices, onSelectService, onOpenConsultation }: HomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      // Force programmatic play to guarantee autoplay on modern browsers under Netlify securely
      const attemptPlay = () => {
        video.play().catch((err) => {
          console.log("Autoplay prevented on start, retrying on first interaction:", err);
        });
      };
      
      attemptPlay();
      
      // Keep safety retry
      const handleUserInteraction = () => {
        if (video.paused) {
          video.play().catch(() => {});
        }
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
      
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);

      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="space-y-24">
      
      {/* Full Background Luxury Hero Block with Fully Responsive Mobile Friendly stacked layout */}
      <div 
        className="flex flex-col lg:relative lg:block rounded-3xl overflow-hidden border border-[#E8DCCB]/60 lg:border-gold-950/20 shadow-2xl bg-[#FAF9F5] select-none group lg:min-h-[520px] lg:md:min-h-[580px]"
        id="home-hero-container"
      >
        {/* Banner Image Container - fully responsive aspect ratio on mobile, absolute layer on desktop */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:absolute lg:inset-0 lg:w-full lg:h-full lg:aspect-none overflow-hidden z-0">
          <img
            src="https://res.cloudinary.com/dqffphhit/image/upload/v1780253652/Blue_White_Modern_Dental_Clinic_Banner_Landscape_u5zr7x.png"
            alt="AV Lashes beauty concept banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform lg:duration-10000 lg:hover:scale-[1.02]"
          />
          {/* Gentle white overlay for aesthetic depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent pointer-events-none" />
        </div>
        
        {/* Desktop-only superior dark gradient overlay (set to opacity 0 as requested, keeping it for transition if needed) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30 z-10 pointer-events-none opacity-0" />
        <div className="hidden lg:block absolute inset-0 bg-black/40 z-10 pointer-events-none opacity-0" />
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15),transparent_45%)] pointer-events-none z-10 opacity-0" />

        {/* Content Card Group: Overlaps on bottom of image for mobile editorial touch, absolute on desktop */}
        <div className="relative z-20 w-auto max-w-[92%] sm:max-w-xl lg:max-w-3xl mx-auto lg:mx-0 -mt-16 sm:-mt-20 md:-mt-24 lg:mt-0 lg:ml-20 p-6 sm:p-10 lg:p-20 mb-8 lg:my-0 bg-white/95 sm:bg-white/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none rounded-2xl border border-[#E8DCCB]/60 lg:border-none shadow-xl lg:shadow-none space-y-6 lg:space-y-8 text-[#111111] lg:absolute lg:top-1/2 lg:-translate-y-1/2">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-gold-800 font-bold uppercasePatch">
              <Sparkles className="w-4 h-4 text-gold-600 fill-current" />
              <span className="text-[#8E7F72]">AV LASHES PHILOSOPHY</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-extrabold text-zinc-950 leading-tight tracking-tight">
              More than lashes
            </h1>
          </div>

          <p className="text-xs sm:text-base text-zinc-850 max-w-lg leading-relaxed font-medium tracking-wide font-sans">
            Enhancing beauty, inspiring confidence because confidence starts with how you feel
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a
              href="https://lashmap.ai/s/avlashes"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="px-8 py-4 bg-[#8E7F72] hover:bg-gold-700 text-white font-mono text-xs tracking-widest font-black uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              id="hero-book-glow-btn"
            >
              <Calendar className="w-4 h-4 text-white" />
              BOOK YOUR GLOW
            </a>
            <button
              onClick={onOpenPortfolio}
              className="px-8 py-4 border border-[#8E7F72]/50 hover:bg-[#8E7F72]/10 text-[#8E7F72] font-mono text-xs tracking-widest font-bold uppercase transition-all"
              id="hero-view-portfolio-btn"
            >
              VIEW PORTFOLIO
            </button>
          </div>
        </div>
      </div>

      {/* Signature services category section (Screenshot #5 Layout) */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DCCB]/60 p-8 sm:p-12 md:p-16 shadow-xl">
        {/* Background Image covering the whole section */}
        <picture className="absolute inset-0 w-full h-full z-0 block">
          <img
            src="https://res.cloudinary.com/dqffphhit/image/upload/v1780326747/tfBDoy_ajvfh5.jpg"
            alt="AV Lashes service background representation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </picture>
        
        {/* Soft elegant light-overlay rendering beautiful glassmorphic texture */}
        <div className="absolute inset-0 bg-white/85 sm:bg-white/90 backdrop-blur-[1px] z-10 pointer-events-none" />

        <div className="relative z-20 space-y-12">
          
          <div className="border-b border-gray-200/50 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
                CURATED EXPERTISE
              </span>
              <h2 className="font-joining-cursive text-4xl sm:text-[48px] text-[#121212] leading-tight tracking-normal font-normal">
                Signature Services
              </h2>
            </div>
          </div>

          {/* Triple grid services cards layout exhibiting gorgeous custom-designed circles */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 md:gap-10 pt-4"
          >
            
            {/* Card 1: Classic Elegance */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col items-center text-center space-y-5"
            >
              {/* Elegant Circular Image Frame */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-[#E8DCCB] p-1.5 bg-[#F6F3ED] shadow-md transition-all duration-500 group-hover:border-gold-500 group-hover:shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src="https://res.cloudinary.com/dqffphhit/image/upload/v1780675960/WhatsApp_Image_2026-06-05_at_9.09.51_PM_smwpv0.jpg"
                    alt="Classic lash extensions set"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Price & Duration Badge */}
              <span className="inline-block bg-white/90 border border-gold-100 px-3.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-full text-zinc-800 shadow-xs">
                £30 • 2h 40 mins
              </span>

              {/* Text details centered */}
              <div className="space-y-2 max-w-xs px-2">
                <h4 className="font-serif text-lg font-semibold text-gray-950 tracking-tight">1D Classic Elegance</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  The perfect 1:1 application of premium weightless fibers. Provides natural enhancement that seamlessly copies natural lash curvatures.
                </p>
              </div>

              {/* Subtle Link Button */}
              <button
                onClick={() => onSelectService('1d-classic')}
                className="text-[10px] font-mono tracking-widest font-bold text-gold-700 hover:text-[#111111] uppercase flex items-center gap-1.5 transition-colors pt-1"
              >
                DISCOVER DETAILS <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Card 2: Soft Volume */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col items-center text-center space-y-5"
            >
              {/* Elegant Circular Image Frame */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-[#E8DCCB] p-1.5 bg-[#F6F3ED] shadow-md transition-all duration-500 group-hover:border-gold-500 group-hover:shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src="https://res.cloudinary.com/dqffphhit/image/upload/v1780680193/WhatsApp_Image_2026-06-05_at_10.21.47_PM_qd23x7.jpg"
                    alt="Soft Volume lash extension visual"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Price & Duration Badge */}
              <span className="inline-block bg-white/90 border border-gold-100 px-3.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-full text-zinc-800 shadow-xs">
                £45 • 2h 40 mins
              </span>

              {/* Text details centered */}
              <div className="space-y-2 max-w-xs px-2">
                <h4 className="font-serif text-lg font-semibold text-gray-950 tracking-tight">Soft Volume</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  4D-7D creates a fuller, fluffier look with multiple lightweight extensions applied to each natural lash. It gives a soft, elegant volume effect without being too heavy, perfect for a glam yet delicate finish.
                </p>
              </div>

              {/* Subtle Link Button */}
              <button
                onClick={() => onSelectService('soft-volume')}
                className="text-[10px] font-mono tracking-widest font-bold text-gold-700 hover:text-[#111111] uppercase flex items-center gap-1.5 transition-colors pt-1"
              >
                DISCOVER DETAILS <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Card 3: Mega Volume */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col items-center text-center space-y-5"
            >
              {/* Elegant Circular Image Frame */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-[#E8DCCB] p-1.5 bg-[#F6F3ED] shadow-md transition-all duration-500 group-hover:border-gold-500 group-hover:shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src="https://res.cloudinary.com/dqffphhit/image/upload/v1780675958/WhatsApp_Image_2026-06-05_at_9.09.52_PM_xrr3zt.jpg"
                    alt="Mega Volume lash extensions"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Price & Duration Badge */}
              <span className="inline-block bg-white/90 border border-gold-100 px-3.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-full text-zinc-800 shadow-xs">
                £55 • 3h
              </span>

              {/* Text details centered */}
              <div className="space-y-2 max-w-xs px-2">
                <h4 className="font-serif text-lg font-semibold text-gray-950 tracking-tight">Mega Volume</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  Mega Volume gives an intense, ultra-full lash look with maximum density and depth. It creates a bold, dramatic effect while still maintaining a soft, fluffy finish for high-impact glamour.
                </p>
              </div>

              {/* Subtle Link Button */}
              <button
                onClick={() => onSelectService('mega-volume')}
                className="text-[10px] font-mono tracking-widest font-bold text-gold-700 hover:text-[#111111] uppercase flex items-center gap-1.5 transition-colors pt-1"
              >
                DISCOVER DETAILS <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Quote Banner (With Custom Premium Video Background & Fallback Image for Netlify/iOS/low power mode) */}
      <div 
        className="bg-[#121212] text-white py-20 px-6 sm:px-12 text-center rounded-xl border border-gold-950/60 relative overflow-hidden shadow-2xl bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1615396899839-c99c121888b5?auto=format&fit=crop&w=1200&q=80")' }}
      >
        {/* Background Looping Video with programmatic auto-play trigger */}
        <video
          ref={videoRef}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-85"
        >
          <source 
            src="https://res.cloudinary.com/dqffphhit/video/upload/v1780255663/thzdAG_bntuyx.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Dark elegant overlay customized for higher video exposure while preserving high-contrast text contrast */}
        <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-950/20 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-20">
          <p className="font-serif text-2xl sm:text-4xl italic text-white leading-snug tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
            "Eyes are the window to the soul, but lashes are the beautiful frame that completes the masterpiece."
          </p>
          <div className="w-12 h-[1px] bg-gold-400 mx-auto drop-shadow-md" />
          <div className="space-y-1">
            <h5 className="font-mono text-xs text-gold-400 tracking-widest uppercase font-black drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              AMALIA VASILE
            </h5>
            <p className="text-[10px] text-gray-200 font-mono tracking-wider font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              FOUNDER &amp; MASTER ARTIST
            </p>
          </div>
        </div>
      </div>

      {/* Footer Request Call CTA */}
      <div className="bg-white border border-gold-100 rounded-xl p-8 sm:p-12 shadow-xs text-center space-y-5 max-w-2xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900">
          Ready to elevate your look?
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto font-light">
          Unlock your custom lash style card today. Same day appointment slots available under request.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://lashmap.ai/s/avlashes"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="px-8 py-3.5 bg-[#111111] hover:bg-gold-600 text-white font-mono text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center"
          >
            BOOK YOUR GLOW
          </a>
          <a
            href="https://wa.me/447951541965"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="px-8 py-3.5 border border-gold-300 hover:bg-gold-50 text-gold-700 font-mono text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center"
          >
            CONSULTATION
          </a>
        </div>
      </div>

    </div>
  );
}
