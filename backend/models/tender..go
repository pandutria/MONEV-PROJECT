package models

import "time"

type NonTenderIsb struct {
	TahunAnggaran *int64  `db:"tahun_anggaran" json:"tahun_anggaran"`
	KdKlpd        *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd      *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd     *string `db:"jenis_klpd" json:"jenis_klpd"`
	KdSatker      *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr   *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker    *string `db:"nama_satker" json:"nama_satker"`

	LlsID    *int64  `db:"lls_id" json:"lls_id"`
	KdLpse   *int    `db:"kd_lpse" json:"kd_lpse"`
	NamaLpse *string `db:"nama_lpse" json:"nama_lpse"`

	KdNontender *int64  `db:"kd_nontender" json:"kd_nontender"`
	KdPktDce    *string `db:"kd_pkt_dce" json:"kd_pkt_dce"`
	KdRup       *string `db:"kd_rup" json:"kd_rup"`

	NamaPaket  *string  `db:"nama_paket" json:"nama_paket"`
	Pagu       *float64 `db:"pagu" json:"pagu"`
	Hps        *float64 `db:"hps" json:"hps"`
	SumberDana *string  `db:"sumber_dana" json:"sumber_dana"`
	Mak        *string  `db:"mak" json:"mak"`

	KualifikasiPaket *string `db:"kualifikasi_paket" json:"kualifikasi_paket"`
	JenisPengadaan   *string `db:"jenis_pengadaan" json:"jenis_pengadaan"`
	MtdPemilihan     *string `db:"mtd_pemilihan" json:"mtd_pemilihan"`

	LokasiPekerjaan   *string `db:"lokasi_pekerjaan" json:"lokasi_pekerjaan"`
	KontrakPembayaran *string `db:"kontrak_pembayaran" json:"kontrak_pembayaran"`

	StatusNontender *string `db:"status_nontender" json:"status_nontender"`
	VersiNontender  *int    `db:"versi_nontender" json:"versi_nontender"`

	KetDiulang *string `db:"ket_diulang" json:"ket_diulang"`
	KetDitutup *string `db:"ket_ditutup" json:"ket_ditutup"`

	TglBuatPaket           *time.Time `db:"tgl_buat_paket" json:"tgl_buat_paket"`
	TglKolektifKolegial    *time.Time `db:"tgl_kolektif_kolegial" json:"tgl_kolektif_kolegial"`
	TglPengumumanNontender *time.Time `db:"tgl_pengumuman_nontender" json:"tgl_pengumuman_nontender"`

	NipNamaPpk   *string `db:"nip_nama_ppk" json:"nip_nama_ppk"`
	NipNamaPokja *string `db:"nip_nama_pokja" json:"nip_nama_pokja"`
	NipNamaPp    *string `db:"nip_nama_pp" json:"nip_nama_pp"`

	UrlLpse          *string    `db:"url_lpse" json:"url_lpse"`
	RepeatOrder      *string    `db:"repeat_order" json:"repeat_order"`
	TglPenarikanData *time.Time `db:"tgl_penarikan_data" json:"tgl_penarikan_data"`
}

