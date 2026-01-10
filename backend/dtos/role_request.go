package dtos

type RoleRequest struct {
	Name string `json:"name" binding:"required"`
}