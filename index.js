const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
const { verify } = require('crypto')
app.use(cors())

const url = 'https://www.basketball-reference.com/leagues/NBA_2022_games-october.html'
const results_url = 'https://www.basketball-reference.com/boxscores/index.fcgi?'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/schedule', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const myhtml ='<html><body><div class="test" data-test="imagen"><a>Texto imagen</a></body></html>';
            const $ = cheerio.load(html)
            const articles = []

            /*********PARSING SCHEDULE */
            var gameDate, gameTime, visitorTeam, homeTeam, homeTeamScore, visitorTeamScore;

            $('#schedule tbody tr', html).each((index, value) => {                 
                $('th[data-stat="date_game"]', value).each((i, v) => {
                    gameDate = $(v).find('a').text();
                })
                $('td[data-stat="game_start_time"]', value).each((i, v) => {
                    gameTime = $(v).text();
                })
                $('td[data-stat="home_team_name"]', value).each((i, v) => {
                    homeTeam = $(v).find('a').text();
                })
                $('td[data-stat="home_pts"]', value).each((i, v) => {
                    homeTeamScore = $(v).text();
                })
                $('td[data-stat="visitor_team_name"]', value).each((i, v) => {
                    visitorTeam = $(v).find('a').text();
                })
                $('td[data-stat="visitor_pts"]', value).each((i, v) => {
                    visitorTeamScore = $(v).text();
                })
                articles.push({
                    gameDate, 
                    gameTime,
                    homeTeam,
                    homeTeamScore,
                    visitorTeam,
                    visitorTeamScore                  
                })
            })
             res.json(articles)
        }).catch(err => console.log(err))


})


app.get('/results', (req, res) => {
    const day = 29;
    const month = 10;
    const year = 2021;
 //const url = $'results_urlmonth={month}&day=28&year=2021'

});


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

