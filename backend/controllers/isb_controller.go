package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/models"
)

func GetAllNonTenderKontractIsb(c *gin.Context) {
	var data []models.NonTenderKontractIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

// func GetByIdNonTenderKontractIsb(c *gin.Context) {
// 	id := c.Param("id")

// 	var data models.NonTenderKontractIsb
// 	if err := config.DB.First(&data, id).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{
// 			"message": "Data tidak ditemukan",
// 		})
// 		return
// 	}

// 	err := config.DB.Delete(&data).Error
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"message": "Menghapus data gagal!",
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Menghapus data berhasil",
// 		"data":    data,
// 	})
// }

func GetAllNonTenderIsb(c *gin.Context) {
	var data []models.NonTenderIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllNonTenderSelesaiIsb(c *gin.Context) {
	year := c.Query("tahun")

	var data []models.NonTenderSelesaiIsb
	config.DB.Where("tahun_anggaran = ?", year).Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllNonTenderTahapIsb(c *gin.Context) {
	var data []models.NonTenderTahapIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllTenderIsb(c *gin.Context) {
	var data []models.TenderIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllTenderKontrakIsb(c *gin.Context) {
	var data []models.TenderKontrakIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllTenderSelesaiIsb(c *gin.Context) {
	var data []models.TenderSelesaiIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllTenderTahapIsb(c *gin.Context) {
	var data []models.TenderTahapIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

// func GetAllPaketPurchasing(c *gin.Context) {
// 	var data []models.PaketPurchasing
// 	config.DB.Find(&data)

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Mengambil data berhasil",
// 		"data":    data,
// 	})
// 	return
// }

func GetAllPaketPurchasing(c *gin.Context) {
	kd_paket := c.Query("kd_paket")
	year := c.Query("tahun")
	var data []models.PaketPurchasing

	if kd_paket != "" {
		config.DB.Where("tahun_anggaran", year).Where("kd_paket = ?", kd_paket).Find(&data)
	} else {
		config.DB.Find(&data)
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllPencatatanNonTenderIsb(c *gin.Context) {
	var data []models.PencatatanNonTenderIsb
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllRupPaketPenyedia(c *gin.Context) {
	var data []models.RupPaketPenyedia
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllRupPaketSwakelola(c *gin.Context) {
	var data []models.RupPaketSwakelola
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetAllRupPenyediaTerumumkan(c *gin.Context) {
	var data []models.RupPenyediaTerumumkan
	config.DB.Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}