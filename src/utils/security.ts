/**
 * Security Utilities for AV Lashes Application
 * Protects against XSS, injection attacks, and data validation
 */

// ============================================
// INPUT SANITIZATION & VALIDATION
// ============================================

/**
 * Sanitize string input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .trim();
};

/**
 * Sanitize HTML content - more aggressive for rich text
 */
export const sanitizeHTML = (html: string): string => {
  if (!html) return '';
  
  const div = document.createElement('div');
  div.textContent = html; // This escapes all HTML
  return div.innerHTML;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321
};

/**
 * Validate phone number (UK format)
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // UK phone: +44 followed by 10 digits, or 11 digits starting with 0
  const ukPhoneRegex = /^(\+44\d{10}|0\d{10})$/;
  return ukPhoneRegex.test(cleaned);
};

/**
 * Validate name (letters, spaces, hyphens, apostrophes only)
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return nameRegex.test(name);
};

/**
 * Validate date is not in the past
 */
export const isValidFutureDate = (dateString: string): boolean => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

/**
 * Sanitize and validate booking data
 */
export const validateBookingData = (data: {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  notes?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate name
  if (!isValidName(data.fullName)) {
    errors.push('Full name must contain only letters, spaces, hyphens, and apostrophes (2-50 characters)');
  }

  // Validate email
  if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Validate phone
  if (!isValidPhone(data.phone)) {
    errors.push('Please enter a valid UK phone number');
  }

  // Validate date
  if (!isValidFutureDate(data.date)) {
    errors.push('Please select a future date');
  }

  // Validate notes length
  if (data.notes && data.notes.length > 500) {
    errors.push('Notes must be less than 500 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize contact message data
 */
export const validateContactData = (data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidName(data.firstName)) {
    errors.push('First name must contain only letters (2-50 characters)');
  }

  if (!isValidName(data.lastName)) {
    errors.push('Last name must contain only letters (2-50 characters)');
  }

  if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (data.message && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// ============================================
// LOCAL STORAGE SECURITY
// ============================================

/**
 * Secure localStorage wrapper with validation
 */
export const secureStorage = {
  /**
   * Save data to localStorage with size limit
   */
  setItem: (key: string, value: any): boolean => {
    try {
      const serialized = JSON.stringify(value);
      
      // Prevent localStorage abuse (5MB limit per domain, we'll use 1MB per key)
      if (serialized.length > 1024 * 1024) {
        console.error('Data too large for localStorage');
        return false;
      }

      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  },

  /**
   * Get data from localStorage with validation
   */
  getItem: <T>(key: string, validator?: (data: any) => boolean): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);

      // Optional validation
      if (validator && !validator(parsed)) {
        console.warn('Invalid data in localStorage, removing');
        localStorage.removeItem(key);
        return null;
      }

      return parsed as T;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return null;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },

  /**
   * Clear all app data from localStorage
   */
  clearAppData: (): void => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('av_lashes_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};

// ============================================
// RATE LIMITING
// ============================================

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple client-side rate limiting
 * Prevents spam submissions
 */
export const checkRateLimit = (
  key: string,
  config: RateLimitConfig = { maxAttempts: 5, windowMs: 60000 } // 5 attempts per minute
): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // Clean up old records
  if (record && now > record.resetTime) {
    rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(key);

  if (!current) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs
    });
    return { allowed: true };
  }

  if (current.count >= config.maxAttempts) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetTime - now) / 1000)
    };
  }

  current.count++;
  return { allowed: true };
};

// ============================================
// CONTENT SECURITY
// ============================================

/**
 * Generate a random ID that's hard to guess
 */
export const generateSecureId = (prefix: string = 'ID'): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const extra = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${timestamp}-${random}-${extra}`;
};

/**
 * Escape special characters for safe display
 */
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Check if URL is safe (no javascript:, data:, etc.)
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url) return false;
  
  const dangerous = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];
  const lowerUrl = url.toLowerCase().trim();
  
  return !dangerous.some(protocol => lowerUrl.startsWith(protocol));
};

/**
 * Sanitize URL for external links
 */
export const sanitizeUrl = (url: string): string => {
  if (!isSafeUrl(url)) {
    return '#';
  }
  return url;
};

// ============================================
// FORM SECURITY
// ============================================

/**
 * Prevent form double submission
 */
export class FormSubmissionGuard {
  private submitting = new Set<string>();

  isSubmitting(formId: string): boolean {
    return this.submitting.has(formId);
  }

  startSubmission(formId: string): boolean {
    if (this.submitting.has(formId)) {
      return false; // Already submitting
    }
    this.submitting.add(formId);
    return true;
  }

  endSubmission(formId: string): void {
    this.submitting.delete(formId);
  }
}

// ============================================
// DATA INTEGRITY
// ============================================

/**
 * Validate booking data structure
 */
export const isValidBooking = (booking: any): boolean => {
  return (
    booking &&
    typeof booking.id === 'string' &&
    typeof booking.fullName === 'string' &&
    typeof booking.email === 'string' &&
    typeof booking.phone === 'string' &&
    typeof booking.serviceId === 'string' &&
    typeof booking.date === 'string' &&
    typeof booking.timeSlot === 'string' &&
    ['pending', 'confirmed'].includes(booking.status)
  );
};

/**
 * Validate contact message structure
 */
export const isValidContactMessage = (message: any): boolean => {
  return (
    message &&
    typeof message.id === 'string' &&
    typeof message.firstName === 'string' &&
    typeof message.lastName === 'string' &&
    typeof message.email === 'string' &&
    typeof message.serviceId === 'string' &&
    typeof message.message === 'string' &&
    typeof message.createdAt === 'string'
  );
};
