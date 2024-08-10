package user

import (
	"store-api/repositories/merchant"
	"store-api/repositories/user"

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

type LoginResponse struct {
	AccessToken string            `json:"access_token"`
	User        user.User         `json:"user"`
	Merchant    merchant.Merchant `json:"merchant"`
}
