package store

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"store-api/common"
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
	if err := json.NewDecoder(r.Body).Decode(&store); err != nil {
		customErr := common.NewCustomError("Invalid request body", http.StatusBadRequest, err.Error())
		common.SendErrorResponse(w, customErr)
		return
	}

	err = validateNewStore(&store)
	if err != nil {
		customErr := err.(*common.CustomError)
		common.SendErrorResponse(w, customErr)
		return
	}

	repo = storeRepo.NewStoreRepository(db)
	err = repo.Add(merchantID, store.CompanyName, store.BrandName, store.Scale, store.Category)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func validateNewStore(newStore *storeRepo.Store) error {
	if len(newStore.CompanyName) > 100 {
		return common.NewCustomError(
			"Invalid Company Name",
			http.StatusBadRequest,
			"The Official Company Name exceeds the maximum allowed length of 100 characters.",
		)
	}

	if len(newStore.BrandName) > 50 {
		return common.NewCustomError(
			"Invalid Brand Name",
			http.StatusBadRequest,
			"The Brand Name exceeds the maximum allowed length of 50 characters.",
		)
	}

	return nil
}
