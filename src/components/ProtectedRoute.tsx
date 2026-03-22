import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    const returnUrl = encodeURIComponent(window.location.pathname)
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
