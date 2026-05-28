import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoginButton = styled.button<{ $isOpen?: boolean }>`
  background: ${props => props.$isOpen ? '#357ae8' : '#4285f4'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #357ae8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const DropdownMenu = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: #333333;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 166, 82, 0.1);
    color: #00a652;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #333333;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 166, 82, 0.1);
    color: #00a652;
  }
`;

const GoogleOption = styled(DropdownButton)`
  color: #4285f4;
`;

const EmailOption = styled(DropdownButton)`
  color: #00a652;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserEmail = styled.span`
  color: #ffffff;
  font-size: 0.9rem;
  margin-right: 1rem;
`;

const SignOutButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    color: #000000;
  }
`;

const LoginButtonComponent: React.FC = () => {
  const { currentUser, userProfile, signInWithGoogle, signInWithEmail, signOut, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsDropdownOpen(false);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailSignIn = () => {
    setIsDropdownOpen(false);
    // Navigate to login page for email authentication
    window.location.href = '/login';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <LoginButtonContainer>
        <LoginButton disabled>
          <i className="fas fa-spinner fa-spin"></i>
          Loading...
        </LoginButton>
      </LoginButtonContainer>
    );
  }

  if (currentUser && userProfile) {
    return (
      <LoginButtonContainer>
        {userProfile.photoURL && (
          <UserAvatar src={userProfile.photoURL} alt={userProfile.displayName || 'User'} />
        )}
        <UserEmail>{userProfile.email}</UserEmail>
        <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
      </LoginButtonContainer>
    );
  }

  return (
    <LoginButtonContainer>
      <LoginButton 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        $isOpen={isDropdownOpen}
      >
        <i className="fas fa-user-circle"></i>
        Account
        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
      </LoginButton>
      
      <DropdownMenu ref={dropdownRef} $isOpen={isDropdownOpen}>
        <DropdownItem>
          <GoogleOption onClick={handleGoogleSignIn}>
            <i className="fab fa-google"></i>
            Continue with Google
          </GoogleOption>
        </DropdownItem>
        <DropdownItem>
          <EmailOption onClick={handleEmailSignIn}>
            <i className="fas fa-envelope"></i>
            Email & Password
          </EmailOption>
        </DropdownItem>
        <DropdownItem>
          <DropdownLink to="/login">
            <i className="fas fa-user-plus"></i>
            Create Account
          </DropdownLink>
        </DropdownItem>
      </DropdownMenu>
    </LoginButtonContainer>
  );
};

export default LoginButtonComponent;
