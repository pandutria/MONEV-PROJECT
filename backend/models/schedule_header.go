package models

import "time"

type ScheduleHeader struct {
	Id              uint  `gorm:"primaryKey" json:"id"`
	RabId           uint  `gorm:"not null" json:"rab_id"`
	ScheduleGroupId *uint `gorm:"index" json:"schedule_group_id"`

	AlasanCount *int    `json:"alasan_count"`
	AlasanText  *string `json:"alasan_text"`

	CreatedById uint      `json:"created_by_id"`
	CreatedBy   *User     `gorm:"foreignKey:CreatedById" json:"created_by,omitempty"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	Rab       *RabHeader        `gorm:"foreignKey:RabId" json:"rab,omitempty"`
	Realisasi []RealisasiHeader `gorm:"foreignKey:ScheduleHeaderId" json:"realisasi,omitempty"`
	Items     []ScheduleItem    `gorm:"foreignKey:ScheduleHeaderId" json:"items,omitempty"`
}