type NonTenderKontractIsb struct {
	TahunAnggaran                *int64     `db:"tahun_anggaran" json:"tahun_anggaran"`
	KdKlpd                       *string    `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd                     *string    `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd                    *string    `db:"jenis_klpd" json:"jenis_klpd"`
	KdSatker                     *string    `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr                  *string    `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker                   *string    `db:"nama_satker" json:"nama_satker"`
	AlamatSatker                 *string    `db:"alamat_satker" json:"alamat_satker"`
	KdLpse                       *int       `db:"kd_lpse" json:"kd_lpse"`
	KdNontender                  *int64     `db:"kd_nontender" json:"kd_nontender"`
	NamaPaket                    *string    `db:"nama_paket" json:"nama_paket"`
	MtdPengadaan                 *string    `db:"mtd_pengadaan" json:"mtd_pengadaan"`
	LingkupPekerjaan             *string    `db:"lingkup_pekerjaan" json:"lingkup_pekerjaan"`
	NoSppbj                      *string    `db:"no_sppbj" json:"no_sppbj"`
	NoKontrak                    *string    `db:"no_kontrak" json:"no_kontrak"`
	TglKontrak                   *time.Time `db:"tgl_kontrak" json:"tgl_kontrak"`
	TglKontrakAwal               *time.Time `db:"tgl_kontrak_awal" json:"tgl_kontrak_awal"`
	TglKontrakAkhir              *time.Time `db:"tgl_kontrak_akhir" json:"tgl_kontrak_akhir"`
	KotaKontrak                  *string    `db:"kota_kontrak" json:"kota_kontrak"`
	NipPpk                       *string    `db:"nip_ppk" json:"nip_ppk"`
	NamaPpk                      *string    `db:"nama_ppk" json:"nama_ppk"`
	JabatanPpk                   *string    `db:"jabatan_ppk" json:"jabatan_ppk"`
	NoSkPpk                      *string    `db:"no_sk_ppk" json:"no_sk_ppk"`
	NamaPenyedia                 *string    `db:"nama_penyedia" json:"nama_penyedia"`
	NpwpPenyedia                 *string    `db:"npwp_penyedia" json:"npwp_penyedia"`
	Npwp16Penyedia               *string    `db:"npwp16_penyedia" json:"npwp16_penyedia"`
	BentukUsahaPenyedia          *string    `db:"bentuk_usaha_penyedia" json:"bentuk_usaha_penyedia"`
	TipePenyedia                 *string    `db:"tipe_penyedia" json:"tipe_penyedia"`
	AnggotaKso                   *string    `db:"anggota_kso" json:"anggota_kso"`
	WakilSahPenyedia             *string    `db:"wakil_sah_penyedia" json:"wakil_sah_penyedia"`
	JabatanWakilPenyedia         *string    `db:"jabatan_wakil_penyedia" json:"jabatan_wakil_penyedia"`
	NamaRekBank                  *string    `db:"nama_rek_bank" json:"nama_rek_bank"`
	NoRekBank                    *string    `db:"no_rek_bank" json:"no_rek_bank"`
	NamaPemilikRekBank           *string    `db:"nama_pemilik_rek_bank" json:"nama_pemilik_rek_bank"`
	NilaiKontrak                 *float64   `db:"nilai_kontrak" json:"nilai_kontrak"`
	AlasanUbahNilaiKontrak       *string    `db:"alasan_ubah_nilai_kontrak" json:"alasan_ubah_nilai_kontrak"`
	AlasanNilaiKontrak10Persen   *string    `db:"alasan_nilai_kontrak_10_persen" json:"alasan_nilai_kontrak_10_persen"`
	NilaiPdnKontrak              *float64   `db:"nilai_pdn_kontrak" json:"nilai_pdn_kontrak"`
	NilaiUmkKontrak              *float64   `db:"nilai_umk_kontrak" json:"nilai_umk_kontrak"`
	JenisKontrak                 *string    `db:"jenis_kontrak" json:"jenis_kontrak"`
	InformasiLainnya             *string    `db:"informasi_lainnya" json:"informasi_lainnya"`
	StatusKontrak                *string    `db:"status_kontrak" json:"status_kontrak"`
	TglPenetapanStatusKontrak    *time.Time `db:"tgl_penetapan_status_kontrak" json:"tgl_penetapan_status_kontrak"`
	AlasanPenetapanStatusKontrak *string    `db:"alasan_penetapan_status_kontrak" json:"alasan_penetapan_status_kontrak"`
	ApakahAddendum               *string    `db:"apakah_addendum" json:"apakah_addendum"`
	VersiAddendum                *int       `db:"versi_addendum" json:"versi_addendum"`
	AlasanAddendum               *string    `db:"alasan_addendum" json:"alasan_addendum"`
}

