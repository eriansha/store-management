package middleware

import (
	"context"
	"net/http"
	"store-api/common"
	"store-api/handlers/user"
	"store-api/utils"
	"strings"

	"github.com/golang-jwt/jwt"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			httpError := common.NewCustomError(
				"Unauthorized",
				http.StatusUnauthorized,
				"Authorization header is required",
			)
			common.SendErrorResponse(w, httpError)
			return
		}

		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) != 2 || strings.ToLower(bearerToken[0]) != "bearer" {
			httpError := common.NewCustomError(
				"Unauthorized",
				http.StatusUnauthorized,
				"Invalid Authorization header format",
			)
			common.SendErrorResponse(w, httpError)
			return
		}

		tokenString := bearerToken[1]

		claims := &user.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(utils.GetEnvConfig().JWTKey), nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				httpError := common.NewCustomError(
					"Unauthorized",
					http.StatusUnauthorized,
					"Invalid token signature",
				)
				common.SendErrorResponse(w, httpError)
				return
			}
			httpError := common.NewCustomError(
				"Unauthorized",
				http.StatusUnauthorized,
				"Invalid Token",
			)
			common.SendErrorResponse(w, httpError)
			return
		}

		if !token.Valid {
			httpError := common.NewCustomError(
				"Invalid token",
				http.StatusUnauthorized,
				"Invalid Authorization header format",
			)
			common.SendErrorResponse(w, httpError)
			return
		}

		// Add user_id to request context
		ctx := context.WithValue(r.Context(), user.UserIDKey, claims.UserID)
		ctx = context.WithValue(ctx, user.MerchantIDKey, claims.MerchantID)

		// Call the next handler with the updated context
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}
