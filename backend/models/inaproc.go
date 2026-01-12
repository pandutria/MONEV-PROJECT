package models

type InaProcResponse struct {
	Data []InaProcItem `json:"data"`
	// Meta InaProcMeta   `json:"meta"`
}

type InaProcMeta struct {
	Cursor  *string `json:"cursor"`
	HasMore bool    `json:"has_more"`
	Limit   int     `json:"limit"`
}

type InaProcItem struct {
	CountProduct   int    `json:"count_product"`
	KodeTender     string `json:"kode_penyedia"`
	KodeSatker     string `json:"kode_satker"`
	NamaSatker     string `json:"nama_satker"`
	RupCode        string `json:"rup_code"`
	KodeKlpd       string `json:"kode_klpd"`
	Mak            string `json:"mak"`
	OrderDate      string `json:"order_date"`
	OrderId        string `json:"order_id"`
	RekanId        int    `json:"rekan_id"`
	RupDesc        string `json:"rup_desc"`
	RupName        string `json:"rup_name"`
	Status         string `json:"status"`
	ShipmentStatus string `json:"shipment_status"`
	ShippingFee    int    `json:"shipping_fee"`
	TotalQty       int    `json:"total_qty"`
	FiscalYear     int    `json:"fiscal_year"`
	Funding        string `json:"funding_source"`
	Total          int    `json:"total"`
	KdSatker       string `json:"kd_satker"`
}
