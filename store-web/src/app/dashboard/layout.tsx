export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='m-4'>
      {children}
    </section>
  )
}
