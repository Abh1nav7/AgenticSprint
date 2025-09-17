"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './button'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform"
          >
            <div className="rounded-xl border border-white/10 bg-black/90 p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <p className="mt-4 text-sm text-white/70">{message}</p>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={onConfirm}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {confirmText}
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  {cancelText}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}