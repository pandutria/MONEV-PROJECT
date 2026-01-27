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
		c.JSON(http.StatusConflict,
			gin.H{
				"message": err.Error(),
			})
		return
	}

	var user models.User
	err := config.DB.Where("email = ?", req.Email).First(&user).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Email atau password tidak benar!",
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
		c.JSON(http.StatusNotFound, gin.H{
			"message": "User tidak di temukan!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    user,
	})
}

func UpdatePassword(c *gin.Context) {
	var req dtos.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Request tidak valid",
			"error":   err.Error(),
		})
		return
	}

	var user models.User
	err := config.DB.Where("email = ?", req.Email).Find(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email tidak valid!",
			"error":   err.Error(),
		})
		return
	}

	user.Password = utils.HashSHA512(req.Password)

	err = config.DB.Save(&user).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Mengubah password gagal",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengubah password berhasil",
		"data":    user,
	})
}
