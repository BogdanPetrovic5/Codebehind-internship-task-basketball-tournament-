const {determinePlayOffMatches} = require('./utilities/determinePlayOffMatches.js');
const {eliminateTeams} = require('./utilities/eliminateTeams.js')
const { modifyGroups } = require('./utilities/modifyGroups.js');
const { 
    getQuarterFinalresults, 
    getSemifinalResults, 
    getThirdPlaceResults,
    getPot, 
    getFinalsResult, 
    getFinalist, 
    getRunnerUp,
    getThirdPlacer, 
    getGroupResults,
    updateGroups, 
    eliminateFromGroups, 
    getPlayOffs,
    showMedalists
} = require('./tournament.js');


var playOffs = {}
var semiFinals = {}
var finals = {}
var thirdPlace = {}
var semiFinalsLoosers = {}




function start(groups){
    //Getting matches from all groups, updating group(sorting and deleting 4. position)
    let results = getGroupResults(groups)
    groups = modifyGroups(groups)
    groups = updateGroups(groups, results)
    groups = eliminateFromGroups(groups)

    let numberOfKeys = Object.keys(groups).length;

    //Drawing a pot. 'D' 'E' 'F' 'G'
    let pot = getPot(groups, numberOfKeys)
    numberOfKeys = Object.keys(pot).length;

    //Forming play off matches
    playOffs = getPlayOffs(pot, playOffs, numberOfKeys)
   
    //Displaying quarterFinalsResults, and eliminating teams from quarterfinal phase.
    playOffs = eliminateTeams(playOffs, getQuarterFinalresults(playOffs, groups, numberOfKeys))

    //Deviding keys for semifinals so now there are two groups
    numberOfKeys = devideKey(numberOfKeys);

    //Forming semi finals pairs
    semiFinals = determinePlayOffMatches(playOffs, semiFinals, numberOfKeys, "Semifinals");

    //Making a copy of semiFinals object
    let semiFinalsCopy = JSON.parse(JSON.stringify(semiFinals));
    
    //Based on formed pairs, results are made. And displayed
    let semifinalsResults = getSemifinalResults(semiFinals)

    //We extract two teams that lost in semifinals and make them a pair for third place match
    semiFinalsLoosers = eliminateTeams(semiFinalsCopy, semifinalsResults, "Loosers");
    thirdPlace = determinePlayOffMatches(semiFinalsLoosers, thirdPlace, numberOfKeys /2, "Third place")
    let thirdPlaceResults = getThirdPlaceResults(thirdPlace)
   
    //Extracting winners of semifinals
    semiFinals = eliminateTeams(semiFinals, semifinalsResults,"Winners");

     //Deviding a key so there is now one group with two teams 
    numberOfKeys = devideKey(numberOfKeys);

    //Now we make pair for finals
    finals = determinePlayOffMatches(semiFinals, finals, numberOfKeys, 'Finals')

    //Finals copy so we can extract runnerup
    let finalsCopy = JSON.parse(JSON.stringify(finals));

    //Based on formed pairs, results are made. And displayed
    let finalsResults = getFinalsResult(finals)
   
    //Showing all medalists
    showMedalists(getFinalist(finalsCopy, finalsResults), getRunnerUp(finals, finalsResults), getThirdPlacer(thirdPlace, thirdPlaceResults))
    
}
function devideKey(numberOfKeys) { 
    return numberOfKeys / 2
 }
module.exports = {start}