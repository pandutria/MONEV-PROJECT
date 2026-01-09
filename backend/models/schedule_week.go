package models

type ScheduleWeek struct {
	Id uint `gorm:"primaryKey" json:"id"`

	ScheduleItemId uint          `json:"schedule_item_id"`
	ScheduleItem   *ScheduleItem `json:"schedule_item,omitempty"`

	WeekNumber int     `json:"week_number"`
	Value      float64 `json:"value"`
}
