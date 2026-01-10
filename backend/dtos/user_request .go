package dtos

type LoginRequest struct {
	Email string `json:"email" binding:"required"`
	Passw string `json:"passw" binding:"required"`
}

type CreateUserRequest struct {
	FullName *string `form:"fullname" binding:"required"`
	Email    string `form:"email" binding:"required"`
	Password string `form:"password" binding:"required"`
	IsActive *bool   `form:"is_active"`

	Nik     *string  `form:"nik" binding:"required"`
	Nip     *string  `form:"nip" binding:"required"`
	Group   *string `form:"group" binding:"required"`
	Address *string `form:"address" binding:"required"`

	RoleId uint `form:"role_id" binding:"required"`

	PhoneNumber     *string  `form:"phone_number" binding:"required"`
	OpdOrganization *string `form:"opd_organization" binding:"required"`

	SkNumber         *string `form:"sk_number"`
	PbjNumber        *string `form:"pbj_number"`
	CompetenceNumber *string `form:"competence_number"`

	SatkerCode *uint64 `form:"satker_code"`
	GpId       *uint64 `form:"gp_id"`
}