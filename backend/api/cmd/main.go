package main

import (
	"fmt"
	"net/http"
	"os"

	"dating-app/internal/api"
	_ "dating-app/internal/db/supabase"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var router = echo.New()

func main() {
	godotenv.Load()

	// Middleware
	router.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))
	router.Use(middleware.Recover())
	// appOrigin := []string{os.Getenv("APP-HOST"), os.Getenv("APP-ORIGIN")}.Join(str, ":")
	router.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:19006", os.Getenv("APP_ORIGIN")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	auth := router.Group("")
	auth.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(os.Getenv("JWTSECRET")),
	}))

	// Routes
	router.GET("/", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, "Hello World!")
	})
	router.GET("/user/create", api.CreateRandomUser)
	router.POST("/auth/register", api.Register)
	router.POST("/auth/login", api.LogIn)
	router.GET("/user/:id", api.GetUser)

	// Restricted routes
	auth.GET("/profiles", api.GetProfiles)
	auth.POST("/swipe", api.Swipe)

	host := fmt.Sprintf("%s:%s", os.Getenv("APIHOST"), os.Getenv("APIPORT"))

	// Start HTTP server
	router.Logger.Fatal(router.Start(host))
}
