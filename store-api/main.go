package main

import (
	"log"
	"net/http"
	"store-api/handlers/store"
	"store-api/handlers/transaction"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// define HTTP routes using the router
	r.HandleFunc("/api/transaction-info", transaction.GetInfoHandler).Methods("GET")
	r.HandleFunc("/api/stores", store.GetStoresHandler).Methods("GET")

	log.Println("Server listening on :8090")
	log.Fatal(http.ListenAndServe(":8090", r))
}
