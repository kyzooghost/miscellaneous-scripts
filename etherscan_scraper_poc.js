// Given a .json file (originally a .csv file downloaded from Etherscan transaction list), uses Cheerio to scrape data from Etherscan

const fs = require("fs");
const ObjectsToCsv = require('objects-to-csv');
const cheerio = require('cheerio');
const fetchCheerioObject = require('fetch-cheerio-object');

// Rate-limiter function to avoid API overload
function timer(ms) {return new Promise(res => setTimeout(res, ms))}

(async () => {
    // Load data
    const raw_data = await fs.readFileSync("./kishimoto.json");
    const json_data = JSON.parse(raw_data);

    // Remove duplicates
    // Add BUY/SELL marker
    let refined_data = [];
    const set = new Set();

    for (let element of json_data) {
        if (!set.has(element.Txhash)) {
            set.add(element.Txhash)

            element.Quantity = Number(element.Quantity)
            if (element.To = "0xdf42388059692150d0a9de836e4171c7b9c09cbf") {
                element.buy = true
                element.txType = "BUY"
            } else {
                element.buy = false
                element.txType = "SELL"
            }

            refined_data.push(element)
        }
    }

    // 
    refined_data = refined_data.slice(1000, 3500)

    // Scrape from etherscan - Ether Price, # of KISHIMOTO transferred, token price
    // Watch for the rate limiter
    for (let element of refined_data) {
        const url = `https://etherscan.io/tx/${element.Txhash}`
        const $ = await fetchCheerioObject(url);
        const eth_price = $('span#ContentPlaceHolder1_spanClosingPrice').text().slice(1, 9);
        element.eth_price = Number(eth_price.replace(/\,/g,''))

        $('font').each(function (i) {
            if ($(this).text() == "Kishimoto In...") {
                const quantity_token = $(this).parent().parent().prev().prev().text()
                element.quantity_token = Number(quantity_token.replace(/\,/g,''))
                element.token_price = 10**12 * (element.eth_price * element.Quantity) / element.quantity_token
            }
        })

        console.log(element.Txhash)
        await timer(500)
    }

    // Write to a file
    console.log("Writing to token_sale_data.csv");
    new ObjectsToCsv(refined_data).toDisk('./token_sale_data_1000_3500.csv');
})();