import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar - hidden on mobile */}
      <div className={cn(
        "fixed inset-y-0 z-50 transition-transform duration-200 lg:relative lg:transform-none",
        sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
      )}>
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar sidebarCollapsed={sidebarCollapsed} onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className={cn(
          "flex-1 overflow-y-auto p-3 sm:p-4 md:p-6",
          "bg-gradient-to-b from-background/10 to-background"
        )}>
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}