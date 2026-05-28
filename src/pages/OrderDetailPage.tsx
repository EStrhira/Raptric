import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserService, { UserOrder } from '../firebase/userService'

// Styled Components
const OrderDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #f8f9fa;
`

const OrderHeader = styled.div`
  background: linear-gradient(135deg, #00a652, #008a45);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderText = styled.div`
  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const OrderCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const InfoItem = styled.div`
  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }

  strong {
    color: #333;
    font-weight: 600;
  }
`

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => {
    switch(props.$status) {
      case 'delivered': return '#d4edda';
      case 'processing': return '#cce7ff';
      case 'shipped': return '#fff3cd';
      case 'pending': return '#f8f9fa';
      case 'cancelled': return '#f8d7da';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'delivered': return '#155724';
      case 'processing': return '#004085';
      case 'shipped': return '#856404';
      case 'pending': return '#6c757d';
      case 'cancelled': return '#721c24';
      default: return '#6c757d';
    }
  }};
`

const OrderItems = styled.div`
  margin-bottom: 2rem;
`

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 2rem;
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
`

const ItemMeta = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`

const ItemPrice = styled.div`
  text-align: right;
`

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`

const Quantity = styled.div`
  color: #666;
  font-size: 0.9rem;
`

const OrderStatus = styled.span<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch(props.$status) {
      case 'delivered': return '#28a745';
      case 'processing': return '#007bff';
      case 'shipped': return '#ffc107';
      case 'pending': return '#6c757d';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  }};
  color: white;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const OrderSummary = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    padding-top: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
  }
`

const AddressSection = styled.div`
  margin-bottom: 2rem;
`

const AddressCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`

const AddressType = styled.h4`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AddressDetails = styled.div`
  color: #666;
  line-height: 1.6;

  p {
    margin: 0.25rem 0;
  }

  strong {
    color: #333;
  }
`

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;
`

const TimelineItem = styled.div<{ $status?: 'completed' | 'current' | 'pending' }>`
  position: relative;
  padding-bottom: 2rem;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -1.5rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => {
      switch(props.$status) {
        case 'completed': return '#28a745';
        case 'current': return '#007bff';
        case 'pending': return '#6c757d';
        default: return '#6c757d';
      }
    }};
    border: 2px solid white;
    box-shadow: 0 0 0 2px ${props => {
      switch(props.$status) {
        case 'completed': return '#28a745';
        case 'current': return '#007bff';
        case 'pending': return '#6c757d';
        default: return '#6c757d';
      }
    }};
  }

  &::after {
    content: '';
    position: absolute;
    left: -1.05rem;
    top: 1.5rem;
    width: 2px;
    height: calc(100% - 1rem);
    background: #e9ecef;
  }

  &:last-child::after {
    display: none;
  }
`

const TimelineContent = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`

const ActionButton = styled.button`
  background: #00a652;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #008a45;
  }
