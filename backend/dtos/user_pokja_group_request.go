package dtos

type CreateAndUpdateUserPokjaRequest struct {
	UserId uint `json:"user_id" binding:"required"`
	PokjaGroupsId uint `json:"pokja_group_id" binding:"required"`
}