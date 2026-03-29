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
  background: #ffffff;
  color: #3c4043;
  border: 1px solid #dadce0;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background: #f8f9fa;
    border-color: #dadce0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #f8f9fa;
    color: #5f6368;
    cursor: not-allowed;
  }
`;

const GoogleLogo = styled.svg`
  width: 18px;
  height: 18px;
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
  const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';

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
      setSuccess('Successfully signed in! Redirecting to home page...');
      // Navigation will be handled by useEffect
    } catch (error: any) {
      // Handle specific Firebase errors with user-friendly messages
      if (error.message && error.message.includes('auth/invalid-credential')) {
        setError('This email is not registered. Please sign up or continue with Google.');
      } else if (error.message && error.message.includes('auth/user-not-found')) {
        setError('This email is not registered. Please sign up or continue with Google.');
      } else if (error.message && error.message.includes('auth/wrong-password')) {
        setError('Incorrect password. Please try again or reset your password.');
      } else if (error.message && error.message.includes('auth/too-many-requests')) {
        setError('Too many failed attempts. Please try again later or reset your password.');
      } else {
        setError(error.message || 'Failed to sign in. Please try again.');
      }
      setSuccess('');
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
      setSuccess('Account created successfully! Redirecting to home page...');
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
      setSuccess('Successfully signed in! Redirecting to home page...');
      // Navigation will be handled by useEffect
    } catch (error: any) {
      // Ignore "Pop-up closed by user" error and "Firebase: Error (auth/popup-closed-by-user)"
      if (error.message && (
        error.message.includes('Pop-up closed by user') || 
        error.message.includes('auth/popup-closed-by-user')
      )) {
        // Silently ignore this error - don't show any error message
        setSuccess('');
        return;
      }
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
          <GoogleLogo viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </GoogleLogo>
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
