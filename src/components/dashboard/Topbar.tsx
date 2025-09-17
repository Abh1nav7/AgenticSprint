import React, { useState, useRef, useEffect } from 'react'
import { Menu, Bell, User, LogOut, UserCircle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { UserProfile } from '@/types/user'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'

interface TopbarProps {
  sidebarCollapsed: boolean
  onMenuClick: () => void
  onLogout?: () => void
}

export const Topbar: React.FC<TopbarProps> = ({ sidebarCollapsed, onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await fetch(`${API_URL}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!res.ok) throw new Error('Failed to fetch profile')
        
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        console.error('Failed to load profile:', err)
      }
    }

    fetchProfile()
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black/50 px-6 backdrop-blur">
      {/* Left section - Mobile menu */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Title - Only show on mobile when sidebar is collapsed */}
      <div className="lg:hidden">
        {sidebarCollapsed && (
          <div className="text-xl font-bold tracking-tight text-white">
            CFO<span className="text-primary">Assistant</span>
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        
        <div className="relative" ref={menuRef}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-white/70 hover:text-white"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {profile?.avatarUrl ? (
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name}
                  className="h-full w-full object-cover" 
                />
              </div>
            ) : (
              <UserCircle className="h-6 w-6" />
            )}
          </Button>
          
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-black/90 py-1 backdrop-blur"
              >
                {profile && (
                  <div className="border-b border-white/10 px-4 py-2">
                    <div className="text-sm font-medium text-white">{profile.name}</div>
                    <div className="text-xs text-white/70">{profile.email}</div>
                  </div>
                )}
                <div className="py-2">
                  <a 
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                    Profile Settings
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}