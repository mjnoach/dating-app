package utils

import (
	"encoding/json"
	"log"

	"github.com/labstack/echo/v4"
)

func Print(message string, obj interface{}) {
	log.Printf("\n\nš %s \n%v\n\n", message, obj)
}

func CheckErr(err error, message string) {
	if err != nil {
		log.Printf("\n\nš %s \n%v\n\n", message, err)
	}
}

func CheckFatal(err error, message string) {
	if err != nil {
		log.Fatalf("\n\nš %s \n%v\n\n", message, err)
	}
}

func CheckPanic(err error, message string) {
	if err != nil {
		log.Panicf("\n\nš %s \n%v\n\n", message, err)
	}
}

func GetReqBodyJson(ctx echo.Context) (map[string]interface{}, error) {
	jsonMap := make(map[string]interface{})
	err := json.NewDecoder(ctx.Request().Body).Decode(&jsonMap)
	if err != nil {
		return nil, err
	}
	return jsonMap, nil
}
