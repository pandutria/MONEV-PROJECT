package models

type RabDetail struct {
	Id          uint       `gorm:"primaryKey" json:"id"`
	RabHeaderId uint       `gorm:"not null" json:"rab_header_id"`
	RabHeader   *RabHeader `gorm:"foreignKey:RabHeaderId" json:"rab_header,omitempty"`
	Description string     `json:"description"`
	Volume      float64    `json:"volume"`
	Unit        string     `json:"unit"`
	UnitPrice   float64    `json:"unit_price"`
	Total       float64    `json:"total"`
}
