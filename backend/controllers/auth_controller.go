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

	if !utils.CompareSHA512(req.Password, user.Password) {
		c.JSON(401, gin.H{
			"message": "Email atau password tidak benar!",
		})
		return
	}

	// if user.IsActive == 0 {

	// }

	token, err := utils.GenerateJWT(user.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat token gagal",
		})
		return
	}

	config.DB.Preload("Role")

	c.JSON(http.StatusOK, gin.H{
		"message":      "Masuk berhasil!",
		"access_token": token,
		"token_type":   "Bearer",
		"data": gin.H{
			"id":    user.Id,
			"email": user.Email,
			"role": user.Role.Name,
		},
	})
}

func Me(c *gin.Context) {
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Penggunaa harus login terlebih dahulu!",
		})
		return
	}

	var user models.User

	err := config.DB.Preload("Role").First(&user, userId).Error

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
