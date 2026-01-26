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

	if user.IsActive == nil || !*user.IsActive {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna sudah tidak aktif!",
		})
		return
	}


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
<<<<<<< HEAD
=======

func UpdatePassword(c *gin.Context) {
	var req dtos.LoginRequest

	var user models.User
	err := config.DB.Where("email = ?", req.Email).Find(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H {
			"message": "Email tidak valid!",
		})
		return
	}

	user.Password = req.Password

	err = config.DB.Save(&user).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Mengubah password gagal",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H {
		"message": "Mengambil data berhasil",
		"data": user,
	})
}
>>>>>>> 3ed3257c9adfdfbe5cd46da963bc0b5dd199b9c2
