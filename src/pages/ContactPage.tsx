import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';
import { Container, SectionTitle } from '../styles/GlobalStyles';

const ContactSection = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`;

const Contact: React.FC = () => {
  const handleContactSuccess = () => {
    // You can show a toast notification here
    alert('Thank you for your message! We will get back to you soon.');
  };

  const handleContactError = (error: string) => {
    // You can show an error toast here
    alert(`Error: ${error}`);
  };

  return (
    <ContactSection>
      <Container>
        <SectionTitle>Contact Us</SectionTitle>
        <ContactForm 
          onSuccess={handleContactSuccess}
          onError={handleContactError}
        />
      </Container>
    </ContactSection>
  );
};

export default Contact;
