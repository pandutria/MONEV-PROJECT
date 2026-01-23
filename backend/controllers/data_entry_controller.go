package controllers

import (
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/google/uuid"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
)

func GetAllDataEntry(c *gin.Context) {
	var data []models.DataEntry
	config.DB.
		Preload("User").
		Preload("User.Role").
		Preload("SelectedPpk.Role").
		Find(&data)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
}

func GetDataEntryById(c *gin.Context) {
	idParam := c.Param("id")

	var data models.DataEntry
	result := config.DB.
		Preload("User").
		Preload("User.Role").
		Preload("SelectedPpk.Role").
		First(&data, idParam)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Data tidak ditemukan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
}

func CreateDataEntry(c *gin.Context) {
	var req dtos.CreateDataEntryRequest
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu!",
		})
		return
	}

	var user models.User
	config.DB.First(&user, userId)

	err := c.ShouldBindWith(&req, binding.FormMultipart)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	BuktiFile, _ := c.FormFile("bukti_file")

	uploadDir := "uploads/entry"
	_ = os.MkdirAll(uploadDir, os.ModePerm)

	saveUpload := func(file *multipart.FileHeader) *string {
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

	BuktiPath := saveUpload(BuktiFile)

	data := models.DataEntry{
		Tipe:            req.Tipe,
		JenisPengadaan:  req.JenisPengadaan,
		MetodePengadaan: req.MetodePengadaan,
		KodePaket:       req.KodePaket,
		KodeRup:         req.KodeRup,
		TahunAnggaran:   req.TahunAnggaran,
		TanggalMasuk:    req.TanggalMasuk,
		SatuanKerja:     req.SatuanKerja,
		NamaPaket:       req.NamaPaket,
		SumberDana:      req.SumberDana,

		StatusPaket:      req.StatusPaket,
		StatusPengiriman: req.StatusPengiriman,

		NilaiPagu: req.NilaiPagu,
		NilaiHps:  req.NilaiHps,

		NomorKontrak:   req.NomorKontrak,
		TanggalKontrak: req.TanggalKontrak,
		NamaPpk:        req.NamaPpk,
		JabatanPpk:     req.JabatanPpk,

		NamaPimpinanPerusahaan: req.NamaPimpinanPerusahaan,
		JabatanPimpinan:        req.JabatanPimpinan,

		Pemenang:       req.Pemenang,
		NilaiPenawaran: req.NilaiPenawaran,
		NilaiNegosiasi: req.NilaiNegosiasi,
		NomorTelp:      req.NomorTelp,
		Email:          req.Email,
		Npwp:           req.Npwp,

		AlamatPemenang:  req.AlamatPemenang,
		LokasiPekerjaan: req.LokasiPekerjaan,

		BuktiFile: BuktiPath,
		Catatan:   req.Catatan,

		SelectedPpkId: req.SelectedPpkId,
		UserId:        user.Id,
	}

	err = config.DB.Create(&data).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data":    data,
	})
}

func UpdateDataEntry(c *gin.Context) {
	var req dtos.UpdateDataEntryRequest
	id := c.Param("id")

	err := c.ShouldBindWith(&req, binding.FormMultipart)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	// if req.SelectedPpkId != nil && *req.SelectedPpkId == 0 {
	// 	req.SelectedPpkId = nil
	// }

	BuktiFile, _ := c.FormFile("bukti_file")

	uploadDir := "uploads/entry"
	_ = os.MkdirAll(uploadDir, os.ModePerm)

	saveUpload := func(file *multipart.FileHeader) *string {
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

	BuktiPath := saveUpload(BuktiFile)

	var data models.DataEntry
	config.DB.First(&data, id)

	if req.Catatan != nil && *req.Catatan != "" {
		data.Catatan = req.Catatan
	} else {
		data.Catatan = nil
	}

	if req.SelectedPpkId != nil {
		data.SelectedPpkId = req.SelectedPpkId
	} else {
		data.SelectedPpkId = nil
	}

	if BuktiPath != nil && *BuktiPath != "" {
		data.BuktiFile = BuktiPath
	} else {
		data.BuktiFile = nil
	}

	err = config.DB.Save(&data).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "mengubah data gagal!",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "mengubah data berhasil",
		"data":    data,
	})
}

func DeleteDataEntry(c *gin.Context) {
	id := c.Param("id")

	var data models.DataEntry
	config.DB.First(&data, &id)
	err := config.DB.Delete(&data).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Mengahapus dara gagal!",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data":    data,
	})
}
