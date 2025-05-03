package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title  string         `gorm:"size:255;not null;" json:"title"`
	Body   string         `gorm:"size:255;not null;" json:"body"`
	Images pq.StringArray `gorm:"type:varchar(255)[]" json:"images"`
	Votes  []Vote         `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserID uint           `gorm:"not null" json:"userId"`
	User   User           `gorm:"foreignKey:UserID"`
}
