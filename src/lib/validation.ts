export const validatePassword = (password: string) => {
  const strength = {
    score: 0,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    isLongEnough: password.length >= 8,
  }

  // Calculate score
  if (strength.hasLower) strength.score += 1
  if (strength.hasUpper) strength.score += 1
  if (strength.hasNumber) strength.score += 1
  if (strength.hasSpecial) strength.score += 1
  if (strength.isLongEnough) strength.score += 1

  // Return strength level and suggestions
  const getStrengthLevel = () => {
    if (strength.score <= 2) return 'weak'
    if (strength.score <= 3) return 'medium'
    if (strength.score <= 4) return 'strong'
    return 'very-strong'
  }

  const suggestions = []
  if (!strength.hasLower) suggestions.push('Add lowercase letters')
  if (!strength.hasUpper) suggestions.push('Add uppercase letters')
  if (!strength.hasNumber) suggestions.push('Add numbers')
  if (!strength.hasSpecial) suggestions.push('Add special characters')
  if (!strength.isLongEnough) suggestions.push('Make it at least 8 characters long')

  return {
    score: strength.score,
    level: getStrengthLevel(),
    suggestions,
  }
}

export const validateEmail = (email: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const isValid = regex.test(email)
  
  // Additional checks
  const suggestions = []
  if (!email.includes('@')) {
    suggestions.push('Must contain @ symbol')
  } else {
    const [local, domain] = email.split('@')
    if (local.length === 0) suggestions.push('Username part is required')
    if (!domain?.includes('.')) suggestions.push('Invalid domain format')
  }

  return {
    isValid,
    suggestions: !isValid ? suggestions : [],
  }
}