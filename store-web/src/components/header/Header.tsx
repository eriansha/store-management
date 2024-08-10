"use client"

import useTranslation from '@/hooks/UseTranslation'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className='sticky top-0 flex gap-3 justify-start items-center shadow-md w-full py-4 px-3 mb-3'>
      <ChevronLeftIcon
        className='size-6 text-black-600 cursor-pointer'
        onClick={() => router.back()}
      />

      <h2 className='font-semibold'>{t("ADD_NEW_STORE")}</h2>
    </div>
  )
}
