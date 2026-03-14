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
    // In production, this should call your backend API
    // For now, returning a mock order
    return {
      id: `order_${Date.now()}`,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR'
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
        order_id: order.id,
        name: options.name,
        description: options.description,
        image: options.image || '/eSthira Logo Black.png',
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

  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_id: paymentId,
          order_id: orderId,
          signature,
        }),
      })

      if (!response.ok) {
        throw new Error('Payment verification failed')
      }

      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('Error verifying payment:', error)
      return false
    }
  }
}

export default RazorpayService
