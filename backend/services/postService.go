package services

import (
	"fmt"
	"mime/multipart"
	"os"

	"github.com/Nilay1999/gin-gonic-server/initializers"
	"github.com/Nilay1999/gin-gonic-server/models"
	"github.com/Nilay1999/gin-gonic-server/types"
	"github.com/Nilay1999/gin-gonic-server/utils"
	storage_go "github.com/supabase-community/storage-go"
)

type Post struct {
	models.Post
}

func (p Post) Create(data types.CreatePost) (*Post, error) {
	post := Post{
		Post: models.Post{
			Title:  data.Title,
			Body:   data.Body,
			UserID: data.UserId,
		},
	}
	result := initializers.Repository.Create(&post)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := initializers.Repository.Preload("User").First(&post, post.ID).Error; err != nil {
		return nil, err
	}

	return &post, nil
}

func (p Post) Get(offset int, limit int) ([]types.PostReponse, error) {
	var posts []Post
	result := initializers.Repository.Preload("User").Preload("Votes.User").Limit(limit).Offset(offset).Find(&posts)
	if result.Error != nil {
		return nil, result.Error
	}

	// Map the posts to the response format
	var paginatedPosts []types.PostReponse
	for _, post := range posts {
		paginatedPost := utils.PostMapper(post.Post)
		paginatedPosts = append(paginatedPosts, *paginatedPost)
	}

	return paginatedPosts, nil
}

func (p Post) GetById(id string) (*types.PostReponse, error) {
	var post Post
	result := initializers.Repository.Preload("User").Preload("Votes.User").First(&post, id)
	if result.Error != nil {
		return nil, result.Error
	}

	postResponse := utils.PostMapper(post.Post)

	return postResponse, nil
}

func (p Post) UploadFile(file *multipart.FileHeader) (string, error) {
	fileContent, err := file.Open()
	if err != nil {
		return "", err
	}
	defer fileContent.Close()

	fmt.Println(os.Getenv("SUPABASE_S3_URL"))
	storageClient := storage_go.NewClient(
		os.Getenv("SUPABASE_S3_URL"),
		os.Getenv("SUPABASE_SECRET"),
		nil,
	)
	storageClient.DeleteBucket("posts")
	bucketName := "posts"
	filePath := file.Filename

	_, uploadErr := storageClient.UploadFile(bucketName, filePath, fileContent)
	if uploadErr != nil {
		return "", uploadErr
	}

	// Generate public URL for the uploaded file
	publicURL := storageClient.GetPublicUrl(bucketName, filePath)

	return publicURL.SignedURL, nil
}
