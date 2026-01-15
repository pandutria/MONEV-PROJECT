package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
	var data models.DataEntry
	id := c.Param("id")
	config.DB.First(&data, id)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    data,
	})
	return
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

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

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

		Note:         req.Note,
		EvidenceFile: req.EvidenceFile,

		SelectedPpkId: req.SelectedPpkId,
		UserId:        user.Id,
	}

	err = config.DB.Create(&data).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
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

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": err.Error(),
		})
		return
	}

	var data models.DataEntry
	config.DB.First(&data, id)

	data.Type = req.Type
	data.ProcurementMethod = req.ProcurementMethod
	data.TenderCode = req.TenderCode
	data.RupCode = req.RupCode
	data.FiscalYear = req.FiscalYear
	data.SatkerCode = req.SatkerCode
	data.SatkerName = req.SatkerName
	data.PackageName = req.PackageName
	data.FundingSource = req.FundingSource
	data.ProcurementType = req.ProcurementType

	data.BudgetValue = req.BudgetValue
	data.HpsValue = req.HpsValue
	data.ShippingFee = req.ShippingFee

	data.ContractNumber = req.ContractNumber
	data.ContractDate = req.ContractDate
	data.ContractInitial = req.ContractInitial
	data.ContractFinal = req.ContractFinal
	data.PpkName = req.PpkName
	data.PpkPosition = req.PpkPosition
	data.CompanyLeader = req.CompanyLeader
	data.LeaderPosition = req.LeaderPosition

	data.WinnerName = req.WinnerName
	data.BidValue = req.BidValue
	data.NegotiationValue = req.NegotiationValue
	data.Phone = req.Phone
	data.Email = req.Email
	data.Npwp = req.Npwp
	data.WinnerAddress = req.WinnerAddress
	data.WorkLocation = req.WorkLocation

	data.RealizationStatus = req.RealizationStatus
	data.PackageStatus = req.PackageStatus
	data.DeliveryStatus = req.DeliveryStatus
	data.TotalValue = req.TotalValue

	data.Note = req.Note
	data.EvidenceFile = req.EvidenceFile

	data.SelectedPpkId = req.SelectedPpkId

	err = config.DB.Save(&data).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Membuat data gagal!",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
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
