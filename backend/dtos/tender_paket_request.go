package dtos

import "time"

type CreateAndUpdateTenderRequest struct {
	Type              *string `form:"type"`
	ProcurementMethod *string `form:"procurement_method"`
	TenderCode        *string `form:"tender_code"`
	RupCode           *string `form:"rup_code"`
	FiscalYear        *int    `form:"fiscal_year"`
	SatkerCode        *string `form:"satker_code"`
	SatkerName        *string `form:"satker_name"`
	PackageName       *string `form:"package_name"`
	FundingSource     *string `form:"funding_source"`
	ProcurementType   *string `form:"procurement_type"`

	BudgetValue *int `form:"budget_value"`
	HpsValue    *int `form:"hps_value"`

	ContractNumber *string    `form:"contract_number"`
	ContractDate   *time.Time `form:"contract_date"`
	PpkName        *string    `form:"ppk_name"`
	PpkPosition    *string    `form:"ppk_position"`
	CompanyLeader  *string    `form:"company_leader"`
	LeaderPosition *string    `form:"leader_position"`

	WinnerName       *string  `form:"winner_name"`
	BidValue         *float64 `form:"bid_value"`
	NegotiationValue *float64 `form:"negotiation_value"`
	Phone            *string  `form:"phone"`
	Email            *string  `form:"email"`
	Npwp             *string  `form:"npwp"`

	WinnerAddress *string `form:"winner_address"`
	WorkLocation  *string `form:"work_location"`

	Note          *string `form:"note"`
	SelectedPpkId *uint   `form:"selected_ppk_id"`

	KlpdCode       *string `form:"klpd_code"`
	AccountCode    *string `form:"account_code"`
	RupDescription *string `form:"rup_description"`
	RupName        *string `form:"rup_name"`
	OrderDate      *string `form:"order_date"`
	OrderId        *string `form:"order_id"`
	VendorId       *int    `form:"vendor_id"`
	InaProcStatus  *string `form:"inaproc_status"`
	TotalQuantity  *int    `form:"total_quantity"`

	RealizationStatus *string  `form:"realization_status"`
	PackageStatus     *string  `forn:"package_status"`
	DeliveryStatus    *string  `form:"delivery_status"`
	TotalValue        *float64 `form:"total_value"`
}
