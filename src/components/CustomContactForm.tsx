import React, { useState } from 'react';
import styled from 'styled-components';
import { useContactForm } from '../hooks/useCustomEmail';

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled ? '#ccc' : '#00a652'};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#008040'};
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface CustomContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const CustomContactForm: React.FC<CustomContactFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { submitContactForm, loading, error, success, reset } = useContactForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    await submitContactForm(formData);

    if (success) {
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      onSuccess?.();
    } else if (error) {
      onError?.(error);
    }
  };

  if (success) {
    return (
      <ContactContainer>
        <SuccessMessage>
          <h3>Thank you for your message!</h3>
          <p>We've received your inquiry and will get back to you within 24 hours.</p>
          <button 
            onClick={reset}
            style={{
              background: '#00a652',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Send Another Message
          </button>
        </SuccessMessage>
      </ContactContainer>
    );
  }

  return (
    <ContactContainer>
      <h2>Get in Touch</h2>
      <p>Have questions about our electric bikes? We'd love to hear from you!</p>
      
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Subject (Optional)</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message *</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Tell us about your interest in electric bikes..."
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </Form>
    </ContactContainer>
  );
};

export default CustomContactForm;
