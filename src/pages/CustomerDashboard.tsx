import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import UserService, { UserAddress, UserOrder } from '../firebase/userService'

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
  }
`

const DashboardHeader = styled.div`
  background: linear-gradient(135deg, #00a652, #008a45);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const WelcomeText = styled.div`
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

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`

const Sidebar = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  height: fit-content;

  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`

const SidebarTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #ffffff;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const MenuItem = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#00a652' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#008a45' : '#333'};
  }

  svg {
    font-size: 1.1rem;
  }
`

const MainContent = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #333;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
  }
`

const ContentTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`

const AddButton = styled.button`
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
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
`

const AddressCard = styled.div`
border: 1px solid #444;
border-radius: 8px;
padding: 1.5rem;
margin-bottom: 1rem;
position: relative;
background: #1a1a1a;
transition: box-shadow 0.3s ease;

&:hover {
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
padding: 1rem;
margin-bottom: 0.75rem;
}

@media (max-width: 480px) {
padding: 0.75rem;
margin-bottom: 0.5rem;
}
`

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`

const AddressType = styled.span<{ $type: string }>`
  background: ${props => props.$type === 'billing' ? '#007bff' : '#28a745'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`

const AddressActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: ${props => props.$variant === 'delete' ? '#dc3545' : '#007bff'};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$variant === 'delete' ? '#c82333' : '#0056b3'};
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`

const AddressDetails = styled.div`
  color: #cccccc;
  line-height: 1.6;

  p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
  }

  strong {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 0.85rem;
    }
  }
`

const OrderCard = styled.div`
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #1a1a1a;
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
  }
`

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`

const OrderNumber = styled.span`
  font-weight: 600;
  color: #ffffff;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
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

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`

const OrderDetail = styled.div`
  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }

  strong {
    color: #333;
  }
`

const OrderItems = styled.div`
  margin-bottom: 1rem;
`

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;

  &:last-child {
    border-bottom: none;
  }
`

const ItemName = styled.span`
  color: #333;
  font-weight: 500;
`

const ItemPrice = styled.span`
  color: #666;
