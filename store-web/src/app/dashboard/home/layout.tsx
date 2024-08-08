import BottomNavigation from '@/components/nav/BottomNavigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <main className='m-4'>
        {children}
      </main>

      <BottomNavigation />
    </section>
  )
}
