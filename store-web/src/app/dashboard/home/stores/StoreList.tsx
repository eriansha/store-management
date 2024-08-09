import StoreItem from '@/components/items/StoreItem'
import { Store } from '@/types/store'

interface StoreListProps {
  isLoading: boolean
  stores: Store[]
}

const StoreList: React.FC<StoreListProps> = ({
  isLoading,
  stores
}) => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (stores.length === 0) {
    return <div>No store available</div>
  }

  return (
    <>
      {
        stores?.map((store) => (
          <StoreItem
            key={store.id}
            store={store}
          />
        ))
      }
    </>
  )
}

export default StoreList
