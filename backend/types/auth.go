package types

type AuthType struct {
	Identifier string `json:"identifier" binding:"required" required:"username or email is required"`
	Password   string `json:"password" binding:"required" required:"password is required"`
}

type UserResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
}

type SignupResDto struct {
	User  UserResponse `json:"user"`
	Token string       `json:"token"`
}
