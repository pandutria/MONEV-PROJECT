package dtos


type CreateDataEntryRequest struct {
	MetodePengadaan *string `form:"metode_pengadaan"`
	KodePaket       *string `form:"kode_paket"`
	KodeRup         *string `form:"kode_rup"`
	TahunAnggaran   *string `form:"tahun_anggaran"`
	SatuanKerja     *string `form:"satuan_kerja"`
	NamaPaket       *string `form:"nama_paket"`
	SumberDana      *string `form:"sumber_dana"`

	RealisasiPaket   *string `form:"realisasi_paket"`
	StatusPaket      *string `form:"status_paket"`
	StatusPengiriman *string `form:"status_pengiriman"`

	NilaiPagu *string `form:"nilai_pagu"`
	NilaiHps  *string `form:"nilai_hps"`

	NomorKontrak   *string `form:"nomor_kontrak"`
	TanggalKontrak *string `form:"tanggal_kontrak"`
	NamaPpk        *string `form:"nama_ppk"`
	JabatanPpk     *string `form:"jabatan_ppk"`

	NamaPimpinanPerusahaan *string `form:"nama_pimpinan_perusahaan"`
	JabatanPimpinan        *string `form:"jabatan_pimpinan"`

	Pemenang       *string `form:"pemenang"`
	NilaiPenawaran *string `form:"nilai_penawaran"`
	NilaiTotal     *string `form:"nilai_total"`
	NilaiNegosiasi *string `form:"nilai_negosiasi"`
	NomorTelp      *string `form:"nomor_telp"`
	Email          *string `form:"email"`
	Npwp           *string `form:"npwp"`

	AlamatPemenang  *string `form:"alamat_pemenang"`
	LokasiPekerjaan *string `form:"lokasi_pekerjaan"`

	Catatan        *string `form:"catatan"`
	DitujukanKePpk *string `form:"ditujukan_ke_ppk"`

	SelectedPpkId *uint `form:"selected_ppk_id"`
	UserId        uint  `form:"user_id"`
}

type UpdateDataEntryRequest struct {
	Catatan         *string `form:"catatan"`
	SelectedPpkId *uint `form:"selected_ppk_id"`
}
