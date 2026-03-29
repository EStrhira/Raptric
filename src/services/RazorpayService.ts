import { loadScript } from '../utils/loadScript'
import BUSINESS_INFO from '../constants/businessInfo'

declare global {
  interface Window {
    Razorpay: any
  }
}

export interface PaymentOptions {
  amount: number
  currency?: string
  name: string
  description: string
  image?: string
  order_id?: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  notes?: Record<string, string>
  theme?: {
    color?: string
  }
  modal?: {
    ondismiss?: () => void
    escape?: boolean
    handleback?: boolean
    confirmclose?: boolean
    animate?: boolean
  }
}

export class RazorpayService {
  private static instance: RazorpayService
  private isLoaded = false

  static getInstance(): RazorpayService {
    if (!RazorpayService.instance) {
      RazorpayService.instance = new RazorpayService()
    }
    return RazorpayService.instance
  }

  async loadRazorpay(): Promise<boolean> {
    if (this.isLoaded) {
      return true
    }

    try {
      await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      this.isLoaded = true
      return true
    } catch (error) {
      console.error('Failed to load Razorpay:', error)
      return false
    }
  }

  async createOrder(amount: number): Promise<any> {
    try {
      console.log('🔧 Creating order with endpoint: /.netlify/functions/create-order', {
        amount,
        amountInPaise: Math.round(amount * 100),
        currency: 'INR',
        timestamp: new Date().toISOString()
      });

      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert rupees to paise (₹1 = 100 paise)
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            originalAmount: amount, // Store original amount for debugging
            convertedAmount: Math.round(amount * 100) // Store converted amount for debugging
          }
        }),
      });

      console.log('📡 Order creation response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Razorpay order creation failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        
        // If this is a 404 and we're in development, create a mock order
        const isDevelopment = process.env.NODE_ENV === 'development';
        if (response.status === 404 && isDevelopment) {
          console.warn('⚠️ Netlify functions not found in development. This is expected if not using Netlify Dev.');
          console.warn('💡 To fix this:');
          console.warn('   1. Run: npm run netlify:dev');
          console.warn('   2. Or deploy to Netlify for production');
          console.warn('   3. For now, payment will proceed without server-side order creation');
          
          // Return a mock order for development
          return {
            id: `order_mock_${Date.now()}`,
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            status: 'created',
            notes: {
              timestamp: new Date().toISOString(),
              development_mode: true
            }
          };
        }
        
        throw new Error(`Order creation failed: ${response.status} ${response.statusText}`);
      }

      const order = await response.json();
      console.log('✅ Order created successfully:', order);
      return order;
    } catch (error) {
      console.error('💥 Error creating order:', error);
      throw error;
    }
  }

  async openPaymentModal(options: PaymentOptions): Promise<any> {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const isLoaded = await this.loadRazorpay()
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay')
    }

    const order = await this.createOrder(options.amount)
    console.log('🔍 Order received in openPaymentModal:', order);
    console.log('🔍 Order notes:', order.notes);
    console.log('🔍 Development mode check:', isDevelopment);
    console.log('🔍 Mock order detection:', order.notes?.development_mode);
    
    // Always open the Razorpay payment modal (even for mock orders in development)
    // This allows users to see the payment gateway interface
    console.log('🔄 Opening Razorpay payment modal...');
    return new Promise((resolve, reject) => {
      const razorpayOptions = {
        key: BUSINESS_INFO.social.razorpay.apiKey,
        amount: order.amount,
        currency: order.currency,
        // Only pass order_id if it's not a mock order
        ...(order.notes?.development_mode ? {} : { order_id: order.id }),
        name: options.name,
        description: options.description,
        image: options.image || '/eSthira_Logo_Black.png',
        prefill: {
          name: options.prefill?.name || '',
          email: options.prefill?.email || '',
          contact: options.prefill?.contact || '',
        },
        notes: options.notes || {},
        theme: {
          color: options.theme?.color || '#00a652',
        },
        modal: {
          ondismiss: () => {
            if (options.modal?.ondismiss) {
              options.modal.ondismiss()
            }
            reject(new Error('Payment cancelled by user'))
          },
          escape: options.modal?.escape !== false,
          handleback: options.modal?.handleback !== false,
          confirmclose: options.modal?.confirmclose !== false,
          animate: options.modal?.animate !== false,
        },
        handler: (response: any) => {
          console.log('💳 Payment successful:', response);
          resolve(response);
        }
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    });
  }

  // Verify payment (optional)
  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    try {
      console.log('🔍 Starting payment verification:', {
        paymentId,
        orderId,
        hasSignature: !!signature
      });

      // Check if this is development mode (mock order)
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      // For real payments, we need to verify with Razorpay
      // For mock orders, we simulate verification
      const isMockOrder = orderId.startsWith('order_mock_') || paymentId.startsWith('pay_mock_');
      
      if (isMockOrder) {
        console.log('🧪 Development mode: Simulating payment verification for mock order');
        
        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock verification always succeeds for development
        console.log('✅ Mock payment verification successful');
        return true;
      }

      // For real payments, verify with Razorpay server
      const response = await fetch('/.netlify/functions/verify-payment-fixed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        }),
      });

      console.log('📡 Verification response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Verification failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        
        // If this is a 404 and we're in development, provide a helpful message
        if (response.status === 404 && isDevelopment) {
          console.warn('⚠️ Netlify verification function not found in development. This is expected if not using Netlify Dev.');
          console.warn('💡 To fix this:');
          console.warn('   1. Run: npm run netlify:dev');
          console.warn('   2. Or deploy to Netlify for production');
          console.warn('   3. For now, payment will be considered verified');
          
          // Return true for development mock payments
          return true;
        }
        
        throw new Error(`Payment verification failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Payment verification result:', result);
      return result.success || false;
    } catch (error) {
      console.error('💥 Error verifying payment:', error);
      throw error;
    }
  }
}

export default RazorpayService
