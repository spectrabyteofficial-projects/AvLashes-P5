import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LASH_SERVICES } from '../data';
import { ContactMessage } from '../types';
import MapWidget from './MapWidget';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, MessageCircle, Instagram, Facebook, Link, Clock } from 'lucide-react';

export default function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState(LASH_SERVICES[0].id);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('av_lashes_contact_messages');
    if (saved) {
      setSavedMessages(JSON.parse(saved));
    }
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const newMessage: ContactMessage = {
      id: 'MSG-' + Date.now(),
      firstName,
      lastName,
      email,
      serviceId: serviceOfInterest,
      message,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newMessage, ...savedMessages];
    localStorage.setItem('av_lashes_contact_messages', JSON.stringify(updated));
    setSavedMessages(updated);

    // Dynamic professional Lash Booking Form direct email redirection redirection template
    const selectedService = LASH_SERVICES.find(srv => srv.id === serviceOfInterest)?.name || serviceOfInterest;
    const emailSubject = `Bespoke Lash Booking Enquiry - ${firstName} ${lastName}`;
    const emailBody = `AV BEAUTY STUDIO - EXQUISITE LASH BOOKING FORM\n\n` +
      `Client Name: ${firstName} ${lastName}\n` +
      `Client Email: ${email}\n` +
      `Service Selected: ${selectedService}\n\n` +
      `Submission Details/Message:\n------------------------------------------------\n` +
      `${message}\n` +
      `------------------------------------------------\n\n` +
      `Sent via booking portal on: ${newMessage.createdAt}`;

    const mailtoUrl = `mailto:srtaamaliabeauty@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Redirect to native mail application client pre-loaded with parameters
    window.location.href = mailtoUrl;
    
    setSuccess(true);

    // Reset fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-16">
      
      {/* Page Title Block (Screenshot #1 Style) */}
      <div className="text-center space-y-4 max-w-2xl mx-auto" id="connect-banner-header">
        <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
          AV BEAUTY STUDIO COMMUNICATIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal leading-tight">
          Connect With Us
        </h2>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto my-3" />
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed font-light">
          Elevate your gaze with our premium lash services. We are here to answer your questions and help you schedule your next luxury transformation.
        </p>
      </div>

      {/* Grid: Get in Touch (left) & Form Card (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column info (Grid span 6) - Remade exactly as requested in the mockup image with custom luxury off-white background and elegant border frames */}
        <div className="lg:col-span-6 bg-[#F6F3ED] rounded-3xl p-6 sm:p-8 space-y-6 shadow-md text-zinc-900 border border-[#E8DCCB] relative overflow-hidden" id="luxury-contact-mock-vibe">
          {/* Subtle soft warmth glow background */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold-50/30 rounded-full blur-2xl pointer-events-none" />
          
          {/* Side-by-side Row Grid for Booking Hours and Contact Information on responsive viewports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* 1. Booking Hours Card Block */}
            <div className="relative border border-[#8E7F72]/30 rounded-xl pt-12 pb-8 px-5 text-center flex flex-col justify-between bg-white/50">
              {/* Elegant header block replicating the mockup image perfectly */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 bg-[#F6F3ED] z-10 select-none whitespace-nowrap flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-[1px] bg-[#8E7F72]/40" />
                  <span className="font-serif text-sm sm:text-base tracking-[0.2em] font-semibold text-[#8E7F72]">
                    BOOKING
                  </span>
                  <div className="w-5 h-[1px] bg-[#8E7F72]/40" />
                </div>
                <span className="font-joining-cursive text-gold-700 text-3xl lowercase -mt-1.5 font-light drop-shadow-xs italic">
                  Hours
                </span>
              </div>

              {/* Minimalist Clock Component */}
              <div className="flex justify-center mb-5 mt-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#8E7F72]/40 flex items-center justify-center text-[#8E7F72]">
                  <Clock className="w-6 h-6 stroke-[1.5]" />
                </div>
              </div>

              {/* Hours Text */}
              <div className="space-y-3 font-mono text-[11px] tracking-[0.16em] text-zinc-800 leading-relaxed uppercase flex-1 flex flex-col justify-center">
                <div className="space-y-1">
                  <span className="text-gold-800 block text-[10px] tracking-[0.2em] font-semibold">MONDAY TO FRIDAY</span>
                  <span className="text-zinc-950 font-black text-sm block border-b border-zinc-200 pb-2 max-w-[200px] mx-auto">09:00 AM - 19:00 PM</span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-gold-800 block text-[10px] tracking-[0.2em] font-semibold">SATURDAY</span>
                  <span className="text-zinc-950 font-black text-sm block border-b border-zinc-200 pb-2 max-w-[200px] mx-auto">09:00 AM - 18:00 PM</span>
                </div>
                <div className="pt-2">
                  <span className="text-rose-700 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.22em] inline-block shadow-xs">
                    SUNDAY CLOSED
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Contact Information Card Block */}
            <div className="relative border border-[#8E7F72]/30 rounded-xl pt-12 pb-8 px-5 text-center flex flex-col justify-between bg-white/50">
              {/* Elegant header block replicating the mockup image perfectly */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 bg-[#F6F3ED] z-10 select-none whitespace-nowrap flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-[1px] bg-[#8E7F72]/40" />
                  <span className="font-serif text-sm sm:text-base tracking-[0.2em] font-semibold text-[#8E7F72]">
                    CONTACT
                  </span>
                  <div className="w-5 h-[1px] bg-[#8E7F72]/40" />
                </div>
                <span className="font-joining-cursive text-gold-700 text-3xl lowercase -mt-1.5 font-light drop-shadow-xs italic">
                  Information
                </span>
              </div>

              {/* Contact details list aligned exactly like standard grid */}
              <div className="space-y-4 text-left max-w-sm mx-auto font-mono text-[11px] tracking-wide text-[#111111] mt-4 flex-1 flex flex-col justify-center">
                
                {/* Telephone */}
                <a href="tel:+447951541965" className="flex items-center space-x-3 group cursor-pointer hover:text-gold-700 transition-colors">
                  <div className="w-9 h-9 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center text-zinc-700 shrink-0 group-hover:scale-105 group-hover:border-gold-400 group-hover:text-gold-700 transition-all shadow-xs">
                    <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-[#8E7F72] font-bold block tracking-[0.18em]">CALL DIRECT</span>
                    <span className="text-[11px] font-black leading-none text-zinc-950 block mt-0.5 tracking-normal whitespace-nowrap">+44 7951 541965</span>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:srtaamaliabeauty@gmail.com" className="flex items-center space-x-3 group cursor-pointer hover:text-gold-700 transition-colors">
                  <div className="w-9 h-9 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center text-zinc-700 shrink-0 group-hover:scale-105 group-hover:border-gold-400 group-hover:text-gold-700 transition-all shadow-xs">
                    <Mail className="w-3.5 h-3.5 stroke-[1.75]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-[#8E7F72] font-bold block tracking-[0.18em]">EMAIL INBOX</span>
                    <span className="text-[10px] font-black leading-tight text-zinc-950 block mt-0.5 tracking-normal break-all select-all">srtaamaliabeauty@gmail.com</span>
                  </div>
                </a>

                {/* WhatsApp instant chat */}
                <a 
                  href="https://api.whatsapp.com/send/?phone=447951541965&text&type=phone_number" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-3 group cursor-pointer hover:text-emerald-700 transition-colors"
                  referrerPolicy="no-referrer"
                >
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-200 bg-emerald-50/50 flex items-center justify-center text-[#1E7250] shrink-0 group-hover:scale-105 group-hover:border-emerald-500 group-hover:text-emerald-700 transition-all shadow-xs">
                    <MessageCircle className="w-3.5 h-3.5 stroke-[1.75]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-emerald-700 font-bold block tracking-[0.18em]">WHATSAPP CHAT</span>
                    <span className="text-[11px] font-black leading-none text-emerald-900 block mt-0.5 tracking-normal">Click to Chat</span>
                  </div>
                </a>

                {/* Instagram link */}
                <a 
                  href="https://www.instagram.com/srta.amalia_beauty_?igsh=OTNwbjg5bXYydGxr&utm_source=qr" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-3 group cursor-pointer hover:text-gold-700 transition-colors"
                  referrerPolicy="no-referrer"
                >
                  <div className="w-9 h-9 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center text-zinc-700 shrink-0 group-hover:scale-105 group-hover:border-gold-400 group-hover:text-gold-700 transition-all shadow-xs">
                    <Instagram className="w-3.5 h-3.5 stroke-[1.75]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] text-[#8E7F72] font-bold block tracking-[0.18em]">INSTAGRAM</span>
                    <span className="text-[10px] font-black leading-tight text-zinc-950 block mt-0.5 tracking-normal break-all">@srta.amalia_beauty_</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          {/* 3. Booking Location Card Block - Placed precisely centered underneath booking hours & contact details */}
          <a 
            href="https://www.google.com/maps/place/Sewall+Hwy,+Coventry+CV6+7JD,+UK/@52.4265319,-1.4773488,18z/data=!4m6!3m5!1s0x487749581b62e827:0x3a109c7855e73ee5!8m2!3d52.4264046!4d-1.4750591!16s%2Fg%2F1tg156zz?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noreferrer" 
            className="relative border border-[#8E7F72]/30 rounded-xl pt-12 pb-8 px-6 text-center max-w-sm sm:max-w-md mx-auto w-full mt-6 bg-white/50 block hover:border-gold-500 hover:bg-gold-50/10 transition-all group duration-300"
            referrerPolicy="no-referrer"
          >
            {/* Elegant header block replicating the mockup image perfectly */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 bg-[#F6F3ED] z-10 select-none whitespace-nowrap flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-[1px] bg-[#8E7F72]/40" />
                <span className="font-serif text-xs tracking-[0.2em] font-semibold text-[#8E7F72]">
                  BOOKING
                </span>
                <div className="w-5 h-[1px] bg-[#8E7F72]/40" />
              </div>
              <span className="font-joining-cursive text-gold-700 text-3xl lowercase -mt-1.5 font-light drop-shadow-xs italic">
                Location
              </span>
            </div>

            {/* Address Location detail lines */}
            <div className="space-y-3 font-mono text-[11px] tracking-[0.18em] text-zinc-800 leading-relaxed uppercase font-sans">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#8E7F72]/30 bg-white flex items-center justify-center text-gold-700 shadow-xs group-hover:scale-105 group-hover:border-gold-500 group-hover:text-gold-800 transition-all duration-300">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-sm text-gold-800">STUDIO LOCATION</p>
                <p className="text-zinc-650 text-xs font-semibold">Sewall Highway</p>
                <p className="text-zinc-950 font-black text-sm tracking-[0.2em] border-t border-zinc-200 pt-2.5 max-w-[200px] mx-auto">Coventry, CV6 7JD</p>
                <span className="text-[9px] text-[#8E7F72]/75 font-semibold tracking-[0.12em] block mt-2 group-hover:text-gold-700 transition-colors uppercase">
                  &bull; VIEW GOOGLE MAPS &bull;
                </span>
              </div>
            </div>
          </a>

          {/* Luxury Signature Badge Footer */}
          <div className="text-center pt-2 select-none">
            <span className="text-[8px] font-mono tracking-[0.3em] text-zinc-400 uppercase block">
              AMALIA VASILE &bull; LASH ARTISTRY
            </span>
          </div>
        </div>

        {/* Right column: Form Card (Grid span 6) */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-gold-100 p-6 sm:p-8 shadow-xs">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="contact-form"
                onSubmit={handleMessageSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* First Name */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-gray-500 font-bold uppercase mb-2">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm rounded-sm"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-gray-500 font-bold uppercase mb-2">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm rounded-sm"
                    />
                  </div>

                </div>

                {/* Email address */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-gray-500 font-bold uppercase mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm rounded-sm"
                  />
                </div>

                {/* Service dropdown list selection */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-gray-500 font-bold uppercase mb-2">
                    SERVICE OF INTEREST
                  </label>
                  <select
                    value={serviceOfInterest}
                    onChange={(e) => setServiceOfInterest(e.target.value)}
                    className="w-full p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm bg-white rounded-sm"
                  >
                    {LASH_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} (Starting £{srv.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Text Message */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-gray-500 font-bold uppercase mb-2">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your lashes design query or request custom booking directions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm rounded-sm"
                  />
                </div>

                {/* Submit trigger button with dynamic arrow */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                </div>
                <h4 className="font-serif text-2xl font-bold text-gray-900">Email Client Opened!</h4>
                <p className="text-xs text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
                  Please send the pre-filled email details that just opened in your mail app to <strong>srtaamaliabeauty@gmail.com</strong>. Amalia will review your custom set details and reply within 12 standard business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-[#111111] text-white font-mono text-[10px] tracking-widest uppercase font-bold"
                  >
                    WRITE ANOTHER ENQUIRY
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Styled Interactive Map Location Block */}
      <div className="space-y-6 pt-12 border-t border-gray-100">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#666666] font-bold uppercase block">
            LOCATION OVERVIEW
          </span>
          <h3 className="font-serif text-2xl font-semibold text-[#111111]">
            Interactive District Map
          </h3>
        </div>
        <MapWidget />
      </div>

    </div>
  );
}
