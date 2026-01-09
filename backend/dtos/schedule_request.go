package dtos

import "time"

type CreateScheduleRequest struct {
	RabId     uint       `json:"rab_id" binding:"required"`
	StartDate *time.Time `json:"start_date" binding:"required"`
	EndDate   *time.Time `json:"end_date" binding:"required"`
}

type UpdateScheduleRequest struct {
	RevisionText *string `json:"revision_text" binding:"required"`
}

type CreateScheduleItemRequest struct {
	ScheduleHeaderId uint    `json:"schedule_header_id" binding:"required"`
	Number           *string  `json:"number" binding:"required"`
	Description      *string  `json:"description" binding:"required"`
	TotalPrice       *float64 `json:"total_price" binding:"required"`
	Weight           *float64 `json:"weight" binding:"required"`
}

type CreateScheduleWeekRequest struct {
	ScheduleItemId uint    `json:"schedule_item_id" binding:"required"`
	WeekNumber     int     `json:"week_number" binding:"required"`
	Value          float64 `json:"value" binding:"required"`
}