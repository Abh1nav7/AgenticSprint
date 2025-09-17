import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-lg border border-white/10 bg-black/90 p-6 shadow-lg"
      >
        <h2 className="mb-4 text-xl font-semibold text-white">Confirm Logout</h2>
        <p className="mb-6 text-white/70">Are you sure you want to log out? You will need to sign in again to access your account.</p>
        
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            className="hover:bg-white/5"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={onConfirm}
          >
            Log Out
          </Button>
        </div>
      </motion.div>
    </div>
  )
}