package user

type User struct {
	ID            int    `json:"id"`
	MerchantID    string `json:"merchant_id"`
	AccountNumber string `json:"account_number"`
	FullName      string `json:"full_name"`
	Email         string `json:"email"`
	LastLogin     string `json:"last_login"`
}
