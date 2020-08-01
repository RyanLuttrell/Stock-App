const https = require('https');
const http = require('http');
const api = require('./api.json');

function printError(error) {
    console.error(`There was an error: ${error.message}`);
}

function printNews(info ,number) {
    const message = `Article #${number + 1} is: ${info.items.result[number].title} Here's a link for more information: ${info.items.result[number].link}`;
    console.log(message);
};


function get() {
    try {
    const request = https.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list?rapidapi-key=${api.key}`, response => {
        if (response.statusCode === 200) {
            let body = '';
            response.on('data', data => {
                body += data.toString();
            });

            response.on('end', () => {
                try {
                const news = JSON.parse(body);
                for (let i = 0; i < 5; i++) {
                    printNews(news, i);
                }
                } catch (error) {
                    printError(error);
                }
        });
        } else {
            const statusCodeError = new Error(`There was an error getting the news! (${http.STATUS_CODES[response.statusCode]})`);
            printError(statusCodeError);
        }
    })
    } catch (error) {
        printError(error.message);
    }
}

module.exports.get = get;