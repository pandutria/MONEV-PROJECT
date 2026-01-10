package models

type RealisasiWeek struct {
	Id              uint `gorm:"primaryKey" json:"id"`
	RealisasiItemId uint `gorm:"not null" json:"realisasi_item_id"`

	WeekNumber int     `form:"week_number"`
	Value      float64 `form:"value"`
	Evidence   *string `form:"evidence,omitempty"`
}
