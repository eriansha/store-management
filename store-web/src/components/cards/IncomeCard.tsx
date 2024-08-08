interface IncomeProps {
  label: string
  variant: "primary" | "secondary"
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
  const bgColor = variant === "primary" ? "bg-yellow-300" : "bg-green-500"

  return (
    <div className={`px-2 py-3 ${bgColor} rounded-md mb-2`}>
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
