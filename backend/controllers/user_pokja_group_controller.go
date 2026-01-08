package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
)

func GetAllUserPokja(c *gin.Context) {
	var pokja []models.UserPokjaGroups
	config.DB.Preload("User.Role").Preload("PokjaGroup").Find(&pokja)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": pokja,
	})
}

func CreateUserPokja(c *gin.Context) {
	var req dtos.CreateAndUpdateUserPokjaRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	pokja := models.UserPokjaGroups{
		PokjaGroupsId: req.PokjaGroupsId,
		UserId: req.UserId,
	}

	err = config.DB.Create(&pokja).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data failed",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data success",
		"data": pokja,
	})
}

func UpdateUserPokja(c *gin.Context) {
	var req dtos.CreateAndUpdateUserPokjaRequest
	id := c.Param("id")

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	var pokja models.UserPokjaGroups
	config.DB.First(&pokja, id)
	pokja.PokjaGroupsId = req.PokjaGroupsId
	pokja.UserId = req.UserId

	err = config.DB.Save(&pokja).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Update data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update data success",
		"data": pokja,
	})
}

func DeleteUserPokja(c *gin.Context) {
	id := c.Param("id")

	var pokja []models.UserPokjaGroups
	config.DB.First(&pokja, id)

	err := config.DB.Delete(&pokja).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": pokja,
	})
}