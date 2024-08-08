import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}

      <nav className='bg-gray-50 shadow-sm flex justify-evenly py-3'>
        <Link href="/dashboard/home">Dashboard</Link>
        <Link href="/dashboard/home/store">Store</Link>
        <Link href="/dashboard/home/transactions">Transaction</Link>
        <Link href="/dashboard/home/settlement">Settlement</Link>
      </nav>
    </section>
  )
}
