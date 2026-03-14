import React, { useState } from 'react'
import styled from 'styled-components'
import RazorpayService, { PaymentOptions } from '../../services/RazorpayService'

interface PaymentButtonProps {
  amount: number
  productName: string
  productDescription?: string
  customerInfo?: {
    name?: string
    email?: string
    contact?: string
  }
  onSuccess?: (response: any) => void
  onFailure?: (error: any) => void
  disabled?: boolean
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

const PaymentButtonStyled = styled.button<{ $variant: 'primary' | 'secondary', $size: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px'
      case 'medium': return '12px 24px'
      case 'large': return '16px 32px'
      default: return '12px 24px'
    }
  }};
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return '0.875rem'
      case 'medium': return '1rem'
      case 'large': return '1.125rem'
      default: return '1rem'
    }
  }};
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;

  ${props => props.$variant === 'primary' ? `
    background: #00a652;
    color: white;

    &:hover:not(:disabled) {
      background: #008040;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  ` : `
    background: transparent;
    color: #00a652;
    border: 2px solid #00a652;

    &:hover:not(:disabled) {
      background: #00a652;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  i {
    font-size: 1.1em;
  }
`

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  productName,
  productDescription,
  customerInfo,
  onSuccess,
  onFailure,
  disabled = false,
  children,
  variant = 'primary',
  size = 'medium'
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    if (isLoading || disabled) return

    setIsLoading(true)

    try {
      const razorpayService = RazorpayService.getInstance()

      // Create order (optional - you can skip this and use direct payment)
      let orderId: string | undefined
      try {
        const orderResponse = await razorpayService.createOrder(amount)
        orderId = orderResponse.id
      } catch (error) {
        console.warn('Order creation failed, proceeding without order:', error)
        // Continue without order - Razorpay will handle it
      }

      const paymentOptions: PaymentOptions = {
        amount,
        name: 'eSthira',
        description: productDescription || productName,
        prefill: customerInfo,
        order_id: orderId,
        theme: {
          color: '#00a652'
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            if (onFailure) {
              onFailure(new Error('Payment cancelled by user'))
            }
          }
        }
      }

      const response = await razorpayService.openPaymentModal(paymentOptions)

      // Verify payment (optional)
      const isVerified = await razorpayService.verifyPayment(
        response.razorpay_payment_id,
        response.razorpay_order_id || orderId || '',
        response.razorpay_signature
      )

      if (isVerified) {
        if (onSuccess) {
          onSuccess({
            ...response,
            verified: true,
            amount,
            productName
          })
        }
      } else {
        throw new Error('Payment verification failed')
      }

    } catch (error) {
      console.error('Payment error:', error)
      if (onFailure) {
        onFailure(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PaymentButtonStyled
      onClick={handlePayment}
      disabled={disabled || isLoading}
      $variant={variant}
      $size={size}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          Processing...
        </>
      ) : (
        <>
          <i className="fas fa-credit-card"></i>
          {children || `Pay ₹${amount.toLocaleString('en-IN')}`}
        </>
      )}
    </PaymentButtonStyled>
  )
}

export default PaymentButton
