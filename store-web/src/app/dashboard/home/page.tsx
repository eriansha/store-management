import IncomeCard from '@/components/cards/IncomeCard'
import { fetchTransactionInfo } from '@/services/transaction-api'
import { TransactionInfoResponse } from '@/types/transaction'

export default async function DashboardPage() {
  const transactionData: TransactionInfoResponse = await fetchTransactionInfo()

  return (
    <main>
      <div className='flex justify-between mb-2'>
        <h2 className='font-bold'>Dashboard</h2>
        {/* TODO: language */}
        <div>ID</div>
      </div>

      <h5 className='text-xs text-gray-600 mb-2'>Hi Dashboard_008</h5>

      <IncomeCard
        label="Today Income"
        variant="primary"
        income={{
          totalIncome: transactionData.today_income,
          totalTranscation: transactionData.today_total_transaction,
          date: transactionData.today_date
        }}
      />

      <IncomeCard
        label="Today Monthly Income"
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
          <h2 className='font-semibold'>Total Store</h2>
          <h2 className='font-semibold'>{transactionData.total_store}</h2>
        </div>
      </div>
    </main>
  )
}
