package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
)

func GetAllRabHeader(c *gin.Context) {
	var header []models.RabHeader
	config.DB.Preload("CreatedBy.Role").Preload("RabDetails").Find(&header)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": header,
	})
}

func GetRabHeaderById(c *gin.Context) {
	id := c.Param("id")

	var header models.RabHeader
	config.DB.Preload("CreatedBy.Role").First(&header, id)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": header,
	})
}

func CreateRabHeader(c *gin.Context) {
	var req dtos.CreateRabHeaderRequest
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu!",
		})
		return;
	}

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	var user models.User
	config.DB.First(&user, userId)

	header := models.RabHeader{
		TenderId: req.TenderId,
		Program: req.Program,
		StartDate: req.StartDate,
		EndDate: req.EndDate,
		CreatedById: &user.Id,
		RevisionCount: 0,
	}

	err = config.DB.Create(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal",
		})
		return
	}

	config.DB.Preload("RabDetails").Preload("CreatedBy.Role").Find(&header)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data": &header,
	})
}

func UpdateRabHeader(c *gin.Context) {
	id := c.Param("id")
	var req dtos.UpdateRabHeaderRequest
	c.ShouldBindBodyWithJSON(&req)

	var header models.RabHeader
	config.DB.First(&header, id)
	header.RevisionText = req.RevisionText
	header.RevisionCount += 1

	err := config.DB.Save(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Memperbarui data gagal!",
		})
		return
	}

	// config.DB.Preload("RabHeader").Find(&header)

	c.JSON(http.StatusOK, gin.H{
		"message": "Memperbarui data berhasil",
		"data": header,
	})
}

func DeleteRabHeader(c *gin.Context) {
	id := c.Param("id")

	var header models.RabHeader
	config.DB.First(&header, id)
	err := config.DB.Delete(&header).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "Menghapus data gagal!",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data": &header,
	})
}

func GetAllRabDetail(c *gin.Context) {
	headerId := c.Query("headerId")

	var detail []models.RabDetail
	config.DB.Where("rab_header_id = ?", headerId).Find(&detail)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": detail,
	})
}

func CreateRabDetail(c *gin.Context) {
	var req dtos.CreateRabDetailRequest
	c.ShouldBindBodyWithJSON(&req)

	detail := models.RabDetail{
		RabHeaderId: req.RabHeaderId,
		Description: req.Description,
		Volume: req.Volume,
		Unit: req.Unit,
		UnitPrice: req.UnitPrice,
		Total: req.Total,
	}

	err := config.DB.Save(&detail).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data ",
		"data": detail,
	})
}

func DeleteRabDetail(c *gin.Context) {
	id := c.Param("id")

	var detail models.RabDetail
	config.DB.First(&detail, id)

	err := config.DB.Delete(&detail).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": detail,
	})
}