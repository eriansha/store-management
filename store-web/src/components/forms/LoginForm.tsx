"use client"

import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'
import useTranslation from '@/hooks/UseTranslation'
import { useAuth } from '@/provider/AuthProvider'
import { ServerError } from '@/types/common'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import ErrorText from '@/components/texts/ErrorText'
import { useState } from 'react'

const FIELD_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
}

interface LoginFormProps {
  toggleForgetPassword: () => void
}


const LoginForm: React.FC<LoginFormProps> = ({ toggleForgetPassword }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {t} = useTranslation()
  // const [serverError, setServerError] = useState<ServerError | undefined>()
  const router = useRouter()
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isValid
    }
  } = useForm({ mode: 'all' })

  const buttonDisabled = !isValid || isLoading


  const onSubmit = (data: any) => {
    setIsLoading(true)
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
      const { user } = data
      login(user, data.access_token)
      router.push('/dashboard/home')
    })
    .catch(function (error) {
      // TODO: show error message
      const err = error?.response?.data
      if (err) {
        const serverError:  ServerError = err
        setError("root", {
          type: serverError.status_code,
          message: serverError.details
        })
      } else {
        alert("Gagal melakukan login")
      }

      setIsLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="mb-6 font-bold text-center">{"Store Management"}</h5>

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

      {
        errors["root"] && (
          <ErrorText>
            {errors["root"].message}
          </ErrorText>
        )
      }

      <Button
        type='submit'
        className='mt-3'
        disabled={buttonDisabled}
      >
        {t("LOG_IN")}
      </Button>

      <div className='flex justify-center mt-5'>
        <span
          onClick={toggleForgetPassword}
          className='font-light text-xs underline text-violet-500 cursor-pointer'
        >
          {t("FORGET_PASSWORD")}
        </span>
      </div>
    </form>
  )
}

export default LoginForm
