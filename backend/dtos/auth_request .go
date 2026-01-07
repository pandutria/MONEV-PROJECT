package dtos

type LoginRequest struct {
	Email string `json:"email" binding:"required"`
	Passw string `json:"passw" binding:"required"`
}

type CreateUserRequest struct {
	FullName string `json:"fullname" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	IsActive bool `json:"is_active"`

	Nik  string `json:"nik" binding:"required"`
	Nip  string `json:"nip" binding:"required"`
	Group *string `json:"group" binding:"required"`

	RoleId uint `json:"role_id" binding:"required"`

	PhoneNumber     string `json:"phone_number" binding:"required"`
	OpdOrganization *string `json:"opd_organization" binding:"required"`

	SkNumber           *string `json:"sk_number"`
	SkFile             *string `json:"sk_file"`
	PbjNumber          *string `json:"pbj_number"`
	PbjFile            *string `json:"pbj_file"`
	CompetenceNumber   *string `json:"competence_number"`
	CompetenceFile     *string `json:"competence_file"`
	PhotoFile          *string `json:"file_photo"`
	SatkerCode         *uint64 `json:"satker_code"`
	GpId               *uint64 `json:"gp_id"`
}