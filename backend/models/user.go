package models


type User struct {
	Id uint `gorm:"primaryKey" json:"id"`
    FullName 		string `json:"fullname"`
    Email string  `json:"email"`
    Password string `json:"password"`
    IsActive bool `json:"is_active"`
    Nik 			string `json:"nik"`
    Nip 			string `json:"nip"`
    Group 			*string  `json:"group"`

    RoleId uint `gorm:"not null"`

    SkNumber   			*string  `json:"sk_number"`
    SkFile 			*string `json:"sk_file"`
    Address  		*string `json:"address"`
    PbjNumber            *string  `json:"pbj_number"`
    PbjFile        *string `json:"pbj_file"`
    CompetenceNumber  *string  `json:"competence_number"`
    CompetenceFile *string `json:"competence_file"`
    PhoneNumber     string  `json:"phone_number"`
    PhotoFile *string `json:"file_photo"`
    OpdOrganization *string `json:"opd_organization"`
    SatkerCode        *uint64 `json:"satker_code"`
    GpId           *uint64 `json:"gp_id"`
	Role   Role `gorm:"foreignKey:RoleId;references:Id"`
}