var cheerio = require('cheerio');

regDate = /\d{1,2}\s[a-zA-Z]+\s\d{4}/g
regExcerpt = /[a-zA-Z\s\,\;\.\?\!]{80,}/g
regDownload = /Download\sthe\sreport/g
regRegion = /Region/g
regTags = /Tags/g
regTopics = /Topic/g
regLanguages = /Language\(s\)/g
regTerritory = /Territory/g
regTranslations = /Translations/g

const scrap = (html) => {
  const $ = cheerio.load(html)
  const article = $('#content')
  const result = {}
  result.title = article.find('h1.headerRegular').text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim()
  const date = article.find('#Posted').text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim().match(regDate)
  if (date !== null && date.length > 0){
    result.date = date[0]
  } else {
    result.date = null
  }
  result.img = "http://www.transparency.org" + article.find('img').attr('src')
  result.excerpt = null
  result.download = null
  result.translations = {}
  const pTags = article.find('p')
  for (let i = 0; i < pTags.length; i++ ) {
    const excerpt = $(pTags[i]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim().match(regExcerpt)
    const download = $(pTags[i]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim().match(regDownload)
    const translations = $(pTags[i]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim().match(regTranslations)
    if (excerpt !== null && excerpt.length > 0){
      result.excerpt = $(pTags[i]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim()
    }
    if (download !== null && download.length > 0){
      const tag = $(pTags[i]).find('a')[0]
      result.download = $(tag).attr('href')
    }
    if (translations !== null && translations.length > 0){
      const tag = $(pTags[i]).find('a')[1]
      const text = $(tag).text()
      const url = $(tag).attr('href')
      result.translations[text] = url
    }
  }

  result.territories = []
  result.regions = []
  result.languages = []
  result.topics = []
  result.tags = []
  const allTags = article.find('.tagHold')
  for (let i = 0; i < allTags.length; i++ ) {
    const text = $(allTags[i]).find('strong').text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim()
    
    const territories = text.match(regTerritory)
    if (territories !== null && territories.length > 0){
      const links = $(allTags[i]).find('a')
      for (let x = 0; x < links.length; x++){
        result.territories.push($(links[x]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim())
      }
    } 
    
    const regions = text.match(regRegion)
    if (regions !== null && regions.length > 0){
      const links = $(allTags[i]).find('a')
      for (let x = 0; x < links.length; x++){
        result.regions.push($(links[x]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim())
      }
    } 

    const tags = text.match(regTags)
    if (tags !== null && tags.length > 0){
      const links = $(allTags[i]).find('a')
      for (let x = 0; x < links.length; x++){
        result.tags.push($(links[x]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim())
      }
    } 

    const topics = text.match(regTopics)
    if (topics !== null && topics.length > 0){
      const links = $(allTags[i]).find('a')
      for (let x = 0; x < links.length; x++){
        result.topics.push($(links[x]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim())
      }
    } 

    const languages = text.match(regLanguages)
    if (languages !== null && languages.length > 0){
      const links = $(allTags[i]).find('a')
      for (let x = 0; x < links.length; x++){
        result.languages.push($(links[x]).text().replace(/[\r\n\t]/g,' ').replace(/\s+/g,' ').trim())
      }
    } 
  }
  return result
}


exports = module.exports = scrap
