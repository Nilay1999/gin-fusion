package utils

import (
	"github.com/Nilay1999/gin-gonic-server/models"
	"github.com/Nilay1999/gin-gonic-server/types"
)

func MapVotes(votes []models.Vote) []types.Votes {
	var mappedVotes []types.Votes
	for _, vote := range votes {
		mappedVote := types.Votes{
			ID:        vote.ID,
			CreatedAt: vote.CreatedAt.String(),
			UpdatedAt: vote.UpdatedAt.String(),
			DeletedAt: vote.DeletedAt.Time.String(),
			User: types.UserResponse{
				ID:       vote.User.ID,
				Username: vote.User.Username,
			},
		}
		mappedVotes = append(mappedVotes, mappedVote)
	}
	return mappedVotes
}

func PostMapper(post models.Post) *types.PostReponse {
	postResponse := types.PostReponse{
		ID:        post.ID,
		CreatedAt: post.CreatedAt.String(),
		UpdatedAt: post.UpdatedAt.String(),
		DeletedAt: post.DeletedAt.Time.String(),
		Title:     post.Title,
		Body:      post.Body,
		Votes:     MapVotes(post.Votes),
		User: types.UserResponse{
			ID:       post.User.ID,
			Username: post.User.Username,
		},
	}

	return &postResponse
}
