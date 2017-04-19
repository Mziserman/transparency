var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var scrap = require('./scrapper')
// result = scrap(body)

<<<<<<< HEAD
var pageToVisit = "http://www.transparency.org/whatwedo/publication/sao_paulo_does_corruption_live_next_door";
console.log("Visiting page " + pageToVisit);
request(pageToVisit, function(error, response, body) {
   if(error) {
     console.log("Error: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status code: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     result = scrap(body)
     console.log(result)
   }
});
=======

var baseUrl = "http://www.transparency.org/whatwedo/publications";
var pagesToVisit = [baseUrl]
for (var i = 0; i < 35; i++) {
  pagesToVisit.push(`${baseUrl}/P${(i+1)*10}`)
}
// console.log(pagesToVisit)

pagesToVisit.map((page) => {
  console.log("Visiting page " + page);
  request(page, function(error, response, body) {
    if (error) {
      console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if (response.statusCode === 200) {
      // Parse the document body
      var $ = cheerio.load(body);
      var articles = $('#Publications .article.story').map((i, article) => {
        console.log($(this).find("h3 a").text())
      })
    }
  })
})
>>>>>>> a901f17a4318fccfc2d2f6a1b0dcfc2cfc831565
