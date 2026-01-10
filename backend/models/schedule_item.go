package models

import "time"

type ScheduleItem struct {
	Id uint `gorm:"primaryKey" json:"id"`

	ScheduleHeaderId uint            `gorm:"not null" json:"schedule_header_id"`
	ScheduleHeader   *ScheduleHeader `gorm:"foreignKey:ScheduleHeaderId" json:"schedule_header,omitempty"`

	Number      *string  `json:"number"`
	Description *string  `json:"description"`
	TotalPrice  *float64 `json:"total_price"`
	Weight      *float64 `json:"weight"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Weeks []ScheduleWeek `gorm:"foreignKey:ScheduleItemId" json:"schedule_weeks,omitempty"`
}
