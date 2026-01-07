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
		public.GET("/user", controllers.ShowUser)

		public.GET("/role", controllers.ShowRole)
		public.POST("/role/create", controllers.CreateRole)
		public.DELETE("/role/delete/:id", controllers.DeleteRole)

		public.POST("/user/create", controllers.CreateUser)
	}

	private := r.Group("/api")
	private.Use(middleware.BearerAuth())
	{
		private.GET("/auth/me", controllers.Me)
	}
}