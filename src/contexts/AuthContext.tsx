import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest } from '@/lib/api'

export type User = {
  id: string
  name: string
  email: string
  avatar_url?: string
  title?: string
  company?: string
  bio?: string
  phone?: string
  location?: string
  timezone?: string
}

interface AuthContextType {
  user: User | null 
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await apiRequest('/user/profile')
        setUser(userData)
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    const token = localStorage.getItem('token')
    if (token) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
      }
      if (data.user) {
        setUser(data.user)
      }
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const data = await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name })
      })
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
      }
      if (data.user) {
        setUser(data.user)
      }
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' })
      localStorage.removeItem('token')
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user?.id) throw new Error('No user found')

      const updatedUser = await apiRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(updates)
      })
      setUser(updatedUser)
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}