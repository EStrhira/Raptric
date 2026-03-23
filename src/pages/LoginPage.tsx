import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useAuth } from '../context/AuthContext';
import EmailAuthService from '../firebase/emailAuth';

const LoginSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(0, 166, 82, 0.1) 0%, rgba(0, 128, 64, 0.1) 100%);
  border-radius: 20px;
  border: 2px solid rgba(0, 166, 82, 0.3);
  text-align: center;
`;

const LoginIcon = styled.div`
  font-size: 4rem;
  color: #00a652;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LoginSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #cccccc;
  line-height: 1.6;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TabButton = styled.button<{ active: boolean }>`
  background: transparent;
  color: ${props => props.active ? '#00a652' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  padding: 1rem 2rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#00a652' : 'transparent'};
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    color: #00a652;
  }
`;

const FormContainer = styled.div`
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  background: #00a652;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const GoogleButton = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: 100%;

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }

  span {
    padding: 0 1rem;
  }
`;

const BackButton = styled(Link)`
  background: transparent;
  color: #00a652;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #00a652;
  transition: all 0.3s ease;

  &:hover {
    background: #00a652;
    color: #ffffff;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 76, 76, 0.1);
  border: 1px solid rgba(255, 76, 76, 0.3);
  color: #ff4c4c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  color: #00a652;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ForgotPasswordLink = styled(Link)`
  color: #00a652;
  text-decoration: none;
  font-size: 0.9rem;
  display: block;
  text-align: right;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, signInWithGoogle, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Get return URL from query params
  const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/account';

  // Scroll to top when page loads
  useScrollToTop();

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser && userProfile) {
      navigate(returnUrl);
    }
  }, [currentUser, userProfile, navigate, returnUrl]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await EmailAuthService.signInWithEmail(email, password);
      setSuccess('Successfully signed in!');
      // Navigation will be handled by useEffect
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      const passwordValidation = EmailAuthService.validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      await EmailAuthService.createAccountWithEmail(email, password, displayName);
      setSuccess('Account created successfully!');
      // Navigation will be handled by useEffect
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setSuccess('Signing in...');
      await signInWithGoogle();
      setSuccess('Successfully signed in!');
      // Navigation will be handled by useEffect
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google. Please try again.');
      setSuccess('');
    }
  };

  const handleForgotPassword = async () => {
    if (!EmailAuthService.validateEmail(email)) {
      setError('Please enter a valid email address first.');
      return;
    }

    try {
      await EmailAuthService.resetPassword(email);
      setSuccess('Password reset email sent! Please check your inbox.');
      setError('');
    } catch (error: any) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <LoginSection>
      <LoginContainer>
        <LoginIcon>
          <i className="fas fa-user-circle"></i>
        </LoginIcon>
        
        <LoginTitle>Welcome to eSthira</LoginTitle>
        
        <LoginSubtitle>
          Sign in to access your account, track orders, and manage your profile
        </LoginSubtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <TabContainer>
          <TabButton 
            active={activeTab === 'signin'}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </TabButton>
          <TabButton 
            active={activeTab === 'signup'}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </TabButton>
        </TabContainer>

        <FormContainer>
          {activeTab === 'signin' ? (
            <form onSubmit={handleEmailSignIn}>
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </SubmitButton>

              <ForgotPasswordLink to="#" onClick={handleForgotPassword}>
                Forgot your password?
              </ForgotPasswordLink>
            </form>
          ) : (
            <form onSubmit={handleEmailSignUp}>
              <FormGroup>
                <FormLabel>Full Name</FormLabel>
                <FormInput
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <FormInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 chars)"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </SubmitButton>
            </form>
          )}
        </FormContainer>

        <Divider>
          <span>OR</span>
        </Divider>

        <GoogleButton onClick={handleGoogleSignIn} disabled={loading}>
          <i className="fab fa-google"></i>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </GoogleButton>

        <BackButton to="/">
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </BackButton>
      </LoginContainer>
    </LoginSection>
  );
};

export default LoginPage;