type NonTenderSelesaiIsb struct {
	TahunAnggaran *int64  `db:"tahun_anggaran" json:"tahun_anggaran"`
	KdKlpd        *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd      *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd     *string `db:"jenis_klpd" json:"jenis_klpd"`
	KdSatker      *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr   *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker    *string `db:"nama_satker" json:"nama_satker"`

	LlsID    *int64  `db:"lls_id" json:"lls_id"`
	KdLpse   *int64  `db:"kd_lpse" json:"kd_lpse"`
	NamaLpse *string `db:"nama_lpse" json:"nama_lpse"`

	KdNontender *int64  `db:"kd_nontender" json:"kd_nontender"`
	KdPktDce    *string `db:"kd_pkt_dce" json:"kd_pkt_dce"`
	KdRup       *string `db:"kd_rup" json:"kd_rup"`

	NamaPaket  *string  `db:"nama_paket" json:"nama_paket"`
	Pagu       *float64 `db:"pagu" json:"pagu"`
	Hps        *float64 `db:"hps" json:"hps"`
	SumberDana *string  `db:"sumber_dana" json:"sumber_dana"`
	Mak        *string  `db:"mak" json:"mak"`

	KualifikasiPaket *string `db:"kualifikasi_paket" json:"kualifikasi_paket"`
	JenisPengadaan   *string `db:"jenis_pengadaan" json:"jenis_pengadaan"`
	MtdPemilihan     *string `db:"mtd_pemilihan" json:"mtd_pemilihan"`

	LokasiPekerjaan   *string `db:"lokasi_pekerjaan" json:"lokasi_pekerjaan"`
	KontrakPembayaran *string `db:"kontrak_pembayaran" json:"kontrak_pembayaran"`

	StatusNontender *string `db:"status_nontender" json:"status_nontender"`
	VersiNontender  *int64  `db:"versi_nontender" json:"versi_nontender"`

	KetDiulang *string `db:"ket_diulang" json:"ket_diulang"`
	KetDitutup *string `db:"ket_ditutup" json:"ket_ditutup"`

	TglBuatPaket           *time.Time `db:"tgl_buat_paket" json:"tgl_buat_paket"`
	TglKolektifKolegial    *time.Time `db:"tgl_kolektif_kolegial" json:"tgl_kolektif_kolegial"`
	TglPengumumanNontender *time.Time `db:"tgl_pengumuman_nontender" json:"tgl_pengumuman_nontender"`

	NipNamaPpk   *string `db:"nip_nama_ppk" json:"nip_nama_ppk"`
	NipNamaPokja *string `db:"nip_nama_pokja" json:"nip_nama_pokja"`
	NipNamaPp    *string `db:"nip_nama_pp" json:"nip_nama_pp"`

	UrlLpse          *string    `db:"url_lpse" json:"url_lpse"`
	RepeatOrder      *string    `db:"repeat_order" json:"repeat_order"`
	TglPenarikanData *time.Time `db:"tgl_penarikan_data" json:"tgl_penarikan_data"`
}

type NonTenderTahapIsb struct {
	TahunAnggaran *int    `db:"tahun_anggaran" json:"tahun_anggaran"`
	KdKlpd        *string `db:"kd_klpd" json:"kd_klpd"`
	KdSatker      *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr   *string `db:"kd_satker_str" json:"kd_satker_str"`

	KdLpse      *int   `db:"kd_lpse" json:"kd_lpse"`
	KdNontender *int64 `db:"kd_nontender" json:"kd_nontender"`

	KdTahapan   *int    `db:"kd_tahapan" json:"kd_tahapan"`
	NamaTahapan *string `db:"nama_tahapan" json:"nama_tahapan"`

	KdAkt   *int    `db:"kd_akt" json:"kd_akt"`
	NamaAkt *string `db:"nama_akt" json:"nama_akt"`

	TglAwal   *time.Time `db:"tgl_awal" json:"tgl_awal"`
	TglAkhir  *time.Time `db:"tgl_akhir" json:"tgl_akhir"`
	EventDate *time.Time `db:"_event_date" json:"event_date"`
}

