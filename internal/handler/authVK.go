package handler

import (
	"errors"
	"fmt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/vk"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"restserver/internal/tokens"
	"strings"
)

var (
	vkOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("VK_CLIENT_ID"),
		ClientSecret: os.Getenv("VK_CLIENT_SECRET"),
		RedirectURL:  "http://127.0.0.1:8080/me",
		Scopes:       []string{"account"},
		Endpoint:     vk.Endpoint,
	}
	state = "12345"
)

func AuthVk(w http.ResponseWriter, r *http.Request) {
	url := vkOauthConfig.AuthCodeURL(state)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}
func AuthVkCallback(w http.ResponseWriter, r *http.Request) {
	stateTemp := r.URL.Query().Get("state")
	if stateTemp[len(stateTemp)-1] == '}' {
		stateTemp = stateTemp[:len(stateTemp)-1]
	}
	if stateTemp != state {
		log.Println("error")
		http.Error(w, "state query param is not provided", 500)
		return
	}

	token, err := vkOauthConfig.Exchange(oauth2.NoContext, r.FormValue("code"))
	if err != nil {
		log.Println(err)
		http.Error(w, "state query param is not provided", 500)
		return
	}

	url := fmt.Sprintf("https://api.vk.com/method/%s?v=5.124&access_token=%s",
		"users.get", token.AccessToken)
	resp, err := http.Get(url)
	if err != nil {
		log.Println(err)
		http.Error(w, "state query param is not provided", 500)
		return
	}
	defer resp.Body.Close()

	bytes, _ := ioutil.ReadAll(resp.Body)
	userID, err := getID(bytes)
	if err != nil {
		log.Println(err)
		http.Error(w, "state query param is not provided", 500)
		return
	}
	tokenStr, err := tokens.GenerateToken(userID)
	if err != nil {
		log.Println(err)
		http.Error(w, "ooops", http.StatusInternalServerError)
		return
	}
	fmt.Fprint(w, tokenStr)
}

func getID(bytes []byte) (string, error) {
	str := strings.ReplaceAll(string(bytes), "\"", "")
	splitFunc := func(r rune) bool {
		return strings.ContainsRune(":,", r)
	}

	words := strings.FieldsFunc(str, splitFunc)
	for idx, word := range words {
		if word == "id" {
			return words[idx+1], nil
		}
	}

	return "", errors.New("id missed")
}
