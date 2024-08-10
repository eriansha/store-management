"use client"

import { usePathname } from 'next/navigation'
import { HomeIcon, BuildingStorefrontIcon, PresentationChartLineIcon, WalletIcon, UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Fragment, useState } from 'react'
import ConfirmationModal from '../modals/ConfirmationModal'
import { useAuth } from '@/provider/AuthProvider'
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
    label: 'logout'
  }
]

export default function BottomNavigation() {
  const { logout } = useAuth()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleConfirm = () => logout()

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className='fixed bottom-0 w-full'>
        <nav className='bg-violet-50 shadow-sm flex justify-evenly items-center pb-3 pt-3'>
          {
            navs.map((nav) => {
              const { Icon } = nav

              return (
                <div key={nav.href}>
                  {
                    nav.label === 'logout'
                      ? (
                        <div className={cn(
                          'flex flex-col items-center justify-end',
                          'text-gray-500',
                          [
                            pathname === nav.href && [
                              "text-violet-500"
                            ]
                          ]
                        )}>
                          <Icon
                            onClick={() => setIsOpen(true)}
                            className='size-5'
                          />
                          <span className='text-[10px]'>
                            {nav.label}
                          </span>
                        </div>
                      )
                      : (
                      <Link
                        href={nav.href}
                        className={cn(
                          'size-5',
                          'text-gray-500',
                          [
                            pathname === nav.href && [
                              "text-violet-500"
                            ]
                          ]
                        )}
                        >
                          <div className='flex flex-col items-center justify-end'>
                            <Icon className="size-6">
                              {nav.label}
                            </Icon>
                            <span className='text-[10px]'>
                              {nav.label}
                            </span>
                          </div>
                        </Link>
                      )
                  }
                </div>
              )
            })
          }
        </nav>
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
