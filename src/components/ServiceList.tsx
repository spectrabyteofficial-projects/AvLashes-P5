import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, ArrowRight, CornerDownRight } from 'lucide-react';
import { LASH_SERVICES } from '../data';

interface ServiceListProps {
  onSelectBookingService: (id: string) => void;
  onOpenConsultation: () => void;
}

type CategoryType = 'all' | 'set' | 'maintenance' | 'treatment';

export default function ServiceList({ onSelectBookingService, onOpenConsultation }: ServiceListProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('set');

  const categories = [
    { id: 'set', label: 'Elegant Full Sets', count: LASH_SERVICES.filter(s => s.category === 'set').length },
    { id: 'maintenance', label: 'Refills & Maintenance', count: LASH_SERVICES.filter(s => s.category === 'maintenance').length },
    { id: 'treatment', label: 'Lash Treatments', count: LASH_SERVICES.filter(s => s.category === 'treatment').length },
    { id: 'all', label: 'View All Menu', count: LASH_SERVICES.length }
  ] as const;

  const filteredServices = activeCategory === 'all' 
    ? LASH_SERVICES 
    : LASH_SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-3xl border border-[#E8DCCB]/60 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl" id="lashes-service-list-root">
      
      {/* Background Image Layer covering the entire services page */}
      <picture className="absolute inset-0 w-full h-full z-0 block">
        <img
          src="https://res.cloudinary.com/dqffphhit/image/upload/v1780328208/Gemini_Generated_Image_d1qommd1qommd1qo-ezremove_vuyaaq.png"
          alt="Lash Services Elegant Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </picture>

      {/* Exquisite semi-transparent overlay to ensure extreme premium contrast & textbook-perfect legibility */}
      <div className="absolute inset-0 bg-[#FAF9F6]/78 sm:bg-[#FAF9F6]/82 backdrop-blur-[1px] z-10 pointer-events-none" />

      {/* Content wrapper on top of background */}
      <div className="relative z-20 space-y-12">
        
        {/* 1. Header with subtle elegant prompt */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gold-50/80 border border-gold-200/50 px-3.5 py-1 rounded-full text-gold-800 text-[10px] font-mono tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 fill-current" />
            <span>Curated For Perfect Balance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light leading-tight uppercase tracking-tight">
            Exquisite <span className="font-semibold italic text-gold-700">Lash Menu</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light">
            We use medical-grade sterile hygiene and featherlight premium fibers meticulously styled in bespoke mapping to lift, frame, and define your natural beauty lines.
          </p>
        </div>

      {/* 2. Luxury Aesthetic Tab Bar */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 border-b border-zinc-100 pb-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 text-xs font-mono font-medium tracking-widest uppercase transition-all duration-300 rounded-full border ${
                isActive 
                  ? 'bg-[#111111] border-[#111111] text-white shadow-md' 
                  : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-400'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{cat.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-gold-500 text-black font-bold' : 'bg-zinc-100 text-zinc-500'}`}>
                  {cat.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Dynamic Service List (Elegant Boxless Minimalist Menu) */}
      <motion.div 
        layout 
        className="space-y-1 pt-4 divide-y divide-[#E8DCCB]/40"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="group py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all"
              id={`service-item-${service.id}`}
            >
              {/* Left Side Details: Name and Description */}
              <div className="space-y-2 flex-grow max-w-3xl">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-serif text-lg sm:text-xl text-zinc-950 font-semibold tracking-tight transition-colors group-hover:text-gold-800">
                    {service.name}
                  </h3>
                  <span className="text-[9px] text-[#999999] font-mono tracking-widest uppercase font-bold">
                    • {service.category === 'set' ? 'Full Set' : service.category === 'maintenance' ? 'Refill Infill' : 'Special Treatment'}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Right Side Info & booking buttons */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 shrink-0 w-full md:w-auto">
                {/* Time details & price of the services */}
                <div className="flex items-center gap-4">
                  {service.duration && (
                    <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5" title="Service Duration">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{service.duration}</span>
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-bold text-zinc-900 font-mono bg-white/80 border border-zinc-200/60 py-1 px-3 rounded shadow-xs">
                    £{service.price}
                  </span>
                </div>

                {/* Direct Booking Button */}
                <a
                  href="https://lashmap.ai/s/avlashes"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="py-1.5 px-4 bg-[#111111] hover:bg-gold-700 text-white text-[10px] font-mono tracking-widest font-bold uppercase transition-all duration-300 rounded-full flex items-center gap-2 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>BOOK SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. Quality Guarantee Segment */}
      <div className="bg-zinc-50/50 border border-zinc-100 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center space-x-3 text-left">
          <div className="p-2 bg-white rounded-full border border-gold-200">
            <Sparkles className="w-5 h-5 text-gold-600 fill-current animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-zinc-950 uppercase tracking-wider">Unparalleled Lash Retention Guarantee</h4>
            <p className="text-[10px] sm:text-xs text-zinc-500 font-light">Free complementary checking appointment if retention does not match standards within 48 hours.</p>
          </div>
        </div>
        <a
          href="https://wa.me/447951541965"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="text-xs font-mono font-bold text-gold-800 hover:text-black uppercase tracking-widest flex items-center gap-1.5 shrink-0 hover:translate-x-1 transition-all"
        >
          <span>QUICK CONSULTATION</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
        </a>
      </div>

      </div> {/* Close content wrapper */}

    </div>
  );
}
