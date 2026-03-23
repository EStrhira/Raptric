import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { useAuth } from '../context/AuthContext'
import LoginButton from '../components/LoginButton'
import { Timestamp } from 'firebase/firestore'

const UserAccountSection = styled.section`
  padding: 0;
  background: #000000;
`

const BannerSection = styled.div`
  background: linear-gradient(135deg, #00a652, #008040);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/Banner3.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`

const BannerContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
`

const AccountContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const ProfileAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00a652;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

const ProfileEmail = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`

const ContentTitle = styled.h2`
  color: #00a652;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const TabButton = styled.button<{ active: boolean }>`
  background: transparent;
  color: ${props => props.active ? '#00a652' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 1rem 2rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#00a652' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: #00a652;
  }
`

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OrderCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
`

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const OrderNumber = styled.div`
  color: #00a652;
  font-weight: 600;
`

const OrderStatus = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'pending': return 'rgba(255, 193, 7, 0.2)';
      case 'processing': return 'rgba(0, 166, 82, 0.2)';
      case 'shipped': return 'rgba(33, 150, 243, 0.2)';
      case 'delivered': return 'rgba(76, 175, 80, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#00a652';
      case 'shipped': return '#2196f3';
      case 'delivered': return '#4caf50';
      default: return '#ffffff';
    }
  }};
`

const OrderDetails = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
`

const OrderTotal = styled.div`
  color: #00a652;
  font-weight: 600;
  margin-top: 1rem;
`

const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const AddressCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
`

const AddressType = styled.div`
  color: #00a652;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const AddressText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-line;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
`

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`

const SignOutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #c82333;
  }
`

const UserAccount: React.FC = () => {
  useScrollToTop()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { currentUser, userProfile, userAddresses, userOrders, signOut, loading } = useAuth()
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders')

  const returnUrl = searchParams.get('returnUrl') || '/account'

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login')
    }
  }, [currentUser, loading, navigate])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <UserAccountSection>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div>Loading...</div>
        </div>
      </UserAccountSection>
    )
  }

  if (!currentUser || !userProfile) {
    return (
      <UserAccountSection>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <LoginButton />
        </div>
      </UserAccountSection>
    )
  }

  return (
    <UserAccountSection>
      <BannerSection>
        <BannerContent>
          <BannerTitle>My Account</BannerTitle>
          <BannerSubtitle>Manage your profile, orders, and addresses</BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <AccountContainer>
        <AccountGrid>
          <ProfileCard>
            <ProfileHeader>
              <ProfileAvatar 
                src={userProfile.photoURL || '/favicon.ico'} 
                alt={userProfile.displayName || 'User'} 
              />
              <ProfileInfo>
                <ProfileName>{userProfile.displayName || 'User'}</ProfileName>
                <ProfileEmail>{userProfile.email}</ProfileEmail>
              </ProfileInfo>
            </ProfileHeader>

            <SignOutButton onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </SignOutButton>
          </ProfileCard>

          <div>
            <ContentCard>
              <TabContainer>
                <TabButton 
                  active={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                >
                  Orders ({userOrders.length})
                </TabButton>
                <TabButton 
                  active={activeTab === 'addresses'}
                  onClick={() => setActiveTab('addresses')}
                >
                  Addresses ({userAddresses.length})
                </TabButton>
              </TabContainer>

              {activeTab === 'orders' && (
                <>
                  {userOrders.length === 0 ? (
                    <EmptyState>
                      <EmptyIcon>
                        <i className="fas fa-shopping-bag"></i>
                      </EmptyIcon>
                      <h3>No orders yet</h3>
                      <p>When you place orders, they will appear here</p>
                    </EmptyState>
                  ) : (
                    <OrderList>
                      {userOrders.map((order) => (
                        <OrderCard key={order.id}>
                          <OrderHeader>
                            <OrderNumber>#{order.orderNumber}</OrderNumber>
                            <OrderStatus status={order.status}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </OrderStatus>
                          </OrderHeader>
                          <OrderDetails>
                            <div><strong>Date:</strong> {new Date(order.createdAt.toDate()).toLocaleDateString()}</div>
                            <div><strong>Items:</strong> {order.items.length}</div>
                            <div><strong>Payment:</strong> {order.paymentStatus}</div>
                          </OrderDetails>
                          <OrderTotal>Total: ₹{order.totalAmount.toFixed(2)}</OrderTotal>
                        </OrderCard>
                      ))}
                    </OrderList>
                  )}
                </>
              )}

              {activeTab === 'addresses' && (
                <>
                  {userAddresses.length === 0 ? (
                    <EmptyState>
                      <EmptyIcon>
                        <i className="fas fa-map-marker-alt"></i>
                      </EmptyIcon>
                      <h3>No addresses saved</h3>
                      <p>Add addresses during checkout for faster ordering</p>
                    </EmptyState>
                  ) : (
                    <AddressList>
                      {userAddresses.map((address) => (
                        <AddressCard key={address.id}>
                          <AddressType>
                            {address.type === 'billing' ? 'Billing' : 'Shipping'} Address
                            {address.isDefault && ' (Default)'}
                          </AddressType>
                          <AddressText>
                            {address.companyName && `${address.companyName}\n`}
                            {address.firstName} {address.lastName}\n
                            {address.address}\n
                            {address.city}, {address.state} {address.pincode}\n
                            {address.country}\n
                            {address.phone && `Phone: ${address.phone}\n`}
                            {address.gst && `GST: ${address.gst}`}
                          </AddressText>
                        </AddressCard>
                      ))}
                    </AddressList>
                  )}
                </>
              )}
            </ContentCard>
          </div>
        </AccountGrid>
      </AccountContainer>
    </UserAccountSection>
  )
}

export default UserAccount
