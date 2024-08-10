package store

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"store-api/handlers/user"
	storeRepo "store-api/repositories/store"
	"store-api/utils"
)

var repo *storeRepo.StoreRepository

func GetStoresHandler(w http.ResponseWriter, r *http.Request) {
	merchantID, ok := r.Context().Value(user.MerchantIDKey).(int64)
	if !ok {
		http.Error(w, "Failed to get user ID from context", http.StatusInternalServerError)
		return
	}

	// TODO: create db abstraction
	db, err := sql.Open(
		utils.GetEnvConfig().DB_DRIVER,
		utils.GetEnvConfig().DB_USER+":"+utils.GetEnvConfig().DB_PASS+"@/"+utils.GetEnvConfig().DB_NAME)
	if err != nil {
		panic(err.Error())
	}

	repo = storeRepo.NewStoreRepository(db)
	searchParam := r.URL.Query().Get("search")
	stores, err := repo.GetStores(merchantID, searchParam)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stores)
}

func AddStoreHandler(w http.ResponseWriter, r *http.Request) {
	merchantID, ok := r.Context().Value(user.MerchantIDKey).(int64)
	if !ok {
		http.Error(w, "Failed to get user ID from context", http.StatusInternalServerError)
		return
	}

	// TODO: create db abstraction
	db, err := sql.Open(
		utils.GetEnvConfig().DB_DRIVER,
		utils.GetEnvConfig().DB_USER+":"+utils.GetEnvConfig().DB_PASS+"@/"+utils.GetEnvConfig().DB_NAME)
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	// Parse JSON data from the request body
	var store storeRepo.Store
	json.NewDecoder(r.Body).Decode(&store)

	repo = storeRepo.NewStoreRepository(db)
	err = repo.Add(merchantID, store.CompanyName, store.BrandName, store.Scale, store.Category)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
