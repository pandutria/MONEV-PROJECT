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
	config.DB.Preload("DataEntry.SelectedPpk").Preload("CreatedBy.Role").Preload("RabDetails").Find(&header)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    header,
	})
}

func GetRabHeaderById(c *gin.Context) {
	id := c.Param("id")

	var header models.RabHeader
	config.DB.Preload("DataEntry.SelectedPpk").Preload("CreatedBy.Role").Preload("RabDetails").First(&header, id)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    header,
	})
}

func GetRabHeaderGroup(c *gin.Context) {
	groupId := c.Param("id")

	var header []models.RabHeader
	config.DB.Where("rab_group_id = ?", groupId).Preload("CreatedBy.Role").Preload("RabDetails").Find(&header)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    header,
	})
}

func CreateRabHeader(c *gin.Context) {
	var req dtos.CreateRabHeaderRequest
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu!",
		})
		return
	}

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	if req.RabGroupId != nil {
		var exists bool
		err := config.DB.
			Model(&models.RabHeader{}).
			Select("count(1) > 0").
			Where("rab_group_id = ?", *req.RabGroupId).
			Scan(&exists).Error

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Gagal validasi RabGroupId",
				"error":   err.Error(),
			})
			return
		}

		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "RabGroupId tidak ditemukan",
			})
			return
		}
	}

	var lastRevision int
	if req.RabGroupId != nil {
		err := config.DB.
			Model(&models.RabHeader{}).
			Where("rab_group_id = ?", *req.RabGroupId).
			Select("COALESCE(MAX(revision_count), 0)").
			Scan(&lastRevision).Error

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Gagal mengambil revision terakhir",
				"error":   err.Error(),
			})
			return
		}
	}

	revision := lastRevision + 1

	var user models.User
	config.DB.First(&user, userId)

	header := models.RabHeader{
		RabGroupId:   req.RabGroupId,
		AlasanCount:  &revision,
		AlasanText: req.AlasanText,
		Program:      req.Program,
		TanggalMulai: req.TanggalMulai,
		TanggalAkhir: req.TanggalAkhir,
		DataEntryId: req.DataEntryId,
		CreatedById:  user.Id,
	}

	err = config.DB.Create(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal",
			"error":   err.Error(),
		})
		return
	}

	if req.RabGroupId == nil {
		config.DB.Model(&header).
			Update("rab_group_id", header.Id)
	}

	config.DB.Preload("RabDetails").Preload("CreatedBy.Role").Find(&header)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data":    &header,
	})
}

// func UpdateRabHeader(c *gin.Context) {
// 	id := c.Param("id")
// 	var req dtos.UpdateRabHeaderRequest
// 	c.ShouldBindBodyWithJSON(&req)

// 	var header models.RabHeader
// 	config.DB.First(&header, id)
// 	header.RevisionText = req.RevisionText
// 	header.RevisionCount += 1

// 	err := config.DB.Save(&header).Error
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"message": "Memperbarui data gagal!",
// 			"error":   err.Error(),
// 		})
// 		return
// 	}

// 	// config.DB.Preload("RabHeader").Find(&header)

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Memperbarui data berhasil",
// 		"data":    header,
// 	})
// }

func DeleteRabHeader(c *gin.Context) {
	id := c.Param("id")

	var header models.RabHeader
	config.DB.First(&header, id)

	var detail []models.RabDetail
	err := config.DB.Where("rab_header_id = ?", id).Find(&detail).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
		})
		return
	}

	err = config.DB.Delete(&detail).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
		})
		return
	}

	err = config.DB.Delete(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data":    &header,
	})
}

func GetAllRabDetail(c *gin.Context) {
	headerId := c.Query("headerId")

	var detail []models.RabDetail

	if headerId != "" {
		config.DB.Where("rab_header_id = ?", headerId).Find(&detail)
	} else {
		config.DB.Find(&detail)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    detail,
	})
}

func CreateRabDetail(c *gin.Context) {
	var req dtos.CreateRabDetailRequest
	c.ShouldBindBodyWithJSON(&req)

	detail := models.RabDetail{
		RabHeaderId: req.RabHeaderId,
		Description: req.Description,
		Volume:      req.Volume,
		Unit:        req.Unit,
		UnitPrice:   req.UnitPrice,
		Total:       req.Total,
	}

	err := config.DB.Save(&detail).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data":    detail,
	})
}

func DeleteRabDetail(c *gin.Context) {
	id := c.Param("id")

	var detail models.RabDetail
	config.DB.First(&detail, id)

	err := config.DB.Delete(&detail).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Membuat data berhasil",
		"data":    detail,
	})
}
