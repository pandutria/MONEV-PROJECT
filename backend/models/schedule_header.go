package models

import "time"

type ScheduleHeader struct {
	Id    uint       `gorm:"primaryKey" json:"id"`
	RabId uint       `gorm:"not null" json:"rab_id"`
	Rab   *RabHeader `gorm:"foreignKey:RabId" json:"rab,omitempty"`

	StartDate     *time.Time `json:"start_date"`
	EndDate       *time.Time `json:"end_date"`
	RevisionCount int        `json:"revision_count"`
	RevisionText  *string    `json:"revision_text"`

	// ScheduleDetails []ScheduleDetail `gorm:"foreignKey:ScheduleHeaderId" json:"schedule_details,omitempty"`

	CreatedById uint      `json:"created_by_id"`
	CreatedBy   *User     `gorm:"foreignKey:CreatedById" json:"created_by,omitempty"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
