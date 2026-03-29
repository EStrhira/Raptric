import React from 'react';
import styled from 'styled-components';

interface FirebaseStatusProps {
  isConfigured: boolean;
}

const FirebaseWarning = styled.div`
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin: 2rem 0;
  text-align: center;
  border: 2px solid #ff5252;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
`;

const WarningTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const WarningText = styled.p`
  margin: 0.5rem 0;
  line-height: 1.5;
`;

const CodeBlock = styled.code`
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const FirebaseStatus: React.FC<FirebaseStatusProps> = ({ isConfigured }) => {
  if (isConfigured) {
    return null;
  }

  return (
    <FirebaseWarning>
      <WarningTitle>🔥 Firebase Not Configured</WarningTitle>
      <WarningText>
        Authentication features are disabled because Firebase is not properly configured.
      </WarningText>
      <WarningText>
        To fix this issue:
      </WarningText>
      <WarningText>
        1. Create a <CodeBlock>.env</CodeBlock> file in your project root
      </WarningText>
      <WarningText>
        2. Add your Firebase credentials from the Firebase Console
      </WarningText>
      <WarningText>
        3. Restart your development server
      </WarningText>
      <WarningText>
        See <CodeBlock>.env.example</CodeBlock> for required variables.
      </WarningText>
    </FirebaseWarning>
  );
};

export default FirebaseStatus;
