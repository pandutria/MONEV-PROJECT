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
		public.GET("/user", controllers.GetAllUser)
		public.GET("/user/:id", controllers.GetUserById)
		public.POST("/user/create", controllers.CreateUser)
		public.PUT("/user/update/status/:id", controllers.UpdateStatus)
		public.PUT("/user/update/:id", controllers.UpdateUser)

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

		public.GET("/dataentry", controllers.GetAllDataEntry)
		public.GET("/dataentry/:id", controllers.GetDataEntryById)
		public.PUT("/dataentry/update/:id", controllers.UpdateDataEntry)
		public.DELETE("/dataentry/delete/:id", controllers.DeleteDataEntry)

		public.GET("/rab", controllers.GetAllRabHeader)
		public.GET("/rab/:id", controllers.GetRabHeaderById)
		public.PUT("/rab/update/:id", controllers.UpdateRabHeader)
		public.DELETE("/rab/delete/:id", controllers.DeleteRabHeader)

		public.GET("/rab/detail", controllers.GetAllRabDetail)
		public.POST("/rab/detail/create", controllers.CreateRabDetail)
		public.DELETE("/rab/detail/delete/:id", controllers.DeleteRabDetail)

		public.GET("/schedule", controllers.GetAllScheduleHeader)
		public.GET("/schedule/:id", controllers.GetScheduleById)
		public.PUT("/schedule/update/:id", controllers.UpdateSchedule)
		public.DELETE("/schedule/delete/:id", controllers.DeleteSchedule)

		public.GET("/schedule/item", controllers.GetAllScheduleItem)
		public.POST("/schedule/item/create", controllers.CreateScheduleItem)
		public.DELETE("/schedule/item/delete/:id", controllers.DeleteScheduleItem)

		public.GET("/schedule/week", controllers.GetAllWeek)
		public.POST("/schedule/week/create", controllers.CreateWeekSchedule)

		public.GET("/realisasi", controllers.GetAllRealisasi)
		public.PUT("/realisasi/update/:id", controllers.UpdateRealisasi)
		public.DELETE("/realisasi/delete/:id", controllers.DeleteRealisasi)

		public.GET("/realisasi/item", controllers.GetRealisasiItemByHeader)
		public.POST("/realisasi/item/create", controllers.CreateRealisasiItem)
		public.DELETE("/realisasi/item/delete/:id", controllers.DeleteRealisasiItem)

		public.GET("/realisasi/week", controllers.GetAllRealisasiWeek)
		public.POST("/realisasi/week/create", controllers.CreateRealisasiWeek)
		public.DELETE("/realisasi/week/delete/:id", controllers.DeleteRealisasiWeek)

		// Inaproc
		public.GET("/inaproc/cache", controllers.GetInaProcCache)
		public.GET("/inaproc/cache/:tender_id", controllers.GetInaProcByTenderId)
		public.POST("/inaproc/cache/add", controllers.PostInaProcCacheFromFile)

		public.GET("/non_tender_kontract_isbs", controllers.GetAllNonTenderKontractIsb)
		public.GET("/non_tender_isbs", controllers.GetAllNonTenderIsb)
		public.GET("/non_tender_selesai_isbs", controllers.GetAllNonTenderSelesaiIsb)
		public.GET("/non_tender_tahap_isbs", controllers.GetAllNonTenderTahapIsb)
		public.GET("/pencatatan_non_tender_isbs", controllers.GetAllPencatatanNonTenderIsb)
		public.GET("/tender_isbs", controllers.GetAllTenderIsb)
		public.GET("/tender_kontrak_isbs", controllers.GetAllTenderKontrakIsb)
		public.GET("/tender_selesai_isbs", controllers.GetAllTenderSelesaiIsb)
		public.GET("/tender_tahap_isbs", controllers.GetAllTenderTahapIsb)
		public.GET("/paket_purchasing", controllers.GetAllPaketPurchasing)
		public.GET("/paket_purchasing", controllers.GetAllPaketPurchasing)
		public.GET("/rup_paket_penyedia", controllers.GetAllRupPaketPenyedia)
		public.GET("/rup_paket_swakelola", controllers.GetAllRupPaketSwakelola)
		public.GET("/rup_penyedia_terumumkan", controllers.GetAllRupPenyediaTerumumkan)
	}

	private := r.Group("/api")
	private.Use(middleware.BearerAuth())
	{
		private.GET("/auth/me", controllers.Me)
		private.POST("/tender/create", controllers.CreateTender)
		private.POST("/dataentry/create", controllers.CreateDataEntry)
		private.POST("/rab/create", controllers.CreateRabHeader)
		private.POST("/schedule/create", controllers.CreateScheduleHeader)
		private.POST("/realisasi/create", controllers.CreateRealisasi)
	}
}
