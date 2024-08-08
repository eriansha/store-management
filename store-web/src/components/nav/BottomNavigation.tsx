"use client"

import { usePathname } from 'next/navigation'
import { HomeIcon, BuildingStorefrontIcon, PresentationChartLineIcon, WalletIcon, UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navs = [
  {
    href: "/dashboard/home",
    Icon: HomeIcon
  },
  {
    href: "/dashboard/home/stores",
    Icon: BuildingStorefrontIcon
  },
  {
    href: "/dashboard/home/transactions",
    Icon: PresentationChartLineIcon
  },
  {
    href: "/dashboard/home/settlements",
    Icon: WalletIcon
  },
  {
    href: "/",
    Icon: UserIcon
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-0 w-full'>
      <nav className='bg-gray-50 shadow-sm flex justify-evenly py-3'>
        {
          navs.map((nav) => {
            const { Icon } = nav

            return (
              <Link
                key={nav.href}
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
          })
        }
      </nav>
    </div>
  )
}
