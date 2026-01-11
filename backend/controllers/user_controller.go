package controllers

import (
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/dtos"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/utils"
)

func ShowUser(c *gin.Context) {
	var users []models.User
	config.DB.Preload("Role").Find(&users)
	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var req dtos.CreateUserRequest

	err := c.ShouldBind(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var existing models.User
	err = config.DB.Where("email = ?", req.Email).First(&existing).Error
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": "Email already registered",
		})
		return
	}

	skFile, _ := c.FormFile("sk_file")
	pbjFile, _ := c.FormFile("pbj_file")
	competenceFile, _ := c.FormFile("competence_file")
	photoFile, _ := c.FormFile("photo_file")

	uploadDir := "uploads/users"
	_ = os.MkdirAll(uploadDir, os.ModePerm)

	saveUploaded := func(file *multipart.FileHeader) *string {
		if file == nil {
			return nil
		}

		filename := uuid.New().String() + "_" + filepath.Base(file.Filename)
		path := filepath.Join(uploadDir, filename)

		if err := c.SaveUploadedFile(file, path); err != nil {
			return nil
		}
		return &path
	}

	skPath := saveUploaded(skFile)
	pbjPath := saveUploaded(pbjFile)
	competencePath := saveUploaded(competenceFile)
	photoPath := saveUploaded(photoFile)

	user := models.User{
		FullName: req.FullName,
		Email:    req.Email,
		Password: utils.HashSHA512(req.Password),
		IsActive: req.IsActive,

		Nik:    req.Nik,
		Nip:    req.Nip,
		Group:  req.Group,
		RoleId: req.RoleId,

		PhoneNumber:     req.PhoneNumber,
		OpdOrganization: req.OpdOrganization,

		SkNumber:         req.SkNumber,
		SkFile:           skPath,
		PbjNumber:        req.PbjNumber,
		PbjFile:          pbjPath,
		CompetenceNumber: req.CompetenceNumber,
		CompetenceFile:   competencePath,
		PhotoFile:        photoPath,
		SatkerCode:       req.SatkerCode,
		GpId:             req.GpId,
	}

	err = config.DB.Create(&user).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	var createdUser models.User

	if err := config.DB.
		Preload("Role").First(&createdUser, user.Id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Membuat data berhasil",
		"data":    createdUser,
	})
}