`

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #666;
`

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
`

// Types
interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
}

interface Address {
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
}

interface OrderDetail {
  id: string
  orderNumber: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  subtotal: number
  shipping: number
  tax: number
  items: OrderItem[]
  createdAt: string
  shippingAddress: Address
  billingAddress: Address
  estimatedDelivery?: string
  trackingNumber?: string
}

interface TimelineEvent {
  status: 'completed' | 'current' | 'pending'
  title: string
  description: string
  date: any // Allow both string and Timestamp
}

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [order, setOrder] = useState<UserOrder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        setLoading(true)
        
        if (!currentUser || !orderId) {
          navigate('/dashboard')
          return
        }
        
        // Load order from Firebase
        const orderData = await UserService.getOrder(currentUser.uid, orderId)
        
        if (!orderData) {
          navigate('/dashboard')
          return
        }
        
        setOrder(orderData)
      } catch (error) {
        console.error('Error loading order details:', error)
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadOrderDetails()
  }, [currentUser, orderId, navigate])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅'
      case 'current': return '⏳'
      case 'pending': return '📦'
      default: return '📦'
    }
  }

  const getTimelineEvents = (orderStatus: string): TimelineEvent[] => {
    const baseEvents = [
      {
        status: 'completed' as const,
        title: 'Order Placed',
        description: 'Your order has been successfully placed',
        date: order?.createdAt || ''
      },
      {
        status: 'completed' as const,
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and is being processed',
        date: order?.createdAt || ''
      }
    ]

    if (orderStatus === 'processing') {
      return [
        ...baseEvents,
        {
          status: 'current' as const,
          title: 'Processing',
          description: 'Your order is being prepared for shipment',
          date: new Date().toISOString()
        }
      ]
    }

    if (orderStatus === 'shipped') {
      return [
        ...baseEvents,
        {
          status: 'completed' as const,
          title: 'Processing',
          description: 'Your order has been processed',
          date: order?.createdAt || ''
        },
        {
          status: 'current' as const,
          title: 'Shipped',
          description: 'Your order has been shipped and is on its way',
          date: new Date().toISOString()
        }
      ]
    }

    if (orderStatus === 'delivered') {
      return [
        ...baseEvents,
        {
          status: 'completed' as const,
          title: 'Processing',
          description: 'Your order has been processed',
          date: order?.createdAt || ''
        },
        {
          status: 'completed' as const,
          title: 'Shipped',
          description: 'Your order has been shipped',
          date: order?.createdAt || ''
        },
        {
          status: 'completed' as const,
          title: 'Delivered',
          description: 'Your order has been successfully delivered',
          date: new Date().toISOString()
        }
      ]
    }

    return baseEvents
  }

  const formatDate = (dateString: any) => {
    if (!dateString) return 'N/A'
    
    // Handle Firebase Timestamp
    if (dateString && typeof dateString === 'object' && dateString.toDate) {
      return dateString.toDate().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    // Handle string date
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download
    console.log('Download invoice for order:', order?.id)
  }

  const handleTrackOrder = () => {
    // TODO: Implement order tracking
    console.log('Track order:', order?.id)
  }

  if (loading) {
    return (
      <OrderDetailContainer>
        <LoadingSpinner>Loading order details...</LoadingSpinner>
      </OrderDetailContainer>
    )
  }

  if (!order) {
    return (
      <OrderDetailContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h3>Order not found</h3>
          <button onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Back to Dashboard
          </button>
        </div>
      </OrderDetailContainer>
    )
  }

  return (
    <OrderDetailContainer>
      <OrderHeader>
        <HeaderContent>
          <HeaderText>
            <h1>Order #{order.orderNumber}</h1>
            <p>Track your order status and details</p>
          </HeaderText>
          <BackButton onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </BackButton>
        </HeaderContent>
      </OrderHeader>

      <OrderGrid>
        <OrderCard>
          <CardTitle>Order Information</CardTitle>
          
          <OrderInfo>
            <InfoItem>
              <span><strong>Order Number:</strong></span>
              <span>{order.orderNumber}</span>
            </InfoItem>
            <InfoItem>
              <span><strong>Status:</strong></span>
              <OrderStatus $status={order.status}>
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </OrderStatus>
            </InfoItem>
            <InfoItem>
              <span><strong>Payment Status:</strong></span>
              <span>{order.paymentStatus || 'Pending'}</span>
            </InfoItem>
            <InfoItem>
              <span><strong>Order Date:</strong></span>
              <span>{formatDate(order.createdAt)}</span>
            </InfoItem>
          </OrderInfo>

          <CardTitle>Order Items</CardTitle>
          <OrderItems>
            {order.items.map(item => (
              <OrderItem key={item.id}>
                <ItemImage>
                  📦
                </ItemImage>
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemMeta>Quantity: {item.quantity}</ItemMeta>
                </ItemDetails>
                <ItemPrice>
                  <Price>{formatPrice(item.price)}</Price>
                  <Quantity>Qty: {item.quantity}</Quantity>
                </ItemPrice>
              </OrderItem>
            ))}
          </OrderItems>

          <OrderSummary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Tax</span>
              <span>{formatPrice(0)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>{formatPrice(0)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Total</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </SummaryRow>
          </OrderSummary>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <ActionButton onClick={handleDownloadInvoice}>
              📄 Download Invoice
            </ActionButton>
          </div>
        </OrderCard>

        <div>
          <OrderCard>
            <AddressSection>
              <CardTitle>Shipping Address</CardTitle>
              <AddressCard>
                <AddressDetails>
                  <p><strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong></p>
                  {order.shippingAddress.companyName && <p>{order.shippingAddress.companyName}</p>}
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                  <p>Email: {order.shippingAddress.email}</p>
                </AddressDetails>
              </AddressCard>
            </AddressSection>

            <AddressSection>
              <CardTitle>Billing Address</CardTitle>
              <AddressCard>
                <AddressDetails>
                  <p><strong>{order.billingAddress.firstName} {order.billingAddress.lastName}</strong></p>
                  {order.billingAddress.companyName && <p>{order.billingAddress.companyName}</p>}
                  <p>{order.billingAddress.address}</p>
                  <p>{order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}</p>
                  <p>{order.billingAddress.country}</p>
                  <p>Phone: {order.billingAddress.phone}</p>
                  <p>Email: {order.billingAddress.email}</p>
                </AddressDetails>
              </AddressCard>
            </AddressSection>
          </OrderCard>

          <OrderCard>
            <CardTitle>Order Timeline</CardTitle>
            <Timeline>
              {getTimelineEvents(order.status).map((event, index) => (
                <TimelineItem key={index} $status={event.status}>
                  <TimelineContent>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <p>{formatDate(event.date)}</p>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </OrderCard>
        </div>
      </OrderGrid>
    </OrderDetailContainer>
  )
}

export default OrderDetailPage
