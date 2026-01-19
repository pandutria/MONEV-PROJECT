package models

import (
	"time"
)

type RabHeader struct {
	Id            uint  `gorm:"primaryKey" json:"id"`
	RabGroupId    *uint `gorm:"index;" json:"rab_group_id"`
	RevisionCount *int  `json:"revision"`

	KodeTender     *string `json:"kode_tender"`
	KodeRup        *string `json:"kode_rup"`
	TahunAnggaran  *int    `json:"tahun_anggaran"`
	SatuanKerja    *string `json:"satuan_kerja"`
	NamaPaket      *string `json:"nama_paket"`
	TanggalMasuk   *string `json:"tanggal_masuk"`
	SumberDana     *string `json:"sumber_dana"`
	JenisPengadaan *string `json:"jenis_pengadaan"`

	NilaiPagu      *float64 `json:"nilai_pagu"`
	NilaiHps       *float64 `json:"nilai_hps"`
	NilaiPenawaran *float64 `json:"nilai_penawaran"`
	NilaiNegosiasi *float64 `json:"nilai_negosiasi"`

	NomorKontrak   *string `json:"nomor_kontrak"`
	TanggalKontrak *string `json:"tanggal_kontrak"`

	NamaPpk    *string `json:"nama_ppk"`
	JabatanPpk *string `json:"jabatan_ppk"`

	NamaPimpinan    *string `json:"nama_pimpinan"`
	JabatanPimpinan *string `json:"jabatan_pimpinan"`
	Pemenang        *string `json:"pemenang"`
	Telepon         *string `json:"telepon"`
	Email           *string `json:"email"`
	NPWP            *string `json:"npwp"`
	AlamatPemenang  *string `json:"alamat_pemenang"`

	LokasiPekerjaan  *string `json:"lokasi_pekerjaan"`
	StatusPaket      *string `json:"status_paket"`
	StatusPengiriman *string `json:"status_pengiriman"`

	RevisionText *string `json:"revision_text"`

	CreatedById uint       `json:"created_by_id"`
	CreatedBy   *User      `gorm:"foreignKey:CreatedById" json:"created_by,omitempty"`
	CreatedAt   *time.Time `gorm:"autoCreateTime" json:"created_at"`

	RabDetails []RabDetail `gorm:"foreignKey:RabHeaderId" json:"rab_details,omitempty"`
}
