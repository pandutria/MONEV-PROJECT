package dtos

type CreateRabHeaderRequest struct {
	RabGroupId    *uint `json:"rab_group_id"`
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
}

type UpdateRabHeaderRequest struct {
	RevisionText *string `json:"revision_text"`
}

type CreateRabDetailRequest struct {
	RabHeaderId uint    `json:"rab_header_id" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Volume      float64 `json:"volume" binding:"required"`
	Unit        string  `json:"unit" binding:"required"`
	UnitPrice   float64 `json:"unit_price" binding:"required"`
	Total       float64 `json:"total" binding:"required"`
}
