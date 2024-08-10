"use client"

import IncomeCard from '@/components/cards/IncomeCard'
import useTranslation from '@/hooks/UseTranslation'
import { fetcher } from '@/lib/utils'
import { useAuth } from '@/provider/AuthProvider'
import { useLanguage } from '@/provider/LanguageProvider'
import { TransactionInfoResponse } from '@/types/transaction'
import axios from 'axios'
import { useEffect, useState } from 'react'

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value

    if (value === 'id') {
      changeLanguage('id')
    } else {
      changeLanguage('en')
    }
  }

  return (
    <select value={language} onChange={handleChangeLanguage}>
      <option value="en">English</option>
      <option value="id">Bahasa Indonesia</option>
    </select>
  );
};

const defaultTransactionData: TransactionInfoResponse = {
  today_date: '',
  today_income: 0,
  today_total_transaction: 0,
  total_monthly_income: 0,
  total_monthly_transaction: 0,
  total_store: 0
}

export default function DashboardPage() {
  const { token} = useAuth()
  const { t } = useTranslation()
  const [transactionData, setTransactionData] = useState<TransactionInfoResponse>(defaultTransactionData)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_STORE_API_BASE_URL}/transaction-info`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      const data = response.data
      setTransactionData(data)
    })
  }, [token])

  return (
    <main>
      <div className='flex justify-between mb-2'>
        <h2 className='font-bold'>Dashboard</h2>
        <LanguageSwitcher/>
      </div>
      <h5 className='text-xs text-gray-600 mb-2'>Hi Dashboard_008</h5>

      <IncomeCard
        label={t("TODAY_INCOME")}
        variant="primary"
        income={{
          totalIncome: transactionData.today_income,
          totalTranscation: transactionData.today_total_transaction,
          date: transactionData.today_date
        }}
      />

      <IncomeCard
        label={t("TODAY_MONTHLY_INCOME")}
        variant="secondary"
        income={{
          totalIncome: transactionData.total_monthly_income,
          totalTranscation: transactionData.total_monthly_transaction,
          date: "This month"
        }}
      />

      {/* TODO: create reusable component */}
      <div className='px-2 py-3 mb-2 rounded-md bg-sky-200'>
        <div className='flex justify-between'>
          <h2 className='font-semibold'>{t("TOTAL_STORE")}</h2>
          <h2 className='font-semibold'>{transactionData.total_store}</h2>
        </div>
      </div>
    </main>
  )
}
