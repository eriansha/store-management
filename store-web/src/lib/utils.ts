import clsx, { ClassValue } from 'clsx'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { twMerge } from 'tailwind-merge'

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function priceFormat(price: number, withSymbol = true, symbol = 'Rp') {
  if (isNaN(price)) price = 0

  let parsedPrice = price.toString()
  const parsedValue = parsedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return withSymbol
    ? [symbol, parsedValue].join(' ')
    : parsedValue
}

/** Fetcher function to be used with SWR */
export async function fetcher (url: string, requestInit?: RequestInit) {
  const response = await fetch(url, requestInit)
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  return response.json()
}
