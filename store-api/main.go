package main

import (
	"log"
	"net/http"
	"store-api/handlers/store"
	"store-api/handlers/transaction"
	"store-api/handlers/user"
	"store-api/utils"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()
	CORSDebugVar := utils.GetEnvConfig().CORSDebug

	// define HTTP routes using the router
	r.HandleFunc("/api/login", user.LoginHandler).Methods("POST")
	r.HandleFunc("/api/transaction-info", transaction.GetInfoHandler).Methods("GET")
	r.HandleFunc("/api/stores", store.GetStoresHandler).Methods("GET")
	r.HandleFunc("/api/stores", store.AddStoreHandler).Methods("POST")

	// CORS middleware
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "X-Requested-With", "Accept", "Origin", "Authorization"},
		AllowCredentials: true,
		Debug:            CORSDebugVar == "true" || CORSDebugVar == "1",
	})

	// Wrap the router with the CORS middleware
	handler := corsMiddleware.Handler(r)

	log.Println("Server listening on :8090")
	log.Fatal(http.ListenAndServe(":8090", handler))
}
