package models

type RabHeader struct {
	Id          uint  `gorm:"primaryKey" json:"id"`
	RabGroupId  *uint `gorm:"index;" json:"rab_group_id"`
	AlasanCount *int  `json:"alasan_count"`

	AlasanText   *string `json:"alasan_text"`
	Program      *string `json:"program"`
	TanggalMulai *string `json:"tanggal_mulai"`
	TanggalAkhir *string `json:"tanggal_akhir"`

	DataEntryId uint       `json:"data_entry_id"`
	DataEntry   *DataEntry `gorm:"foreignKey:DataEntryId" json:"data_entry,omitempty"`

	CreatedById uint  `json:"created_by_id"`
	CreatedBy   *User `gorm:"foreignKey:CreatedById" json:"created_by,omitempty"`

	RabDetails []RabDetail `gorm:"foreignKey:RabHeaderId" json:"rab_details,omitempty"`
}
