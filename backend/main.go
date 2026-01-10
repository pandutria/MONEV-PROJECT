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

	routes.SetupRoutes(r)

	r.Run(":8000")
}
