package types

import "mime/multipart"

type CreatePost struct {
	Title  string `json:"title" binding:"required" required:"title is required"`
	Body   string `json:"body" binding:"required" required:"body is required"`
	UserId uint   `json:"userId" binding:"required" required:"userId is required"`
}

type Votes struct {
	ID        uint   `json:"id"`
	CreatedAt string `json:"createAt"`
	UpdatedAt string `json:"updatedAt"`
	DeletedAt string `json:"deletedAt"`
	User      UserResponse
}

type PostReponse struct {
	ID        uint    `json:"id"`
	CreatedAt string  `json:"createAt"`
	UpdatedAt string  `json:"updatedAt"`
	DeletedAt string  `json:"deletedAt"`
	Title     string  `json:"title"`
	Body      string  `json:"body"`
	Votes     []Votes `json:"votes"`
	User      UserResponse
}

type VotePost struct {
	UserId uint `json:"userId" binding:"required" required:"userId is required"`
}

type UploadImage struct {
	Image *multipart.FileHeader `form:"image" binding:"required"`
}
