// TODO: rename to auth_model

package user

import (
	"store-api/repositories/merchant"
	"store-api/repositories/user"

	"github.com/dgrijalva/jwt-go"
)

type UserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

type LoginResponse struct {
	AccessToken string            `json:"access_token"`
	User        user.User         `json:"user"`
	Merchant    merchant.Merchant `json:"merchant"`
}
