package user

import (
	"database/sql"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) GetUser(email string) (*User, error) {
	var row *sql.Row
	var err error

	query := `SELECT
		id,
		merchant_id,
		account_number,
		full_name,
		email,
		password_digest,
		last_login
		FROM users WHERE email = ?`
	row = r.db.QueryRow(query, email)

	user := &User{}
	err = row.Scan(
		&user.ID,
		&user.MerchantID,
		&user.AccountNumber,
		&user.FullName,
		&user.Email,
		&user.PasswordDigest,
		&user.LastLogin)

	if err != nil {
		return nil, err
	}

	return user, nil
}
