package models

type Rab_Detail struct {
	RABDetailID uint64   `gorm:"primaryKey;autoIncrement" json:"rab_detail_id"`
	RABHeaderID uint64   `gorm:"not null;index" json:"rab_header_id"`
	ParentID    *uint64  `gorm:"type:bigint" json:"parent_id,omitempty"`
	ParentName  string   `gorm:"type:text" json:"parent_name"`
	Description string   `gorm:"type:text" json:"description"`
	Units       *string  `gorm:"size:100" json:"units"`
	Volume      *float64 `gorm:"type:numeric(10,2);default:0" json:"volume"`
	UnitPrice   *float64 `gorm:"type:numeric(32,2);default:0" json:"unit_price"`
	SubTotal    *float64 `gorm:"type:numeric(32,2);default:0" json:"sub_total"`
}