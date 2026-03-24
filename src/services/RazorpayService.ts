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

  async createOrder(amount: number, receipt?: string): Promise<any> {
    try {
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          receipt: receipt || `receipt_${Date.now()}`,
          notes: {
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Order creation failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
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
    const isLoaded = await this.loadRazorpay()
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay')
    }

    const order = await this.createOrder(options.amount)
    
    return new Promise((resolve, reject) => {
      const razorpayOptions = {
        key: BUSINESS_INFO.social.razorpay.apiKey,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id, // Use actual order ID from backend
        name: options.name,
        description: options.description,
        image: options.image || '/E Sthira Logo Black.png',
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
          resolve(response)
        },
      }

      const rzp = new window.Razorpay(razorpayOptions)
      rzp.open()
    })
  }

  // Verify payment (optional)
  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    try {
      console.log('🔍 Starting payment verification:', {
        paymentId,
        orderId,
        hasSignature: !!signature
      });

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
      })

      console.log('📡 Verification response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Verification failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        throw new Error(`Payment verification failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Verification result:', result);
      return result.success
    } catch (error) {
      console.error('💥 Error verifying payment:', error);
      return false
    }
  }
}

export default RazorpayService
