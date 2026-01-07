package main

import (
	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/config"
	"github.com/optimus/backend/routes"
)

func main() {
	r := gin.Default()

	config.ConnectDB()

	routes.SetupRoutes(r)

	r.Run(":8092")
}