type TenderIsb struct {
	TahunAnggaran     *int    `db:"tahun_anggaran" json:"tahun_anggaran"`
	ListTahunAnggaran *string `db:"list_tahun_anggaran" json:"list_tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker    *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker  *string `db:"nama_satker" json:"nama_satker"`

	KdLpse   *int    `db:"kd_lpse" json:"kd_lpse"`
	NamaLpse *string `db:"nama_lpse" json:"nama_lpse"`

	KdTender *int64 `db:"kd_tender" json:"kd_tender"`
	KdPktDce *int64 `db:"kd_pkt_dce" json:"kd_pkt_dce"`

	KdRup     *string `db:"kd_rup" json:"kd_rup"`
	NamaPaket *string `db:"nama_paket" json:"nama_paket"`

	Pagu *int64   `db:"pagu" json:"pagu"`
	Hps  *float64 `db:"hps" json:"hps"`

	SumberDana       *string `db:"sumber_dana" json:"sumber_dana"`
	KualifikasiPaket *string `db:"kualifikasi_paket" json:"kualifikasi_paket"`
	JenisPengadaan   *string `db:"jenis_pengadaan" json:"jenis_pengadaan"`

	MtdPemilihan   *string `db:"mtd_pemilihan" json:"mtd_pemilihan"`
	MtdEvaluasi    *string `db:"mtd_evaluasi" json:"mtd_evaluasi"`
	MtdKualifikasi *string `db:"mtd_kualifikasi" json:"mtd_kualifikasi"`

	KontrakPembayaran *string `db:"kontrak_pembayaran" json:"kontrak_pembayaran"`
	StatusTender      *string `db:"status_tender" json:"status_tender"`

	TanggalStatus *time.Time `db:"tanggal_status" json:"tanggal_status"`

	VersiTender *string `db:"versi_tender" json:"versi_tender"`
	KetDitutup  *string `db:"ket_ditutup" json:"ket_ditutup"`
	KetDiulang  *string `db:"ket_diulang" json:"ket_diulang"`

	TglBuatPaket        *time.Time `db:"tgl_buat_paket" json:"tgl_buat_paket"`
	TglKolektifKolegial *time.Time `db:"tgl_kolektif_kolegial" json:"tgl_kolektif_kolegial"`
	TglPengumumanTender *time.Time `db:"tgl_pengumuman_tender" json:"tgl_pengumuman_tender"`

	MaxLlsAuditUpdate *time.Time `db:"max_lls_auditupdate" json:"max_lls_auditupdate"`

	NipPpk  *string `db:"nip_ppk" json:"nip_ppk"`
	NamaPpk *string `db:"nama_ppk" json:"nama_ppk"`

	NipPokja  *string `db:"nip_pokja" json:"nip_pokja"`
	NamaPokja *string `db:"nama_pokja" json:"nama_pokja"`

	LokasiPekerjaan *string `db:"lokasi_pekerjaan" json:"lokasi_pekerjaan"`
	UrlLpse         *string `db:"url_lpse" json:"url_lpse"`

	EventDate *time.Time `db:"_event_date" json:"event_date"`
}

type TenderKontrakIsb struct {
	TahunAnggaran *int `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker     *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr  *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker   *string `db:"nama_satker" json:"nama_satker"`
	AlamatSatker *string `db:"alamat_satker" json:"alamat_satker"`

	KdLpse   *int   `db:"kd_lpse" json:"kd_lpse"`
	KdTender *int64 `db:"kd_tender" json:"kd_tender"`

	NamaPaket        *string `db:"nama_paket" json:"nama_paket"`
	LingkupPekerjaan *string `db:"lingkup_pekerjaan" json:"lingkup_pekerjaan"`

	NoSppbj   *string `db:"no_sppbj" json:"no_sppbj"`
	NoKontrak *string `db:"no_kontrak" json:"no_kontrak"`

	TglKontrak      *time.Time `db:"tgl_kontrak" json:"tgl_kontrak"`
	TglKontrakAwal  *time.Time `db:"tgl_kontrak_awal" json:"tgl_kontrak_awal"`
	TglKontrakAkhir *time.Time `db:"tgl_kontrak_akhir" json:"tgl_kontrak_akhir"`

	KotaKontrak *string `db:"kota_kontrak" json:"kota_kontrak"`

	NipPpk     *string `db:"nip_ppk" json:"nip_ppk"`
	NamaPpk    *string `db:"nama_ppk" json:"nama_ppk"`
	JabatanPpk *string `db:"jabatan_ppk" json:"jabatan_ppk"`
	NoSkPpk    *string `db:"no_sk_ppk" json:"no_sk_ppk"`

	KdPenyedia     *int64  `db:"kd_penyedia" json:"kd_penyedia"`
	NamaPenyedia   *string `db:"nama_penyedia" json:"nama_penyedia"`
	NpwpPenyedia   *string `db:"npwp_penyedia" json:"npwp_penyedia"`
	Npwp16Penyedia *string `db:"npwp_16_penyedia" json:"npwp_16_penyedia"`

	BentukUsahaPenyedia *string `db:"bentuk_usaha_penyedia" json:"bentuk_usaha_penyedia"`
	TipePenyedia        *string `db:"tipe_penyedia" json:"tipe_penyedia"`

	AnggotaKso *string `db:"anggota_kso" json:"anggota_kso"`

	WakilSahPenyedia     *string `db:"wakil_sah_penyedia" json:"wakil_sah_penyedia"`
	JabatanWakilPenyedia *string `db:"jabatan_wakil_penyedia" json:"jabatan_wakil_penyedia"`

	NamaRekBank        *string `db:"nama_rek_bank" json:"nama_rek_bank"`
	NoRekBank          *string `db:"no_rek_bank" json:"no_rek_bank"`
	NamaPemilikRekBank *string `db:"nama_pemilik_rek_bank" json:"nama_pemilik_rek_bank"`

	NilaiKontrak *float64 `db:"nilai_kontrak" json:"nilai_kontrak"`

	AlasanUbahNilaiKontrak     *string `db:"alasan_ubah_nilai_kontrak" json:"alasan_ubah_nilai_kontrak"`
	AlasanNilaiKontrak10Persen *string `db:"alasan_nilai_kontrak_10_persen" json:"alasan_nilai_kontrak_10_persen"`

	NilaiPdnKontrak *float64 `db:"nilai_pdn_kontrak" json:"nilai_pdn_kontrak"`
	NilaiUmkKontrak *float64 `db:"nilai_umk_kontrak" json:"nilai_umk_kontrak"`

	JenisKontrak     *string `db:"jenis_kontrak" json:"jenis_kontrak"`
	InformasiLainnya *string `db:"informasi_lainnya" json:"informasi_lainnya"`

	StatusKontrak *string `db:"status_kontrak" json:"status_kontrak"`

	TglPenetapanStatusKontrak    *time.Time `db:"tgl_penetapan_status_kontrak" json:"tgl_penetapan_status_kontrak"`
	AlasanPenetapanStatusKontrak *string    `db:"alasan_penetapan_status_kontrak" json:"alasan_penetapan_status_kontrak"`

	ApakahAddendum *string `db:"apakah_addendum" json:"apakah_addendum"`
	VersiAddendum  *int    `db:"versi_addendum" json:"versi_addendum"`
	AlasanAddendum *string `db:"alasan_addendum" json:"alasan_addendum"`
}

