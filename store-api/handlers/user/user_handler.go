package user

import (
	"database/sql"
	"encoding/json"
	"net/http"
	userRepo "store-api/repositories/user"
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

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	repo = userRepo.NewUserRepository(db)
	user, err := repo.Authenticate(userRequest.Email, userRequest.Password)
	if err != nil {
		http.Error(w, "Invalid account ID or password", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
