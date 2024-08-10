"use client"

import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'
import useTranslation from '@/hooks/UseTranslation'
import { useAuth } from '@/provider/AuthProvider'
import { ServerError } from '@/types/common'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const FIELD_NAME = {
  EMAIL: 'email',
  PASSWORD: 'password',
}

interface LoginFormProps {
  toggleForgetPassword: () => void
}


const LoginForm: React.FC<LoginFormProps> = ({ toggleForgetPassword }) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className="mb-6 font-bold text-center">{t("WELCOME_BACK")}</h5>

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

      <Button
        type='submit'
        pill
        className='mt-3'
        disabled={!isValid}
      >
        {t("LOG_IN")}
      </Button>

      <div className='flex justify-center mt-5'>
        <span
          onClick={toggleForgetPassword}
          className='font-light text-xs underline'
        >
          {t("FORGET_PASSWORD")}
        </span>
      </div>
    </form>
  );
}

export default LoginForm;
