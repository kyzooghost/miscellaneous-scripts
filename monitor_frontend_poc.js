// Watch an element of the page, and if it changes then open the webpage

const cheerio = require('cheerio');
const request = require('request');
const open = require('open');

const url = "https://solyetis.io/"

const interval = setInterval(requesting, 1000);

function requesting() {

    const OPTIONS = {
        method: 'GET',
        url: url
    }

    request(OPTIONS, (err, res, body) => {

        if (err) return console.error(err);
    
        let $ = cheerio.load(body);
        let button = $('button.btn-web').text();
    
        if (button !== "SOLDOUT") {
            open(url, {app: {name: 'firefox'}})
        }
    });
}

// JS to type into form, and click button, programatically