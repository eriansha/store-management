package transaction

import (
	"encoding/json"
	"net/http"
	"time"
)

func GetInfoHandler(w http.ResponseWriter, r *http.Request) {
	info := TransactionInfo{
		TodayDate:               time.Now().Format("01-Aug-2024"),
		TodayIncome:             432989,
		TodayTotalTransaction:   123,
		TotalMonthlyIncome:      999999999,
		TotalMonthlyTransaction: 999,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(info)
}
