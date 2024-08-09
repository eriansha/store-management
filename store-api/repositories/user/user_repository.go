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

func (r *UserRepository) Authenticate(email, password string) (*User, error) {
	var row *sql.Row
	var err error

	query := "SELECT id, merchant_id, account_number, full_name, email, last_login FROM USERS WHERE email = ? && password_digest = ?"
	row = r.db.QueryRow(query, email, password)

	if err != nil {
		return nil, err
	}

	user := &User{}
	err = row.Scan(&user.ID, &user.MerchantID, &user.AccountNumber, &user.FullName, &user.Email, &user.LastLogin)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) GetUser(id int64) (*User, error) {
	var row *sql.Rows
	var err error

	query := "SELECT * FROM USERS WHERE id = ? LIMIT 1"
	row, err = r.db.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	user := &User{}
	err = row.Scan(&user.ID, &user.MerchantID, &user.AccountNumber, &user.FullName, &user.Email, &user.LastLogin)
	if err != nil {
		return nil, err
	}

	return user, nil
}
