package main

import (
	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/models"
	"github.com/optimus/backend/routes"
)

func main() {
	r := gin.Default()

	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.Role{},
		&models.User{},
	)

	routes.SetupRoutes(r)

	r.Run(":8093")
}