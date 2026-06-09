import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS, INSTAGRAM_POSTS } from '../data';
import { PortfolioItem } from '../types';
import { Eye, Heart, MessageCircle, Instagram, Sparkles, X, ChevronLeft, ChevronRight, Calendar, Bookmark, Link, Music } from 'lucide-react';

interface PortfolioGridProps {
  onOpenBooking: () => void;
  onOpenServices: () => void;
}

export default function PortfolioGrid({ onOpenBooking, onOpenServices }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'classic' | 'hybrid' | 'volume' | 'mega volume'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredInstagramId, setHoveredInstagramId] = useState<string | null>(null);
  const [socialFilter, setSocialFilter] = useState<'all' | 'lashes' | 'setting' | 'interior'>('all');

  const categories = [
    { label: 'ALL SETS', id: 'all' },
    { label: 'CLASSIC', id: 'classic' },
    { label: 'HYBRID', id: 'hybrid' },
    { label: 'VOLUME', id: 'volume' },
    { label: 'MEGA VOLUME', id: 'mega volume' },
  ];

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleNextPhoto = () => {
    if (!selectedItem) return;
    const items = PORTFOLIO_ITEMS;
    const currentIdx = items.findIndex((i) => i.id === selectedItem.id);
    const nextIdx = (currentIdx + 1) % items.length;
    setSelectedItem(items[nextIdx]);
  };

  const handlePrevPhoto = () => {
    if (!selectedItem) return;
    const items = PORTFOLIO_ITEMS;
    const currentIdx = items.findIndex((i) => i.id === selectedItem.id);
    const prevIdx = (currentIdx - 1 + items.length) % items.length;
    setSelectedItem(items[prevIdx]);
  };

  return (
    <div className="space-y-24">
      
      {/* Portfolio Title Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto" id="portfolio-header">
        <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
          THE ART OF THE GAZE
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111111]">
          Our Portfolio
        </h2>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto my-3" />
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed font-light">
          Explore our signature transformations, from natural enhancements to dramatic glamour. Each set is a bespoke creation tailored to your unique anatomical eye shape.
        </p>
      </div>

      {/* Category filter pills with layout animation */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-4 border-b border-gray-100">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`relative py-2 px-4 text-[10px] sm:text-xs font-mono tracking-widest font-semibold uppercase rounded-full transition-colors ${
                isActive ? 'text-white' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-[#111111] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Portfolio Images Grid with transitions */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        id="portfolio-items-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group relative h-[320px] rounded-lg overflow-hidden border border-gold-100/30 cursor-pointer shadow-xs bg-gray-50 flex items-center justify-center"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title || 'Lashes sets'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Clean hover overlay focusing purely on the visual image */}
              <div className="absolute inset-0 bg-[#111111]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white mb-2 scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="w-4 h-4 text-gold-400" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-white uppercase font-semibold">
                  TAP TO ZOOM
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Connect With Us - Interactive Premium Banner */}
      <div className="space-y-8 pt-8 border-t border-gray-100">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
            CONNECT WITH US
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111]">
            Social Feed
          </h3>
          <p className="text-gray-500 text-xs max-w-md mx-auto font-light">
            Stay up to date with our latest masterpiece mappings, client highlights, and behind-the-scenes artistry rituals.
          </p>
        </div>

        {/* The requested image with social links styled directly ON it */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-[#E8DCCB] group shadow-md bg-zinc-900">
          <img
            src="https://res.cloudinary.com/ddcrshx6o/image/upload/v1780334280/IMG-20260601-WA0052_oxqjib.jpg"
            alt="Srta Amalia Beauty Gallery Social Link"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Backdrop filter & overlay color layer for aesthetic legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 transition-all duration-300 group-hover:bg-black/75 flex flex-col justify-end p-6 sm:p-12 text-center" />

          {/* Social Links on top of the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white space-y-5 z-20">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gold-400 font-bold bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 animate-pulse">
              @SRTA.AMALIA_BEAUTY_
            </span>
            
            <h4 className="font-serif text-2xl sm:text-4xl text-white font-medium max-w-xl leading-tight">
              Let's stay connected in the digital world
            </h4>

            <p className="text-xs text-zinc-300 max-w-md font-light leading-relaxed hidden sm:block">
              Follow our aesthetic feed and connect with a community that celebrates personalized elegance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-2xl">
              <a
                href="https://www.instagram.com/srta.amalia_beauty_?igsh=OTNwbjg5bXYydGxr&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-gold-50 text-zinc-900 hover:text-[#111111] font-mono text-[9px] tracking-widest font-bold uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2 group/btn shadow-lg shrink-0"
              >
                <Instagram className="w-4 h-4 text-pink-600 group-hover/btn:scale-110 transition-transform duration-300" />
                <span>INSTAGRAM Feed</span>
              </a>

              <a
                href="https://www.tiktok.com/@srta.amalia_beauty_"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto px-5 py-3 bg-black hover:bg-zinc-900 border border-white/20 hover:border-gold-400 text-white font-mono text-[9px] tracking-widest font-bold uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2 group/btn shadow-lg shrink-0"
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <Music className="w-3.5 h-3.5 text-[#FE2C55] absolute translate-x-[1px] translate-y-[1px]" />
                  <Music className="w-3.5 h-3.5 text-[#25F4EE] absolute -translate-x-[0.5px] -translate-y-[0.5px]" />
                  <Music className="w-3.5 h-3.5 text-white absolute" />
                </div>
                <span>TIKTOK FEED</span>
              </a>

              <a
                href="https://www.facebook.com/Srta.Amaliabeauty?mibextid=wwXIfr&rdid=7c0O92WibqQesCC4&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EKPuUpM6m%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto px-5 py-3 bg-zinc-900/80 hover:bg-zinc-900 border border-white/20 hover:border-gold-400 text-white font-mono text-[9px] tracking-widest font-bold uppercase transition-all duration-300 rounded-full flex items-center justify-center gap-2 group/btn shadow-lg shrink-0"
              >
                <span className="w-4 h-4 flex items-center justify-center font-bold text-center text-blue-500 text-base leading-none -mt-0.5 font-sans group-hover/btn:scale-110 transition-transform duration-300">f</span>
                <span>FACEBOOK PAGE</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Block framed exactly as in screenshot */}
      <div className="bg-white border border-gold-300/30 p-8 sm:p-12 text-center rounded-xl relative overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold-50/40 rounded-full blur-2xl pointer-events-none" />
        <div className="relative max-w-xl mx-auto space-y-5">
          <div className="flex justify-center flex-col items-center">
            <Bookmark className="w-8 h-8 text-gold-500 mb-2" />
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111]">
              Ready for your transformation?
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed font-light">
            Join our list of satisfied clients and experience the bespoke luxury of elite lash artistry maps. Secure your desired time coordinates today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center">
            <a
              href="https://lashmap.ai/s/avlashes"
              target="_blank"
              rel="noreferrer"
              referrerPolicy="no-referrer"
              className="px-8 py-3.5 bg-[#111111] hover:bg-gold-600 text-white font-mono text-xs tracking-widest font-bold uppercase transition-all shadow-md active:scale-98 flex items-center justify-center"
            >
              BOOK APPOINTMENT
            </a>
            <button
              onClick={onOpenServices}
              className="px-8 py-3.5 border border-gold-300 hover:bg-gold-50 text-[#111111] font-mono text-xs tracking-widest font-bold uppercase transition-all active:scale-98"
            >
              VIEW PRICE LIST
            </button>
          </div>
        </div>
      </div>

      {/* Custom Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center w-full justify-between max-w-5xl">
              <button
                onClick={handlePrevPhoto}
                className="hidden sm:block p-3 hover:bg-white/5 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="relative max-w-2xl max-h-[90vh] bg-[#111111] rounded-lg border border-white/10 overflow-hidden shadow-2xl flex flex-col">
                <div className="flex justify-center bg-black">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title || 'Exquisite Lash Art'}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
                  />
                </div>
                
                {/* Minimalist footer with CTA link */}
                <div className="w-full bg-[#111111] py-4 px-6 border-t border-white/5 flex items-center justify-center text-zinc-400 text-[10px] font-mono tracking-wider">
                  <a
                    href="https://lashmap.ai/s/avlashes"
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    onClick={() => setSelectedItem(null)}
                    className="text-white hover:text-gold-400 font-mono uppercase tracking-widest font-black transition-colors flex items-center gap-2 text-xs"
                  >
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>BOOK THIS LOOK</span>
                  </a>
                </div>
              </div>

              <button
                onClick={handleNextPhoto}
                className="hidden sm:block p-3 hover:bg-white/5 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
