'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/provider/AuthProvider'


/**
 * Wrapping dashboard subdirectory pages with custom logic
 * to protect private routes
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait until token is fetched from local storage
    if (!token && !isLoading) {
      router.push('/')
    }
  }, [token, router, isLoading])

  // Only render children pages if token is exist
  if (token) {
    return (
      <>
        {children}
      </>
    )
  }

  // Workaround to prevent any glitch when token is still fetched but the page is already rendered
  return <></>
}
