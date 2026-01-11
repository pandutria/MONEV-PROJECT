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

func GetAllUser(c *gin.Context) {
	var users []models.User
	config.DB.Preload("Role").Preload("PokjaGroup").Find(&users)
	c.JSON(http.StatusOK, gin.H{
		"message": "Berhasil mengambil data",
		"data":    users,
	})
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
	photoFile, _ := c.FormFile("file_photo")

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

		Nik:           req.Nik,
		Nip:           req.Nip,
		Group:         req.Group,
		RoleId:        req.RoleId,
		PokjaGroupsId: req.PokjaGroupsId,

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
		Address:          req.Address,
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

func GetUserById(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	err := config.DB.Preload("Role").First(&user, id).Error
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"message": "Mengambil data gagal",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengambil data berhasil",
		"data": user,
	})
}

func UpdateUser(c *gin.Context) {
	var req dtos.CreateUserRequest
	id := c.Param("user_id")

	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "User tidak ditemukan",
		})
		return
	}

	if req.Email != "" {
		var count int64
		config.DB.Model(&models.User{}).
			Where("email = ? AND id <> ?", req.Email, id).
			Count(&count)

		if count > 0 {
			c.JSON(http.StatusConflict, gin.H{
				"message": "Email sudah digunakan!",
			})
			return
		}
	}

	// upload file
	saveUploaded := func(field string) *string {
		file, err := c.FormFile(field)
		if err != nil {
			return nil
		}

		_ = os.MkdirAll("uploads/users", os.ModePerm)
		filename := uuid.New().String() + "_" + filepath.Base(file.Filename)
		path := filepath.Join("uploads/users", filename)

		if err := c.SaveUploadedFile(file, path); err != nil {
			return nil
		}
		return &path
	}

	if p := saveUploaded("sk_file"); p != nil {
		user.SkFile = p
	}
	if p := saveUploaded("pbj_file"); p != nil {
		user.PbjFile = p
	}
	if p := saveUploaded("competence_file"); p != nil {
		user.CompetenceFile = p
	}
	if p := saveUploaded("file_photo"); p != nil {
		user.PhotoFile = p
	}

	// update field
	user.FullName = req.FullName
	user.Email = req.Email
	user.IsActive = req.IsActive
	user.Nik = req.Nik
	user.Nip = req.Nip
	user.Group = req.Group
	user.RoleId = req.RoleId
	user.PokjaGroupsId = req.PokjaGroupsId
	user.PhoneNumber = req.PhoneNumber
	user.OpdOrganization = req.OpdOrganization
	user.SkNumber = req.SkNumber
	user.PbjNumber = req.PbjNumber
	user.CompetenceNumber = req.CompetenceNumber
	user.SatkerCode = req.SatkerCode
	user.GpId = req.GpId
	user.Address = req.Address

	if req.Password != "" {
		user.Password = utils.HashSHA512(req.Password)
	}

	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	config.DB.Preload("Role").First(&user, user.Id)

	c.JSON(http.StatusOK, gin.H{
		"message": "Mengubah data berhasil",
		"data":    user,
	})
}


func UpdateStatus(c *gin.Context) {
	id := c.Param("user_id")

	var user models.User
	config.DB.First(&user, id)

	if user.IsActive == nil {
		active := true
		user.IsActive = &active
	} else {
		*user.IsActive = !*user.IsActive
	}

	err := config.DB.Save(&user).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Mengubah status gagal!",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Status berhasil diubah!",
		"data":    user,
	})
}
