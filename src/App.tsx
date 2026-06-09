import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeHero from './components/HomeHero';
import ServiceList from './components/ServiceList';
import PortfolioGrid from './components/PortfolioGrid';
import TestimonialSlider from './components/TestimonialSlider';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import BookingForm from './components/BookingForm';
import CookieConsent from './components/CookieConsent';
import { Sparkles, Star, Calendar, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Auto scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const handleSelectBookingService = (serviceId: string) => {
    window.open('https://lashmap.ai/s/avlashes', '_blank');
  };

  const handleOpenGeneralBooking = () => {
    window.open('https://lashmap.ai/s/avlashes', '_blank');
  };

  const handleOpenConsultation = () => {
    window.open('https://wa.me/447951541965?text=Hi%20Amalia,%20I%20would%20like%20to%2520get%20a%20lash%20consultation.', '_blank');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className="space-y-10">
            <ServiceList
              onSelectBookingService={handleSelectBookingService}
              onOpenConsultation={handleOpenConsultation}
            />

            {/* Deposit Policy */}
            <div id="deposit-policy" className="rounded-xl border border-[#E8DCCB]/60 p-8 sm:p-10 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB]/40 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#8E7F72] flex items-center justify-center text-white text-sm font-bold font-mono">1</div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-950">Deposit Policy</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  A deposit is required to secure your appointment. The deposit will be deducted from the final service price on the day of your appointment.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Please note that the deposit is non-refundable in the event of a no-show or last-minute cancellation.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Thank you for understanding and respecting the time reserved for your appointment.
                </p>
              </div>
            </div>

            {/* Aftercare Instructions */}
            <div id="aftercare" className="rounded-xl border border-[#E8DCCB]/60 p-8 sm:p-10 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB]/40 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#8E7F72] flex items-center justify-center text-white text-sm font-bold font-mono">2</div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-950">Aftercare Instructions for Eyelash Extensions</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed list-disc pl-5">
                  <li>Avoid getting your lashes wet for the first 24 hours.</li>
                  <li>Do not use oil-based products around the eyes.</li>
                  <li>Clean your lashes daily with a lash-safe cleanser.</li>
                  <li>Avoid rubbing, pulling, or picking at your extensions.</li>
                  <li>Brush your lashes gently with a clean lash brush every day.</li>
                  <li>Avoid sleeping face-down whenever possible.</li>
                  <li>Do not use eyelash curlers on your extensions.</li>
                  <li>Avoid excessive heat, steam, and saunas during the first 24–48 hours.</li>
                  <li>Book infill appointments every 2–3 weeks to keep your lashes looking full and fresh.</li>
                </ul>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  Following these aftercare instructions will help maintain your lash extensions and maximize retention.
                </p>
              </div>
            </div>

            {/* Privacy Regulations */}
            <div id="privacy" className="rounded-xl border border-[#E8DCCB]/60 p-8 sm:p-10 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB]/40 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#8E7F72] flex items-center justify-center text-white text-sm font-bold font-mono">3</div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-950">Privacy Regulations</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <p><strong className="text-gray-800">Data Protection</strong><br />Your personal data is collected and processed in accordance with applicable data protection laws. We only collect information necessary to provide our services.</p>
                  <p><strong className="text-gray-800">Use of Information</strong><br />Information provided during booking is used solely for appointment management, service delivery, and communication regarding your appointments.</p>
                  <p><strong className="text-gray-800">Data Sharing</strong><br />We do not share your personal information with third parties unless required by law or with your explicit consent.</p>
                  <p><strong className="text-gray-800">Data Retention</strong><br />Your personal data is retained only as long as necessary for the purposes outlined in this policy or as required by law.</p>
                  <p><strong className="text-gray-800">Your Rights</strong><br />You have the right to access, correct, or request deletion of your personal data at any time by contacting us.</p>
                  <p><strong className="text-gray-800">Security</strong><br />We implement appropriate technical measures to protect your personal data against unauthorized access, alteration, or disclosure.</p>
                </div>
              </div>
            </div>

            {/* Terms of Service */}
            <div id="terms" className="rounded-xl border border-[#E8DCCB]/60 p-8 sm:p-10 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB]/40 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#8E7F72] flex items-center justify-center text-white text-sm font-bold font-mono">4</div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-950">Terms of Service</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <p><strong className="text-gray-800">1. Bookings</strong><br />A deposit may be required to secure your appointment. The deposit will be deducted from the final service cost.</p>
                  <p><strong className="text-gray-800">2. Cancellation & No-Show Policy</strong><br />Appointments cancelled with less than 24 hours' notice and no-shows will result in the loss of the deposit.</p>
                  <p><strong className="text-gray-800">3. Late Arrivals</strong><br />Clients arriving more than 15 minutes late may need to reschedule their appointment, and the deposit may be forfeited.</p>
                  <p><strong className="text-gray-800">4. Health & Safety</strong><br />Clients must inform the lash technician of any allergies, eye conditions, infections, or sensitivities before the appointment.</p>
                  <p><strong className="text-gray-800">5. Refills</strong><br />Refill appointments are available only if at least 40–50% of the lash extensions remain. Otherwise, a full set may be required.</p>
                  <p><strong className="text-gray-800">6. Aftercare</strong><br />Clients are responsible for following the aftercare instructions provided. Poor aftercare may affect retention and is not grounds for a refund.</p>
                  <p><strong className="text-gray-800">7. Refund Policy</strong><br />Due to the nature of the service, refunds are not offered. If you experience any issues, please contact us within 48 hours of your appointment.</p>
                  <p><strong className="text-gray-800">8. Photography</strong><br />Photos of the lashes may be taken for portfolio and social media purposes only with the client's consent.</p>
                  <p><strong className="text-gray-800">9. Right to Refuse Service</strong><br />We reserve the right to refuse service if a client has a condition that may affect the safety or quality of the treatment or behaves in an inappropriate manner.</p>
                  <p><strong className="text-gray-800">10. Agreement</strong><br />By booking an appointment, you acknowledge that you have read and agree to these Terms of Service.</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="rounded-xl border border-[#E8DCCB]/60 p-8 sm:p-10 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E8DCCB]/40 pb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-950">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      How long do eyelash extensions last?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      A full set typically lasts 4–6 weeks before naturally shedding with your lash cycle. We recommend infill appointments every 2–3 weeks to maintain a full, fresh look.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      Do lash extensions damage my natural lashes?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      No — when applied correctly by a trained professional using premium materials, lash extensions do not damage natural lashes. Our lightweight fibres and meticulous isolation technique ensure your natural lashes remain healthy throughout the growth cycle.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      How do I prepare for my lash appointment?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      Arrive with clean, makeup-free eyes. Avoid caffeine beforehand if you tend to be restless. Remove contact lenses if you wear them, and let us know about any allergies or sensitivities during the consultation.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      Can I wear makeup with lash extensions?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      Yes, but avoid oil-based and waterproof products around the eyes. Use water-based mascara only (if at all), and never use an eyelash curler on your extensions. Oil-based removers will weaken the adhesive bond.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      How often should I book infills?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      Every 2–3 weeks is ideal. Infills fill in the gaps left by natural lash shedding. If more than 4 weeks have passed, you may need a full set depending on how many extensions remain.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      Do I need a patch test?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      Yes — a patch test is recommended at least 24–48 hours before your first appointment to rule out any allergic reaction to the adhesive. It takes 15 minutes and is completely free of charge.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      Can I swim, shower, or exercise with lash extensions?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      Yes, but avoid water contact for the first 24 hours after application. After that, gentle cleansing is fine. Prolonged chlorinated or saltwater exposure may reduce retention — rinse with fresh water after swimming.
                    </p>
                  </details>

                  <details className="group border border-[#E8DCCB]/40 rounded-lg p-4 open:border-gold-300 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-800 list-none">
                      What is the difference between Classic, Volume, and Mega Volume?
                      <span className="text-gold-600 text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 pt-3 border-t border-[#E8DCCB]/30">
                      <strong>Classic (1:1)</strong> — one extension per natural lash for a natural, elegant look. <strong>Volume (2D–7D)</strong> — multiple lightweight fans per lash for a fuller, fluffier appearance. <strong>Mega Volume (8D+)</strong> — maximum density and drama for a bold, high-impact glam look.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        );
      case 'gallery':
        return (
          <PortfolioGrid
            onOpenBooking={handleOpenGeneralBooking}
            onOpenServices={() => setActiveTab('services')}
          />
        );
      case 'testimonials':
        return (
          <TestimonialSlider
            onOpenBooking={handleOpenGeneralBooking}
          />
        );
      case 'about':
        return (
          <AboutSection
            onOpenBooking={handleOpenGeneralBooking}
            onOpenServices={() => setActiveTab('services')}
            onOpenConsultation={handleOpenConsultation}
          />
        );
      case 'contact':
        return <ContactSection />;
      case 'booking':
        return (
          <div className="text-center py-16 space-y-6 max-w-xl mx-auto border border-gold-100 p-8 rounded-2xl bg-white shadow-xs">
            <h2 className="font-serif text-3xl font-normal text-zinc-900 uppercase">Secure Your Appointment</h2>
            <p className="text-xs text-zinc-550 leading-relaxed font-light">
              We have migrated our booking ecosystem to Lashmap for real-time live slot tracking. Click below to secure your exquisite style.
            </p>
            <button
              onClick={handleOpenGeneralBooking}
              className="px-8 py-3.5 bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs tracking-widest font-bold uppercase transition-all shadow-md inline-block"
            >
              CONTINUE ON LASHMAP
            </button>
          </div>
        );
      default: // home
        return (
          <HomeHero
            onOpenBooking={handleOpenGeneralBooking}
            onOpenPortfolio={() => setActiveTab('gallery')}
            onOpenServices={() => setActiveTab('services')}
            onSelectService={handleSelectBookingService}
            onOpenConsultation={handleOpenConsultation}
          />
        );
    }
  };

  return (
    <div id="beauty-studio-application-root" className="min-h-screen bg-white text-[#111111] flex flex-col justify-between selection:bg-gold-500 selection:text-white">
      
      {/* Absolute top Bulletin Ticker (Luxury salon aesthetic) */}
      <div className="bg-[#111111] text-white py-2 px-4 border-b border-gold-500/10 text-center text-[10px] font-mono tracking-widest uppercase flex items-center justify-center space-x-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>SECURE YOUR STUDIO GLOW • REAL-TIME APPOINTMENTS CALIBRATED LIVE</span>
        <span className="hidden sm:inline text-gold-500">• EXQUISITE LASH RETENTION GUARANTEED</span>
      </div>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Main content viewport with fluid transitioning animations */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            id={`tab-wrapper-${activeTab}`}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenGeneralBooking}
      />

      <CookieConsent />
    </div>
  );
}
