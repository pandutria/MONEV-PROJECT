package models

import "time"

type RealisasiHeader struct {
	Id               uint `gorm:"primaryKey"`
    ScheduleHeaderId uint `json:"schedule_header_id"`

    WeekNumber *int     `json:"week_number"` 
    Value      *float64 `json:"value"`       
    BuktiFile   *string `json:"bukti_file"`

    // Status       *string
    // RevisionText *string

    CreatedById uint
    CreatedAt   time.Time
}
