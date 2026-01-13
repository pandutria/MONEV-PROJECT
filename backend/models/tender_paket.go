package models

import "time"

type TenderPaket struct {
	Id                uint    `gorm:"primaryKey" json:"id"`
	Type              *string `json:"type"`
	ProcurementMethod *string `json:"procurement_method"`
	TenderCode        *string `json:"tender_code"`
	RupCode           *string `json:"rup_code"`
	FiscalYear        *int    `json:"fiscal_year"`
	SatkerCode        *string `json:"satker_code"`
	SatkerName        *string `json:"satker_name"`
	PackageName       *string `json:"package_name"`
	FundingSource     *string `json:"funding_source"`
	ProcurementType   *string `json:"procurement_type"`

	BudgetValue *int `json:"budget_value"`
	HpsValue    *int `json:"hps_value"`
	ShippingFee *int `json:"shipping_fee"`

	ContractNumber  *string    `json:"contract_number"`
	ContractDate    *time.Time `json:"contract_date"`
	ContractInitial *string    `json:"contract_initial"`
	ContractFinal   *string    `json:"contract_final"`
	PpkName         *string    `json:"ppk_name"`
	PpkPosition     *string    `json:"ppk_position"`
	CompanyLeader   *string    `json:"company_leader"`
	LeaderPosition  *string    `json:"leader_position"`

	WinnerName       *string  `json:"winner_name"`
	BidValue         *float64 `json:"bid_value"`
	NegotiationValue *float64 `json:"negotiation_value"`
	Phone            *string  `json:"phone"`
	Email            *string  `json:"email"`
	Npwp             *string  `json:"npwp"`

	WinnerAddress *string `json:"winner_address"`
	WorkLocation  *string `json:"work_location"`

	EvidenceFile *string `json:"evidence_file"`
	Note         *string `json:"note"`

	RealizationStatus *string  `json:"realization_status"`
	PackageStatus     *string  `json:"package_status"`
	DeliveryStatus    *string  `json:"delivery_status"`
	TotalValue        *float64 `json:"total_value"`

	AccountCode    *string `json:"account_code"`
	KlpdCode       *string `json:"klpd_code"`
	RupDescription *string `json:"rup_description"`
	RupName        *string `json:"rup_name"`
	OrderDate      *string `json:"order_date"`
	OrderId        *string `json:"order_id"`
	VendorId       *int    `json:"vendor_id"`
	TotalQuantity  *int    `json:"total_quantity"`
	CountProduct   *int    `json:"count_product"`

	SelectedPpkId *uint `gorm:"column:selected_ppk_id" json:"selected_ppk_id"`
	SelectedPpk   *User `gorm:"foreignKey:SelectedPpkId;references:Id" json:"selected_ppk,omitempty"`

	UserId uint  `gorm:"column:user_id;not null" json:"user_id"`
	User   *User `gorm:"foreignKey:UserId;references:Id" json:"user,omitempty"`
}
