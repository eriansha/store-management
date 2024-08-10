package merchant

import (
	"database/sql"
)

type MerchantRepository struct {
	db *sql.DB
}

func NewMerchantRepository(db *sql.DB) *MerchantRepository {
	return &MerchantRepository{db: db}
}

func (r *MerchantRepository) GetMerchant(ID int64) (*Merchant, error) {
	var row *sql.Row
	var err error

	query := `SELECT
		id,
		name
		FROM merchants
		WHERE id = ?`
	row = r.db.QueryRow(query, ID)

	merchant := &Merchant{}
	err = row.Scan(
		&merchant.ID,
		&merchant.Name)

	if err != nil {
		return nil, err
	}

	return merchant, nil
}
