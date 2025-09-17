import React from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

export const UploadsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-white">Uploads</h1>
        <p className="mt-2 text-sm text-white/60">Manage your uploaded financial documents here.</p>
      </div>
    </DashboardLayout>
  )
}