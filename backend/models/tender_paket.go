package models

import "time"

type TenderPaket struct {
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

	ContractNumber *string    `json:"contract_number"`
	ContractDate   *time.Time `json:"contract_date"`
	PpkName        *string    `json:"ppk_name"`
	PpkPosition    *string    `json:"ppk_position"`
	CompanyLeader  *string    `json:"company_leader"`
	LeaderPosition *string    `json:"leader_position"`

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
}
