"use client"

import Button from '@/components/buttons/Button'
import { DropdownOption } from '@/components/fields/DropdownField'
import InputField from '@/components/fields/InputField'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import { useRouter } from 'next/navigation'
import useTranslation from '@/hooks/UseTranslation'
import SelectDropdownField from '@/components/fields/SelectDropdownField'

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
  const { t} = useTranslation()
  const { token } = useAuth()
  const router = useRouter()
  const [termAccpeted, setTermAccepted] = useState(false)

  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({
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
          "Authorization": `Bearer ${token}`
        },
      }
    )
    .then(function () {
      // TODO: show pop up
      alert("Sukses membuat store baru");
      router.push('/dashboard/home/stores')
    })
    .catch(function (error) {
      // TODO: show error message
      console.log(error)
      alert("Gagal membuat store baru");
    });
  }

  return (
    <main className='flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputField
            {...register(FIELD_NAME.COMPANY_NAME, { required: true, maxLength: 100 })}
            label="Official Company Name"
            placeholder={t("OFFICIAL_COMPANY_PLACEHOLDER")}
          />
          {errors[FIELD_NAME.COMPANY_NAME] && <span>This field is required and must be less than 100 characters</span>}
        </div>

        <div>
          <InputField
            {...register(FIELD_NAME.BRAND_NAME, { required: true, maxLength: 50 })}
            label="Brand Name"
            placeholder={t("BRAND_NAME_PLACEHOLDER")}
          />
          {errors[FIELD_NAME.BRAND_NAME] && <span>This field is required and must be less than 50 characters</span>}
        </div>

        <Controller
          name={FIELD_NAME.STORE_SCALE}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectDropdownField
              {...field}
              placeholder={t("SELECT_COMPANY_SCALE")}
              label={t("COMPANY_SCALE_LABEL")}
              options={scaleOptions}
            />
          )}
        />
        {errors[FIELD_NAME.STORE_SCALE] && <span>{t("REQUIRED_FIELD")}</span>}

        <Controller
          name={FIELD_NAME.STORE_CATEGORY}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectDropdownField
              {...field}
              placeholder={t("SELECT_COMPANY_CATEGORY")}
              label={t("COMPANY_CATEGORY_LABEL")}
              options={categoryOptions}
            />
          )}
        />
        {errors[FIELD_NAME.STORE_CATEGORY] && <span>{t("REQUIRED_FIELD")}</span>}

        <div className='flex items-center gap-3 my-6'>
          <label className='text-sm'>
            <input
              type="checkbox"
              className='text-violet-400 border-gray-300 rounded focus:ring-violet-500 accent-violet-500'
              value={termAccpeted.toString()}
              onChange={handleChecked}
            />
            {" "}
            {t("NEW_STORE_TNC")}
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
