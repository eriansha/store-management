import { cn } from '@/lib/utils'

interface IncomeProps {
  label: string
  variant: "primary" | "secondary" | "info"
  income: {
    date: Date
    totalIncome: number
    totalTranscation: number
  }
}


const IncomeCard: React.FC<IncomeProps> = ({
  label,
  variant = "primary",
  income
}) => {
  const { date, totalIncome, totalTranscation } = income

  return (
    <div
      className={cn(
        'px-2 py-3 mb-2',
        'rounded-md',
        [
          variant === 'primary' && [
            "bg-yellow-300"
          ],
          variant === "secondary" && [
            "bg-green-500"
          ],
        ]
      )}>
      <div className='font-semibold text-sm'>{label}</div>
      <div className='flex justify-between leading-3'>
        <div>
          <div className='text-xs text-gray-600 pb-4'>{date.toString()}</div>
          <h2 className='font-semibold'>{totalIncome}</h2>
        </div>

        <div className='text-right'>
          <div className='text-xs text-gray-600 pb-4'>Total Transaction</div>
          <h2 className='font-semibold'>{totalTranscation}</h2>
        </div>
      </div>
    </div>
  );
}

export default IncomeCard;
