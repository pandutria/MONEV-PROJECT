package main

import (
	"github.com/gin-contrib/cors"
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
		&models.PokjaGroups{},
		&models.UserPokjaGroups{},
		&models.TenderPaket{},
		&models.RabHeader{},
		&models.RabDetail{},
		&models.ScheduleHeader{},
		&models.ScheduleItem{},
		&models.ScheduleWeek{},
		&models.RealisasiHeader{},
		&models.RealisasiItem{},
		&models.RealisasiWeek{},
	)

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	routes.SetupRoutes(r)

	r.Run(":8000")
}
