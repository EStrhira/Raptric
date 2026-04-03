interface OrderEmailData {
  customerEmail: string
  orderId: string
  product: string
}

interface OrderEmailResponse {
  success: boolean
  message?: string
  error?: string
}

/**
 * Sends order confirmation email via Netlify function
 * @param orderData - Order information to send
 * @returns Promise<OrderEmailResponse>
 */
export const sendOrderEmail = async (orderData: OrderEmailData): Promise<OrderEmailResponse> => {
  try {
    const response = await fetch('/.netlify/functions/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerEmail: orderData.customerEmail,
        orderId: orderData.orderId,
        product: orderData.product
      })
    })

    const data: OrderEmailResponse = await response.json()
    
    if (response.ok && data.success) {
      return {
        success: true,
        message: 'Order confirmation email sent successfully!'
      }
    } else {
      return {
        success: false,
        error: data.error || 'Failed to send order confirmation'
      }
    }
  } catch (error) {
    console.error('Error sending order email:', error)
    return {
      success: false,
      error: 'Network error. Please try again.'
    }
  }
}

/**
 * Simulates Razorpay success callback and triggers order email
 * @param customerEmail - Customer's email address
 * @param orderId - Generated order ID
 * @param product - Product name/description
 */
export const handleRazorpaySuccess = async (
  customerEmail: string,
  orderId: string,
  product: string
): Promise<void> => {
  console.log('Processing Razorpay success callback...')
  
  try {
    const result = await sendOrderEmail({
      customerEmail,
      orderId,
      product
    })
    
    if (result.success) {
      console.log('Order email sent successfully')
      // You can redirect to success page here
      window.location.href = '/order-success'
    } else {
      console.error('Failed to send order email:', result.error)
      // You can show error message or redirect to error page
      alert('Order confirmed but email notification failed. Please contact support.')
    }
  } catch (error) {
    console.error('Error in Razorpay success handler:', error)
    alert('Order processing failed. Please contact support.')
  }
}
