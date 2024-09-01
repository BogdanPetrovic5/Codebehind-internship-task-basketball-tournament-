const { Match } = require("../classes/Match")
const { Output } = require("../classes/Output")
const { PhaseOutcomeEvaluator } = require("../classes/PhaseOutcomeEvaluator")
const { PlayOff } = require("../classes/PlayOff")
const { Pot } = require("../classes/Pot")
const { UtilityHelper } = require("../classes/UtilityHelper")

class TournamentService{
    
    constructor(){
        this._match = new Match()
        this._utilHelper = new UtilityHelper()
        this._results = []
        this._output = new Output()
        this._phaseOutcome = new PhaseOutcomeEvaluator()
        this._rankedTeams = []
        this._pot = {}
        this._playOff = new PlayOff()
        this._potDrawer = new Pot()
        this._medalist = []
    }
    
    getGroupResults(groups){
        this._results  = this._match.simulateMatches(groups);
        let phase = {Phase:"Group", Type:"None"};
        this._output.writeMatchResults(this._results,phase);

        return this._results;
    }


    updateGroups(groups, results){
        groups = this._utilHelper.modifyGroups(groups);
        groups = this._phaseOutcome.calculateTotalEffect(groups, results);
        groups = this._utilHelper.sortGroups(groups,results);
        console.log("\nGroups results: ");
        this._output.writeGroups(groups);
        groups = this._utilHelper.reduceGroups(groups);

        return groups;
    }


    getPot(groups, keysLength){
        this._rankedTeams = this._utilHelper.giveRankings(groups);
        this._pot = this._potDrawer.drawPot(this._rankedTeams, keysLength, this._pot);
        console.log("\nTeams that qualified for the next phase:");
        this._output.writeGroups(groups);
        this._output.writePot( this._pot);

        return this._pot;
    }


    getPlayOffs(pot, playOffs, numberOfKeys){
        playOffs =  this._playOff.determinePlayOffMatches(pot, playOffs, numberOfKeys, "Quarterfinals");
        this._output.writePlayOffs(playOffs, "Play of matches");

        return playOffs;
    }


    getQuarterfinalResults(playOffs){
        let quarterfinalResults = this._match.simulateMatches(playOffs);
        let phase = {Phase:"Play offs", Type:"Quarterfinals"};
        this._output.writeMatchResults(quarterfinalResults, phase);

        return quarterfinalResults;
    }


    getSemifinalResults(semifinals){
        let semifinalsResults = this._match.simulateMatches(semifinals);
        let phase = {Phase:"Play offs", Type:"Semifinals"};
        this._output.writeMatchResults(semifinalsResults, phase);

        return semifinalsResults;
    }

    
    getThirdPlaceResults(thirdPlace){
        let thirdPlaceResults = this._match.simulateMatches(thirdPlace);
        let phase = {Phase:"Play offs", Type:"Third place:"};
        this._output.writeMatchResults(thirdPlaceResults, phase);

        return thirdPlaceResults
    }

    
    getFinalsResults(finals){
        let finalsResults = this._match.simulateMatches(finals);
        let phase = {Phase:"Play offs", Type:"Finals"};
        this._output.writeMatchResults(finalsResults, phase);

        return finalsResults;
    }


    getFinalist(finalsCopy, finalsResults){
        let finalist = this._playOff.eliminateTeams(finalsCopy, finalsResults, "Winners");
        let first = Object.keys(finalist)[0];
        let firstValue = finalist[first][0];

        return firstValue;
    }

    
    getRunnerUp(finals, finalsResults){
        let finalistRunnerUp = this._playOff.eliminateTeams(finals, finalsResults, "Loosers");
        let second = Object.keys(finalistRunnerUp)[0];
        let secondValue = finalistRunnerUp[second][0];
        return secondValue;
    }


    getThirdPlacer(thirdPlace, thirdPlaceResults) { 
        let thirdPlaceWinner = this._playOff.eliminateTeams(thirdPlace, thirdPlaceResults, "Winners");
        let third = Object.keys(thirdPlaceWinner)[0];
        let thirdValue = thirdPlaceWinner[third][0];

        return thirdValue;
    }


    showMedalists(firstValue, secondValue, thirdValue){
        this._medalist.push(firstValue, secondValue, thirdValue);
        this._output.writeMedalists( this._medalist);
    }
}
module.exports = {TournamentService}