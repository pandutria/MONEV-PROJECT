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
	config.DB.Preload("User").First(&tender, id)
	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": tender,
	})
}


func CreateTender(c *gin.Context) {
	var req dtos.CreateTenderRequest
	userId, isNull := c.Get("user_id")

	if isNull {
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
	}

	err = config.DB.Create(&tender).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Create data failed",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Create data success",
		"data": tender,
	})
}

func UpdateTender(c *gin.Context) {
	// id := c.Param("Id")
}