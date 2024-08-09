package main

import (
	"log"
	"net/http"
	"store-api/handlers/store"
	"store-api/handlers/transaction"
	"store-api/handlers/user"
	"store-api/middleware"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// define HTTP routes using the router
	r.HandleFunc("/api/login", user.LoginHandler).Methods("POST")
	r.HandleFunc("/api/transaction-info", transaction.GetInfoHandler).Methods("GET")
	r.HandleFunc("/api/stores", store.GetStoresHandler).Methods("GET")
	r.HandleFunc("/api/stores", store.AddStoreHandler).Methods("POST")

	// Apply the CORS middleware to all routes
	r.Use(middleware.Cors)

	log.Println("Server listening on :8090")
	log.Fatal(http.ListenAndServe(":8090", r))
}
