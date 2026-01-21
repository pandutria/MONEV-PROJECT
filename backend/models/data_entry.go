package models

type DataEntry struct {
	Id uint `gorm:"primaryKey" json:"id"`

	Tipe            *string `json:"tipe"`
	JenisPengadaan  *string `form:"jenis_pengadaan"`
	MetodePengadaan *string `json:"metode_pengadaan"`
	KodePaket       *string `json:"kode_paket"`
	KodeRup         *string `json:"kode_rup"`
	TahunAnggaran   *string `json:"tahun_anggaran"`
	SatuanKerja     *string `json:"satuan_kerja"`
	NamaPaket       *string `json:"nama_paket"`
	SumberDana      *string `json:"sumber_dana"`

	StatusPaket      *string `json:"status_paket"`
	StatusPengiriman *string `json:"status_pengiriman"`

	NilaiPagu *string `json:"nilai_pagu"`
	NilaiHps  *string `json:"nilai_hps"`

	NomorKontrak   *string `json:"nomor_kontrak"`
	TanggalKontrak *string `json:"tanggal_kontrak"`
	NamaPpk        *string `json:"nama_ppk"`
	JabatanPpk     *string `json:"jabatan_ppk"`

	NamaPimpinanPerusahaan *string `json:"nama_pimpinan_perusahaan"`
	JabatanPimpinan        *string `json:"jabatan_pimpinan"`

	Pemenang       *string `json:"pemenang"`
	NilaiPenawaran *string `json:"nilai_penawaran"`
	NilaiTotal     *string `json:"nilai_total"`
	NilaiNegosiasi *string `json:"nilai_negosiasi"`
	NomorTelp      *string `json:"nomor_telp"`
	Email          *string `json:"email"`
	Npwp           *string `json:"npwp"`

	AlamatPemenang  *string `json:"alamat_pemenang"`
	LokasiPekerjaan *string `json:"lokasi_pekerjaan"`

	BuktiFile *string `json:"bukti_file"`
	Catatan   *string `json:"catatan"`

	SelectedPpkId *uint `gorm:"column:selected_ppk_id" json:"selected_ppk_id"`
	SelectedPpk   *User `gorm:"foreignKey:SelectedPpkId;references:Id" json:"selected_ppk,omitempty"`

	UserId uint  `gorm:"column:user_id;not null" json:"user_id"`
	User   *User `gorm:"foreignKey:UserId;references:Id" json:"user,omitempty"`
}
