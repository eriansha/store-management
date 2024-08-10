"use client"

import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'
import useTranslation from '@/hooks/UseTranslation'
import { useAuth } from '@/provider/AuthProvider'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const FIELD_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
}

interface ServerError {
  details: string
  message: string
  status_code: string
  timestamp: string
}

export default function Home() {
  const {t} = useTranslation()
  const [serverError, setServerError] = useState<ServerError>()
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: {
      isValid
    }
  } = useForm({ mode: 'all' });

  const onSubmit = (data: any) => {
    axios.post(`${process.env.NEXT_PUBLIC_STORE_API_BASE_URL}/login`,
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
      const data = response.data
      login(data.access_token);
      router.push('/dashboard/home');
    })
    .catch(function (error) {
      // TODO: show error message
      const err = error?.response?.data
      if (err) setServerError(err)
      else {
        alert("Gagal melakukan login")
      }
    });
  }

  return (
    <main className="flex items-center justify-center h-screen bg-emerald-50">
      {/* FIXME: scrolling issue */}
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white shadow-sm border border-color-slate-100 rounded-lg">
        <h5 className="mb-6 font-bold">{t("WELCOME_BACK")}</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register(FIELD_NAME.EMAIL, { required: true })}
            label={t("EMAIL")}
            placeholder={t("ENTER_YOUR_EMAIL")}
          />

          <PasswordField
            {...register(FIELD_NAME.PASSWORD, { required: true })}
            label={t("PASSWORD")}
            placeholder={t("ENTER_YOUR_PASSWORD")}
          />

          {/* TODO: proper error and show/hide forget password */}
          {
            serverError && (
              <div className='font-light text-xs text-red-500'>
                {serverError.message}
              </div>
            )
          }

          {/* TODO: change to component */}
          <div className='flex justify-between'>
            <span className='font-light text-xs'>{t("FORGET_PASSWORD")}</span>
          </div>

          <Button
            type='submit'
            pill
            className='mt-4'
            disabled={!isValid}
          >
            {t("LOG_IN")}
          </Button>
        </form>
      </div>
    </main>
  );
}
