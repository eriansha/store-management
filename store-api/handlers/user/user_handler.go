package user

import (
	"database/sql"
	"encoding/json"
	"net/http"
	merchantRepo "store-api/repositories/merchant"
	userRepo "store-api/repositories/user"
	"store-api/utils"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

const (
	dbDriver = "mysql"
	dbUser   = "root"
	dbPass   = "root"
	dbName   = "store_management"
)

var repo *userRepo.UserRepository
var mRepo *merchantRepo.MerchantRepository

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: create db abstraction
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	// Parse JSON data from the request data
	var userRequest UserRequest
	json.NewDecoder(r.Body).Decode(&userRequest)

	repo = userRepo.NewUserRepository(db)
	mRepo = merchantRepo.NewMerchantRepository(db)

	user, err := repo.GetUser(userRequest.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordDigest),
		[]byte(userRequest.Password)); err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	merchant, err := mRepo.GetMerchant(user.ID)

	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Create token
	expirationTime := time.Now().Add(15 * time.Minute)
	claims := &Claims{
		Username: user.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			IssuedAt:  time.Now().Unix(),
			Issuer:    "store-management",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	jwtKey := []byte(utils.GetEnvConfig().JWTKey)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	response := LoginResponse{
		AccessToken: tokenString,
		User:        *user,
		Merchant:    *merchant,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
