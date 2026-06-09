import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LASH_SERVICES } from '../data';
import { BookingRequest } from '../types';
import { CheckCircle, Clock, Calendar, Phone, Mail, User, Sparkles, Receipt, Trash2, ArrowLeft, Link } from 'lucide-react';

interface BookingFormProps {
  onSuccess?: () => void;
  selectedServiceId?: string;
}

export default function BookingForm({ onSuccess, selectedServiceId }: BookingFormProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [services, setServices] = useState(LASH_SERVICES);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'set' | 'maintenance' | 'treatment'>('all');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(selectedServiceId || LASH_SERVICES[0].id);
  const [prefDate, setPrefDate] = useState('');
  const [prefTime, setPrefTime] = useState('');
  const [notes, setNotes] = useState('');
  const [successBooking, setSuccessBooking] = useState<BookingRequest | null>(null);

  // local active bookings
  const [activeBookings, setActiveBookings] = useState<BookingRequest[]>([]);

  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Load existing bookings on mount
  useEffect(() => {
    const saved = localStorage.getItem('av_lashes_bookings');
    if (saved) {
      setActiveBookings(JSON.parse(saved));
    }
  }, []);

  const saveBookings = (list: BookingRequest[]) => {
    localStorage.setItem('av_lashes_bookings', JSON.stringify(list));
    setActiveBookings(list);
  };

  const getFilteredServices = () => {
    if (categoryFilter === 'all') return services;
    return services.filter(s => s.category === categoryFilter);
  };

  const chosenService = services.find((s) => s.id === serviceId) || services[0];

  const todayStr = new Date().toISOString().split('T')[0];

  const availableTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Check if slot is already occupied for chosen date
  const isSlotBooked = (time: string) => {
    return activeBookings.some(booking => booking.date === prefDate && booking.timeSlot === time);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !prefDate || !prefTime) {
      alert('Please fill in all required fields to complete your reservation request.');
      return;
    }

    const newBooking: BookingRequest = {
      id: 'AV-' + Math.floor(100000 + Math.random() * 900000).toString(),
      fullName,
      email,
      phone,
      serviceId,
      date: prefDate,
      timeSlot: prefTime,
      status: 'confirmed',
      notes
    };

    const updated = [...activeBookings, newBooking];
    saveBookings(updated);
    setSuccessBooking(newBooking);
    setActiveStep(3);

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking? This action is irreversible.')) {
      const filtered = activeBookings.filter(b => b.id !== id);
      saveBookings(filtered);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPrefDate('');
    setPrefTime('');
    setNotes('');
    setSuccessBooking(null);
    setActiveStep(1);
  };

  return (
    <div className="space-y-12">
      
      {/* Visual Navigation Steps Indicator */}
      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-4 max-w-md w-full">
          {[
            { nr: 1, label: 'Service Selection' },
            { nr: 2, label: 'Details & Schedule' },
            { nr: 3, label: 'Receipt Confirmation' }
          ].map((step, idx) => (
            <div key={step.nr} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold border transition-all ${
                    activeStep >= step.nr
                      ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                      : 'bg-white text-gray-400 border-gray-200'
                  }`}
                >
                  {step.nr}
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 mt-2 text-center whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              {idx < 2 && (
                <div className={`h-[1px] w-8 sm:w-16 -mt-6 transition-colors duration-500 ${
                  activeStep > idx + 1 ? 'bg-gold-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main interactive segment (Col span 2) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gold-100 p-6 sm:p-8 shadow-xs">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-2">Request an Appointment</h3>
                  <p className="text-xs text-gray-500 font-medium">Select a service level below to initiate booking mappings.</p>
                </div>

                {/* Sub category toggles */}
                <div className="flex border-b border-gray-100 pb-2 gap-2 overflow-x-auto">
                  {[
                    { label: 'ALL COLLECTIONS', value: 'all' },
                    { label: 'FULL LASH SETS', value: 'set' },
                    { label: 'REMOVAL & MAINTENANCE', value: 'maintenance' },
                    { label: 'SPA TREATMENTS', value: 'treatment' }
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategoryFilter(cat.value as any)}
                      className={`py-2 px-3.5 text-[10px] whitespace-nowrap font-mono tracking-widest transition-all ${
                        categoryFilter === cat.value
                          ? 'text-gold-700 border-b-2 border-gold-500 font-bold'
                          : 'text-gray-400 hover:text-[#111111]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Service Cards Grid Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredServices().map((srv) => {
                    const isSelected = serviceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setServiceId(srv.id)}
                        className={`p-4 border rounded-md cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gold-50/40 border-gold-500 shadow-xs scale-[1.01]'
                            : 'bg-white border-gray-200 hover:border-gold-300'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-lg text-[#111111] font-semibold">{srv.name}</h4>
                            <span className="font-serif text-base font-bold text-gold-700">
                              £{srv.price}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-light line-clamp-2">
                            {srv.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-2.5 border-t border-dashed border-gray-200 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                          {srv.duration ? (
                            <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                              <Clock className="w-3.5 h-3.5 text-gold-500" />
                              {srv.duration}
                            </span>
                          ) : (
                            <span />
                          )}
                          {srv.startingPrice && (
                            <span className="text-gold-600 font-bold bg-gold-100/50 px-2 py-0.5 text-[9px] tracking-wider rounded-sm">
                              STARTING PRICE
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-8 py-3.5 bg-gold-600 hover:bg-gold-700 text-white font-mono text-xs tracking-widest font-semibold transition-all shadow-md uppercase"
                  >
                    CONTINUE TO TIME & SCHEDULE →
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-1">Details &amp; Schedule</h3>
                    <p className="text-xs text-gray-500 font-medium">Please insert your target coordinates and preferred date slot.</p>
                  </div>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-mono text-gray-500 hover:text-gold-600 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Full name */}
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-gray-600 font-bold uppercase mb-2">
                        FULL NAME *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="Amelia Vasile"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 text-[#111111] rounded-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-gray-600 font-bold uppercase mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 text-[#111111] rounded-sm"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-gray-600 font-bold uppercase mb-2">
                        PHONE NUMBER *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="+44 7951 541965"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 text-[#111111] rounded-sm"
                        />
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-gray-600 font-bold uppercase mb-2">
                        PREFERRED DATE *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <input
                          type="date"
                          required
                          min={todayStr}
                          value={prefDate}
                          onChange={(e) => setPrefDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 text-[#111111] rounded-sm"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Preferred Time grid selector */}
                  {prefDate && (
                    <div className="pt-2 animate-fade-in">
                      <label className="block text-[10px] font-mono tracking-widest text-gray-600 font-bold uppercase mb-3">
                        CHOOSE TIME SLOT *
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                        {availableTimeSlots.map((time) => {
                          const booked = isSlotBooked(time);
                          const active = prefTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              disabled={booked}
                              onClick={() => setPrefTime(time)}
                              className={`py-2 text-center text-xs font-mono font-medium rounded-md border transition-all ${
                                booked
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                  : active
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : 'bg-white text-[#111111] border-gray-200 hover:border-gold-500 hover:bg-gold-50/20'
                              }`}
                            >
                              {time}
                              {booked && (
                                <span className="block text-[8px] tracking-tight font-sans text-gray-400 scale-[0.9]">
                                  Occupied
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Special notes */}
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-gray-600 font-bold uppercase mb-2">
                      YOUR MESSAGES &amp; NOTES FOR ARTIST (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify any eye sensitivities, previous lash lifts, style references..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-200 text-sm focus:outline-none focus:focus:ring-1 focus:ring-gold-500 text-[#111111] rounded-sm"
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:justify-between items-center bg-gold-50/30 p-4 rounded-md border border-gold-150/40">
                    <div className="text-[10px] font-mono text-gray-500 uppercase">
                      Selected: <strong className="text-gold-700">{chosenService.name}</strong> - £{chosenService.price}{chosenService.duration ? ` (${chosenService.duration})` : ''}
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-[#111111] border border-[#111111] hover:bg-gold-600 hover:border-gold-600 text-white font-mono text-xs tracking-widest font-bold uppercase transition-all duration-300 shadow-md"
                    >
                      SUBMIT BOOKING REQUEST
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeStep === 3 && successBooking && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6 py-6"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-3xl font-semibold text-[#111111]" id="receipt-title">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Your luxury transformation coordinates have been locked into the salon roster.
                  </p>
                </div>

                {/* Aesthetic Ticket Receipt Copy */}
                <div className="max-w-sm mx-auto bg-gradient-to-b from-[#fbfbfa] to-white border border-gold-100 p-6 rounded-lg text-left shadow-md relative overflow-hidden font-sans">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-500" />
                  
                  {/* Decorative ticket notch punches */}
                  <div className="absolute top-24 -left-3 w-6 h-6 rounded-full bg-white border border-gold-100" />
                  <div className="absolute top-24 -right-3 w-6 h-6 rounded-full bg-white border border-gold-100" />

                  <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-100">
                    <div>
                      <span className="text-[9px] font-mono text-gold-600 font-bold uppercase tracking-widest">
                        LUXURY PASS
                      </span>
                      <h4 className="text-sm font-serif font-bold text-gray-900 leading-tight">
                        AV LASHES BEAUTY STUDIO
                      </h4>
                    </div>
                    <Receipt className="w-5 h-5 text-gold-500" />
                  </div>

                  <div className="py-4 space-y-3.5 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">TICKET NUMBER:</span>
                      <span className="font-mono font-bold text-gray-900">{successBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">CLIENT:</span>
                      <span className="font-semibold text-gray-900 uppercase">{successBooking.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">TREATMENT:</span>
                      <span className="font-serif font-bold text-gold-700">{chosenService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium font-mono">DATE / TIME:</span>
                      <span className="font-mono text-gray-900 font-semibold">{successBooking.date} • {successBooking.timeSlot}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dashed border-gray-100/80 text-center flex flex-col items-center">
                    {/* Simulated luxury QR alignment */}
                    <div className="w-24 h-24 bg-white border border-gray-200 flex items-center justify-center p-1 rounded-md opacity-80 hover:opacity-100 transition-opacity duration-300">
                      <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-gray-800">
                        {/* A nice luxury QR placeholder */}
                        <path d="M2 2h6v6H2V2zm1 1v4h4V3H3zm-1 9h6v6H2v-6zm1 1v4h4v-4H3zm9-11h6v6h-6V2zm1 1v4h4V3h-4zm9 11h2v2h-2v-2zm-2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm-4 4h2v2h-2v-2zm2-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm4 8h2v2h-2v-2zm-6 2h2v2h-2v-2zm2-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 10h4v1h-4v-1zm10-1h1v1h-1v-1zm1 1h1v1h-1V20z" />
                      </svg>
                    </div>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-2">
                      Scan on Arrival for Check-In
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 border border-gray-200 hover:bg-gray-50 text-[10px] font-mono tracking-widest font-bold uppercase rounded-sm"
                  >
                    BOOK ANOTHER SET
                  </button>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-6 py-2.5 bg-[#111111] hover:bg-[#333333] text-white text-[10px] font-mono tracking-widest font-bold uppercase rounded-sm flex items-center gap-1.5"
                  >
                    SAVE TICKET
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Right Rails (Standard Policies from Screenshot #6) */}
        <div className="space-y-6">
          
          {/* List of Client Active Bookings Dashboard */}
          {activeBookings.length > 0 && (
            <div className="bg-white border border-gold-100 p-5 rounded-lg shadow-xs">
              <h4 className="font-mono text-[10px] tracking-widest text-[#111111] font-bold uppercase mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-500 fill-current" />
                MY ACTIVE RESERVATIONS
              </h4>
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                {activeBookings.map((b) => {
                  const s = services.find((srv) => srv.id === b.serviceId);
                  return (
                    <div key={b.id} className="p-3 bg-neutral-50/80 border border-neutral-100 rounded-md relative group flex flex-col justify-between">
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="absolute top-2.5 right-2.5 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <h5 className="font-serif text-xs font-semibold text-gray-900 leading-snug">
                        {s ? s.name : 'Treatment Option'} • <span className="text-gold-700">£{s ? s.price : '30'}</span>
                      </h5>
                      <span className="text-[10px] font-mono text-[#555555] mt-1">
                        🗓️ {b.date} • {b.timeSlot}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400 mt-1 block">
                        ID: {b.id}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Direct Booking & Support contacts (WhatsApp, Instagram, Call, Email) */}
          <div className="bg-[#111111] text-white border border-gold-600/20 p-6 rounded-lg shadow-md space-y-4">
            <h4 className="font-mono text-[10px] tracking-widest text-gold-400 font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 fill-current" />
              DIRECT CHANNELS
            </h4>
            <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
              Prefer organizing via message or call? Connect with Amalia directly for instant customized scheduling:
            </p>
            <div className="grid grid-cols-2 gap-2 text-center h-full">
              <a
                href="https://linktr.ee/SrtaAVlashes"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="col-span-2 py-2.5 bg-neutral-900 border border-gold-500/40 hover:border-gold-400 font-mono text-[9.5px] tracking-wider uppercase font-bold rounded-sm text-gold-300 hover:text-gold-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Link className="w-3.5 h-3.5 text-emerald-450" /> VISIT LINKTREE PORTAL
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=447951541965&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="py-2 bg-emerald-600 hover:bg-emerald-700 font-mono text-[9px] tracking-wider uppercase font-bold rounded-sm text-white transition-colors flex items-center justify-center gap-1"
              >
                WHATSAPP
              </a>
              <a
                href="https://www.instagram.com/srta.amalia_beauty_?igsh=OTNwbjg5bXYydGxr&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 font-mono text-[9px] tracking-wider uppercase font-bold rounded-sm text-white transition-colors flex items-center justify-center gap-1"
              >
                INSTAGRAM
              </a>
              <a
                href="tel:+447951541965"
                className="py-2 border border-white/10 hover:border-gold-500 hover:text-gold-500 text-white font-mono text-[9px] tracking-wider uppercase font-semibold rounded-sm transition-colors flex items-center justify-center gap-1"
              >
                CALL DIRECT
              </a>
              <a
                href="mailto:srtaamaliabeauty@gmail.com"
                className="py-2 border border-white/10 hover:border-gold-500 hover:text-gold-500 text-white font-mono text-[9px] tracking-wider uppercase font-semibold rounded-sm transition-colors flex items-center justify-center gap-1"
              >
                EMAIL US
              </a>
            </div>
          </div>

          {/* Deposit policy */}
          <div className="bg-[#fbf9f4] border border-gold-150 p-6 rounded-lg">
            <h4 className="font-serif text-lg text-gold-800 font-semibold mb-2" id="deposit-policy-header">
              Deposit Policy
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              A non-refundable deposit is required to secure all bookings. This amount will be securely deducted from your final bespoke service total in-salon.
            </p>
          </div>

          {/* Arrival rules */}
          <div className="bg-[#fbf9f4] border border-gold-150 p-6 rounded-lg">
            <h4 className="font-serif text-lg text-gold-800 font-semibold mb-2" id="arrival-time-header">
              Arrival Time
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Please arrive 10 minutes prior to your scheduled time slot on your first visit. Late arrivals exceeding 15 minutes may yield appointment cancellation.
            </p>
          </div>

          {/* Aftercare details */}
          <div className="bg-[#fbf9f4] border border-gold-150 p-6 rounded-lg">
            <h4 className="font-serif text-lg text-gold-800 font-semibold mb-2" id="aftercare-policy-header">
              Aftercare
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Maintenance is crucial for high-end retention. Avoid steam and water contact for 24 hours. Premium brush tools and lash cleanser sets are available.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
