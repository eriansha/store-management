'use client';

import Button from '@/components/buttons/Buttons'
import { useRouter } from 'next/navigation'

export default function StorePage() {
  const router = useRouter()

  const handleClickStore = () => {
    router.push("/dashboard/store/new")
  }

  return (
    <main>
      <div className='flex gap-x-2 mb-6'>
        <div className='w-full bg-gray-50 px-3 py-3 border border-color-gray-300 rounded-md'>
          {/* TODO: icon search */}

          <input
            className='w-full bg-gray-50'
            type="search"
            placeholder='Cari nama toko'
          />
        </div>

        <Button
          className='flex-initial w-32'
        >
          Search
        </Button>
      </div>

      <div className='bg-sky-50 rounded-md p-4'>
        <div className='flex gap-4 mb-4'>
          {/* TODO: change into icon */}
          <div className='w-10 h-10 bg-gray-300' />

          <div>
            <h5 className='text-sm font-medium'>Add new Store</h5>
            <div className='text-xs font-light'>Lets add new store, so the business runs well</div>
          </div>
        </div>

        <Button
          pill
          onClick={handleClickStore}
        >
          {"Add Store"}
        </Button>
      </div>

      <h2 className='font-medium my-6'>Store List</h2>

      <div className='flex gap-3 border border-color-gray-300 rounded-md p-4 mb-3'>
        <div className='w-10 h-10 bg-gray-300' />

        <div>
          <div className='text-sm'>SIT</div>
          <div className='text-xs font-light'>Submission Verification Process</div>
        </div>
      </div>

      <div className='flex gap-3 border border-color-gray-300 rounded-md p-4 mb-3'>
        <div className='w-10 h-10 bg-gray-300' />

        <div>
          <div className='text-sm'>SIT</div>
          <div className='text-xs font-light'>Submission Verification Process</div>
        </div>
      </div>

      <div className='flex gap-3 border border-color-gray-300 rounded-md p-4 mb-3'>
        <div className='w-10 h-10 bg-gray-300' />

        <div>
          <div className='text-sm'>SIT</div>
          <div className='text-xs font-light'>Submission Verification Process</div>
        </div>
      </div>
    </main>
  )
}
