package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/dtos"
)

func ShowRole(c *gin.Context) {
	var role []models.Role
	config.DB.Find(&role)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data successfully",
		"data": role,
	})
	return
}

func CreateRole(c *gin.Context) {
	var req dtos.RoleRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	role := models.Role{
		Name: req.Name,
	}

	err := config.DB.Create(&role).Error	

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H {
			"message": "Create role failed!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H {
		"message": "Create data success!",
		"data": role,
	})
}

func UpdateRole(c *gin.Context) {
	roleId := c.Param("id")

	var req dtos.RoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var role models.Role
	err := config.DB.First(&role, roleId).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Data not found",
		})
		return
	}

	role.Name = req.Name

	err = config.DB.Save(&role).Error	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H {
			"message": "Create data failed!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H {
		"message": "Create data success!",
		"data": role,
	})
}

func DeleteRole(c *gin.Context) {
	roleId := c.Param("id")

	var role models.Role
	config.DB.First(&role, roleId)

	err := config.DB.Delete(&role).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": role,
	})
}