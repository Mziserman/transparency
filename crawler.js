var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');


var baseUrl = "http://www.transparency.org";
var pagesToVisit = [`${baseUrl}/whatwedo/publications`]
var articles = [];

for (var i = 0; i < 35; i++) {
  // pagesToVisit.push(`${baseUrl}/whatwedo/publications/P${(i+1)*10}`)
}
// console.log(pagesToVisit)

pagesToVisit.map((page) => {
  // console.log("Visiting page " + page);
  request(page, function(error, response, body) {
    if (error) {
      console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    // console.log("Status code: " + response.statusCode);
    if (response.statusCode === 200) {
      // Parse the document body
      var $ = cheerio.load(body);
      $('#Publications .article.story').map((i, article) => {
        articles.push({
          "name": $(article).find("h3 a").text(),
          "link": $(article).find("h3 a").attr("href")
        });
      })
      if (page == pagesToVisit[pagesToVisit.length - 1]) {
        crawlArticles();
        console.log(articles);
      }
    }
  })
});

function crawlArticles() {
  var articlesToVisit = articles.map(x => baseUrl + x.link);
  console.log(articlesToVisit);

}

// sleep(10);
console.log(articles)
