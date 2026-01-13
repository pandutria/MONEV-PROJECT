package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/utils"
)

func normalizeSatker(r models.FirstInaProcItem) *string {
	if r.KodeSatker != "" {
		return &r.KodeSatker
	}
	if r.KdSatker != "" {
		return &r.KdSatker
	}

	v := toString(r.SatkerId)
	if v != "" {
		return &v
	}
	return nil
}

func normalizeTender(r models.FirstInaProcItem) *string {
	if r.KodeTender != "" {
		return &r.KodeTender
	}
	x := toString(r.KdPenyedia)
	if r.KdPenyedia != 0 {
		return &x
	}
	return nil
}

func normalizeRup(r models.FirstInaProcItem) *string {
	if r.RupCode != "" {
		return &r.KodeTender
	}
	x := toString(r.KdRup)
	if r.KdRup != 0 {
		return &x
	}
	return nil
}

func normalizePrice(r models.FirstInaProcItem) *int {
	if r.Total != 0 {
		return &r.Total
	}
	if r.TotalHarga != 0 {
		return &r.TotalHarga
	}
	return nil
}

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
			CountProduct:    &r.CountProduct,
			SatkerCode:      normalizeSatker(r),
			SatkerName:      &r.NamaSatker,
			TenderCode:      normalizeTender(r),
			RupCode:         &r.RupCode,
			FiscalYear:      &r.FiscalYear,
			FundingSource:   &r.Funding,
			KlpdCode:        &r.KodeKlpd,
			AccountCode:     &r.Mak,
			RupName:         &r.RupName,
			RupDescription:  &r.RupDesc,
			OrderDate:       &r.OrderDate,
			OrderId:         &r.OrderId,
			VendorId:        &r.RekanId,
			TotalQuantity:   &r.TotalQty,
			PackageStatus:   &r.Status,
			DeliveryStatus:  &r.ShipmentStatus,
			ShippingFee:     &r.ShippingFee,
			ContractInitial: &r.ContractInitial,
			ContractFinal:   &r.ContractFinal,
			TotalValue: func(v float64) *float64 {
				return &v
			}(float64(r.Total)),
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data":    result,
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
		"data":    result[0],
	})
}

func toString(v interface{}) string {
	switch val := v.(type) {
	case string:
		return val
	case int:
		if val == 0 {
			return ""
		}
		return strconv.Itoa(val)
	case int64:
		if val == 0 {
			return ""
		}
		return strconv.FormatInt(val, 10)
	case float64:
		if val == 0 {
			return ""
		}
		return strconv.Itoa(int(val))
	default:
		return ""
	}
}

func PostInaProcCache(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "authorization header required"})
		return
	}

	req, err := http.NewRequest("GET",
		"https://data.inaproc.id/api/v1/ekatalog-archive/paket-e-purchasing?kode_klpd=D424&tahun=2025", nil)
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
		Data []models.FirstInaProcItem `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&apiResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_ = os.MkdirAll("cache", os.ModePerm)
	var cache models.InaProcResponse
	_ = utils.ReadJSON("cache/inaproc.json", &cache)

	for _, r := range apiResp.Data {
		var fiscalYear int
		if r.FiscalYear == 0 {
			fiscalYear = r.TahunAnggaran
		} else {
			fiscalYear = r.FiscalYear
		}

		// kodeSatker := r.KodeSatker
		// if kodeSatker == "" {
		// 	kodeSatker = r.KdSatker
		// }
		// if kodeSatker == "" {
		// 	kodeSatker = toString(r.SatkerId)
		// }

		item := models.FirstInaProcItem{
			CountProduct:   r.CountProduct,
			KodeTender:     r.KodeTender,
			KdPenyedia:     r.KdPenyedia,
			KodeSatker:     r.KodeSatker,
			SatkerId:       r.SatkerId,
			KdSatker:       r.KdSatker,
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
			FiscalYear:     fiscalYear,
			Funding:        r.Funding,
			Total:          r.Total,
			Npwp:           r.Npwp,
			PackageName:    r.PackageName,
			PpkName:        r.PpkName,
			PpkPosition:    r.PpkPosition,
			ContractNumber: r.ContractNumber,
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

func loadInaProcFromFile(path string) ([]models.FirstInaProcItem, error) {
	var resp struct {
		Data []models.FirstInaProcItem `json:"data"`
	}

	b, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(b, &resp); err != nil {
		return nil, err
	}

	return resp.Data, nil
}

func PostInaProcCacheFromFile(c *gin.Context) {
	data, err := loadInaProcFromFile("res.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed to load res.json",
			"error":   err.Error(),
		})
		return
	}

	_ = os.MkdirAll("cache", os.ModePerm)
	var cache models.InaProcResponse
	_ = utils.ReadJSON("cache/inaproc.json", &cache)

	for _, r := range data {
		fiscalYear := r.FiscalYear
		if fiscalYear == 0 {
			fiscalYear = r.TahunAnggaran
		}

		item := models.FirstInaProcItem{
			CountProduct:   r.CountProduct,
			KodeTender:     r.KodeTender,
			KdPenyedia:     r.KdPenyedia,
			KodeSatker:     r.KodeSatker,
			SatkerId:       r.SatkerId,
			KdSatker:       r.KdSatker,
			NamaSatker:     r.NamaSatker,
			RupCode:        r.RupCode,
			KdRup:          r.KdRup,
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
			FiscalYear:     fiscalYear,
			Funding:        r.Funding,
			TahunAnggaran:  r.TahunAnggaran,
			Total:          r.Total,
			Npwp:           r.Npwp,
			PackageName:    r.PackageName,
			PpkName:        r.PpkName,
			PpkPosition:    r.PpkPosition,
			ContractNumber: r.ContractNumber,
		}

		cache.Data = append(cache.Data, item)
	}

	if err := utils.WriteJSON("cache/inaproc.json", cache); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "inaproc cache updated from file",
		"total":   len(cache.Data),
	})
}
