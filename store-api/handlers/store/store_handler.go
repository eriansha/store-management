package store

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"store-api/repositories/store"
	storeRepo "store-api/repositories/store"
)

const (
	dbDriver = "mysql"
	dbUser   = "root"
	dbPass   = "root"
	dbName   = "store_management"
)

var repo *storeRepo.StoreRepository

func GetStoresHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: create db abstraction
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}

	repo = storeRepo.NewStoreRepository(db)

	// TODO: change hardcoded merchant ID from JWT

	searchParam := r.URL.Query().Get("search")
	stores, err := repo.GetStores(1, searchParam)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stores)
}

func AddStoreHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: create db abstraction
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	// Parse JSON data from the request body
	var store store.Store
	json.NewDecoder(r.Body).Decode(&store)

	repo = storeRepo.NewStoreRepository(db)

	// TODO: change hardcoded merchant ID from JWT
	err = repo.Add(1, store.CompanyName, store.BrandName, store.Scale, store.Category)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