type TenderSelesaiIsb struct {
	TahunAnggaran *int `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker   *string `db:"kd_satker" json:"kd_satker"`
	NamaSatker *string `db:"nama_satker" json:"nama_satker"`

	KdLpse   *int   `db:"kd_lpse" json:"kd_lpse"`
	KdTender *int64 `db:"kd_tender" json:"kd_tender"`
	KdPaket  *int64 `db:"kd_paket" json:"kd_paket"`

	KdRupPaket *string `db:"kd_rup_paket" json:"kd_rup_paket"`

	Pagu            *float64 `db:"pagu" json:"pagu"`
	Hps             *float64 `db:"hps" json:"hps"`
	NilaiPenawaran  *float64 `db:"nilai_penawaran" json:"nilai_penawaran"`
	NilaiTerkoreksi *float64 `db:"nilai_terkoreksi" json:"nilai_terkoreksi"`
	NilaiNegosiasi  *float64 `db:"nilai_negosiasi" json:"nilai_negosiasi"`
	NilaiKontrak    *float64 `db:"nilai_kontrak" json:"nilai_kontrak"`

	TglPengumumanTender  *time.Time `db:"tgl_pengumuman_tender" json:"tgl_pengumuman_tender"`
	TglPenetapanPemenang *time.Time `db:"tgl_penetapan_pemenang" json:"tgl_penetapan_pemenang"`

	KdPenyedia     *int64  `db:"kd_penyedia" json:"kd_penyedia"`
	NamaPenyedia   *string `db:"nama_penyedia" json:"nama_penyedia"`
	NpwpPenyedia   *string `db:"npwp_penyedia" json:"npwp_penyedia"`
	Npwp16Penyedia *string `db:"npwp_16_penyedia" json:"npwp_16_penyedia"`

	NilaiPdnKontrak *float64 `db:"nilai_pdn_kontrak" json:"nilai_pdn_kontrak"`
	NilaiUmkKontrak *float64 `db:"nilai_umk_kontrak" json:"nilai_umk_kontrak"`

	EventDate *time.Time `db:"_event_date" json:"event_date"`
}

type TenderTahapIsb struct {
	TahunAnggaran *int `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd      *string `db:"kd_klpd" json:"kd_klpd"`
	KdSatker    *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr *string `db:"kd_satker_str" json:"kd_satker_str"`

	KdLpse   *int   `db:"kd_lpse" json:"kd_lpse"`
	KdTender *int64 `db:"kd_tender" json:"kd_tender"`

	KdTahapan   *int    `db:"kd_tahapan" json:"kd_tahapan"`
	NamaTahapan *string `db:"nama_tahapan" json:"nama_tahapan"`

	KdAkt   *int    `db:"kd_akt" json:"kd_akt"`
	NamaAkt *string `db:"nama_akt" json:"nama_akt"`

	TglAwal  *time.Time `db:"tgl_awal" json:"tgl_awal"`
	TglAkhir *time.Time `db:"tgl_akhir" json:"tgl_akhir"`

	EventDate *time.Time `db:"_event_date" json:"event_date"`
}

