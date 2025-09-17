import React from 'react'
import { BackgroundGradient } from './background-gradient'
import { motion } from 'framer-motion'

// Design 1: Vertical Flow
const WavesDesign = () => (
  <div className="relative w-full h-full flex flex-col">
    {/* Top Section */}
    <div className="flex-1 relative flex items-center justify-center p-4">
      <motion.div
        className="text-7xl"
        animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
    </div>
    
    {/* Middle Section */}
    <div className="flex-1 relative flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <div className="flex gap-4 justify-center">
          <motion.span
            className="text-2xl"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📊
          </motion.span>
          <motion.span
            className="text-2xl"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💼
          </motion.span>
        </div>
      </div>
    </div>
    
    {/* Bottom Section */}
    <div className="flex-1 flex items-center justify-center p-4">
      <motion.p 
        className="text-white/60 text-center text-lg max-w-md"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Your financial data is secure with us
      </motion.p>
    </div>
  </div>
)

// Design 2: Stacked Elements
const FloatingCardsDesign = () => (
  <div className="relative w-full h-full flex flex-col justify-between p-8">
    {/* Top Card */}
    <motion.div 
      className="w-full h-24 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10 backdrop-blur-sm"
      animate={{ y: [-10, 0, -10], rotate: [-2, 0, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Middle Content */}
    <div className="text-center">
      <motion.div
        className="text-6xl mb-4"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        💰
      </motion.div>
      <h2 className="text-2xl font-bold text-primary">CFO Assistant</h2>
    </div>
    
    {/* Bottom Card */}
    <motion.div 
      className="w-full h-24 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10 backdrop-blur-sm"
      animate={{ y: [10, 0, 10], rotate: [2, 0, 2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
)

// Design 3: Vertical Icons
const GridPatternDesign = () => (
  <div className="relative w-full h-full flex flex-col justify-between p-8">
    {/* Top Icon */}
    <div className="text-center">
      <motion.div
        className="text-6xl inline-block"
        animate={{ y: [-10, 0, -10], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        📈
      </motion.div>
    </div>
    
    {/* Middle Content */}
    <div className="text-center space-y-4">
      <motion.div
        className="text-5xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        💼
      </motion.div>
      <h2 className="text-2xl font-bold text-primary">Financial Intelligence</h2>
    </div>
    
    {/* Bottom Icon */}
    <div className="text-center">
      <motion.div
        className="text-6xl inline-block"
        animate={{ y: [10, 0, 10], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        📊
      </motion.div>
    </div>
  </div>
)

// Main component that switches between designs
interface AuthIllustrationProps {
  design?: 'waves' | 'cards' | 'grid'
}

export const AuthIllustration: React.FC<AuthIllustrationProps> = ({ design = 'waves' }) => {
  const designs = {
    waves: WavesDesign,
    cards: FloatingCardsDesign,
    grid: GridPatternDesign,
  }

  const SelectedDesign = designs[design]

  return (
    <BackgroundGradient
      containerClassName="w-full h-full"
      className="w-full h-full bg-black/40 border-l border-white/10"
    >
      <SelectedDesign />
    </BackgroundGradient>
  )
}