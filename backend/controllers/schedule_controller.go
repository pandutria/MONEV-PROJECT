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
	config.DB.Preload("CreatedBy.Role").Preload("Rab.RabDetails").Preload("Rab.Tender").Preload("ScheduleDetails").Find(&header)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": header,
	})
}

func CreateScheduleHeader(c *gin.Context) {	
	var req dtos.CreateScheduleRequest
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu!",
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

	schedule := models.ScheduleHeader{
		RabId: req.RabId,
		StartDate: req.StartDate,
		EndDate: req.EndDate,
		RevisionCount: 0,
		CreatedById: user.Id,
	}

	err = config.DB.Create(&schedule).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data failed",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data succes",
		"data": schedule,
	})
}

func UpdateSchedule(c *gin.Context) {
	id := c.Param("id")
	var req dtos.UpdateScheduleRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	var schedule models.ScheduleHeader
	config.DB.First(&schedule, id)
	schedule.RevisionText = req.RevisionText
	schedule.RevisionCount += 1

	err = config.DB.Save(&schedule).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Update data faield",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update data success",
		"data": schedule,
	})
}

func DeleteSchedule(c *gin.Context) {
	id := c.Param("id")

	var schedule models.ScheduleHeader
	config.DB.First(&schedule, id)

	err := config.DB.Delete(&schedule).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data success",
		"data": schedule,
	})
}

func GetAllScheduleItem(c *gin.Context) {
	var item []models.ScheduleItem
	config.DB.Preload("Weeks").Order("number ASC").Find(&item)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": item,
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
		Number: req.Number,
		Description: req.Description,
		TotalPrice: req.TotalPrice,
		Weight: req.Weight,
	}

	err = config.DB.Create(&item).Error 
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data failed",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data success",
		"data": item,
	})
}

func DeleteScheduleItem(c *gin.Context) {
	id := c.Param("id")
	var item models.ScheduleItem
	config.DB.First(&item, id)

	// var week []models.ScheduleWeek
	// err := config.DB.Where("ScheduleItemId = ?", id).Delete(&week).Error 
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"message": "Delete data faield",
	// 	})
	// 	return
	// }

	err := config.DB.Delete(&item).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Delete data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Delete data succes",
		"data": item,
	})
}

func GetWeekScheduleByScheduleItem(c *gin.Context) {
	id := c.Query("itemId")

	var week []models.ScheduleWeek
	err := config.DB.Where("schedule_item_id = ?", id).Order("week_number ASC").Find(&week).Error
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"message": "Get data failed",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": week,
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
		WeekNumber: req.WeekNumber,
		Value: req.Value,
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