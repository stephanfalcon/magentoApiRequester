const cheerio = require("cheerio")
const fs = require("fs")
const pretty = require("pretty")

const html = fs.readFileSync("./index.html","utf-8")

const $ = cheerio.load(html)

const scraper = () => {
    const scraperArray = []
    $(".data-grid-cell-content").each((i,element)=>{
        scraperArray.push( pretty($(element).text()) )
    })
    return scraperArray
}

module.exports = scraper