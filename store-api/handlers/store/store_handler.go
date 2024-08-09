package store

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"store-api/repositories/store"
)

const (
	dbDriver = "mysql"
	dbUser   = "root"
	dbPass   = "root"
	dbName   = "store_management"
)

var storeRepo *store.StoreRepository

func GetStoresHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: create db abstraction
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}

	storeRepo = store.NewStoreRepository(db)

	// TODO: change hardcoded merchant ID from JWT

	stores, err := storeRepo.GetStores(1)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stores)
}
