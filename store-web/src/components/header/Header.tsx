"use client"

import LanguageSwitcher from '../fields/LanguageSwitcher'

const Header: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className='bg-white sticky top-0 flex gap-3 justify-between shadow-sm w-full py-4 px-4'>
      {children}

      <div className='ml-auto'>
        <LanguageSwitcher/>
      </div>
    </div>
  )
}

export default Header
