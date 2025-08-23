// lib/security.js - Security utility functions

import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map();

export const rateLimit = (identifier, windowMs = 900000, maxRequests = 5) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }
  
  const requests = rateLimitStore.get(identifier).filter(time => time > windowStart);
  
  if (requests.length >= maxRequests) {
    return {
      success: false,
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((requests[0] + windowMs - now) / 1000)
    };
  }
  
  requests.push(now);
  rateLimitStore.set(identifier, requests);
  
  return { success: true };
};

export const sanitizeInput = (input, type = 'text') => {
  if (!input) return '';
  
  let sanitized = input.toString().trim();
  
  switch (type) {
    case 'email':
      return validator.normalizeEmail(sanitized) || '';
    case 'phone':
      return sanitized.replace(/[^\d+\s-()]/g, '');
    case 'text':
      return DOMPurify.sanitize(validator.escape(sanitized));
    case 'textarea':
      return DOMPurify.sanitize(sanitized);
    default:
      return DOMPurify.sanitize(sanitized);
  }
};

export const validateInput = (value, rules) => {
  const errors = [];
  
  // Required check
  if (rules.required && (!value || value.trim().length === 0)) {
    errors.push('This field is required');
  }
  
  if (!value || value.trim().length === 0) {
    return errors; // Skip other validations if empty (unless required)
  }
  
  // Length checks
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters long`);
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Must be less than ${rules.maxLength} characters long`);
  }
  
  // Email validation
  if (rules.email && !validator.isEmail(value)) {
    errors.push('Please enter a valid email address');
  }
  
  // Phone validation (Australian)
  if (rules.phone) {
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      errors.push('Please enter a valid Australian phone number');
    }
  }
  
  // Custom pattern
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(rules.patternMessage || 'Invalid format');
  }
  
  return errors;
};

export const validateFormData = (formData) => {
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      email: true
    },
    phone: {
      required: true,
      phone: true
    },
    address: {
      required: true,
      minLength: 5,
      maxLength: 200
    },
    projectType: {
      required: true
    },
    projectSize: {
      required: true
    },
    timeline: {
      required: true
    },
    details: {
      maxLength: 1000
    }
  };

  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const fieldErrors = validateInput(formData[field], validationRules[field]);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors[0]; // Show first error only
    }
  });

  // Check for honeypot (bot trap)
  if (formData.honeypot && formData.honeypot.trim() !== '') {
    errors.honeypot = 'Bot detected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: {
      name: sanitizeInput(formData.name, 'text'),
      email: sanitizeInput(formData.email, 'email'),
      phone: sanitizeInput(formData.phone, 'phone'),
      address: sanitizeInput(formData.address, 'text'),
      projectType: sanitizeInput(formData.projectType, 'text'),
      projectSize: sanitizeInput(formData.projectSize, 'text'),
      timeline: sanitizeInput(formData.timeline, 'text'),
      details: sanitizeInput(formData.details, 'textarea')
    }
  };
};

// Client-side IP detection for rate limiting
export const getClientIdentifier = () => {
  // In production, you might want to use a more sophisticated identifier
  // For now, we'll use a combination of browser fingerprinting
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Security fingerprint', 2, 2);
  
  const fingerprint = canvas.toDataURL().slice(-50);
  const userAgent = navigator.userAgent.slice(-20);
  
  return btoa(fingerprint + userAgent).slice(0, 20);
};

// Content Security Policy helpers
export const getCSPNonce = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Check if user is likely human based on interaction patterns
export const validateHumanBehavior = (formData, interactionData) => {
  const suspiciousPatterns = [];
  
  // Check submission speed (too fast = likely bot)
  if (interactionData.submissionTime < 5000) { // Less than 5 seconds
    suspiciousPatterns.push('Form submitted too quickly');
  }
  
  // Check for copy-paste in all fields (suspicious)
  if (interactionData.pasteCount > 3) {
    suspiciousPatterns.push('Excessive copy-paste behavior detected');
  }
  
  // Check for identical repeated content
  const values = Object.values(formData);
  const uniqueValues = new Set(values);
  if (uniqueValues.size < values.length / 2) {
    suspiciousPatterns.push('Repeated content detected');
  }
  
  return {
    isHuman: suspiciousPatterns.length === 0,
    suspiciousPatterns
  };
};