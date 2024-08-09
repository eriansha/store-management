package user

import (
	"database/sql"
	"encoding/json"
	"net/http"
	userRepo "store-api/repositories/user"

	"golang.org/x/crypto/bcrypt"
)

const (
	dbDriver = "mysql"
	dbUser   = "root"
	dbPass   = "root"
	dbName   = "store_management"
)

var repo *userRepo.UserRepository

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

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
