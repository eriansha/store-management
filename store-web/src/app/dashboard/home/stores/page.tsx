'use client';

import Button from '@/components/buttons/Button'
import SearchField from '@/components/fields/SearchField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'
import StoreList from './StoreList'
import { Store } from '@/types/store'
import { fetcher } from '@/lib/utils'
import useDebounce from '@/hooks/UseDebounce'


export default function StorePage() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)

  const apiURL = `${process.env.NEXT_PUBLIC_STORE_API_BASE_URL}/stores?search=${encodeURIComponent(debouncedQuery)}`
  const { data, isLoading } = useSWR<Store[]>(apiURL, fetcher);

  const handleClickStore = () => {
    router.push("/dashboard/new-store")
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <main>
      <div className='flex gap-x-4 mb-6'>
        <SearchField
          placeholder='Cari nama toko'
          onChange={handleOnChange}
        />
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

        <StoreList
          isLoading={isLoading}
          stores={data || []}
        />
      </div>
    </main>
  )
}
