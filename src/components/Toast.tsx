import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div<{ show: boolean; type: 'success' | 'error' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  opacity: ${props => props.show ? 1 : 0};
  transform: translateX(${props => props.show ? '0' : '100%'});
  transition: all 0.3s ease;
  background: ${props => props.type === 'success' ? '#00a652' : '#dc3545'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer show={show} type={type}>
      {type === 'success' ? '✅' : '❌'} {message}
    </ToastContainer>
  );
};

export default Toast;
