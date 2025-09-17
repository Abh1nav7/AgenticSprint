import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const { show: showToast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      showToast('Please sign in to access this page', 'error')
      window.location.href = '/auth'
    }
  }, [user, loading, showToast])

  // Show nothing while checking authentication
  if (loading) {
    return null
  }

  // Only render children if user is authenticated
  return user ? <>{children}</> : null
}