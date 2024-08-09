package store

type StoreScale string

const (
	Small       StoreScale = "small"
	Medium      StoreScale = "medium"
	MediumLarge StoreScale = "medium_large"
	Large       StoreScale = "large"
)

type Store struct {
	ID          int    `json:"id"`
	CompanyName string `json:"official_company_name"`
	BrandName   string `json:"brand_name"`
	Scale       string `json:"store_scale"`
	Category    string `json:"store_category"`
}
