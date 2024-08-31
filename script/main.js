
const { fetchData } = require('./data.js');
const {start} = require('./start.js')
var groups = {}

async function getData(){
    try {
       groups = await fetchData();
      
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main() {
  await getData();
  start(groups)
}

main();