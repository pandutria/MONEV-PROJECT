package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/utils"
)

func GetInaProcCache(c *gin.Context) {
	var resp models.InaProcResponse

	if err := utils.ReadJSON("cache/inaproc.json", &resp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to read inaproc cache",
			"error":   err.Error(),
		})
		return
	}

	var result []models.TenderPaket
	for _, r := range resp.Data {
		result = append(result, models.TenderPaket{
			CountProduct: &r.CountProduct,
			SatkerCode:     &r.KodeSatker,
			SatkerName:     &r.NamaSatker,
			TenderCode:     &r.KodeTender,
			RupCode:        &r.RupCode,
			FiscalYear:     &r.FiscalYear,
			FundingSource:  &r.Funding,
			KlpdCode:       &r.KodeKlpd,
			AccountCode:    &r.Mak,
			RupName:        &r.RupName,
			RupDescription: &r.RupDesc,
			OrderDate:      &r.OrderDate,
			OrderId:        &r.OrderId,
			VendorId:       &r.RekanId,
			TotalQuantity:  &r.TotalQty,
			PackageStatus:  &r.Status,
			DeliveryStatus: &r.ShipmentStatus,
			ShippingFee: &r.ShippingFee,
			TotalValue: func(v float64) *float64 {
				return &v
			}(float64(r.Total)),
		})
	}

	c.JSON(http.StatusOK, result)
}

func GetInaProcByTenderId(c *gin.Context) {
	tenderId := c.Param("tender_id")
	if tenderId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "tender_id required"})
		return
	}

	var resp models.InaProcResponse
	if err := utils.ReadJSON("cache/inaproc.json", &resp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to read inaproc cache",
			"error":   err.Error(),
		})
		return
	}

	var result []models.TenderPaket
	for _, r := range resp.Data {
		if r.KodeTender == tenderId {
			result = append(result, models.TenderPaket{
				CountProduct:   &r.CountProduct,
				SatkerCode:     &r.KodeSatker,
				SatkerName:     &r.NamaSatker,
				TenderCode:     &r.KodeTender,
				RupCode:        &r.RupCode,
				FiscalYear:     &r.FiscalYear,
				FundingSource:  &r.Funding,
				KlpdCode:       &r.KodeKlpd,
				AccountCode:    &r.Mak,
				RupName:        &r.RupName,
				RupDescription: &r.RupDesc,
				OrderDate:      &r.OrderDate,
				OrderId:        &r.OrderId,
				VendorId:       &r.RekanId,
				TotalQuantity:  &r.TotalQty,
				PackageStatus:  &r.Status,
				DeliveryStatus: &r.ShipmentStatus,
				ShippingFee:    &r.ShippingFee,
				TotalValue: func(v float64) *float64 {
					return &v
				}(float64(r.Total)),
			})
			break // stop setelah ketemu 1
		}
	}

	if len(result) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Tender not found in inaproc cache"})
		return
	}

	c.JSON(http.StatusOK, result[0])
}
