package dtos

type LoginRequest struct {
	Email string `json:"email" binding:"required"`
	Passw string `json:"passw" binding:"required"`
}
