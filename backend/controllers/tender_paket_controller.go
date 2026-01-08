package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/dtos"
)

func GetAllTender(c *gin.Context) {
	var tender []models.TenderPaket
	config.DB.Preload("User").Find(&tender)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": tender,
	})
}

func GetTenderById(c *gin.Context) {
	id := c.Param("id")

	var tender models.TenderPaket
	config.DB.Preload("User").First(&tender, id)
	c.JSON(http.StatusOK, gin.H{
		"message": "Get data success",
		"data": tender,
	})
}


func CreateTender(c *gin.Context) {
	var req dtos.CreateTenderRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

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

func UpdateTemder(c *gin.Context) {
	
}