'use client';

import Button from '@/components/buttons/Button'
import SearchField from '@/components/fields/SearchField'
import StoreItem from '@/components/items/StoreItem'
import { useRouter } from 'next/navigation'

export default function StorePage() {
  const router = useRouter()

  const handleClickStore = () => {
    router.push("/dashboard/new-store")
  }

  return (
    <main>
      <div className='flex gap-x-2 mb-6'>
        <SearchField placeholder='Cari nama toko' />

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

      <div className='mb-16'>
        <h2 className='font-medium my-6'>Store List</h2>

        <StoreItem store={{ name: "SIT"}} />
        <StoreItem store={{ name: "SIT"}} />
        <StoreItem store={{ name: "SIT"}} />
        <StoreItem store={{ name: "SIT"}} />
        <StoreItem store={{ name: "SIT"}} />
        <StoreItem store={{ name: "SIT"}} />
        <StoreItem store={{ name: "SIT"}} />
      </div>
    </main>
  )
}
