package models

import (
	"time"
)

type Rab_Header struct {
	RABHeaderID      uint64      `gorm:"primaryKey;column:rab_header_id" json:"rab_header_id"`
	RupCode          string      `gorm:"column:rup_code" json:"rup_code"`
	ProgramName      string      `gorm:"column:program_name" json:"program_name"`
	ActivityCode     string      `gorm:"column:activity_code;not null" json:"activity_code"`
	ActivityName     string      `gorm:"column:activity_name" json:"activity_name"`
	ActivityLocation string      `gorm:"column:activity_location" json:"activity_location"` // Typo di nama kolom "activitiy_location"?
	BudgetYear       int         `gorm:"column:budget_year" json:"budget_year"`
	UserID           int         `gorm:"column:user_id" json:"user_id"` // Nullable int menggunakan pointer
	IsDeleted        bool        `gorm:"column:is_deleted;default:false" json:"is_deleted"`
	AuditedBy        string      `gorm:"column:audited_by" json:"audited_by"`
	CreatedAt        time.Time   `gorm:"column:created_at;default:now()" json:"created_at"`
	Auditupdate      time.Time   `gorm:"column:auditupdate;default:now()" json:"auditupdate"`
	Rab_Detail       []Rab_Detail`gorm:"foreignKey:RABHeaderID" json:"details"`
	Reason           string      `gorm:"column:reason" json:"reason"`
	SatkerID         int64       `gorm:"column:satker_id" json:"satker_id"`
	SatkerName       string      `gorm:"column:satker_name" json:"satker_name"`
	DocStatus        string      `gorm:"column:doc_status" json:"doc_status"`
	StartedDate      *time.Time  `gorm:"column:started_date"`
	FinishedDate     *time.Time  `gorm:"column:finished_date"`
	Revision         int         `gorm:"column:revision"`
	LockedData       bool        `gorm:"column:locked_data"`
}