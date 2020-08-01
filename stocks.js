const https = require('https');
const api = require('./api.json');

function printError(error) {
    console.error(error.message);
}

function printNews(body ,number) {
    const message = `Article ${number} is ${body.items.results[i].title} Click here to read more: ${body.items.results[i].link}`;
    console.log(message);
};


function get(countryCode) {
    const request = https.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list?rapidapi-key=${api.key}`, response => {
        if (response.statusCode === 200) {
            let body = '';
            response.on('data', data => {
                body += data;
            });
        }

        response.on('end', () => {
            try {
            const news = JSON.parse(body);
            for (let i = 0; i < 5; i++) {
                printNews(news, i);
            }
            } catch (error) {
                printError(error);
            }
        })
    })
}

module.exports.get = get;