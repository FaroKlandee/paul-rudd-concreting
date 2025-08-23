// hooks/useFormSecurity.js - Custom hook for form security

import { getClientIdentifier, rateLimit, validateHumanBehavior } from '@/lib/security';
import { useEffect, useRef, useState } from 'react';

export const useFormSecurity = () => {
  const [securityState, setSecurityState] = useState({
    isBlocked: false,
    attempts: 0,
    lastAttempt: null,
    interactionData: {
      startTime: null,
      keystrokes: 0,
      pasteCount: 0,
      focusChanges: 0
    }
  });

  const securityRef = useRef(securityState);
  securityRef.current = securityState;

  useEffect(() => {
    // Initialize security tracking
    setSecurityState(prev => ({
      ...prev,
      interactionData: {
        ...prev.interactionData,
        startTime: Date.now()
      }
    }));
  }, []);

  const trackKeystroke = () => {
    setSecurityState(prev => ({
      ...prev,
      interactionData: {
        ...prev.interactionData,
        keystrokes: prev.interactionData.keystrokes + 1
      }
    }));
  };

  const trackPaste = () => {
    setSecurityState(prev => ({
      ...prev,
      interactionData: {
        ...prev.interactionData,
        pasteCount: prev.interactionData.pasteCount + 1
      }
    }));
  };

  const trackFocus = () => {
    setSecurityState(prev => ({
      ...prev,
      interactionData: {
        ...prev.interactionData,
        focusChanges: prev.interactionData.focusChanges + 1
      }
    }));
  };

  const checkRateLimit = () => {
    const identifier = getClientIdentifier();
    const result = rateLimit(identifier);
    
    if (!result.success) {
      setSecurityState(prev => ({
        ...prev,
        isBlocked: true,
        attempts: prev.attempts + 1,
        lastAttempt: Date.now()
      }));
      return false;
    }
    
    return true;
  };

  const validateSubmission = (formData) => {
    // Calculate submission time
    const submissionTime = Date.now() - securityState.interactionData.startTime;
    
    const interactionData = {
      ...securityState.interactionData,
      submissionTime
    };

    // Check human behavior patterns
    const humanCheck = validateHumanBehavior(formData, interactionData);
    
    if (!humanCheck.isHuman) {
      console.warn('Suspicious behavior detected:', humanCheck.suspiciousPatterns);
      return {
        isValid: false,
        reason: 'Suspicious activity detected. Please try again.',
        patterns: humanCheck.suspiciousPatterns
      };
    }

    return { isValid: true };
  };

  const resetSecurity = () => {
    setSecurityState({
      isBlocked: false,
      attempts: 0,
      lastAttempt: null,
      interactionData: {
        startTime: Date.now(),
        keystrokes: 0,
        pasteCount: 0,
        focusChanges: 0
      }
    });
  };

  return {
    securityState,
    trackKeystroke,
    trackPaste,
    trackFocus,
    checkRateLimit,
    validateSubmission,
    resetSecurity
  };
};