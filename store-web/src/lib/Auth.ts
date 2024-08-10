import { jwtDecode } from 'jwt-decode'

export interface DecodedToken {
  exp: number
  username: string
  // TODO: Add other fields from your JWT payload
}

/**
 * To validate token based on exp
 * caveat:
 * It only check whether the expired time is not exceed. it doesn't validate the token
 * We should validate the token in server-side logic
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch {
    return false
  }
}
