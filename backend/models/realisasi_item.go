package models

type RealisasiItem struct {
	Id                uint `gorm:"primaryKey" json:"id"`
	RealisasiHeaderId uint `gorm:"not null" json:"realisasi_header_id"`
	ScheduleItemId    uint `gorm:"not null" json:"schedule_item_id"`

	Weeks []RealisasiWeek `gorm:"foreignKey:RealisasiItemId" json:"weeks,omitempty"`
}
