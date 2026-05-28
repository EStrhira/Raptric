import React from 'react'

// Temporarily disabled due to @react-oauth/google module resolution issues
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const GoogleAuthDebug: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', margin: '20px' }}>
      <h2>Google OAuth Debug</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Configuration:</h3>
        <p>Client ID: {process.env.REACT_APP_GOOGLE_CLIENT_ID || 'Not set in environment'}</p>
        <p>Current Origin: {window.location.origin}</p>
      </div>

      <div style={{ padding: '20px', background: '#ff6b6b', borderRadius: '8px', textAlign: 'center' }}>
        <h3>Google OAuth Temporarily Disabled</h3>
        <p>Google OAuth integration is temporarily disabled due to module resolution issues.</p>
        <p>Please check back later or contact development team.</p>
      </div>

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
