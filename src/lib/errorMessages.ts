export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_NOT_CONFIRMED: "Please check your email to confirm your account",
  USER_NOT_FOUND: "No user found with this email",
  WEAK_PASSWORD: "Password must be at least 8 characters long",
  EMAIL_IN_USE: "An account with this email already exists",
  NETWORK_ERROR: "Network error. Please check your internet connection",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again",
  SESSION_EXPIRED: "Your session has expired. Please sign in again",
  RATE_LIMIT_EXCEEDED: "Too many attempts. Please try again later",
}

export const getAuthErrorMessage = (error: Error | null): string => {
  if (!error) return AUTH_ERROR_MESSAGES.UNKNOWN_ERROR
  
  const message = error.message.toLowerCase()
  
  if (message.includes("invalid login credentials")) {
    return AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS
  }
  if (message.includes("email not confirmed")) {
    return AUTH_ERROR_MESSAGES.EMAIL_NOT_CONFIRMED
  }
  if (message.includes("user not found")) {
    return AUTH_ERROR_MESSAGES.USER_NOT_FOUND
  }
  if (message.includes("password")) {
    return AUTH_ERROR_MESSAGES.WEAK_PASSWORD
  }
  if (message.includes("email already registered")) {
    return AUTH_ERROR_MESSAGES.EMAIL_IN_USE
  }
  if (message.includes("failed to fetch") || message.includes("network")) {
    return AUTH_ERROR_MESSAGES.NETWORK_ERROR
  }
  if (message.includes("session expired") || message.includes("not authenticated")) {
    return AUTH_ERROR_MESSAGES.SESSION_EXPIRED
  }
  if (message.includes("too many requests") || message.includes("rate limit")) {
    return AUTH_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED
  }
  
  return AUTH_ERROR_MESSAGES.UNKNOWN_ERROR
}