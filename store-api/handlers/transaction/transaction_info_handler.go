package transaction

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func GetInfoHandler(w http.ResponseWriter, r *http.Request) {
	info := TransactionInfo{
		TodayDate:               time.Now().Format("2 Jan 2006"),
		TodayIncome:             432989,
		TodayTotalTransaction:   123,
		TotalMonthlyIncome:      999999999,
		TotalMonthlyTransaction: 999,
		TotalStore:              5,
	}

	log.Println("Fetch transcation info")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(info)
}
