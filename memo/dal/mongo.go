package dal

import (
	"github.com/go-bongo/bongo"
	"log"
)

var (
	config *bongo.Config
	Connection *bongo.Connection
)

func InitMongo() {
	config = &bongo.Config{
		ConnectionString: "gameshop.khakhazeus.cn",
		Database:         "memo",
	}
	var err error
	Connection, err = bongo.Connect(config)
	if err != nil {
		log.Fatal(err)
	}
}