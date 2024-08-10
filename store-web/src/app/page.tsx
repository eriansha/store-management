"use client"

import { useState } from 'react'
import LoginForm from './LoginForm'
import ForgetPasswordForm from './ForgetPasswordForm'


export default function Home() {
  const [enableForgetPassword, setEnableForgetPassword] = useState(false)

  const toggleForgetPassword = () => {
    setEnableForgetPassword((prev) => !prev)
  }

  return (
    <main className="flex items-center justify-center h-screen bg-emerald-50">
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white shadow-sm border border-color-slate-100 rounded-lg">
        {
          enableForgetPassword
            ? <ForgetPasswordForm toggleForgetPassword={toggleForgetPassword} />
            : <LoginForm toggleForgetPassword={toggleForgetPassword} />
        }
      </div>
    </main>
  );
}
