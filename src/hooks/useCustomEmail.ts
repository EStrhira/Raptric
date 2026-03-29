import { useState, useCallback } from 'react';
import EmailService, { ContactFormData, OrderConfirmationData, WelcomeEmailData, EmailResponse } from '../services/CustomEmailService';

interface UseEmailState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseEmailReturn extends UseEmailState {
  sendContactEmail: (data: ContactFormData) => Promise<void>;
  sendOrderConfirmationEmail: (data: OrderConfirmationData) => Promise<void>;
  sendWelcomeEmail: (data: WelcomeEmailData) => Promise<void>;
  checkHealth: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for email functionality with loading states and error handling
 */
export const useEmail = (): UseEmailReturn => {
  const [state, setState] = useState<UseEmailState>({
    loading: false,
    error: null,
    success: false
  });

  const emailService = EmailService.getInstance();

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error, success: false }));
  };

  const setSuccess = () => {
    setState(prev => ({ ...prev, success: true, error: null }));
  };

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      success: false
    });
  }, []);

  const sendContactEmail = useCallback(async (data: ContactFormData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await emailService.sendWithRetry(
        () => emailService.sendContactEmail(data),
        3, // max retries
        1000 // initial delay
      );

      if (result.success) {
        setSuccess();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send contact email');
    } finally {
      setLoading(false);
    }
  }, [emailService]);

  const sendOrderConfirmationEmail = useCallback(async (data: OrderConfirmationData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await emailService.sendWithRetry(
        () => emailService.sendOrderConfirmationEmail(data),
        3, // max retries
        1000 // initial delay
      );

      if (result.success) {
        setSuccess();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send order confirmation email');
    } finally {
      setLoading(false);
    }
  }, [emailService]);

  const sendWelcomeEmail = useCallback(async (data: WelcomeEmailData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await emailService.sendWithRetry(
        () => emailService.sendWelcomeEmail(data),
        3, // max retries
        1000 // initial delay
      );

      if (result.success) {
        setSuccess();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send welcome email');
    } finally {
      setLoading(false);
    }
  }, [emailService]);

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await emailService.checkHealth();

      if (result.success) {
        setSuccess();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Email service is unavailable');
    } finally {
      setLoading(false);
    }
  }, [emailService]);

  return {
    loading: state.loading,
    error: state.error,
    success: state.success,
    sendContactEmail,
    sendOrderConfirmationEmail,
    sendWelcomeEmail,
    checkHealth,
    reset
  };
};

/**
 * Custom hook specifically for contact form
 */
export const useContactForm = () => {
  const email = useEmail();
  
  const submitContactForm = useCallback(async (data: ContactFormData) => {
    await email.sendContactEmail(data);
  }, [email]);

  return {
    ...email,
    submitContactForm
  };
};

/**
 * Custom hook specifically for order emails
 */
export const useOrderEmail = () => {
  const email = useEmail();
  
  const sendOrderConfirmation = useCallback(async (data: OrderConfirmationData) => {
    await email.sendOrderConfirmationEmail(data);
  }, [email]);

  return {
    ...email,
    sendOrderConfirmation
  };
};

/**
 * Custom hook specifically for welcome emails
 */
export const useWelcomeEmail = () => {
  const email = useEmail();
  
  const sendWelcome = useCallback(async (data: WelcomeEmailData) => {
    await email.sendWelcomeEmail(data);
  }, [email]);

  return {
    ...email,
    sendWelcome
  };
};
