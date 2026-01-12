package models

type InaProcResponse[T any] struct {
	Data []TenderPaket `json:"data"`
	Meta InaProcMeta `json:"meta"`
}

type InaProcMeta struct {
	Cursor  *string `json:"cursor"`
	HasMore bool    `json:"has_more"`
	Limit   int     `json:"limit"`
}
