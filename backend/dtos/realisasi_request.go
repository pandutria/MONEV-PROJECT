package dtos

type CreateRealisasiRequest struct {
	ScheduleHeaderId uint     `json:"schedule_header_id"`
}

type CreateRealisasiDetailRequest struct {
	RealisasiHeaderId uint     `form:"realisasi_header_id"`
	WeekNumber        *string     `form:"week_number"`
	Value             *string `form:"value"`
}

type UpdateRealisasiRequest struct {
	RevisionText *string `json:"revision_text" binding:"required"`
}

type CreateRealisasiItemRequest struct {
	RealisasiHeaderId uint `json:"realisasi_header_id" binding:"required"`
	ScheduleItemId    uint `json:"schedule_item_id" binding:"required"`
}

type CreateRealisasiWeekRequest struct {
	RealisasiItemId uint    `form:"realisasi_item_id" binding:"required"`
	WeekNumber      int     `form:"week_number" binding:"required,min=1"`
	Value           float64 `form:"value" binding:"required"`
	// Evidence        *string  `json:"evidence"`
}

type UpdateRealisasiWeekRequest struct {
	Value    float64 `json:"value" binding:"required"`
	Evidence *string `json:"evidence"`
}
