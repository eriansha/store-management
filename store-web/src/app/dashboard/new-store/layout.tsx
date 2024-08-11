"use client"

import Header from '@/components/header/Header'
import useTranslation from '@/hooks/UseTranslation'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <section>
      <Header>
        <ChevronLeftIcon
          className='size-6 text-black-600 cursor-pointer'
          onClick={() => router.back()}
        />

        <h2 className='font-semibold'>{t("ADD_NEW_STORE")}</h2>
      </Header>

      <main className='m-4'>
        {children}
      </main>
    </section>
  )
}
