import clsx, { ClassValue } from 'clsx';
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fetcher function to be used with SWR */
export async function fetcher (url: string, requestInit?: RequestInit) {
  const response = await fetch(url, requestInit);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};
