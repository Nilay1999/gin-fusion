package main

import (
	"github.com/Nilay1999/gin-gonic-server/initializers"
	"github.com/Nilay1999/gin-gonic-server/models"
)

func main() {
	initializers.LoadEnvVariables()
	initializers.Init()
	initializers.Repository.AutoMigrate(&models.User{}, &models.Post{}, &models.Comment{}, &models.Vote{})
}
