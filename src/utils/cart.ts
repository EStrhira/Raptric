export interface CartItem {
  id: string
  name: string
  category: string
  price: string
  quantity: number
  image?: string
  selectedColor?: string
  tax?: number  // Tax percentage for accessories
}

export const addToCart = (item: Omit<CartItem, 'quantity'>) => {
  const existingCart = getCart()
  const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id)
  
  if (existingItemIndex > -1) {
    existingCart[existingItemIndex].quantity += 1
  } else {
    existingCart.push({ ...item, quantity: 1 })
  }
  
  localStorage.setItem('esthira-cart', JSON.stringify(existingCart))
  
  // Dispatch storage event to update cart count in header
  window.dispatchEvent(new Event('storage'))
  return existingCart
}

export const removeFromCart = (id: string) => {
  const existingCart = getCart()
  const updatedCart = existingCart.filter(item => item.id !== id)
  localStorage.setItem('esthira-cart', JSON.stringify(updatedCart))
  
  // Dispatch storage event to update cart count in header
  window.dispatchEvent(new Event('storage'))
  return updatedCart
}

export const updateQuantity = (id: string, quantity: number) => {
  const existingCart = getCart()
  const itemIndex = existingCart.findIndex(item => item.id === id)
  
  if (itemIndex > -1 && quantity > 0) {
    existingCart[itemIndex].quantity = quantity
    localStorage.setItem('esthira-cart', JSON.stringify(existingCart))
    
    // Dispatch storage event to update cart count in header
    window.dispatchEvent(new Event('storage'))
  }
  
  return existingCart
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  
  const savedCart = localStorage.getItem('esthira-cart')
  return savedCart ? JSON.parse(savedCart) : []
}

export const getCartCount = (): number => {
  return getCart().reduce((total, item) => total + item.quantity, 0)
}

export const getCartTotal = (): number => {
  return getCart().reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
    return total + (price * item.quantity)
  }, 0)
}

export const clearCart = () => {
  localStorage.removeItem('esthira-cart')
}
