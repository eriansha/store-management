import IncomeCard from '@/components/cards/IncomeCard'

export default function DashboardPage() {

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
          totalIncome: 9999999,
          totalTranscation: 999,
          date: new Date()
        }}
      />

      <IncomeCard
        label="Today Monthly Income"
        variant="secondary"
        income={{
          totalIncome: 9999999,
          totalTranscation: 999,
          date: new Date()
        }}
      />

      {/* TODO: create reusable component */}
      <div className='px-2 py-3 mb-2 rounded-md bg-sky-200'>
        <div className='flex justify-between'>
          <h2 className='font-semibold'>Total Store</h2>
          <h2 className='font-semibold'>0</h2>
        </div>
      </div>
    </main>
  )
}