type PaketPurchasing struct {
	TahunAnggaran *string `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd   *string `db:"kd_klpd" json:"kd_klpd"`
	SatkerId *string `db:"satker_id" json:"satker_id"`

	NamaSatker   *string `db:"nama_satker" json:"nama_satker"`
	AlamatSatker *string `db:"alamat_satker" json:"alamat_satker"`
	NpwpSatker   *string `db:"npwp_satker" json:"npwp_satker"`

	KdPaket   *string `db:"kd_paket" json:"kd_paket"`
	NoPaket   *string `db:"no_paket" json:"no_paket"`
	NamaPaket *string `db:"nama_paket" json:"nama_paket"`

	KdRup          *string `db:"kd_rup" json:"kd_rup"`
	NamaSumberDana *string `db:"nama_sumber_dana" json:"nama_sumber_dana"`
	KodeAnggaran   *string `db:"kode_anggaran" json:"kode_anggaran"`

	KdKomoditas *string `db:"kd_komoditas" json:"kd_komoditas"`
	KdProduk    *string `db:"kd_produk" json:"kd_produk"`

	KdPenyedia            *string `db:"kd_penyedia" json:"kd_penyedia"`
	KdPenyediaDistributor *string `db:"kd_penyedia_distributor" json:"kd_penyedia_distributor"`

	JmlJenisProduk *string `db:"jml_jenis_produk" json:"jml_jenis_produk"`

	Total       *string `db:"total" json:"total"`
	Kuantitas   *string `db:"kuantitas" json:"kuantitas"`
	HargaSatuan *string `db:"harga_satuan" json:"harga_satuan"`
	OngkosKirim *string `db:"ongkos_kirim" json:"ongkos_kirim"`
	TotalHarga  *string `db:"total_harga" json:"total_harga"`

	KdUserPokja     *string `db:"kd_user_pokja" json:"kd_user_pokja"`
	NoTelpUserPokja *string `db:"no_telp_user_pokja" json:"no_telp_user_pokja"`
	EmailUserPokja  *string `db:"email_user_pokja" json:"email_user_pokja"`

	KdUserPpk  *string `db:"kd_user_ppk" json:"kd_user_ppk"`
	PpkNip     *string `db:"ppk_nip" json:"ppk_nip"`
	JabatanPpk *string `db:"jabatan_ppk" json:"jabatan_ppk"`

	TanggalBuatPaket *string `db:"tanggal_buat_paket" json:"tanggal_buat_paket"`
	TanggalEditPaket *string `db:"tanggal_edit_paket" json:"tanggal_edit_paket"`

	Deskripsi      *string `db:"deskripsi" json:"deskripsi"`
	StatusPaket    *string `db:"status_paket" json:"status_paket"`
	PaketStatusStr *string `db:"paket_status_str" json:"paket_status_str"`

	CatatanProduk *string `db:"catatan_produk" json:"catatan_produk"`
}

type PencatatanNonTenderIsb struct {
	TahunAnggaran *int `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker    *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker  *string `db:"nama_satker" json:"nama_satker"`

	KdLpse         *int   `db:"kd_lpse" json:"kd_lpse"`
	KdNontenderPct *int64 `db:"kd_nontender_pct" json:"kd_nontender_pct"`
	KdPktDce       *int64 `db:"kd_pkt_dce" json:"kd_pkt_dce"`

	KdRup     *string `db:"kd_rup" json:"kd_rup"`
	NamaPaket *string `db:"nama_paket" json:"nama_paket"`

	Pagu           *float64 `db:"pagu" json:"pagu"`
	TotalRealisasi *float64 `db:"total_realisasi" json:"total_realisasi"`
	NilaiPdnPct    *float64 `db:"nilai_pdn_pct" json:"nilai_pdn_pct"`
	NilaiUmkPct    *float64 `db:"nilai_umk_pct" json:"nilai_umk_pct"`

	SumberDana        *string `db:"sumber_dana" json:"sumber_dana"`
	UraianPekerjaan  *string `db:"uraian_pekerjaan" json:"uraian_pekerjaan"`
	InformasiLainnya *string `db:"informasi_lainnya" json:"informasi_lainnya"`

	KategoriPengadaan *string `db:"kategori_pengadaan" json:"kategori_pengadaan"`
	MtdPemilihan      *string `db:"mtd_pemilihan" json:"mtd_pemilihan"`

	BuktiPembayaran        *string `db:"bukti_pembayaran" json:"bukti_pembayaran"`
	StatusNontenderPct    *string `db:"status_nontender_pct" json:"status_nontender_pct"`
	StatusNontenderPctKet *string `db:"status_nontender_pct_ket" json:"status_nontender_pct_ket"`

	AlasanPembatalan *string `db:"alasan_pembatalan" json:"alasan_pembatalan"`

	NipPpk  *string `db:"nip_ppk" json:"nip_ppk"`
	NamaPpk *string `db:"nama_ppk" json:"nama_ppk"`

	TglBuatPaket    *time.Time `db:"tgl_buat_paket" json:"tgl_buat_paket"`
	TglMulaiPaket   *time.Time `db:"tgl_mulai_paket" json:"tgl_mulai_paket"`
	TglSelesaiPaket *time.Time `db:"tgl_selesai_paket" json:"tgl_selesai_paket"`

	EventDate *time.Time `db:"_event_date" json:"event_date"`
}

