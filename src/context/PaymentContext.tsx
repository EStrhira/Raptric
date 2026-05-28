import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface PaymentState {
  isLoading: boolean
  error: string | null
  lastPayment: any | null
  paymentHistory: any[]
}

export interface PaymentAction {
  type: 'SET_LOADING' | 'SET_ERROR' | 'SET_PAYMENT_SUCCESS' | 'CLEAR_ERROR' | 'CLEAR_HISTORY'
  payload?: any
}

const initialState: PaymentState = {
  isLoading: false,
  error: null,
  lastPayment: null,
  paymentHistory: []
}

const paymentReducer = (state: PaymentState, action: PaymentAction): PaymentState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: action.payload ? null : state.error
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    
    case 'SET_PAYMENT_SUCCESS':
      console.log('PaymentReducer - SET_PAYMENT_SUCCESS:', action.payload)
      return {
        ...state,
        isLoading: false,
        error: null,
        lastPayment: action.payload,
        paymentHistory: [action.payload, ...state.paymentHistory]
      }
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    
    case 'CLEAR_HISTORY':
      return {
        ...state,
        paymentHistory: [],
        lastPayment: null
      }
    
    default:
      return state
  }
}

interface PaymentContextType {
  state: PaymentState
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setPaymentSuccess: (payment: any) => void
  clearError: () => void
  clearHistory: () => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState)

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  const setPaymentSuccess = (payment: any) => {
    console.log('PaymentContext - Setting payment success:', payment)
    dispatch({ type: 'SET_PAYMENT_SUCCESS', payload: payment })
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' })
  }

  return (
    <PaymentContext.Provider
      value={{
        state,
        setLoading,
        setError,
        setPaymentSuccess,
        clearError,
        clearHistory
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}

export default PaymentContext
