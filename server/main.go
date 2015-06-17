package main

//TODO--> %%/articles/n Does not work

import (
	"github.com/gin-gonic/gin"
	"database/sql"
	"github.com/coopernurse/gorp"
	_ "github.com/mattn/go-sqlite3"
	"log"
	"time"
	"strconv"
)

type Article struct {
	Id int64 `db:"article_id"`
	Created int64
	Title string
	Content string
}

var dbmap = initDb()

func initDb() gorp.DbMap {
	db, err := sql.Open("sqlite3", "db.sqlite3")
	checkErr(err, "sql.Open faild")
	dbmap := gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}}
	dbmap.AddTableWithName(Article{}, "articles").SetKeys(true, "Id")
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")
	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

func index (c *gin.Context) {
	content := gin.H{"Hello": "World"}
	c.JSON(200, content)
}

func ArticlesList(c *gin.Context) {
	var articles []Article
	_, err := dbmap.Select(&articles, "select * from articles order by article_id")
	checkErr(err, "Select failed")
	content := gin.H{}
	for k, v := range articles {
		content[strconv.Itoa(k)] =v
	}
	c.JSON(200, content)
}

func ArticlesDetail(c *gin.Context) {
	article_id := c.Params.ByName("id")
	a_id, _ := strconv.Atoi(article_id)
	article := getArticle(a_id)
	content := gin.H{"title": article.Title, "content": article.Content}
	c.JSON(200, content)
}

func ArticlePost(c *gin.Context) {
	var json Article

	c.Bind(&json)
	article := createArticle(json.Title, json.Content)
	if article.Title == json.Title {
		content := gin.H{
			"result": "Success",
			"title": article.Title,
			"content": article.Content,
		}
		c.JSON(201, content)
	} else {
		c.JSON(500, gin.H{"result": "An error occured"})
	}
}

func createArticle(title, body string) Article {
	article := Article{
		Created: time.Now().UnixNano(),
		Title: title,
		Content: body,
	}

	err := dbmap.Insert(&article)
	checkErr(err, "Insert failed")
	return article
}

func getArticle(article_id int) Article {
	article := Article{}
	err := dbmap.SelectOne(&article, "select * from articles where article_id=?", article_id)
	checkErr(err, "selectOne failed")
	return article
}

func main() {
	app := gin.Default()
	app.GET("/", index)
	app.GET("/articles", ArticlesList)
	app.POST("/articles", ArticlePost)
	app.GET("/articles/:article_id", ArticlesDetail)
	app.Run(":8000")
}