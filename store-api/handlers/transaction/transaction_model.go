package transaction

type TransactionInfo struct {
	TodayDate               string  `json:"today_date"`
	TodayIncome             float64 `json:"today_income"`
	TodayTotalTransaction   int64   `json:"today_total_transaction"`
	TotalMonthlyIncome      float64 `json:"total_monthly_incom"`
	TotalMonthlyTransaction int64   `json:"total_monthly_transaction"`
}
