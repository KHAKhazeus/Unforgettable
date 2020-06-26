package service

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"memo/dal"
	"memo/model"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type memoReq struct {
	UserId int `json:"userId"`
}

func GetMemo(c *gin.Context){
	var req memoReq
	if c.BindJSON(&req) == nil {
		fmt.Println(req)
		results := dal.Connection.Collection("memos").Find(bson.M{"userid": req.UserId})
		memoPage := &model.MemoPage{}
		results.Next(memoPage)
		c.JSON(http.StatusOK, gin.H{
			"status": 0,
			"data": memoPage,
		})
	} else {
		c.JSON(http.StatusNoContent, gin.H{
			"status": -1,
			"msg": "JSON form rejected",
		})
		return
	}
}

func UpdateMemo(c *gin.Context) {
	var req model.MemoPage
	if c.BindJSON(&req) == nil {
		_, err := dal.Connection.Collection("memos").Delete(bson.M{"userid": req.UserId})
		if err != nil {
			c.JSON(http.StatusNoContent, gin.H{
				"status": -1,
				"msg": "Delete Failure",
			})
			return
		} else {
			//insert
			err := dal.Connection.Collection("memos").Save(&req)
			if err != nil {
				c.JSON(http.StatusNoContent, gin.H{
					"status": -1,
					"msg": "Insert Failure",
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"status": 0,
			})
			return
		}
	} else {
		c.JSON(http.StatusNoContent, gin.H{
			"status": -1,
			"msg": "JSON form rejected",
		})
		return
	}
}

type MemoPasses struct {
	Index int
	Title string
}

func DetailMemo(c *gin.Context){
	userId := c.DefaultQuery("userId", "-1")
	intUserId, err := strconv.ParseInt(userId, 10, 32)
	if err != nil {
		c.JSON(http.StatusNoContent, gin.H{
			"status": -1,
			"msg": "JSON form rejected",
		})
		return
	}
	if intUserId < 0 {
		c.JSON(http.StatusNoContent, gin.H{
			"status": -1,
			"msg": "JSON form rejected",
		})
		return
	} else {
		//fetch data
		results := dal.Connection.Collection("memos").Find(bson.M{"userid": intUserId})
		memoPage := &model.MemoPage{}
		results.Next(memoPage)
		memos := memoPage.Memos
		passMemos := make([]MemoPasses, 0)
		index := 1
		for _,memo := range memos {
			//parse title
			material := memo.InnerHTML
			doc, err := goquery.NewDocumentFromReader(strings.NewReader(material))
			if err != nil {
				fmt.Println(err)
				c.JSON(http.StatusNoContent, gin.H{
					"status": -1,
					"msg": "HTML parse error",
				})
				return
			}
			title := doc.Find("h3").Text()
			newMemoPass := MemoPasses{
				Index: index,
				Title: title,
			}
			passMemos = append(passMemos, newMemoPass)
			index += 1
		}
		c.HTML(http.StatusOK, "detail.tmpl", gin.H{
			"userId": intUserId,
			"quantity": len(passMemos),
			"date": time.Now(),
			"memos": passMemos,
		})
	}

}