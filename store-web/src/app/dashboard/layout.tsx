'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/provider/AuthProvider'
import LanguageSwitcher from '@/components/fields/LanguageSwitcher'


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
        <div className='sticky top-0 flex gap-3 justify-start justify-between shadow-sm w-full py-4 px-4 mb-4 lg:mb-10'>
          <h2 className='font-bold text-violet-600'>Store Dashboard</h2>
          <LanguageSwitcher/>
        </div>

        {children}
      </>
    )
  }

  // Workaround to prevent any glitch when token is still fetched but the page is already rendered
  return <></>
}
