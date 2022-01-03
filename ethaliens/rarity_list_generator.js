const fs = require("fs");
const ObjectsToCsv = require('objects-to-csv');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ethers = require('ethers');

let NFT_array = [];
let counter = 0;
let NFT_contract_address = "0x56b391339615fd0e88e0d370f451fa91478bb20f";

(async () => {
  
    // Load raw data into usable object


    const raw_data_1 = await fs.readFileSync("./ethaliens_data_1499.json");
    const raw_data_2 = await fs.readFileSync("./ethaliens_data_2999.json");
    const raw_data_3 = await fs.readFileSync("./ethaliens_data_4499.json");
    const raw_data_4 = await fs.readFileSync("./ethaliens_data_5999.json");
    const raw_data_5 = await fs.readFileSync("./ethaliens_data_7499.json");

    json_data_1 = JSON.parse(raw_data_1);
    json_data_2 = JSON.parse(raw_data_2);
    json_data_3 = JSON.parse(raw_data_3);
    json_data_4 = JSON.parse(raw_data_4);
    json_data_5 = JSON.parse(raw_data_5);

    json_data = [...json_data_1, ...json_data_2, ...json_data_3, ...json_data_4, ...json_data_5]

    let nft_data = [...json_data];

    // Sort nft_array by token_id
    nft_data = nft_data.sort((a, b) => {
        return a.token_id - b.token_id
    })


    // Take out your 1/1 series
    let regular_nft_data = [];
    let one_of_one_nft_data = [];

    for (let element of nft_data) {
        if (element.attributes.length == 8) {
            regular_nft_data.push(element)
        } else {
            one_of_one_nft_data.push(element)
        }
    }

    nft_data = [...regular_nft_data]

    // Count each attribute
    let master_attributes = {}

    for (let element of nft_data) {
        for (let attribute of element.attributes) {
            if (!master_attributes[attribute.trait_type]) {
                master_attributes[attribute.trait_type] = {}
            }

            if (!master_attributes[attribute.trait_type][attribute.value]) {
                master_attributes[attribute.trait_type][attribute.value] = 0;
            }

            master_attributes[attribute.trait_type][attribute.value] += 1;
        }
    }

    // Calculate probability_secore
    for (let element of nft_data) {
        let probability_score = 1;
        for (let attribute of element.attributes){
            probability_score *= master_attributes[attribute.trait_type][attribute.value]
        }
        element["probability_score"] = probability_score
    }

    // Calculate rarity ranking
    nft_data = nft_data.sort((a, b) => {
        return a.probability_score - b.probability_score
    })

    for (let index in nft_data) {
        nft_data[index]['rarity_ranking'] = index
    }

    // Add opensea_link
    for (let element of nft_data) {
        element.opensea_link = `https://opensea.io/assets/${NFT_contract_address}/${element.token_id}`
    }

    // Create CSV of top_500 and attributes_list
    let helper_array = [];

    for (let element of nft_data) {
        helper_array.push({
            token_id: element.token_id,
            rarity_ranking: element.rarity_ranking,
            opensea_link: element.opensea_link
        })
    }

    let top_500_array = helper_array.slice(0, 500);

    /* SECTION TO CREATE RARITY DATA */

    // console.log("WRITING attribute_list & top_500 CSVs");
    // new ObjectsToCsv(top_500_array).toDisk('./top_500.csv');
    // fs.writeFileSync(`./attributes.json`, JSON.stringify(master_attributes));



    /* SECTION TO GET OPENSEA LISTING DATA */

    // let opensea_data = [];
    // let opensea_array = top_500_array.slice(240, 270) // ADJUST THESE TWO NUMBERS, TO TWO NUMBERS 30 APART FROM EACH OTHER

    // let opensea_numbers = [];
    
    // for (let element of opensea_array) {
    //     opensea_numbers.push(element.token_id)
    // }

    // const opensea_resp = await getBigOpenseaData(NFT_contract_address, opensea_numbers)

    // const opensea_info = [];

    // for (let element of opensea_resp) {
    //     opensea_info.push({
    //         token_id: element.asset.token_id,
    //         price: ethers.utils.formatEther(element.base_price)
    //     })
    // }

    // console.log(opensea_info);

})();


// Only allows us to run 30 token IDs at once
async function getBigOpenseaData(asset_contract_address, array_30_token_ids) {
    let string_array = []
    const start_url = `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${asset_contract_address}&bundled=false&include_bundled=false&include_invalid=false`
    string_array.push(start_url)

    for (let element of array_30_token_ids) {
        string_array.push(`&token_ids=${element}`)
    }

    const end_url = `&side=1&sale_kind=0&limit=30&offset=0&order_by=eth_price&order_direction=asc`
    string_array.push(end_url)

    const url = string_array.join('');

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data.orders
    } catch (error) {
        console.error(error)
    }
}