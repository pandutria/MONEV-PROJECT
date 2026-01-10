package controllers

import (
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
)

func GetAllRealisasi(c *gin.Context) {
	var header []models.RealisasiHeader
	config.DB.Find(&header)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": header,
	})
}

func CreateRealisasi(c *gin.Context) {
	userId, isAny := c.Get("user_id")
	var req dtos.CreateRealisasiRequest

	if !isAny {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu",
		})
		return
	}

	var user models.User
	config.DB.First(&user, userId)

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	header := models.RealisasiHeader{
		ScheduleHeaderId: req.ScheduleHeaderId,
		CreatedById: user.Id,
		RevisionCount: 0,
	}

	err = config.DB.Create(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data faield",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data success",
		"data": header,
	})
}

func UpdateRealisasi(c *gin.Context) {
	id := c.Param("id")
	var req dtos.UpdateRealisasiRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err!= nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	var header models.RealisasiHeader
	config.DB.First(&header, id)
	header.RevisionText = req.RevisionText
	header.RevisionCount += 1

	err = config.DB.Save(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Update data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update data success",
		"data": header,
	})
}

func DeleteRealisasi(c *gin.Context) {
	id := c.Param("id")

	var header models.RealisasiHeader
	config.DB.First(&header, id)

	err := config.DB.Delete(&header).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": header,
	})
}


func GetRealisasiItemByHeader(c *gin.Context) {
	id := c.Query("headerId")

	var week models.RealisasiItem
	err := config.DB.Where("realisasi_header_id = ?", id).Find(&week).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "Get data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get data succes",
		"data": week,
	})
}

func CreateRealisasiItem(c *gin.Context) {
	var req dtos.CreateRealisasiItemRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	item := models.RealisasiItem{
		RealisasiHeaderId: req.RealisasiHeaderId,
		ScheduleItemId: req.ScheduleItemId,
	}

	err = config.DB.Create(&item).Error
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Create data success",
		"data": item,
	})
}

func DeleteRealisasiItem(c *gin.Context) {
	id := c.Param("id")

	var item models.RealisasiItem
	config.DB.First(&item, id)

	err := config.DB.Delete(&item).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": item,
	})
}

func GetAllRealisasiWeek(c *gin.Context) {
	var week []models.RealisasiWeek
	config.DB.Find(&week)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data succes",
		"data": week,
	})
}

func CreateRealisasiWeek(c *gin.Context) {
	var req dtos.CreateRealisasiWeekRequest

	err := c.ShouldBind(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	EvidenceFile, _ := c.FormFile("evidence")
	uploadDir := "uploads/realisasi"
	_ = os.MkdirAll(uploadDir, os.ModePerm)

	saveUploaded := func(file *multipart.FileHeader) *string {
		if file == nil {
			return nil
		}

		filename := uuid.New().String() + "_" + filepath.Base(file.Filename)
		path := filepath.Join(uploadDir, filename)

		if err := c.SaveUploadedFile(file, path); err != nil {
			return nil
		}
		return &path
	}

	EvidencePath := saveUploaded(EvidenceFile)

	week := models.RealisasiWeek{
		RealisasiItemId: req.RealisasiItemId,
		WeekNumber: req.WeekNumber,
		Value: req.Value,
		Evidence: EvidencePath,
	}

	err = config.DB.Create(&week).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data failed",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data success",
		"data": week,
	})
}


func DeleteRealisasiWeek(c *gin.Context) {
	id := c.Param("id")

	var week models.RealisasiWeek
	config.DB.First(&week, id)

	err := config.DB.Delete(&week).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": week,
	})
}

