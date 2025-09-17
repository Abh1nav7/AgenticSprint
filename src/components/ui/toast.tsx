"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success',
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'error':
        return <X className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case 'info':
        return <Info className="h-5 w-5 text-primary" />
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed left-1/2 top-6 z-50 -translate-x-1/2 transform"
        >
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/90 px-4 py-3 text-sm text-white backdrop-blur">
            {getIcon()}
            {message}
            <button
              onClick={() => {
                setIsVisible(false)
                onClose?.()
              }}
              className="ml-2 rounded-md p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}