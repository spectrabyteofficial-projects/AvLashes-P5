import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, Plus, X, MessageSquare, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

interface TestimonialSliderProps {
  onOpenBooking: () => void;
}

export default function TestimonialSlider({ onOpenBooking }: TestimonialSliderProps) {
  const [list, setList] = useState<Testimonial[]>(TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Review Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('Regular Client');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !text.trim()) {
      setError('Please provide both your name and review text.');
      return;
    }

    const newReview: Testimonial = {
      id: String(Date.now()),
      name,
      role,
      rating,
      text,
      date: 'Just Now',
      avatarUrl: undefined // Safe fallback avatar initials
    };

    setList([newReview, ...list]);
    setName('');
    setText('');
    setRating(5);
    setRole('Regular Client');
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setIsModalOpen(false);
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16" id="testimonials-image-page">
      {/* Title block */}
      <div className="text-center space-y-4 max-w-2xl mx-auto" id="testimonial-section-header">
        <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
          CLIENT EXPERIENCE INDEX
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111111]" id="testimonials-main-title">
          Voices of Elegance
        </h2>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto my-3" />
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed font-light">
          A meticulously curated record of luxury, self-care, and exquisite satisfaction shared by our beautiful lash community.
        </p>
      </div>

      {/* Testimonials Collage Image Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative rounded-2xl overflow-hidden shadow-xl border border-zinc-200/50 bg-neutral-50/80 p-1 sm:p-2"
        id="testimonials-collage-container"
      >
        <img 
          src="https://res.cloudinary.com/dqffphhit/image/upload/v1780594966/zjBTqA_rcodz6.png" 
          alt="Client Testimonials and Reviews Collage Showcase" 
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain mx-auto rounded-xl shadow-xs"
          id="testimonials-collage-image"
        />
      </motion.div>

      {/* Reviews Divider Header with Interactive Trigger */}
      <div className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4" id="testimonials-feed-header-block">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#111111]" id="testimonials-feed-title">
            Verified Experiences ({list.length})
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="flex text-gold-500">
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 font-bold tracking-wider">5.0 OUT OF 5 STARS Average</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 border border-zinc-900 bg-zinc-900 text-white font-mono text-[10px] tracking-widest font-black uppercase hover:bg-gold-600 hover:border-gold-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
          id="write-review-trigger-btn"
        >
          <Plus className="w-3.5 h-3.5 text-zinc-300 group-hover:rotate-90 transition-transform duration-300" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Grid of Verified Client Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="client-reviews-grid">
        <AnimatePresence mode="popLayout">
          {list.map((review, idx) => {
            const initials = review.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#fcfbfa]/60 border border-zinc-200/60 hover:border-gold-300/60 p-6 rounded-xl space-y-4 hover:bg-white transition-all duration-300 shadow-xs flex flex-col justify-between group relative overflow-hidden"
                id={`review-card-${review.id}`}
              >
                {/* Decorative subtle background quote */}
                <Quote className="absolute -top-1 -right-1 w-16 h-16 text-zinc-100/50 pointer-events-none group-hover:text-gold-100/30 transition-colors duration-300" />

                <div className="space-y-3.5 relative">
                  {/* Rating Stars */}
                  <div className="flex text-gold-500 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-gold-500 text-gold-500' : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-zinc-700 font-light leading-relaxed font-sans italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Reviewer Profile Details */}
                <div className="flex items-center gap-3 pt-3 border-t border-zinc-100 relative">
                  {review.avatarUrl ? (
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-8 w-8 rounded-full object-cover border border-gold-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gold-100/75 text-gold-800 text-[10px] font-mono font-bold flex items-center justify-center border border-gold-200/80">
                      {initials}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 truncate">
                      {review.name}
                    </h5>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Review Submission Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="write-review-modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gold-200/80 p-6 sm:p-8 rounded-2xl max-w-md w-full relative shadow-2xl flex flex-col"
              id="write-review-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors"
                id="close-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4 flex flex-col items-center justify-center"
                  id="review-submission-success"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-zinc-900">Thank You!</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-xs">
                    Your exquisite experience has been registered and listed successfully below.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="review-submission-form">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
                      FEEDBACK CORNER
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#111111]">
                      Share Your Experience
                    </h4>
                  </div>

                  <div className="w-full h-[1px] bg-zinc-100 my-2" />

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-[11px] font-mono border border-red-200 rounded-lg">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Rating selection stars */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono font-bold tracking-wider text-zinc-700 block uppercase">
                      Overall Rating
                    </label>
                    <div className="flex text-zinc-300 gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-0.5 hover:scale-115 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${(hoverRating !== null ? star <= hoverRating : star <= rating) ? 'fill-gold-500 text-gold-500' : 'text-zinc-200'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono font-bold tracking-wider text-zinc-700 block uppercase">
                      your name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Charlotte Rose"
                      className="w-full px-4 py-2.5 border border-zinc-200 text-xs rounded-lg focus:outline-hidden focus:border-gold-500"
                      required
                    />
                  </div>

                  {/* Role field selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono font-bold tracking-wider text-zinc-700 block uppercase">
                      Client Status
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2.5 border border-zinc-200 text-xs rounded-lg focus:outline-hidden focus:border-gold-500 bg-white"
                    >
                      <option value="Regular Client">Regular Client</option>
                      <option value="Loyal Client">Loyal Client</option>
                      <option value="VIP Client">VIP Client</option>
                      <option value="Premium Client">Premium Client</option>
                    </select>
                  </div>

                  {/* Comments/Review Text */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] font-mono font-bold tracking-wider text-zinc-700 block uppercase">
                      exquisite feedback comments
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Share details about your custom mapping set, comfort, retention, or studio space vibes..."
                      rows={4}
                      className="w-full px-4 py-2.5 border border-zinc-200 text-xs rounded-lg focus:outline-hidden focus:border-gold-500 resize-none font-light"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#111111] hover:bg-gold-600 text-white font-mono text-xs tracking-widest font-black uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
                    <span>SUBMIT EXQUISITE feedback</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Booking Consultation Box */}
      <div className="bg-[#fcfbfa] border border-gold-100 p-8 text-center rounded-lg max-w-3xl mx-auto space-y-4" id="testimonials-consultation-footer">
        <h3 className="font-serif text-2xl font-semibold text-gray-950">Experience Bespoke Precision</h3>
        <p className="text-xs text-gray-500 font-light max-w-lg mx-auto leading-relaxed">
          Book an appointment with Amalia Vasile and experience elite lash artistry maps. No wait queues required.
        </p>
        <a
          href="https://wa.me/447951541965"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="px-8 py-3 bg-[#111111] hover:bg-gold-600 text-white font-mono text-[10.5px] tracking-widest uppercase transition-all inline-flex items-center justify-center text-center font-bold"
          id="testimonials-consultation-btn"
        >
          WHATSAPP CONSULTATION
        </a>
      </div>
    </div>
  );
}
