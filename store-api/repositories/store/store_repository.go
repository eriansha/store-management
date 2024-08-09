package store

import (
	"database/sql"
)

type StoreRepository struct {
	db *sql.DB
}

func NewStoreRepository(db *sql.DB) *StoreRepository {
	return &StoreRepository{db: db}
}

func (r *StoreRepository) GetStores(merchantID int64) ([]Store, error) {
	var rows *sql.Rows
	var err error

	query := "SELECT id, official_company_name, brand_name, store_scale, store_category FROM stores WHERE merchant_id = ?"
	rows, err = r.db.Query(query, merchantID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var stores []Store

	for rows.Next() {
		var store Store
		err := rows.Scan(
			&store.ID,
			&store.CompanyName,
			&store.BrandName,
			&store.Scale,
			&store.Category)

		if err != nil {
			return nil, err
		}
		stores = append(stores, store)
	}

	return stores, nil
}

func (r *StoreRepository) Add(merchantID int64, companyName, brand_name, scale, category string) error {
	var rows *sql.Rows
	var err error

	query := `INSERT INTO
		stores(merchant_id, official_company_name, brand_name, store_scale, store_category)
		values (?, ?, ?, ?, ?)`

	rows, err = r.db.Query(query, merchantID, companyName, brand_name, scale, category)

	if err != nil {
		return err
	}

	defer rows.Close()

	return nil
}
