import React, { useState } from 'react'
import { Menu, X, LayoutDashboard, Upload, Lightbulb, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/auth'
import { LogoutModal } from './LogoutModal'

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Upload, label: 'Uploads', href: '/dashboard/uploads' },
  { icon: Lightbulb, label: 'Insights', href: '/dashboard/insights' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 bg-black/95 backdrop-blur",
        "transition-all duration-300 lg:relative",
        collapsed ? "-translate-x-full lg:translate-x-0 w-16" : "translate-x-0 w-64"
      )}>
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black text-white/80 z-50"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>

        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          <div className={cn(
            "text-xl font-bold tracking-tight text-white transition-all",
            collapsed ? "w-8" : "w-full"
          )}>
            {collapsed ? "M" : "Medi"}<span className="text-primary">AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-colors",
                "hover:bg-white/5 hover:text-white",
                "active:bg-primary/10 active:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-white/10 p-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-white/70",
              "hover:bg-red-500/10 hover:text-red-500"
            )}
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && "Log Out"}
          </Button>
        </div>

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            logout();
            setShowLogoutModal(false);
          }}
        />
      </aside>
    </>
  )
}