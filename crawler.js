var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var scrap = require('./scrapper')
// result = scrap(body)

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