type RupPaketPenyedia struct {
	TahunAnggaran *string `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker    *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker  *string `db:"nama_satker" json:"nama_satker"`

	KdRup      *string `db:"kd_rup" json:"kd_rup"`
	KdRupLokal *string `db:"kd_rup_lokal" json:"kd_rup_lokal"`

	KdKegiatan    *string `db:"kd_kegiatan" json:"kd_kegiatan"`
	KdKomponen    *string `db:"kd_komponen" json:"kd_komponen"`
	KdSubkegiatan *string `db:"kd_subkegiatan" json:"kd_subkegiatan"`

	Pagu *string `db:"pagu" json:"pagu"`
	Mak  *string `db:"mak" json:"mak"`

	SumberDana *string `db:"sumber_dana" json:"sumber_dana"`

	KdJenisPengadaan *string `db:"kd_jenis_pengadaan" json:"kd_jenis_pengadaan"`

	AsalDanaKlpd   *string `db:"asal_dana_klpd" json:"asal_dana_klpd"`
	AsalDanaSatker *string `db:"asal_dana_satker" json:"asal_dana_satker"`

	StatusAktifRup     *string `db:"status_aktif_rup" json:"status_aktif_rup"`
	StatusDeleteRup    *string `db:"status_delete_rup" json:"status_delete_rup"`
	StatusUmumkanRup   *string `db:"status_umumkan_rup" json:"status_umumkan_rup"`

	TahunAnggaranDana *string `db:"tahun_anggaran_dana" json:"tahun_anggaran_dana"`
}

type RupPaketSwakelola struct {
	TahunAnggaran *string `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker    *string `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr *string `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker  *string `db:"nama_satker" json:"nama_satker"`

	KdRup      *string `db:"kd_rup" json:"kd_rup"`
	KdRupLokal *string `db:"kd_rup_lokal" json:"kd_rup_lokal"`

	KdKegiatan    *string `db:"kd_kegiatan" json:"kd_kegiatan"`
	KdKomponen    *string `db:"kd_komponen" json:"kd_komponen"`
	KdSubkegiatan *string `db:"kd_subkegiatan" json:"kd_subkegiatan"`

	Pagu *string `db:"pagu" json:"pagu"`
	Mak  *string `db:"mak" json:"mak"`

	SumberDana        *string `db:"sumber_dana" json:"sumber_dana"`
	TahunAnggaranDana *string `db:"tahun_anggaran_dana" json:"tahun_anggaran_dana"`

	AsalDanaKlpd   *string `db:"asal_dana_klpd" json:"asal_dana_klpd"`
	AsalDanaSatker *string `db:"asal_dana_satker" json:"asal_dana_satker"`

	StatusAktifRup   *string `db:"status_aktif_rup" json:"status_aktif_rup"`
	StatusDeleteRup  *string `db:"status_delete_rup" json:"status_delete_rup"`
	StatusUmumkanRup *string `db:"status_umumkan_rup" json:"status_umumkan_rup"`
}

