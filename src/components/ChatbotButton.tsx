import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'
import { Chatbot } from './Chatbot'

export const ChatbotButton: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full p-0 shadow-lg hover:scale-110 transition-transform"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </>
  )
}