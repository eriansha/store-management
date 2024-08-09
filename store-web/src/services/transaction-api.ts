import { TransactionInfoResponse } from '@/types/transaction'

export async function fetchTransactionInfo(): Promise<TransactionInfoResponse> {
  const response = await fetch(`${process.env.NEXT_BUILD_STORE_API_BASE_URL}/transaction-info`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
