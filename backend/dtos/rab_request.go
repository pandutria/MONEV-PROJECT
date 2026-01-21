package dtos

type CreateRabHeaderRequest struct {
	RabGroupId   *uint   `json:"rab_group_id"`
	AlasanText   *string `json:"alasan_text"`
	Program      *string `json:"program"`
	TanggalMulai *string `json:"tanggal_mulai"`
	TanggalAkhir *string `json:"tanggal_akhir"`
	DataEntryId  uint    `json:"data_entry_id"`
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
