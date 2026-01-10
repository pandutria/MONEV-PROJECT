package models

type RealisasiWeek struct {
	Id              uint `gorm:"primaryKey" json:"id"`
	RealisasiItemId uint `gorm:"not null" json:"realisasi_item_id"`

	WeekNumber int     `json:"week_number"`
	Value      float64 `json:"value"`
	Evidence   *string `json:"evidence,omitempty"`
}
