"use client"

import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'
import { useForm } from 'react-hook-form'

const FIELD_NAME = {
  ACCOUNT_ID: 'account_id',
  PASSWORD: 'password',
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: {
      isValid
    }
  } = useForm({ mode: 'all' });

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <main className="flex items-center justify-center h-screen bg-emerald-50">
      {/* FIXME: scrolling issue */}
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white shadow-sm border border-color-slate-100 rounded-lg">
        <h5 className="mb-6 font-bold">Welcome Back</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register(FIELD_NAME.ACCOUNT_ID, { required: true })}
            label='Account ID'
            placeholder={"Enter your account ID"}
          />

          <PasswordField
            {...register(FIELD_NAME.PASSWORD, { required: true })}
            label='Password'
            placeholder={"Enter your Password"}
          />

          {/* TODO: change to component */}
          <div className='flex justify-between'>
            <span className='font-light text-xs'>{'Remember me'}</span>
            <span className='font-light text-xs'>{'Forget your password'}</span>
          </div>

          <Button
            type='submit'
            pill
            className='mt-4'
            disabled={!isValid}
          >
            {'Log In'}
          </Button>
        </form>
      </div>
    </main>
  );
}
