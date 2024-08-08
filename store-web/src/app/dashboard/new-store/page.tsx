"use client"

import Button from '@/components/buttons/Buttons'
import InputField from '@/components/Fields/InputField'
import { useRouter } from 'next/navigation'

export default function NewStorePage() {
  const router = useRouter()

  return (
    <main>
      <div className='flex gap-3 justify-start items-center shadow-md w-full py-4 px-3 mb-3'>
        <button onClick={() => router.back()}>
          {"<"}
        </button>

        <h2 className='font-semibold'>Add New Store</h2>
      </div>

      <InputField
        label="Official Company Name"
        placeholder='Please input Official Company Name'
      />

      <InputField
        label="Brand Name"
        placeholder='Please input Brand Name'
      />

      <InputField
        label="Store Scale"
        placeholder='Please input Store Scale'
      />

      <InputField
        label="Official Store Category"
        placeholder='Please input Store Category'
      />

      <div className='flex gap-3 my-6'>
        <input type="checkbox" />
        <label>I agree with Terms and Condition QRIS Merchant Service</label>
      </div>

      <Button pill className='mb-4'>Submit</Button>
    </main>
  )
}
