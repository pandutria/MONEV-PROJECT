package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/models"
)


func GetTop10(c *gin.Context) {
	var headers []models.Rab_Header

	err := config.DB.Preload("Rab_Detail").Find(&headers).Error
	if err != nil {
		c.JSON(404, gin.H{"message": "Data not found!"})
		return
	}

	type Top10Response struct {
		TahunAnggaran   int       `json:"tahun_anggaran"`
		Satker          string    `json:"satker"`
		KodeTender      string    `json:"kode_tender"`
		NamaPaket       string    `json:"nama_paket"`
		TanggalMulai    *time.Time `json:"tanggal_mulai"`
		TanggalSelesai  *time.Time `json:"tanggal_selesai"`
		DurasiPekerjaan float64   `json:"durasi_pekerjaan"`
	}

	var response []Top10Response

	for _, h := range headers {
		var totalPerencanaan float64
		var totalAktual float64

		for _, d := range h.Rab_Detail {
			if d.SubTotal != nil {
				totalPerencanaan += *d.SubTotal
			}
			if d.SubTotal != nil {
				totalAktual += *d.SubTotal
			}
		}

		var durasi float64
		if h.StartedDate != nil && h.FinishedDate != nil {
			durasi = h.FinishedDate.Sub(*h.StartedDate).Hours() / 24
		}

		respItem := Top10Response{
			TahunAnggaran:   h.BudgetYear,
			Satker:          h.SatkerName,
			KodeTender:      h.RupCode,
			NamaPaket:       h.ActivityName,
			TanggalMulai:    h.StartedDate,
			TanggalSelesai:  h.FinishedDate,
			DurasiPekerjaan: durasi,
		}

		response = append(response, respItem)
	}

	if len(response) > 10 {
		response = response[:10]
	}

	c.JSON(http.StatusOK, gin.H{
		"data": response,
	})
}