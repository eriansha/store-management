import useTranslation from '@/hooks/UseTranslation'
import { Store } from '@/types/store'
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid'

interface StoreItemProps {
  store: Store
}


const StoreItem: React.FC<StoreItemProps> = ({
  store
}) => {
  const { t} = useTranslation()
  return (
    <div className='flex gap-3 border border-color-gray-300 rounded-md p-4 mb-3'>
      <div className='w-10 h-10 bg-red-100 rounded-lg flex justify-center items-center'>
        <BuildingStorefrontIcon className='size-6 text-red-500'/>
      </div>

      <div>
        <div className='text-sm'>{store.official_company_name}</div>
        <div className='text-xs font-light text-yellow-500'>{t("STORE_SUBMISSION_VERIFICATION_PROCESS_LABEL")}</div>
      </div>
    </div>
  )
}

export default StoreItem
