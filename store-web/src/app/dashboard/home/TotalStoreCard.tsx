import useTranslation from '@/hooks/UseTranslation'
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid'

interface TotalStoreCardProps {
  totalStore: number
}

const TotalStoreCard: React.FC<TotalStoreCardProps> = ({ totalStore }) => {
  const { t } = useTranslation()

  return (
    <div className="w-full h-42 bg-gradient-to-r from-yellow-50 to-red-50 p-6 rounded-2xl shadow-md">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{t("TOTAL_STORE")}</h2>
    </div>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
        <BuildingStorefrontIcon className='size-6 text-red-500' />
      </div>
      <div>
        <p className="text-2xl font-bold text-red-500">
          {totalStore}
        </p>
        <p className="text-sm text-gray-600">jumlah toko yang kamu miliki</p>
      </div>
    </div>
  </div>
  )
}

export default TotalStoreCard
