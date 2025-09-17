import React from 'react'
import ReactDOM from 'react-dom/client'
import { Landing } from './pages/Landing'
import { Auth } from './pages/Auth'
import { AuthProvider } from '@/contexts/AuthContext'
import { Dashboard } from './pages/Dashboard'
import { UploadsPage } from './pages/UploadsPage'
import { InsightsPage } from './pages/InsightsPage'
import { SettingsPage } from './pages/SettingsPage'
import { Profile } from './pages/Profile'
import { About } from './pages/About'
import { LearnMore } from './pages/LearnMore'
import { ToastProvider } from '@/contexts/ToastContext'
import { PrivateRoute } from '@/components/auth/PrivateRoute'
import { ChatbotButton } from '@/components/ChatbotButton'
import './index.css'

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PrivateRoute>
      {children}
      <ChatbotButton />
    </PrivateRoute>
  )
}

const Router: React.FC = () => {
	const path = window.location.pathname
	
	// Public routes
	if (path.startsWith('/auth')) return <Auth />
	if (path === '/about') return <About />
	if (path === '/learn-more') return <LearnMore />
	if (path === '/') return <Landing />
	
	// Protected routes
	if (path === '/dashboard') return <ProtectedPage><Dashboard /></ProtectedPage>
	if (path === '/dashboard/uploads') return <ProtectedPage><UploadsPage /></ProtectedPage>
	if (path === '/dashboard/insights') return <ProtectedPage><InsightsPage /></ProtectedPage>
	if (path === '/dashboard/settings') return <ProtectedPage><SettingsPage /></ProtectedPage>
	if (path === '/dashboard/profile') return <ProtectedPage><Profile /></ProtectedPage>
	if (path.startsWith('/dashboard')) return <ProtectedPage><Dashboard /></ProtectedPage>
	
	// Default to landing for unknown routes
	return <Landing />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<ToastProvider>
				<Router />
			</ToastProvider>
		</AuthProvider>
	</React.StrictMode>
)


