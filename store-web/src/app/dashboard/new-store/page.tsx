import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'

export default function NewStorePage() {
  return (
    <main>
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
