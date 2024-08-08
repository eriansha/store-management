import Header from '@/components/header/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header />

      <main className='m-4'>
        {children}
      </main>
    </section>
  )
}
