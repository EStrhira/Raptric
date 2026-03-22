import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const GoogleAuthDebug: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', margin: '20px' }}>
      <h2>Google OAuth Debug</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Configuration:</h3>
        <p>Client ID: {process.env.REACT_APP_GOOGLE_CLIENT_ID || 'Not set in environment'}</p>
        <p>Current Origin: {window.location.origin}</p>
      </div>

      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || "test-client-id"}>
        <div>
          <h3>Test Google Login:</h3>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log('Google Login Success:', credentialResponse)
              alert('Google Login Success! Check console for details.')
            }}
            onError={() => {
              console.error('Google Login Error')
              alert('Google Login Error: Check console for details')
            }}
            text="signin_with"
            theme="filled_black"
            size="large"
            width="300"
          />
        </div>
      </GoogleOAuthProvider>

      <div style={{ marginTop: '20px', fontSize: '14px', opacity: '0.7' }}>
        <h4>Debugging Steps:</h4>
        <ol>
          <li>Check if Client ID is set correctly</li>
          <li>Verify Google Cloud Console configuration</li>
          <li>Ensure APIs are enabled</li>
          <li>Check browser console for detailed errors</li>
        </ol>
      </div>
    </div>
  )
}

export default GoogleAuthDebug
