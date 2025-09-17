import React from 'react'

export const logout = () => {
  // Clear authentication token
  localStorage.removeItem('token')
  
  // Redirect to landing page
  window.location.href = '/'
}