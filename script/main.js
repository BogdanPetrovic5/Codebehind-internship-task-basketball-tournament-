
const { fetchData } = require('./data.js');
const { simulateGroupMatches } = require('./simulateMatch.js')
var groups
var results = []

async function getData(){
    try {
       groups = await fetchData();
      
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main() {
  await getData();
  console.log(groups);
  results = simulateGroupMatches(groups)
}

main();