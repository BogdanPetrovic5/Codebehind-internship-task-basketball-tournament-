
const { fetchData } = require('./data.js');
const { simulateGroupMatches } = require('./simulateMatch.js')
const {calculateTotalEffect} = require('./calculateTotalEffect.js')
const {sort} = require('./sort.js')
const {writeGroups} = require('./writeGroups.js')
var groups = {}
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
  groups = calculateTotalEffect(groups, results)
  groups = sort(groups,results)
  
  writeGroups(groups)
}

main();