`

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
  font-weight: 600;
  font-size: 1.1rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ccc;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0;
  }
`

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #666;
`

// Types
interface Address {
  id: string
  type: 'billing' | 'shipping'
  companyName?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  country: string
  gst?: string
  isDefault?: boolean
  createdAt: any
  updatedAt: any
}

interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  items: any[]
  billingAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
  shippingAddress: Omit<Address, 'id' | 'createdAt' | 'updatedAt'>
  paymentStatus: 'pending' | 'completed' | 'failed'
  createdAt: any
  updatedAt: any
}

// Main Dashboard Component
const CustomerDashboard: React.FC = () => {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'addresses' | 'orders'>('addresses')
  const [addresses, setAddresses] = useState<Address[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - In production, this would come from your API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        
        if (!currentUser) return
        
        // Load addresses from Firebase
        const userAddresses = await UserService.getAddresses(currentUser.uid)
        
        // Load orders from Firebase
        const userOrders = await UserService.getOrders(currentUser.uid)
        
        // Convert Firebase timestamps to strings for display
        const formattedAddresses = userAddresses.map(addr => ({
          ...addr,
          createdAt: addr.createdAt?.toDate ? addr.createdAt.toDate().toISOString() : '',
          updatedAt: addr.updatedAt?.toDate() ? addr.updatedAt.toDate().toISOString() : ''
        }))
        
        const formattedOrders = userOrders.map(order => ({
          ...order,
          createdAt: order.createdAt?.toDate() ? order.createdAt.toDate().toISOString() : '',
          updatedAt: order.updatedAt?.toDate() ? order.updatedAt.toDate().toISOString() : '',
          items: order.items || []
        }))
        
        setAddresses(formattedAddresses)
        setOrders(formattedOrders)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [currentUser])

  const handleEditAddress = (addressId: string) => {
    navigate(`/address/edit/${addressId}`)
  }

  const handleDeleteAddress = async (addressId: string) => {
    try {
      if (!currentUser) return
      
      await UserService.deleteAddress(currentUser.uid, addressId)
      
      // Update local state
      setAddresses(prev => prev.filter(addr => addr.id !== addressId))
    } catch (error) {
      console.error('Error deleting address:', error)
    }
  }

  const handleAddAddress = () => {
    navigate('/address/add')
  }

  const handleViewOrder = (orderId: string) => {
    navigate(`/order/${orderId}`)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅'
      case 'cancelled': return '❌'
      case 'processing': return '⏳'
      case 'shipped': return '🚚'
      default: return '📦'
    }
  }

  if (!currentUser) {
    navigate('/login')
    return null
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <WelcomeSection>
          <WelcomeText>
            <h1>Welcome, {currentUser.displayName || currentUser.email}!</h1>
            <p>Manage your addresses and track your orders</p>
          </WelcomeText>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <UserAvatar>
              👤
            </UserAvatar>
            <LogoutButton onClick={handleLogout}>
              🚪 Logout
            </LogoutButton>
          </div>
        </WelcomeSection>
      </DashboardHeader>

      <DashboardGrid>
        <Sidebar>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarMenu>
            <MenuItem 
              $active={activeTab === 'addresses'} 
              onClick={() => setActiveTab('addresses')}
            >
              📍 My Addresses
            </MenuItem>
            <MenuItem 
              $active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')}
            >
              🛒 My Orders
            </MenuItem>
          </SidebarMenu>
        </Sidebar>

        <MainContent>
          {activeTab === 'addresses' && (
            <>
              <ContentHeader>
                <ContentTitle>My Addresses</ContentTitle>
                <AddButton onClick={handleAddAddress}>
                  ➕ Add Address
                </AddButton>
              </ContentHeader>

              {loading ? (
                <LoadingSpinner>Loading addresses...</LoadingSpinner>
              ) : addresses.length === 0 ? (
                <EmptyState>
                  📍
                  <h3>No addresses found</h3>
                  <p>Add your first address to get started</p>
                </EmptyState>
              ) : (
                addresses.map(address => (
                  <AddressCard key={address.id}>
                    <AddressHeader>
                      <AddressType $type={address.type}>
                        {address.type === 'billing' ? 'Billing' : 'Shipping'} Address
                        {address.isDefault && ' (Default)'}
                      </AddressType>
                      <AddressActions>
                        <ActionButton $variant="edit" onClick={() => handleEditAddress(address.id)}>
                          ✏️
                        </ActionButton>
                        <ActionButton $variant="delete" onClick={() => handleDeleteAddress(address.id)}>
                          🗑️
                        </ActionButton>
                      </AddressActions>
                    </AddressHeader>
                    <AddressDetails>
                      <p><strong>{address.firstName} {address.lastName}</strong></p>
                      {address.companyName && <p>{address.companyName}</p>}
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      <p>{address.country}</p>
                      <p>Phone: {address.phone}</p>
                      <p>Email: {address.email}</p>
                    </AddressDetails>
                  </AddressCard>
                ))
              )}
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <ContentHeader>
                <ContentTitle>My Orders</ContentTitle>
              </ContentHeader>

              {loading ? (
                <LoadingSpinner>Loading orders...</LoadingSpinner>
              ) : orders.length === 0 ? (
                <EmptyState>
                  📦
                  <h3>No orders found</h3>
                  <p>You haven't placed any orders yet</p>
                </EmptyState>
              ) : (
                orders.map(order => (
                  <OrderCard key={order.id} onClick={() => handleViewOrder(order.id)}>
                    <OrderHeader>
                      <OrderNumber>Order #{order.orderNumber}</OrderNumber>
                      <OrderStatus $status={order.status}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </OrderStatus>
                    </OrderHeader>
                    <OrderDetails>
                      <OrderDetail>
                        <p><strong>Date:</strong></p>
                        <p>{formatDate(order.createdAt)}</p>
                      </OrderDetail>
                      <OrderDetail>
                        <p><strong>Status:</strong></p>
                        <OrderStatus $status={order.status}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </OrderStatus>
                      </OrderDetail>
                      <OrderDetail>
                        <p><strong>Payment:</strong></p>
                        <p>Paid</p>
                      </OrderDetail>
                    </OrderDetails>
                    <OrderItems>
                      {order.items.map(item => (
                        <OrderItem key={item.id}>
                          <ItemName>{item.name} × {item.quantity}</ItemName>
                          <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                        </OrderItem>
                      ))}
                    </OrderItems>
                    <OrderTotal>
                      <span>Total Amount:</span>
                      <span>{formatPrice(order.totalAmount)}</span>
                    </OrderTotal>
                  </OrderCard>
                ))
              )}
            </>
          )}
        </MainContent>
      </DashboardGrid>
    </DashboardContainer>
  )
}

export default CustomerDashboard
