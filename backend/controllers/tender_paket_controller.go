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

func GetAllTender(c *gin.Context) {
	var tender []models.TenderPaket
	config.DB.Preload("User").Find(&tender)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": tender,
	})
}

func GetTenderById(c *gin.Context) {
	id := c.Param("id")

	var tender models.TenderPaket
	config.DB.Preload("User.Role").Preload("SelectedPpk.Role").First(&tender, id)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": tender,
	})
}


func CreateTender(c *gin.Context) {
	var req dtos.CreateAndUpdateTenderRequest
	userId, isNull := c.Get("user_id")

	if !isNull {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Pengguna harus login terlebih dahulu!",
		})
		return
	}

	var user models.User
	config.DB.First(&user, userId)

	err := c.ShouldBind(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	EvidenceFile, _ := c.FormFile("evidence_file")

	uploadDir := "uploads/tender"
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

	tender := models.TenderPaket{
		Type: req.Type,
		ProcurementMethod: req.ProcurementMethod,
		TenderCode: req.TenderCode,
		RupCode: req.RupCode,
		FiscalYear: req.FiscalYear,
		SatkerCode: req.SatkerCode,
		SatkerName: req.SatkerName,
		PackageName: req.PackageName,
		FundingSource: req.FundingSource,
		ProcurementType: req.ProcurementType,
		BudgetValue: req.BudgetValue,
		HpsValue: req.HpsValue,
		ContractNumber: req.ContractNumber,
		ContractDate: req.ContractDate,
		PpkName: req.PpkName,
		PpkPosition: req.PpkPosition,
		CompanyLeader: req.CompanyLeader,
		LeaderPosition: req.LeaderPosition,
		WinnerName: req.WinnerName,
		BidValue: req.BidValue,
		NegotiationValue: req.NegotiationValue,
		Phone: req.Phone,
		Email: req.Email,
		Npwp: req.Npwp,
		EvidenceFile: EvidencePath,
		WinnerAddress: req.WinnerAddress,
		WorkLocation: req.WorkLocation,
		Note: req.Note,
		PackageStatus: req.PackageStatus,
		RealizationStatus: req.RealizationStatus,
		DeliveryStatus: req.DeliveryStatus,
		TotalValue: req.TotalValue,
		UserId: user.Id,
		SelectedPpkId: req.SelectedPpkId,
	}

	err = config.DB.Create(&tender).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	config.DB.Preload("User.Role").Preload("SelectedPpk.Role").Find(&tender)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data": tender,
	})
}

func UpdateTender(c *gin.Context) {
	id := c.Param("id")
	var req dtos.CreateAndUpdateTenderRequest

	err := c.ShouldBind(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	EvidenceFile, _ := c.FormFile("evidence_file")

	uploadDir := "uploads/tender"
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

	var tender models.TenderPaket
	config.DB.First(&tender, id)

	tender.Type = req.Type
	tender.ProcurementMethod = req.ProcurementMethod
	tender.TenderCode = req.TenderCode
	tender.RupCode = req.RupCode
	tender.SatkerCode = req.SatkerCode
	tender.SatkerName = req.SatkerName
	tender.PackageName = req.PackageName
	tender.FundingSource = req.FundingSource
	tender.ProcurementType = req.ProcurementType
	tender.BudgetValue = req.BudgetValue
	tender.HpsValue = req.HpsValue
	tender.ContractNumber = req.ContractNumber
	tender.ContractDate = req.ContractDate
	tender.PpkName = req.PpkName
	tender.PpkPosition = req.PpkPosition
	tender.CompanyLeader = req.CompanyLeader
	tender.LeaderPosition = req.LeaderPosition
	tender.WinnerName = req.WinnerName
	tender.BidValue = req.BidValue
	tender.NegotiationValue = req.NegotiationValue
	tender.Phone = req.Phone
	tender.Email = req.Email
	tender.Npwp = req.Npwp
	tender.EvidenceFile = EvidencePath
	tender.WinnerAddress = req.WinnerAddress
	tender.WorkLocation = req.WorkLocation
	tender.Note = req.Note
	tender.PackageStatus = req.PackageStatus
	tender.RealizationStatus = req.RealizationStatus
	tender.DeliveryStatus = req.DeliveryStatus
	tender.TotalValue = req.TotalValue
	tender.SelectedPpkId = req.SelectedPpkId
	tender.FiscalYear = req.FiscalYear

	err = config.DB.Save(&tender).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Mengubah data gagal!",
		})
		return
	}

	config.DB.Preload("User.Role").Preload("SelectedPpk.Role").Find(&tender)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengubah data berhasil",
		"data": tender,
	})
}

func DeleteTender(c *gin.Context) {
	id := c.Param("id")

	var tender models.TenderPaket
	config.DB.First(&tender, id)
	err := config.DB.Delete(&tender).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Menghapus data gagal!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Menghapus data berhasil",
		"data": tender,
	})
}