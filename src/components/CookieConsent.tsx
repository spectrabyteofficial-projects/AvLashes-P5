import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Shield, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    functional: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('av_lashes_cookie_consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (error) {
        console.error('Failed to parse cookie preferences');
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    savePreferences(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    savePreferences(necessaryOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('av_lashes_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('av_lashes_cookie_consent_date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-2 border-gold-500 shadow-2xl"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {!showSettings ? (
            // Main Cookie Banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              
              {/* Left side - Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-gold-700" />
                </div>
                <div className="flex-1">
                  <h3 id="cookie-consent-title" className="font-serif text-lg font-semibold text-[#111111] mb-1">
                    We Value Your Privacy
                  </h3>
                  <p id="cookie-consent-description" className="text-xs text-gray-600 leading-relaxed max-w-2xl">
                    We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. 
                    By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or accept only necessary cookies.
                  </p>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-xs text-gold-700 hover:text-gold-800 font-medium mt-2 underline inline-flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Customize Settings
                  </button>
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <button
                  onClick={handleAcceptNecessary}
                  className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-mono text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-mono text-[10px] tracking-widest uppercase font-semibold transition-all shadow-md rounded-sm"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          ) : (
            // Cookie Settings Panel
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-gold-600" />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#111111]">
                      Cookie Preferences
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Manage your cookie settings below
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cookie Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                
                {/* Necessary Cookies */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-mono text-xs font-bold uppercase text-gray-900 tracking-wider">
                        Necessary Cookies
                      </h4>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-200 text-[9px] font-mono text-gray-600 rounded">
                        Always Active
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">
                    Essential for the website to function properly. These cookies enable core functionality such as security, 
                    network management, and accessibility. They cannot be disabled.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-mono text-xs font-bold uppercase text-gray-900 tracking-wider">
                        Functional Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">
                    Remember your preferences and settings, such as language preferences, booking history, and form data 
                    to provide a personalized experience.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-mono text-xs font-bold uppercase text-gray-900 tracking-wider">
                        Analytics Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">
                    Help us understand how visitors interact with our website by collecting and reporting information 
                    anonymously. This helps us improve our services.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-mono text-xs font-bold uppercase text-gray-900 tracking-wider">
                        Marketing Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mt-2">
                    Used to track visitors across websites to display relevant advertisements and promotional content 
                    that may be of interest to you.
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleAcceptNecessary}
                  className="flex-1 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-mono text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-mono text-[10px] tracking-widest uppercase font-semibold transition-all rounded-sm"
                >
                  Save My Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-mono text-[10px] tracking-widest uppercase font-semibold transition-all shadow-md rounded-sm"
                >
                  Accept All
                </button>
              </div>

              {/* Privacy Policy Link */}
              <div className="text-center">
                <p className="text-[10px] text-gray-500">
                  For more information, please read our{' '}
                  <button
                    onClick={() => window.location.hash = '#services'}
                    className="text-gold-700 hover:text-gold-800 underline font-medium"
                  >
                    Privacy Policy
                  </button>
                  {' '}and{' '}
                  <button
                    onClick={() => window.location.hash = '#services'}
                    className="text-gold-700 hover:text-gold-800 underline font-medium"
                  >
                    Cookie Policy
                  </button>
                </p>
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
