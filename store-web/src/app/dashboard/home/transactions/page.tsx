"use client"

import useTranslation from '@/hooks/UseTranslation'

export default function TransactionPage() {
  const { t } = useTranslation()
  return (
    <main className="flex items-center justify-center h-screen">
      <h3>{t("PAGE_UNDER_CONSTRUCTION")} 🚧</h3>
    </main>
  )
}
