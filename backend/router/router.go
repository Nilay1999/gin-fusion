package router

import (
	"net/http"
	"time"

	"github.com/Nilay1999/gin-gonic-server/controllers"
	"github.com/Nilay1999/gin-gonic-server/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.New()
	router.ForwardedByClientIP = true
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Add your frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(gin.Logger())
	router.Use(cors.New(config))

	router.GET("/health-check", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Server running ...",
		})
	})

	v1 := router.Group("v1")
	{
		userGroup := v1.Group("user").Use(middleware.AuthenticateRequest)
		{
			user := new(controllers.UserController)
			userGroup.GET("", user.GetPaginatedUser)
		}
		{
			user := new(controllers.UserController)
			userGroup.GET(":id", user.GetUserById)
		}
		{
			user := new(controllers.UserController)
			userGroup.DELETE(":id", user.DeleteUser)
		}

		postGroup := v1.Group("post").Use(middleware.AuthenticateRequest)
		{
			post := new(controllers.PostController)
			postGroup.GET("", post.GetAllPost)
		}
		{
			post := new(controllers.PostController)
			postGroup.GET(":id", post.GetById)
		}
		{
			post := new(controllers.PostController)
			postGroup.POST("", post.CreatePost)
		}
		{
			post := new(controllers.PostController)
			postGroup.POST("/upvote/:id", post.Upvote)
		}
		{
			post := new(controllers.PostController)
			postGroup.POST("/downvote/:id", post.Downvote)
		}
		{
			post := new(controllers.PostController)
			postGroup.POST("/upload", post.UploadFileHandler)
		}

		authGroup := v1.Group("auth")
		{
			auth := new(controllers.AuthController)
			authGroup.POST("signin", auth.Signin)
		}
		{
			auth := new(controllers.AuthController)
			authGroup.POST("signup", auth.Signup)
		}
	}
	return router
}
