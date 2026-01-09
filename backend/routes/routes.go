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
		public.POST("/user/create", controllers.CreateUser)

		public.GET("/role", controllers.ShowRole)
		public.POST("/role/create", controllers.CreateRole)
		public.DELETE("/role/delete/:id", controllers.DeleteRole)

		public.GET("/pokja-group", controllers.GetAllPokjaGroup)
		public.POST("/pokja-group/create", controllers.CreatePokjaGroup)
		public.PUT("/pokja-group/update/:id", controllers.UpdatePokjaGroup)
		public.DELETE("/pokja-group/delete/:id", controllers.DeletePokjaGroups)

		public.GET("/pokja-group/user", controllers.GetAllUserPokja)
		public.POST("/pokja-group/user/create", controllers.CreateUserPokja)
		public.PUT("/pokja-group/user/update/:id", controllers.UpdateUserPokja)
		public.DELETE("/pokja-group/user/delete/:id", controllers.DeleteUserPokja)

		public.GET("/tender", controllers.GetAllTender)
		public.GET("/tender/:id", controllers.GetTenderById)
		public.PUT("/tender/update/:id", controllers.UpdateTender)
		public.DELETE("/tender/delete/:id", controllers.DeleteTender)

		public.GET("/rab", controllers.GetAllRabHeader)
		public.GET("/rab/:id", controllers.GetRabHeaderById)
		public.PUT("/rab/update/:id", controllers.UpdateRabHeader)
		public.DELETE("/rab/delete/:id", controllers.DeleteRabHeader)

		public.GET("/rab/detail", controllers.GetAllRabDetail)
		public.POST("/rab/detail/create", controllers.CreateRabDetail)
		public.DELETE("/rab/detail/delete/:id", controllers.DeleteRabDetail)

		public.GET("/schedule", controllers.GetAllScheduleHeader)
		public.PUT("/schedule/update/:id", controllers.UpdateSchedule)
		public.DELETE("/schedule/delete/:id", controllers.DeleteSchedule)

		public.GET("/schedule/item", controllers.GetAllScheduleItem)
		public.POST("/schedule/item/create", controllers.CreateScheduleItem)
		public.DELETE("/schedule/item/delete/:id", controllers.DeleteScheduleItem)

		public.GET("/schedule/week", controllers.GetWeekScheduleByScheduleItem)
		public.POST("/schedule/week/create", controllers.CreateWeekSchedule)

		public.GET("/realisasi", controllers.GetAllRealisasi)
		public.PUT("/realisasi/update/:id", controllers.UpdateRealisasi)
		public.DELETE("/realisasi/delete/:id", controllers.DeleteRealisasi)

		public.GET("realisasi/item", controllers.GetRealisasiItemByHeader)
		public.POST("realisasi/item/create", controllers.CreateRealisasiItem)
		public.DELETE("realisasi/item/delete/:id", controllers.DeleteRealisasiItem)

		public.GET("/realisasi/week", controllers.GetAllRealisasiWeek)
		public.POST("realisasi/week", controllers.CreateRealisasiWeek)
		public.DELETE("realisasi/week/delete/:id", controllers.DeleteRealisasiWeek)
	}

	private := r.Group("/api")
	private.Use(middleware.BearerAuth())
	{
		private.GET("/auth/me", controllers.Me)
		private.POST("/tender/create", controllers.CreateTender)
		private.POST("/rab/create", controllers.CreateRabHeader)
		private.POST("/schedule/create", controllers.CreateScheduleHeader)
		private.POST("/realisasi/create", controllers.CreateRealisasi)
	}
}