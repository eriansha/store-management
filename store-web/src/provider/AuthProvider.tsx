'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { isTokenValid } from '@/lib/Auth'

interface AuthContextType {
  isLoading: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

/** Context structure */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/** Context provider to manage authentication state */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken)
      if (path === '/') router.push('/dashboard/home')
    } else {
      localStorage.removeItem('token')
    }

    setIsLoading(false)
  }, [path, router])

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  /** Workaround to prevent user access `/` or login page when the token is still valid */
  if (token && path === '/') {
    return <></>
  }

  return (
    <AuthContext.Provider value={{
      isLoading,
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
