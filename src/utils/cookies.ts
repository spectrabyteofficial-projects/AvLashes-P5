/**
 * Cookie Management Utilities
 * Handles cookie consent and preferences
 */

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'av_lashes_cookie_consent';
const CONSENT_DATE_KEY = 'av_lashes_cookie_consent_date';

/**
 * Get current cookie preferences
 */
export const getCookiePreferences = (): CookiePreferences | null => {
  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) return null;
    return JSON.parse(consent);
  } catch (error) {
    console.error('Failed to get cookie preferences:', error);
    return null;
  }
};

/**
 * Check if user has given consent
 */
export const hasGivenConsent = (): boolean => {
  return localStorage.getItem(CONSENT_KEY) !== null;
};

/**
 * Check if specific cookie type is allowed
 */
export const isCookieAllowed = (type: keyof CookiePreferences): boolean => {
  const preferences = getCookiePreferences();
  if (!preferences) return false;
  return preferences[type] === true;
};

/**
 * Clear cookie consent (for testing or user request)
 */
export const clearCookieConsent = (): void => {
  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(CONSENT_DATE_KEY);
};

/**
 * Get consent date
 */
export const getConsentDate = (): Date | null => {
  try {
    const dateStr = localStorage.getItem(CONSENT_DATE_KEY);
    if (!dateStr) return null;
    return new Date(dateStr);
  } catch (error) {
    return null;
  }
};

/**
 * Check if consent needs renewal (older than 1 year)
 */
export const needsConsentRenewal = (): boolean => {
  const consentDate = getConsentDate();
  if (!consentDate) return true;
  
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  return consentDate < oneYearAgo;
};

/**
 * Initialize analytics if allowed
 */
export const initializeAnalytics = (): void => {
  if (isCookieAllowed('analytics')) {
    // Add your analytics initialization here
    // Add your analytics initialization here
    console.log('Analytics initialized');
  }
};

/**
 * Initialize marketing tools if allowed
 */
export const initializeMarketing = (): void => {
  if (isCookieAllowed('marketing')) {
    // Add your marketing tools initialization here
    // Add your marketing tools initialization here
    console.log('Marketing tools initialized');
  }
};
