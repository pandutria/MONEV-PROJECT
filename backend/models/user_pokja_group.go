package models

type UserPokjaGroups struct {
	Id            uint `gorm:"primaryKey" json:"id"`
	PokjaGroupsId uint `gorm:"column:pokja_group_id;not null" json:"pokja_group_id"`
	UserId        uint `gorm:"column:user_id;not null" json:"user_id"`

	PokjaGroup *PokjaGroups `gorm:"foreignKey:PokjaGroupsId;references:Id" json:"pokja_group,omitempty"`
	User       *User        `gorm:"foreignKey:UserId;references:Id" json:"user,omitempty"`
}
