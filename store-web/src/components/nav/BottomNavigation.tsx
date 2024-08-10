"use client"

import { usePathname } from 'next/navigation'
import { HomeIcon, BuildingStorefrontIcon, PresentationChartLineIcon, WalletIcon, UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Fragment, useState } from 'react'
import ConfirmationModal from '../modals/ConfirmationModal'
import { useAuth } from '@/provider/AuthProvider'

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
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleConfirm = () => logout()

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className='fixed bottom-0 w-full'>
        <nav className='bg-gray-50 shadow-sm flex justify-evenly py-3'>
          {
            navs.map((nav) => {
              const { Icon } = nav

              return (
                <Fragment key={nav.href}>
                  {
                    nav.label === 'logout'
                      ? (
                        <Icon
                          onClick={() => setIsOpen(true)}
                          className={cn(
                            'size-6',
                            'text-gray-500',
                            [
                              pathname === nav.href && [
                                "text-green-500"
                              ]
                            ]
                          )}
                        />
                      )
                      : (
                      <Link
                          href={nav.href}
                        >
                          <Icon
                            className={cn(
                              'size-6',
                              'text-gray-500',
                              [
                                pathname === nav.href && [
                                  "text-green-500"
                                ]
                              ]
                            )}
                          />
                        </Link>
                      )
                  }
                </Fragment>
              )
            })
          }
        </nav>
      </div>

      <ConfirmationModal
        isOpen={isOpen}
        message={"Are you sure you want to logout? You'll need to login again to access your account."}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  )
}
