package dtos

type CreateRabHeaderRequest struct {
	TenderId  uint    `json:"tender_id" binding:"required"`
	Program   *string `json:"program"`
	Activity   *string `json:"acitivity"`
	StartDate *string `json:"start_date"`
	EndDate   *string `json:"end_date"`
}

type UpdateRabHeaderRequest struct {
	RevisionText *string `json:"revision_text"`
}

type CreateRabDetailRequest struct {
	RabHeaderId uint    `json:"rab_header_id" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Volume      float64 `json:"volume" binding:"required"`
	Unit        string  `json:"unit" binding:"required"`
	UnitPrice   float64 `json:"unit_price" binding:"required"`
	Total       float64 `json:"total" binding:"required"`
}
