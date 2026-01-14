package models

// import "encoding/json"
type InaProcResponse struct {
	Data []FirstInaProcItem `json:"data"`
	// Meta InaProcMeta   `json:"meta"`
}

type InaProcMeta struct {
	Cursor  *string `json:"cursor"`
	HasMore bool    `json:"has_more"`
	Limit   int     `json:"limit"`
}

type FirstInaProcItem struct {
	CountProduct int `json:"count_product"`

	KodeTender string `json:"kode_penyedia"`
	KdPenyedia int    `json:"kd_penyedia"`
	KdTender   int    `json:"kd_tender"`
	KdNontender   int    `json:"kd_nontender"`

	NamaSatker string `json:"nama_satker"`

	KodeSatker string `json:"kode_satker"`
	KdSatker   string `json:"kd_satker"`
	SatkerId   int    `json:"satker_id"`

	RupCode string `json:"rup_code"`
	KdRup   int    `json:"kd_rup"`

	KodeKlpd  string `json:"kode_klpd"`
	Mak       string `json:"mak"`
	OrderDate string `json:"order_date"`
	OrderId   string `json:"order_id"`
	RekanId   int    `json:"rekan_id"`
	RupDesc   string `json:"rup_desc"`
	RupName   string `json:"rup_name"`
	Status    string `json:"status"`

	ShipmentStatus string `json:"shipment_status"`

	ShippingFee int `json:"shipping_fee"`
	TotalQty    int `json:"total_qty"`

	FiscalYear    int `json:"fiscal_year"`
	TahunAnggaran int `json:"tahun_anggaran"`

	Funding        string `json:"funding_source"`
	NamaSumberDana string `json:"nama_sumber_dana"`

	Total      int `json:"total"`
	TotalHarga int `json:"total_harga"`

	WinnerName           string  `json:"winner_name"`
	BidValue             float64 `json:"bid_value"`
	NegotiationValue     float64 `json:"negotiation_value"`
	Phone                string  `json:"phone"`
	Email                string  `json:"email"`
	Npwp                 string  `json:"npwp_penyedia"`
	PackageName          string  `json:"nama_paket"`
	PpkName              string  `json:"nama_ppk"`
	PpkPosition          string  `json:"jabatan_ppk"`
	ContractNumber       string  `json:"no_kontrak"`
	ContractInitial      string  `json:"contract_initial"`
	ContractFinal        string  `json:"contract_final"`
	TglKontrakAwal       string  `json:"tgl_kontrak_akhir"`
	TglKontrakAkhir      string  `json:"tgl_kontrak_awal"`
	TglPelaksanakanAwal  string  `json:"tgl_awal_pelaksanaan_kontrak"`
	TglPelaksanakanAkhir string  `json:"tgl_akhir_pelaksanaan_kontrak"`
	KotaKontrak          string  `json:"kota_kontrak"`
	Pagu                 int     `json:"pagu"`
}

// type SecondInaProcItem struct {
// 	CountProduct     int     `json:"count_product"`
// 	KodeTender       string  `json:"kode_penyedia"`
// 	KodeSatker       string  `json:"kode_satker"`
// 	NamaSatker       string  `json:"nama_satker"`
// 	RupCode          string  `json:"rup_code"`
// 	KodeKlpd         string  `json:"kode_klpd"`
// 	Mak              string  `json:"mak"`
// 	OrderDate        string  `json:"order_date"`
// 	OrderId          string  `json:"order_id"`
// 	RekanId          int     `json:"rekan_id"`
// 	RupDesc          string  `json:"rup_desc"`
// 	RupName          string  `json:"rup_name"`
// 	Status           string  `json:"status"`
// 	ShipmentStatus   string  `json:"shipment_status"`
// 	ShippingFee      int     `json:"shipping_fee"`
// 	TotalQty         int     `json:"total_qty"`
// 	FiscalYear       int     `json:"fiscal_year"`
// 	Funding          string  `json:"funding_source"`
// 	Total            int     `json:"total"`
// 	KdSatker         string  `json:"kd_satker"`
// 	WinnerName       string  `json:"winner_name"`
// 	BidValue         float64 `json:"bid_value"`
// 	NegotiationValue float64 `json:"negotiation_value"`
// 	Phone            string  `json:"phone"`
// 	Email            string  `json:"email"`
// 	Npwp             string  `json:"npwp"`
// 	PackageName       string `json:"nama_paket"`
// 	PpkPosition    string    `json:"jabatan_ppk"`
// }
