package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/utils"
)

func Login(c *gin.Context) {
	var req dtos.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400,
			gin.H{
				"message": err.Error(),
			})
		return
	}

	var user models.User
	err := config.DB.Where("email = ?", req.Email).First(&user).Error

	if err != nil {
		c.JSON(401, gin.H{
			"message": "Email or password is not valid!",
		})
		return
	}

	if !utils.CompareSHA512(req.Passw, user.Password) {
		c.JSON(401, gin.H{
			"message": "Email or password is not valid!",
		})
		return
	}

	token, err := utils.GenerateJWT(user.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed generate token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Login Berhasil!",
		"access_token": token,
		"token_type":   "Bearer",
		"data": gin.H{
			"id":    user.Id,
			"email": user.Email,
		},
	})
}

func Me(c *gin.Context) {
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(401, gin.H{
			"message": "Unauthorized",
		})
		return
	}

	var user models.User

	err := config.DB.First(&user, userId).Error

	if err != nil {
		c.JSON(404, gin.H{
			"message": "User not found!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get data successfully",
		"data":    user,
	})
}
