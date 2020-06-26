package main

import (
	"github.com/gin-gonic/gin"
	"memo/dal"
	"memo/middleware"
	"memo/service"
)

func main() {
	dal.InitMongo()
	//gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(middleware.CORS())
	router.Static("/memoStatic", "./static")
	if mode := gin.Mode(); mode == gin.TestMode {
		router.LoadHTMLGlob("/Users/kha/.gvm/pkgsets/go1.14/global/src/memo/static/templates/*")
	} else {
		router.LoadHTMLGlob("./static/templates/*")
	}
	//router.POST("/login", service.Login)
	//router.POST("/register", service.Register)
	//router.POST("/checkToken", service.CheckToken)
	//
	//rg := router.Group("/order")
	//rg.Use(middleware.JWTAuth())
	//{
	//	rg.POST("/createOrder", service.CreateOrder)
	//	rg.GET("/historyOrder", service.HistoryOrder)
	//	rg.GET("/orderDetail", service.OrderDetail)
	//}
	rgmemo := router.Group("/memo")
	{
		rgmemo.GET("/detailMemo", service.DetailMemo)
		rgmemo.POST("/getMemo", service.GetMemo)
		rgmemo.POST("/updateMemo", service.UpdateMemo)
	}
	//{
	//
	//}
	router.Run(":8080")
}