package user

import (
	"store-api/repositories/merchant"

	"github.com/golang-jwt/jwt"
)

type contextKey string

const UserIDKey contextKey = "user_id"
const MerchantIDKey contextKey = "merchant_id"

type UserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	UserID     int64  `json:"user_id"`
	MerchantID int64  `json:"merchant_id"`
	Username   string `json:"username"`
	jwt.StandardClaims
}

type UserResponse struct {
	ID            int64  `json:"id"`
	AccountNumber string `json:"account_number"`
	FullName      string `json:"full_name"`
}

type LoginResponse struct {
	AccessToken string            `json:"access_token"`
	User        UserResponse      `json:"user"`
	Merchant    merchant.Merchant `json:"merchant"`
}
