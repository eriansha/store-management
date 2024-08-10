import useTranslation from '@/hooks/UseTranslation'
import { cn, priceFormat } from '@/lib/utils'

interface IncomeProps {
  label: string
  variant: "primary" | "secondary" | "info"
  income: {
    date: string
    totalIncome: number
    totalTranscation: number
  }
}


const IncomeCard: React.FC<IncomeProps> = ({
  label,
  variant = "primary",
  income
}) => {
  const { t } = useTranslation()
  const { date, totalIncome, totalTranscation } = income

  return (
    <div className="w-full h-42 mb-4 lg:mb-0 bg-gradient-to-r from-yellow-50 to-purple-50 rounded-2xl shadow-md">
      <div className="px-6 py-6">
        <div className="text-sm text-gray-600 mb-3">{`${label}${date}`}</div>
        <div className="text-right text-xs text-gray-500">{t("TOTAL_TRANSACTION")}</div>

        <div className="flex justify-between items-center mt-2">
          <div className="text-2xl font-bold">{priceFormat(totalIncome)}</div>
          <div>
          <div className="text-gray-500">{totalTranscation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeCard;
