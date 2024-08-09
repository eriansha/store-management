package user

type User struct {
	ID             int64  `json:"id"`
	MerchantID     string `json:"merchant_id"`
	AccountNumber  string `json:"account_number"`
	FullName       string `json:"full_name"`
	Email          string `json:"email"`
	PasswordDigest string `json:"password_digest"`
	LastLogin      string `json:"last_login"`
}
