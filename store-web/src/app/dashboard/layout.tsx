import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='m-4'>
      {children}

      <nav className='bg-gray-50 shadow-sm flex justify-evenly py-3'>
        <Link href="dashboard">Dashboard</Link>
        <Link href="dashboard/store">Store</Link>
        <Link href="dashboard/transactions">Transaction</Link>
        <Link href="dashboard/settlement">Settlement</Link>
      </nav>
    </section>
  )
}