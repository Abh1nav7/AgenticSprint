import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 h-[600px] w-[400px] rounded-lg border border-white/10 bg-black shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
        <h3 className="text-lg font-semibold text-white">Chat Assistant</h3>
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full p-0 hover:bg-white/10"
          onClick={onClose}
        >
          ✕
        </Button>
      </div>
      <iframe
        ref={iframeRef}
        src="https://chatbot1-grlj.onrender.com/"
        className="h-[calc(100%-60px)] w-full border-none bg-transparent"
        title="Chatbot"
      />
    </div>
  )
}