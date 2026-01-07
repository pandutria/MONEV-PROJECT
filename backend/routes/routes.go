package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/optimus/backend/controllers"
	"github.com/optimus/backend/middleware"
)

func SetupRoutes(r *gin.Engine) {
	public := r.Group("/api")
	{
		public.POST("/auth/login", controllers.Login)
		public.GET("/users", controllers.GetUsers)
		public.GET("/rab/top10", controllers.GetTop10)
	}

	private := r.Group("/api")
	private.Use(middleware.BearerAuth())
	{
		private.GET("/auth/me", controllers.Me)
	}
}