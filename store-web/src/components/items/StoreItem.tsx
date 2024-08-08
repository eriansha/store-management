interface StoreItemProps {
  store: {
    name: string
  }
}


const StoreItem: React.FC<StoreItemProps> = ({
  store
}) => {
  return (
    <div className='flex gap-3 border border-color-gray-300 rounded-md p-4 mb-3'>
      <div className='w-10 h-10 bg-gray-300' />

      <div>
        <div className='text-sm'>{store.name}</div>
        <div className='text-xs font-light'>Submission Verification Process</div>
      </div>
    </div>
  )
}

export default StoreItem
