package models

type RealisasiDetail struct {
	Id                uint `gorm:"primaryKey" json:"id"`
	RealisasiHeaderId uint `gorm:"not null" json:"realisasi_header_id"`

	WeekNumber *int     `json:"week_number"`
	Value      *float64 `json:"value"`
	BuktiFile  *string  `json:"bukti_file"`
}
