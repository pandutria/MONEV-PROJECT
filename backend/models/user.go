package models


type User struct {
	UserId    uint   `gorm:"primaryKey" json:"user_id"`
    Email           string  `json:"email"`
    Passw           string  `json:"passw"`
    IsVerifiedEmail bool    `json:"is_verified_email"`
    IsActive        bool    `json:"is_active"`
    AuditedBy       string  `json:"audited_by"`
    Nik 			string `json:"nik"`
    Nip 			string `json:"nip"`
    GlCode 			string  `json:"gl_code"`
    GlName 			*string `json:"gl_name"`
    RoleCode 		string  `json:"role_code"`
    RoleName 		*string `json:"role_name"`

    NoSk   			string  `json:"no_sk"`
    FileSk 			*string `json:"file_sk"`

    FullName 		string `json:"full_name"`
    Alias    		string `json:"alias"`
    Address  		string `json:"address"`
    PbjCert            string  `json:"pbj_cert"`
    FilePbjCert        *string `json:"file_pbj_cert"`
    CompetenceCert     string  `json:"competence_cert"`
    FileCompetenceCert *string `json:"file_competence_cert"`

    Phone     string  `json:"phone"`
    FilePhoto *string `json:"file_photo"`

    OpdOrganization string `json:"opd_organization"`
    KdSatker        uint64 `json:"kd_satker"`
    GPId            uint64 `json:"gp_id"`

}