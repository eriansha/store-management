"use client"

import Button from '@/components/buttons/Button'
import { DropdownOption } from '@/components/fields/DropdownField'
import InputField from '@/components/fields/InputField'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react'

const scaleOptions: DropdownOption[] = [
  {
    value: "small",
    label: "1-4 Employee",
  },
  {
    value: "medium",
    label: "5-19 Employee",
  },
  {
    value: "medium_large",
    label: "20-99 Employee",
  },
  {
    value: "large",
    label: "100+ Employee",
  }
]

const categoryOptions: DropdownOption[] = [
  {
    value: "veterinary_services",
    label: "Veterinary Service",
  },
  {
    value: "agricultural_cooperative",
    label: "Agricultural Co-operative",
  },
  {
    value: "landscaping_horticultural_services",
    label: "Landscaping & Horticultural Services",
  },
  {
    value: "general_constractors",
    label: "General Constractors - Residential",
  }
]

const FIELD_NAME = {
  COMPANY_NAME: 'official_company_name',
  BRAND_NAME: 'brand_name',
  STORE_SCALE: 'store_scale',
  STORE_CATEGORY: 'store_category'
}

export default function NewStorePage() {
  const [termAccpeted, setTermAccepted] = useState(false)

  const { register, handleSubmit, control, watch, formState: { errors, isValid } } = useForm({
    mode: 'all'
  });

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.checked

    setTermAccepted(value)
  }

  const onSubmit = (data: any) => {
    axios.post(`${process.env.NEXT_PUBLIC_STORE_API_BASE_URL}/stores`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    )
    .then(function (response) {
      // TODO: show pop up
      alert("Sukses membuat store baru");
    })
    .catch(function (error) {
      // TODO: show error message
      console.log(error)
      alert("Gagal membuat store baru");
    });
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputField
            {...register(FIELD_NAME.COMPANY_NAME, { required: true, maxLength: 100 })}
            label="Official Company Name"
            placeholder='Please input Official Company Name'
          />
          {errors[FIELD_NAME.COMPANY_NAME] && <span>This field is required and must be less than 100 characters</span>}
        </div>

        <div>
          <InputField
            {...register(FIELD_NAME.BRAND_NAME, { required: true, maxLength: 50 })}
            label="Brand Name"
            placeholder='Please input Brand Name'
          />
          {errors[FIELD_NAME.BRAND_NAME] && <span>This field is required and must be less than 50 characters</span>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="companyScale">Company Scale:</label>
          <Controller
            name={FIELD_NAME.STORE_SCALE}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select company scale</option>
                {
                  scaleOptions.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                  ))
                }
              </select>
              )}
            />
          {errors[FIELD_NAME.STORE_SCALE] && <span>This field is required</span>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor="companyCategory">Company Category:</label>
          <Controller
            name={FIELD_NAME.STORE_CATEGORY}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select company category</option>
                {
                  categoryOptions.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                  ))
                }
              </select>
            )}
          />
          {errors[FIELD_NAME.STORE_CATEGORY] && <span>This field is required</span>}
        </div>

        <div className='flex gap-3 my-6'>
          <label>
            <input
              type="checkbox"
              value={termAccpeted.toString()}
              onChange={handleChecked}
            />
            {" "}
            {"I agree with Terms and Condition QRIS Merchant Service"}
          </label>
        </div>

        <Button
          pill
          className='mb-4'
          type="submit"
          disabled={!(isValid && Boolean(termAccpeted))}
        >
          {"Submit"}
        </Button>
      </form>
    </main>
  )
}
