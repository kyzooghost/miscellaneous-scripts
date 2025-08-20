// Ran this in requests for batches of 1500 at a time

const https = require('https');
const fs = require('fs');

let NFT_array = [];
let counter = 6000; //Change to start index

const interval = setInterval(async () => {

  if (counter < 7500) { //Change to end index
    for (let i = 0; i < 50; i++) {
      try {
        await obtain_data(counter);
        counter++;
      } catch(err) {
        console.error(err)
        console.log("WRITING NOW!")
        writeFile(NFT_array)
      }
    }
  }
  
  if (NFT_array.length >= 1500) {
    console.log("WRITING NOW!")
    writeFile(NFT_array)
    clearInterval(interval);
  }

  console.log("Length: ", NFT_array.length)

}, 2000);

async function obtain_data(i) {
  https.get(`https://eth-api-eta.vercel.app/api/${i}`, async (resp) => {
    
    let buffer = [];
    
    resp
      .on("data", (chunk) => {
        buffer.push(chunk)
      })
      .on("end", () => {
        try {
          let individual_NFT = JSON.parse(Buffer.concat(buffer))
          individual_NFT.token_id = i
          NFT_array.push(individual_NFT)
        } catch (err) {
          console.error(err)
          console.log("WRITING NOW!")
          writeFile(NFT_array)
        }

      })
      .on("error", (e) => {
        console.log("ERROR AT token_id: ", i);
        console.error(e)
        console.log("WRITING WHAT WE CAN SAVE!")
        // writeFile(NFT_array)
      })
  })
}

function writeFile(data) {
  console.log(`WRITING NOW to ethaliens_data_${counter-1}.json!`)
  fs.writeFileSync(`./ethaliens_data_${counter-1}.json`, JSON.stringify(NFT_array)); //Switch this
}