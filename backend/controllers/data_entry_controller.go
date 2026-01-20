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
	config.DB.Find(&data)

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
		Preload("SelectedPpk").
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
	var req dtos.CreateAndUpdateDataEntryRequest
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

	EvidenceFile, _ := c.FormFile("evidence_file")

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

	EvidencePath := saveUpload(EvidenceFile)

	data := models.DataEntry{
		Type:              req.Type,
		ProcurementMethod: req.ProcurementMethod,
		TenderCode:        req.TenderCode,
		RupCode:           req.RupCode,
		FiscalYear:        req.FiscalYear,
		SatkerCode:        req.SatkerCode,
		SatkerName:        req.SatkerName,
		PackageName:       req.PackageName,
		FundingSource:     req.FundingSource,
		ProcurementType:   req.ProcurementType,

		BudgetValue: req.BudgetValue,
		HpsValue:    req.HpsValue,
		ShippingFee: req.ShippingFee,

		ContractNumber:  req.ContractNumber,
		ContractDate:    req.ContractDate,
		ContractInitial: req.ContractInitial,
		ContractFinal:   req.ContractFinal,
		PpkName:         req.PpkName,
		PpkPosition:     req.PpkPosition,
		CompanyLeader:   req.CompanyLeader,
		LeaderPosition:  req.LeaderPosition,

		WinnerName:       req.WinnerName,
		BidValue:         req.BidValue,
		NegotiationValue: req.NegotiationValue,
		Phone:            req.Phone,
		Email:            req.Email,
		Npwp:             req.Npwp,

		WinnerAddress: req.WinnerAddress,
		WorkLocation:  req.WorkLocation,

		RealizationStatus: req.RealizationStatus,
		PackageStatus:     req.PackageStatus,
		DeliveryStatus:    req.DeliveryStatus,
		TotalValue:        req.TotalValue,
		EvidenceFile:      EvidencePath,

		Note: req.Note,

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
	var req dtos.CreateAndUpdateDataEntryRequest
	id := c.Param("id")

	err := c.ShouldBind(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

		EvidenceFile, _ := c.FormFile("evidence_file")

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

	EvidencePath := saveUpload(EvidenceFile)

	var data models.DataEntry
	config.DB.First(&data, id)

	if req.Note != nil {
		data.Note = req.Note
	}

	if req.SelectedPpkId != nil {
		data.SelectedPpkId = req.SelectedPpkId
	}

	if EvidencePath != nil {
		data.EvidenceFile = EvidencePath
	}

	err = config.DB.Save(&data).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "mengubah data gagal!",
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
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data":    data,
	})
}
