package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
)

func GetAllPokjaGroup(c *gin.Context) {
	var group []models.PokjaGroups
	config.DB.Find(&group)
	c.JSON(http.StatusOK, gin.H{
		"message": "Berhasil mengambil data",
		"data": group,
	})
}

func CreatePokjaGroup(c *gin.Context) {
	var req dtos.CreateAndUpdatePokjaGroupsRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	group := models.PokjaGroups{
		Name: req.Name,
	}

	err = config.DB.Create(&group).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H {
			"message": "Create data failed!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data succes",
		"data": group,
	})
}

func UpdatePokjaGroup(c *gin.Context) {
	var req dtos.CreateAndUpdatePokjaGroupsRequest
	id := c.Param("id")

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	var group models.PokjaGroups
	config.DB.First(&group, id)
	group.Name = req.Name

	err = config.DB.Save(&group).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H {
			"message": "Create data failed!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update data succes",
		"data": group,
	})
}


func DeletePokjaGroups(c *gin.Context) {
	id := c.Param("id")

	var group models.PokjaGroups
	config.DB.First(&group, &id)
	err := config.DB.Delete(&group).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delere data failed",
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": group,
	})
}