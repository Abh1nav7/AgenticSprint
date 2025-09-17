import React from 'react'
import { Button } from '@/components/ui/button'
import { Vortex } from '@/components/ui/vortex'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { motion } from 'framer-motion'
import { FileText, Brain, MessagesSquare, Activity, ArrowRight } from 'lucide-react'

const Step: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
  delay: number
  image: string
}> = ({ icon, title, description, delay, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07]"
  >
    <div className="mb-4 flex items-center gap-4">
      <div className="rounded-xl bg-primary/20 p-3 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="mb-6 text-white/70">{description}</p>
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  </motion.div>
)

export const LearnMore: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Back to landing */}
      <div className="absolute left-4 top-4 z-20">
        <Button variant="ghost" onClick={() => (window.location.href = '/')}>
          ← Back to Home
        </Button>
      </div>

      {/* Background animations */}
      <ShootingStars />
      <StarsBackground />

      <Vortex className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
            >
              How MediAI Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/60"
            >
              Our AI-powered diagnostic system helps healthcare professionals make
              faster, more accurate decisions through advanced analysis and
              intelligent assistance.
            </motion.p>
          </div>

          {/* Steps Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Step
              icon={<FileText className="h-6 w-6" />}
              title="Upload Medical Records"
              description="Securely upload patient records, medical images, and test results through our HIPAA-compliant platform. We support various formats including DICOM, PDF, and structured data."
              delay={0.2}
              image="/learn/upload-demo.png"
            />
            <Step
              icon={<Brain className="h-6 w-6" />}
              title="AI Analysis"
              description="Our advanced AI models analyze the uploaded data, identifying patterns, anomalies, and potential diagnoses with high accuracy. The system cross-references findings with medical databases."
              delay={0.3}
              image="/learn/analysis-demo.png"
            />
            <Step
              icon={<Activity className="h-6 w-6" />}
              title="Diagnostic Insights"
              description="Receive comprehensive diagnostic insights, risk assessments, and treatment suggestions. All findings are backed by evidence and clinical references."
              delay={0.4}
              image="/learn/insights-demo.png"
            />
            <Step
              icon={<MessagesSquare className="h-6 w-6" />}
              title="AI Assistant Chat"
              description="Interact with our medical AI chatbot to ask follow-up questions, request clarifications, or explore alternative diagnoses. The assistant provides evidence-based responses."
              delay={0.5}
              image="/learn/chat-demo.png"
            />
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-semibold text-white">
              Ready to Experience the Future of Medical Diagnostics?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Join healthcare professionals worldwide who are using MediAI to enhance
              their diagnostic capabilities and improve patient outcomes.
            </p>
            <Button
              onClick={() => (window.location.href = '/auth')}
              size="lg"
              className="mt-8"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </Vortex>
    </div>
  )
}