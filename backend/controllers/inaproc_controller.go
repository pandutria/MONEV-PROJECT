package controllers

import (
	"encoding/json"
	"net/http"
	"os"

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
			SatkerCode: func() *string {
				if r.KodeSatker != "" {
					return &r.KodeSatker
				}
				return &r.KdSatker
			}(),
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
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": result,
	})
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
				CountProduct: &r.CountProduct,
				SatkerCode: func() *string {
					if r.KodeSatker != "" {
						return &r.KodeSatker
					}
					return &r.KdSatker
				}(),
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
			break
		}
	}

	if len(result) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Tender not found in inaproc cache"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": result[0],
	})
}

func PostInaProcCache(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "authorization header required"})
		return
	}

	req, err := http.NewRequest("GET",
		"https://data.inaproc.id/api/v1/ekatalog-archive/instansi-satker?kode_klpd=D291&tahun=2025", nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	req.Header.Set("Authorization", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	defer resp.Body.Close()

	var apiResp struct {
		Data []models.InaProcItem `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&apiResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_ = os.MkdirAll("cache", os.ModePerm)
	var cache models.InaProcResponse
	_ = utils.ReadJSON("cache/inaproc.json", &cache)

	for _, r := range apiResp.Data {
		item := models.InaProcItem{
			CountProduct:   r.CountProduct,
			KodeTender:     r.KodeTender,
			NamaSatker:     r.NamaSatker,
			RupCode:        r.RupCode,
			KodeKlpd:       r.KodeKlpd,
			Mak:            r.Mak,
			OrderDate:      r.OrderDate,
			OrderId:        r.OrderId,
			RekanId:        r.RekanId,
			RupDesc:        r.RupDesc,
			RupName:        r.RupName,
			Status:         r.Status,
			ShipmentStatus: r.ShipmentStatus,
			ShippingFee:    r.ShippingFee,
			TotalQty:       r.TotalQty,
			FiscalYear:     r.FiscalYear,
			Funding:        r.Funding,
			Total:          r.Total,
		}

		cache.Data = append(cache.Data, item)

	}

	if err := utils.WriteJSON("cache/inaproc.json", cache); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "inaproc cache updated",
		"total":   len(cache.Data),
	})
}
