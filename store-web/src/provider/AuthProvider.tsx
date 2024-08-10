'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isTokenValid } from '@/lib/Auth'

interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

/** Context structure */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/** Context provider to manage authentication state */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken)
    } else {
      localStorage.removeItem('token')
    }
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Custom hook to get auth context */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
