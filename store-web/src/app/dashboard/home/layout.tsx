"use client"

import LanguageSwitcher from '@/components/fields/LanguageSwitcher'
import BottomNavigation from '@/components/nav/BottomNavigation'
import Sidebar from '@/components/nav/Sidebar'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {/* Sidebar - only visible on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className='lg:ml-64'>
        <div className='bg-white sticky top-0 flex gap-3 justify-start justify-between shadow-sm w-full py-4 px-4 mb-4 lg:mb-10'>
          <h2 className='lg:hidden font-bold text-violet-600'>Store Dashboard</h2>
          <div className='ml-auto'>
            <LanguageSwitcher/>
          </div>
        </div>

        <div className='p-4'>
        {children}
        </div>
      </main>

      {/* Bottom Navigation - visible on medium and smaller screens */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  )
}
