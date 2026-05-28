import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useOrderEmail } from '../hooks/useEmail';
import { useParams } from 'react-router-dom';

const OrderSuccessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams();
  const { sendOrderConfirmation, loading, error, success } = useOrderEmail();

  useEffect(() => {
    // This would typically come from your order state or API
    const mockOrderData = {
      orderId: orderId || 'ORD-123456',
      userEmail: 'customer@example.com',
      userName: 'John Doe',
      orderItems: [
        {
          name: 'RAPTRIC Electric Bike',
          quantity: 1,
          price: 45000,
          image: '/bike-image.jpg'
        }
      ],
      totalAmount: 45000,
      shippingAddress: {
        street: '123 Main St',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India'
      },
      estimatedDelivery: '5-7 business days',
      paymentMethod: 'Credit Card'
    };

    // Send order confirmation email
    if (orderId && !loading && !success && !error) {
      sendOrderConfirmation(mockOrderData);
    }
  }, [orderId, sendOrderConfirmation, loading, success, error]);

  return (
    <OrderSuccessContainer>
      <h1>Order Successful!</h1>
      <p>Thank you for your order. We've sent a confirmation to your email.</p>
      
      {loading && <p>Sending confirmation email...</p>}
      {success && <p>✅ Order confirmation email sent!</p>}
      {error && <p>⚠️ {error}</p>}
      
      <p>Order ID: {orderId}</p>
    </OrderSuccessContainer>
  );
};

export default OrderSuccess;
