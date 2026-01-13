package models

type RabHeader struct {
	Id            uint         `gorm:"primaryKey" json:"id"`
	TenderId      uint         `gorm:"not null" json:"tender_id"`
	Tender        *TenderPaket `gorm:"foreignKey:TenderId" json:"tender,omitempty"`
	Program       *string      `json:"program"`
	Activity      *string      `json:"activity"`
	StartDate     *string      `json:"start_date"`
	EndDate       *string      `json:"end_date"`
	RevisionCount int          `json:"revision_count"`
	RevisionText  *string      `json:"revision_text"`
	CreatedById   *uint        `json:"created_by_id"`
	CreatedBy     *User        `gorm:"foreignKey:CreatedById;references:Id" json:"created_by,omitempty"`

	RabDetails []RabDetail `gorm:"foreignKey:RabHeaderId" json:"rab_details,omitempty"`
}
