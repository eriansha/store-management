package user

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"store-api/common"
	merchantRepo "store-api/repositories/merchant"
	userRepo "store-api/repositories/user"
	"store-api/utils"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

var newUserRepo *userRepo.UserRepository
var newMerchantRepo *merchantRepo.MerchantRepository

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: create db abstraction
	db, err := sql.Open(
		utils.GetEnvConfig().DB_DRIVER,
		utils.GetEnvConfig().DB_USER+":"+utils.GetEnvConfig().DB_PASS+"@/"+utils.GetEnvConfig().DB_NAME)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	// Parse JSON data from the request data
	var userRequest UserRequest
	if err := json.NewDecoder(r.Body).Decode(&userRequest); err != nil {
		customErr := common.NewCustomError("Invalid request body", http.StatusBadRequest, err.Error())
		common.SendErrorResponse(w, customErr)
		return
	}

	newUserRepo = userRepo.NewUserRepository(db)
	newMerchantRepo = merchantRepo.NewMerchantRepository(db)
	var user *userRepo.User

	user, err = validateLogin(userRequest.Email, userRequest.Password)
	if err != nil {
		customErr, ok := err.(*common.CustomError)
		if !ok {
			customErr = common.NewCustomError("Internal server error", http.StatusInternalServerError, err.Error())
		}
		common.SendErrorResponse(w, customErr)
		return
	}

	merchant, err := newMerchantRepo.GetMerchant(user.ID)
	if err != nil {
		customErr := common.NewCustomError("Internal server error", http.StatusInternalServerError, "Merchant is not identified")
		common.SendErrorResponse(w, customErr)
		return
	}

	// Create token
	expirationTime := time.Now().Add(15 * time.Minute)
	claims := &Claims{
		Username:   user.Email,
		MerchantID: merchant.ID,
		UserID:     user.ID,
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
		customErr := common.NewCustomError("Internal server error", http.StatusInternalServerError, err.Error())
		common.SendErrorResponse(w, customErr)
		return
	}

	userResponse := UserResponse{
		ID:            user.ID,
		AccountNumber: user.AccountNumber,
		FullName:      user.FullName}

	response := LoginResponse{
		AccessToken: tokenString,
		User:        userResponse,
		Merchant:    *merchant,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// validateLogin checks if the username and password are valid
func validateLogin(email string, password string) (*userRepo.User, error) {
	storedUser, err := newUserRepo.GetUser(email)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, common.NewCustomError(
				"Invalid username or password",
				http.StatusUnauthorized,
				"Invalid username or password",
			)
		} else {
			return nil, errors.New("something wrong when login")
		}
	}

	// Compare the provided password with the stored hash
	if err := bcrypt.CompareHashAndPassword(
		[]byte(storedUser.PasswordDigest),
		[]byte(password)); err != nil {
		return nil, common.NewCustomError(
			"Invalid username or password",
			http.StatusUnauthorized,
			"Invalid username or password",
		)
	}

	return storedUser, nil
}
