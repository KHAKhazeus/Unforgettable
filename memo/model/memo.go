package model

import "github.com/go-bongo/bongo"

type Memo struct {
	InnerHTML string `json:"innerHTML"`
	Left string `json:"left"`
	Top string	`json:"top"`
	ClassName string `json:"className"`
	Color string `json:"color"`
}

type MemoPage struct {
	bongo.DocumentBase `bson:",inline"`
	UserId int `json:"userId"`
	Memos []Memo
}