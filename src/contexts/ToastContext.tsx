import React, { createContext, useContext, useState, useCallback } from 'react'
import { Toast } from '@/components/ui/toast'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastData {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  show: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])

    // Auto remove after duration + animation time
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000 + 200) // 3s display + 200ms animation
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}