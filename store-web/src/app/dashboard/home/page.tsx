"use client"

import IncomeCard from '@/components/cards/IncomeCard'
import useTranslation from '@/hooks/UseTranslation'
import { useAuth } from '@/provider/AuthProvider'
import { TransactionInfoResponse } from '@/types/transaction'
import axios from 'axios'
import { useEffect, useState } from 'react'
import TotalStoreCard from './TotalStoreCard'

const defaultTransactionData: TransactionInfoResponse = {
  today_date: '',
  today_income: 0,
  today_total_transaction: 0,
  total_monthly_income: 0,
  total_monthly_transaction: 0,
  total_store: 0
}

export default function DashboardPage() {
  const { token, logout, user } = useAuth()
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
    }).catch((error) => {
      // TODO: use proper token refresh mechanism
      if (error.response.status === 401) {
        logout()
      }
    })
  }, [token, logout])

  return (
    <main>
      <h5 className='lg:text-lg text-xs text-gray-600 my-4'>
        <strong>
          {`Hi, ${user?.fullName}`}
        </strong>
      </h5>
      <div className='lg:flex lg:gap-4'>
        <IncomeCard
          label={t("TODAY_INCOME")}
          variant="primary"
          income={{
            totalIncome: transactionData.today_income,
            totalTranscation: transactionData.today_total_transaction,
            date: `, ${transactionData.today_date}`
          }}
        />

        <IncomeCard
          label={t("TODAY_MONTHLY_INCOME")}
          variant="secondary"
          income={{
            totalIncome: transactionData.total_monthly_income,
            totalTranscation: transactionData.total_monthly_transaction,
            date: ""
          }}
        />

        <TotalStoreCard totalStore={transactionData.total_store} />
      </div>
    </main>
  )
}
