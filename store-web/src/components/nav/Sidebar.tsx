"use client"

import { cn } from '@/lib/utils'
import { useAuth } from '@/provider/AuthProvider'
import { BuildingStorefrontIcon, HomeIcon, PresentationChartLineIcon, UserIcon, WalletIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ConfirmationModal from '../modals/ConfirmationModal'
import useTranslation from '@/hooks/UseTranslation'

const navs = [
  {
    href: "/dashboard/home",
    Icon: HomeIcon,
    label: 'Dashboard'
  },
  {
    href: "/dashboard/home/stores",
    Icon: BuildingStorefrontIcon,
    label: 'Store'
  },
  {
    href: "/dashboard/home/transactions",
    Icon: PresentationChartLineIcon,
    label: 'Transactions'
  },
  {
    href: "/dashboard/home/settlements",
    Icon: WalletIcon,
    label: 'Settlement'
  },
  {
    href: "/",
    Icon: UserIcon,
    label: 'Logout'
  }
]

const Sidebar = () => {
  const { logout } = useAuth()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()

  const handleConfirm = () => logout()

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="w-64 bg-purple-50 h-screen fixed left-0 top-0 p-4">
        {/* Sidebar content goes here */}
        <h2 className='text-xl font-bold text-violet-600 mb-6'>Store Dashboard</h2>
        <ul>
          {
            navs.map((nav) => {
              const { Icon } = nav

              return (
                <li
                  className='ml-3 mb-4'
                  key={nav.href}
                >
                  {
                    nav.label === 'Logout'
                      ? (
                        <div
                          className={cn(
                            'flex gap-3',
                            'text-gray-500',
                            'cursor-pointer'
                          )}
                          onClick={() => setIsOpen(true)}
                        >
                          <Icon className="size-5" />
                          {nav.label}
                      </div>
                      )
                      : (
                        <Link
                          className={cn(
                            'flex gap-3',
                            'text-gray-500',
                            [
                              path === nav.href && [
                                "text-violet-600"
                              ]
                            ]
                          )}
                          href={nav.href}
                        >
                          <Icon className="size-5" />
                          {nav.label}
                        </Link>
                      )
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        message={t("CONFIRM_LOGOUT_DESC")}
        onConfirm={handleConfirm}
        onClose={handleClose}
        okLabel={t("LOG_OUT")}
        cancelLabel={t("CANCEL")}
      />
    </>
  )
}

export default Sidebar
