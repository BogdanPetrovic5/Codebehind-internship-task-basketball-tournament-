const { simulateMatches } = require('./utilities/simulateMatches.js')
const {eliminateTeams} = require('./utilities/eliminateTeams.js')
const {giveRankings} = require('./utilities/giveRankings.js')
const {drawPot} = require('./utilities/drawPot.js')
const { calculateTotalEffect } = require('./utilities/calculateTotalEffect.js')
const {sort} = require('./utilities/sort.js')
const {determinePlayOffMatches} = require('./utilities/determinePlayOffMatches.js')
const {reduceGroups} = require('./utilities/reduceGroups.js')

const { writePlayOffs } = require('./output/writePlayOffs.js')
const { writeMedalists } = require('./output/writeMedalists.js')
const {writeGroups} = require('./output/writeGroups.js')
const {writeMatchResults} = require('./output/writeMatchResults.js')
const { writePot } = require('./output/writePot.js');

var pot = {}
var rankedTeams = []
var medalist = []
function getPlayOffs(pot, playOffs, numberOfKeys) { 
    playOffs = determinePlayOffMatches(pot, playOffs, numberOfKeys, "Quarterfinals");
    writePlayOffs(playOffs, "Play of matches");
    return playOffs
}
function eliminateFromGroups(groups){
    groups = reduceGroups(groups)
   
    return groups
}
function updateGroups(groups, results) { 
    groups = calculateTotalEffect(groups, results)
    groups = sort(groups,results)
    console.log("\nGroups results: ")
    writeGroups(groups, "Group")
    return groups
 }
function getGroupResults(groups){
    results = simulateMatches(groups)
    phase = {Phase:"Group", Type:"None"}
    writeMatchResults(results,phase)
    return results
}
function getPot(groups, numberOfKeys) { 
    rankedTeams = giveRankings(groups)
    pot = drawPot(rankedTeams,numberOfKeys, pot)
    console.log("\nTeams that qualified for the next phase:")
    writeGroups(groups)
    writePot(pot)
    return pot;
}
function getQuarterFinalresults(playOffs, groups, numberOfKeys){
  
    let quarterfinalResults = simulateMatches(playOffs);
    phase = {Phase:"Play offs", Type:"Quarterfinals"}
    writeMatchResults(quarterfinalResults, phase)
    return quarterfinalResults;
}
function getSemifinalResults(semiFinals){
    let semifinalsResults = simulateMatches(semiFinals);
    phase = {Phase:"Play offs", Type:"Semifinals"}
    writeMatchResults(semifinalsResults, phase)
    return semifinalsResults
}
function getThirdPlaceResults(thirdPlace){
    let thirdPlaceResults = simulateMatches(thirdPlace)
    phase = {Phase:"Play offs", Type:"Third place:"}
    writeMatchResults(thirdPlaceResults, phase)
    return thirdPlaceResults
}
function getFinalsResult(finals){
    let finalsResults = simulateMatches(finals)
    phase = {Phase:"Play offs", Type:"Finals"}
  
    writeMatchResults(finalsResults, phase)
    return finalsResults
}
function getFinalist(finalsCopy, finalsResults){
    let finalist = eliminateTeams(finalsCopy, finalsResults, "Winners")
    let first = Object.keys(finalist)[0]
    let firstValue = finalist[first][0];
    return firstValue
}
function getRunnerUp(finals, finalsResults){
    let finalistRunnerUp = eliminateTeams(finals, finalsResults, "Loosers")
    let second = Object.keys(finalistRunnerUp)[0]
    let secondValue = finalistRunnerUp[second][0];
    return secondValue
}
function getThirdPlacer(thirdPlace, thirdPlaceResults) { 
    let thirdPlaceWinner = eliminateTeams(thirdPlace, thirdPlaceResults, "Winners");
    let third = Object.keys(thirdPlaceWinner)[0]
    let thirdValue = thirdPlaceWinner[third][0]
    return thirdValue
}
function showMedalists(firstValue, secondValue, thirdValue){
    medalist.push(firstValue, secondValue, thirdValue)
    writeMedalists(medalist)
}

module.exports = {
    getQuarterFinalresults,
    getSemifinalResults, 
    getThirdPlaceResults, 
    getPot, 
    getFinalsResult, 
    getFinalist, 
    getRunnerUp, 
    getRunnerUp,
    getThirdPlacer, 
    getGroupResults, 
    updateGroups, 
    eliminateFromGroups,
    getPlayOffs,
    showMedalists
    
}