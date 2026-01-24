package models

import "time"

type RealisasiHeader struct {
	Id               uint `gorm:"primaryKey"`
    ScheduleHeaderId uint `json:"schedule_header_id"`

    CreatedById uint
    CreatedAt   time.Time

	ScheduleHeader ScheduleHeader `gorm:"foreignKey:ScheduleHeaderId" json:"schedule,omitempty"`
	Details []RealisasiDetail `gorm:"foreignKey:RealisasiHeaderId" json:"detail,omitempty"`
}
