package models

import "time"

type RealisasiHeader struct {
	Id               uint `gorm:"primaryKey" json:"id"`
	ScheduleHeaderId uint `json:"schedule_header_id"`

	CreatedById uint `json:"user_id"`
	CreatedAt   time.Time `json:"created_at"`

	ScheduleHeader ScheduleHeader    `gorm:"foreignKey:ScheduleHeaderId" json:"schedule,omitempty"`
	Details        []RealisasiDetail `gorm:"foreignKey:RealisasiHeaderId" json:"detail,omitempty"`
}
