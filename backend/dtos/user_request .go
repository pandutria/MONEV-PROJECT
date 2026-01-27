package dtos

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password" `
}

type CreateUserRequest struct {
	Email    string `form:"email" binding:"required"`
	Password string `form:"password"`
	RoleId   uint   `form:"role_id" binding:"required"`

	PokjaGroupsId *uint `form:"pokja_group_id"`

	FullName *string `form:"fullname"`
	IsActive *bool   `form:"is_active"`

	Nik     *string `form:"nik"`
	Nip     *string `form:"nip"`
	Group   *string `form:"group"`
	Address *string `form:"address"`

	PhoneNumber     *string `form:"phone_number"`
	OpdOrganization *string `form:"opd_organization"`

	SkNumber         *string `form:"sk_number"`
	PbjNumber        *string `form:"pbj_number"`
	CompetenceNumber *string `form:"competence_number"`

	SatkerCode *uint64 `form:"satker_code"`
	GpId       *uint64 `form:"gp_id"`
}

type UpdatePasswordRequest struct {
	Password string `json:"password"`
}