type RupPenyediaTerumumkan struct {
	TahunAnggaran *float64 `db:"tahun_anggaran" json:"tahun_anggaran"`

	KdKlpd    *string `db:"kd_klpd" json:"kd_klpd"`
	NamaKlpd  *string `db:"nama_klpd" json:"nama_klpd"`
	JenisKlpd *string `db:"jenis_klpd" json:"jenis_klpd"`

	KdSatker    *float64 `db:"kd_satker" json:"kd_satker"`
	KdSatkerStr *string  `db:"kd_satker_str" json:"kd_satker_str"`
	NamaSatker  *string  `db:"nama_satker" json:"nama_satker"`

	KdRup     *string `db:"kd_rup" json:"kd_rup"`
	NamaPaket *string `db:"nama_paket" json:"nama_paket"`

	Pagu *float64 `db:"pagu" json:"pagu"`

	KdMetodePengadaan *string `db:"kd_metode_pengadaan" json:"kd_metode_pengadaan"`
	MetodePengadaan   *string `db:"metode_pengadaan" json:"metode_pengadaan"`

	KdJenisPengadaan *string `db:"kd_jenis_pengadaan" json:"kd_jenis_pengadaan"`
	JenisPengadaan   *string `db:"jenis_pengadaan" json:"jenis_pengadaan"`

	StatusPradipa *string `db:"status_pradipa" json:"status_pradipa"`
	StatusPdn     *string `db:"status_pdn" json:"status_pdn"`
	StatusUkm     *string `db:"status_ukm" json:"status_ukm"`
	AlasanNonUkm  *string `db:"alasan_non_ukm" json:"alasan_non_ukm"`

	StatusKonsolidasi *string `db:"status_konsolidasi" json:"status_konsolidasi"`
	TipePaket         *string `db:"tipe_paket" json:"tipe_paket"`

	KdRupSwakelola *string `db:"kd_rup_swakelola" json:"kd_rup_swakelola"`
	KdRupLokal     *string `db:"kd_rup_lokal" json:"kd_rup_lokal"`

	VolumePekerjaan *string `db:"volume_pekerjaan" json:"volume_pekerjaan"`
	UraianPekerjaan *string `db:"urarian_pekerjaan" json:"urarian_pekerjaan"`
	Spesifikasi     *string `db:"spesifikasi_pekerjaan" json:"spesifikasi_pekerjaan"`

	TglAwalPemilihan   *string `db:"tgl_awal_pemilihan" json:"tgl_awal_pemilihan"`
	TglAkhirPemilihan  *string `db:"tgl_akhir_pemilihan" json:"tgl_akhir_pemilihan"`
	TglAwalKontrak     *string `db:"tgl_awal_kontrak" json:"tgl_awal_kontrak"`
	TglAkhirKontrak    *string `db:"tgl_akhir_kontrak" json:"tgl_akhir_kontrak"`
	TglAwalPemanfaatan *string `db:"tgl_awal_pemanfaatan" json:"tgl_awal_pemanfaatan"`
	TglAkhirPemanfaatan *string `db:"tgl_akhir_pemanfaatan" json:"tgl_akhir_pemanfaatan"`

	TglBuatPaket        *string `db:"tgl_buat_paket" json:"tgl_buat_paket"`
	TglPengumumanPaket  *string `db:"tgl_pengumuman_paket" json:"tgl_pengumuman_paket"`

	NipPpk      *string `db:"nip_ppk" json:"nip_ppk"`
	NamaPpk     *string `db:"nama_ppk" json:"nama_ppk"`
	UsernamePpk *string `db:"username_ppk" json:"username_ppk"`

	StatusAktifRup   *string `db:"status_aktif_rup" json:"status_aktif_rup"`
	StatusDeleteRup  *string `db:"status_delete_rup" json:"status_delete_rup"`
	StatusUmumkanRup *string `db:"status_umumkan_rup" json:"status_umumkan_rup"`
}