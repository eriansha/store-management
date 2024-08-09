"use client"

import Button from '@/components/buttons/Button'
import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-emerald-50">
      {/* FIXME: scrolling issue */}
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white shadow-sm border border-color-slate-100 rounded-lg">
        <h5 className="mb-6 font-bold">Welcome Back</h5>

        {/* TODO: use form */}
        <InputField
          label='Account ID'
          placeholder={"Enter your account ID"}
        />

        <PasswordField
          label='Password'
          placeholder={"Enter your Password"}
        />

        {/* TODO: change to component */}
        <div className='flex justify-between'>
          <span className='font-light text-xs'>{'Remember me'}</span>
          <span className='font-light text-xs'>{'Forget your password'}</span>
        </div>

        <Button
          pill
          className='mt-4'
        >
          {'Log In'}
        </Button>
      </div>
    </main>
  );
}
