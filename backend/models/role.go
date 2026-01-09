package models

type Role struct {
	Id   uint   `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}
