package models

import "time"

type RealisasiHeader struct {
	Id               uint `gorm:"primaryKey" json:"id"`
	ScheduleHeaderId uint `gorm:"not null" json:"schedule_header_id"`

	RevisionCount int     `json:"revision_count"`
	RevisionText  *string `json:"revision_text"`
	Status        *string `json:"status"`

	CreatedById uint      `json:"created_by_id"`
	CreatedAt   time.Time `json:"created_at"`

	Items []RealisasiItem `gorm:"foreignKey:RealisasiHeaderId" json:"items,omitempty"`
}
