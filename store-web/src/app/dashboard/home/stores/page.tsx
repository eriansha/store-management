'use client'

import SearchField from '@/components/fields/SearchField'
import { useEffect, useState } from 'react'
import { Store } from '@/types/store'
import useDebounce from '@/hooks/UseDebounce'
import axios from 'axios'
import { useAuth } from '@/provider/AuthProvider'
import useTranslation from '@/hooks/UseTranslation'
import Link from 'next/link'
import StoreList from '@/components/lists/StoreList'


export default function StorePage() {
  const { token, logout } = useAuth()
  const { t} = useTranslation()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [stores, setStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.NEXT_PUBLIC_STORE_API_BASE_URL}/stores?search=${encodeURIComponent(debouncedQuery)}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      const data = response.data
      setStores(data)
    }).catch((error) => {
      // TODO: use proper token refresh mechanism
      if (error.response.status === 401) {
        logout()
      }
    })
    .finally(() => setIsLoading(false))
  }, [debouncedQuery, token, logout])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <main>
      <div className='flex gap-x-4'>
        <SearchField
          placeholder={t("FIND_STORE_NAME")}
          onChange={handleOnChange}
        />
      </div>

      <div className='mb-32'>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium my-6'>{t("STORE_LIST")}</h2>

          <Link href="/dashboard/new-store" className='text-violet-500'>
            {t("ADD_NEW_STORE")}
          </Link>
        </div>

        <StoreList
          isLoading={isLoading}
          stores={stores || []}
        />
      </div>
    </main>
  )
}
