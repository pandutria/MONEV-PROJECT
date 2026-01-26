package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
)

func GetAllScheduleHeader(c *gin.Context) {
	var header []models.ScheduleHeader
	config.DB.Preload("CreatedBy.Role").Preload("Rab.RabDetails").Preload("Rab.DataEntry").Preload("Items.Weeks").Find(&header)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data":    header,
	})
}

func GetScheduleById(c *gin.Context) {
	id := c.Param("id")
	var header models.ScheduleHeader
	config.DB.Preload("CreatedBy.Role").Preload("Rab.RabDetails").Preload("Rab.DataEntry").Preload("Items.Weeks").First(&header, id)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data":    header,
	})
}

func GetScheduleByGroup(c *gin.Context) {
	groupId := c.Param("id")

	var header []models.ScheduleHeader
	config.DB.Where("schedule_group_id = ?", groupId).Preload("CreatedBy.Role").Preload("Rab.RabDetails").Preload("Items.Weeks").Find(&header)

	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data":    header,
	})
}

func CreateScheduleHeader(c *gin.Context) {
	var req dtos.CreateScheduleRequest
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu!",
		})
		return
	}

	var user models.User
	config.DB.First(&user, userId)

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	if req.ScheduleGroupId != nil {
		var exists bool
		err := config.DB.
			Model(&models.ScheduleHeader{}).
			Select("count(1) > 0").
			Where("schedule_group_id = ?", *req.ScheduleGroupId).
			Scan(&exists).Error

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Gagal validasi ScheduleGroupId",
			})
			return
		}

		if !exists {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "ScheduleGroupId tidak ditemukan",
			})
			return
		}
	}

	lastRevision := -1
	if req.ScheduleGroupId != nil {
		err := config.DB.
			Model(&models.ScheduleHeader{}).
			Where("schedule_group_id = ?", *req.ScheduleGroupId).
			Select("COALESCE(MAX(alasan_count), 0)").
			Scan(&lastRevision).Error

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Gagal mengambil revision terakhir",
				"error": err.Error(),
			})
			return
		}
	}

	revision := lastRevision + 1

	schedule := models.ScheduleHeader{
		ScheduleGroupId: req.ScheduleGroupId,
		RabId:           req.RabId,
		AlasanCount:     &revision,
		AlasanText:      req.AlasanText,
		CreatedById:     user.Id,
	}

	err := config.DB.Create(&schedule).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data failed",
			"error": err.Error(),
		})
		return
	}

	if req.ScheduleGroupId == nil {
		config.DB.Model(&schedule).
			Update("schedule_group_id", schedule.Id)
	}

	config.DB.
		Preload("CreatedBy.Role").
		Find(&schedule)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data success",
		"data":    schedule,
	})
}

// func UpdateSchedule(c *gin.Context) {
// 	id := c.Param("id")
// 	var req dtos.UpdateScheduleRequest

// 	err := c.ShouldBindBodyWithJSON(&req)
// 	if err != nil {
// 		c.JSON(http.StatusConflict, gin.H{
// 			"message": err.Error(),
// 		})
// 		return
// 	}

// 	var schedule models.ScheduleHeader
// 	config.DB.First(&schedule, id)
// 	schedule.RevisionText = req.RevisionText
// 	schedule.RevisionCount += 1

// 	err = config.DB.Save(&schedule).Error
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"message": "Update data faield",
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Update data success",
// 		"data": schedule,
// 	})
// }

func DeleteSchedule(c *gin.Context) {
	id := c.Param("id")

	var schedule models.ScheduleHeader
	config.DB.First(&schedule, id)

	var realisasi []models.RealisasiHeader
	err := config.DB.Where("schedule_header_id = ?", schedule.Id).Find(&realisasi).Error

	if len(realisasi) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Sudah ada data yang terikat dengan data ini!",
		})
		return
	}

	var items []models.ScheduleItem
	config.DB.Where("schedule_header_id = ?", id).Find(&items)
	var itemIDs []uint
	for _, it := range items {
		itemIDs = append(itemIDs, it.Id)
	}

	if len(itemIDs) > 0 {
		if err := config.DB.
			Where("schedule_item_id IN ?", itemIDs).
			Delete(&models.ScheduleWeek{}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Gagal menghapus schedule week",
				"error": err.Error(),
			})
			return
		}
	}

	if err := config.DB.Where("schedule_header_id = ?", id).
		Delete(&models.ScheduleItem{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Gagal menghapus schedule item",
			"error": err.Error(),
		})
		return
	}

	err = config.DB.Delete(&schedule).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data":    schedule,
	})
}

func GetAllScheduleItem(c *gin.Context) {
	var item []models.ScheduleItem
	config.DB.Preload("Weeks").Order("number ASC").Find(&item)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    item,
	})
}

func CreateScheduleItem(c *gin.Context) {
	var req dtos.CreateScheduleItemRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	item := models.ScheduleItem{
		ScheduleHeaderId: req.ScheduleHeaderId,
		Number:           req.Number,
		Description:      req.Description,
		TotalPrice:       req.TotalPrice,
		Weight:           req.Weight,
	}

	err = config.DB.Create(&item).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data":    item,
	})
}

func DeleteScheduleItem(c *gin.Context) {
	id := c.Param("id")
	var item models.ScheduleItem
	config.DB.First(&item, id)

	var week []models.ScheduleWeek
	err := config.DB.Where("ScheduleItemId = ?", id).Delete(&week).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
			"error":   err.Error(),
		})
		return
	}

	err = config.DB.Delete(&item).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data":    item,
	})
}

func GetAllWeek(c *gin.Context) {
	var week []models.ScheduleWeek

	err := config.DB.Order("week_number ASC").Find(&week).Error
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"message": "Mengambil data gagal!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    week,
	})
}

func CreateWeekSchedule(c *gin.Context) {
	var req dtos.CreateScheduleWeekRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	week := models.ScheduleWeek{
		ScheduleItemId: req.ScheduleItemId,
		WeekNumber:     req.WeekNumber,
		Value:          req.Value,
	}

	err = config.DB.Create(&week).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data":    week,
	})
}
