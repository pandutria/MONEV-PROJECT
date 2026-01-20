package dtos

type CreateAndUpdateDataEntryRequest struct {
	Type              *string `json:"type" form:"type"`
	ProcurementMethod *string `json:"procurement_method" form:"procurement_method"`
	TenderCode        *string `json:"kd_temd" form:"tender_code"`
	RupCode           *string `json:"rup_code" form:"rup_code"`
	FiscalYear        *string `json:"fiscal_year" form:"fiscal_year"`
	SatkerCode        *string `json:"satker_code" form:"satker_code"`
	SatkerName        *string `json:"satker_name" form:"satker_name"`
	PackageName       *string `json:"package_name" form:"package_name"`
	FundingSource     *string `json:"funding_source" form:"funding_source"`
	ProcurementType   *string `json:"procurement_type" form:"procurement_type"`

	BudgetValue *string `json:"budget_value" form:"budget_value"`
	HpsValue    *string `json:"hps_value" form:"hps_value"`
	ShippingFee *string `json:"shipping_fee" form:"shipping_fee"`

	ContractNumber  *string `json:"contract_number" form:"contract_number"`
	ContractDate    *string `json:"contract_date" form:"contract_date"`
	ContractInitial *string `json:"contract_initial" form:"contract_initial"`
	ContractFinal   *string `json:"contract_final" form:"contract_final"`

	PpkName     *string `json:"ppk_name" form:"ppk_name"`
	PpkPosition *string `json:"ppk_position" form:"ppk_position"`

	CompanyLeader  *string `json:"company_leader" form:"company_leader"`
	LeaderPosition *string `json:"leader_position" form:"leader_position"`

	WinnerName       *string `json:"winner_name" form:"winner_name"`
	BidValue         *string `json:"bid_value" form:"bid_value"`
	NegotiationValue *string `json:"negotiation_value" form:"negotiation_value"`

	Phone *string `json:"phone" form:"phone"`
	Email *string `json:"email" form:"email"`
	Npwp  *string `json:"npwp" form:"npwp"`

	WinnerAddress *string `json:"winner_address" form:"winner_address"`
	WorkLocation  *string `json:"work_location" form:"work_location"`

	RealizationStatus *string `json:"realization_status" form:"realization_status"`
	PackageStatus     *string `json:"package_status" form:"package_status"`
	DeliveryStatus    *string `json:"delivery_status" form:"delivery_status"`
	TotalValue        *string `json:"total_value" form:"total_value"`

	Note         *string `json:"note" form:"note"`

	SelectedPpkId *uint `json:"selected_ppk_id" form:"selected_ppk_id"`
}
