// Email service for frontend - calls our custom email backend
const EMAIL_SERVICE_URL = process.env.REACT_APP_EMAIL_SERVICE_URL || 'http://localhost:3001';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

interface OrderConfirmationData {
  orderId: string;
  userEmail: string;
  userName: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  estimatedDelivery: string;
  paymentMethod: string;
}

interface WelcomeEmailData {
  userEmail: string;
  userName: string;
  loginMethod: 'email' | 'google' | 'facebook';
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
  details?: string[];
}

class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Send contact form email to admin
   */
  async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    try {
      const response = await fetch(`${EMAIL_SERVICE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send contact email');
      }

      return result;
    } catch (error) {
      console.error('Contact email service error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send contact email',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send order confirmation email to user
   */
  async sendOrderConfirmationEmail(data: OrderConfirmationData): Promise<EmailResponse> {
    try {
      const response = await fetch(`${EMAIL_SERVICE_URL}/api/order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send order confirmation email');
      }

      return result;
    } catch (error) {
      console.error('Order email service error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send order confirmation email',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResponse> {
    try {
      const response = await fetch(`${EMAIL_SERVICE_URL}/api/welcome`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send welcome email');
      }

      return result;
    } catch (error) {
      console.error('Welcome email service error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send welcome email',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check email service health
   */
  async checkHealth(): Promise<EmailResponse> {
    try {
      const response = await fetch(`${EMAIL_SERVICE_URL}/api/health`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error('Email service is not healthy');
      }

      return {
        success: true,
        message: 'Email service is healthy',
        ...result
      };
    } catch (error) {
      console.error('Health check error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Email service is unavailable',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Retry mechanism for failed emails
   */
  async sendWithRetry<T>(
    sendFunction: () => Promise<EmailResponse>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<EmailResponse> {
    let lastError: EmailResponse;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await sendFunction();
        if (result.success) {
          return result;
        }
        lastError = result;
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
        }
      } catch (error) {
        lastError = {
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
        }
      }
    }

    return lastError!;
  }
}

export default EmailService;
export type { ContactFormData, OrderConfirmationData, WelcomeEmailData, EmailResponse };
