import React from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="mt-2 text-sm text-white/60">Configure your account and application settings.</p>
      </div>
    </DashboardLayout>
  )
}