"use client"

import { cn } from '@/lib/utils'
import { BuildingStorefrontIcon, HomeIcon, PresentationChartLineIcon, UserIcon, WalletIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

const Sidebar = () => {
  const path = usePathname()

  return (
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
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar
