package models

type PokjaGroups struct {
	Id   uint   `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}
