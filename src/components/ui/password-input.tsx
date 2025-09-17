import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
  placeholder?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  required = false,
  className = '',
  placeholder = '',
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full pr-10 ${className}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white/60 transition-colors"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}