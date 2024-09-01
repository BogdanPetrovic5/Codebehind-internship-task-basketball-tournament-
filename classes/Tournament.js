const { TournamentService } = require("../service/TournamentService")
const { PlayOff } = require("./PlayOff")
const { UtilityHelper } = require("./UtilityHelper")

class Tournament{
    constructor(){
        this._tournamentService = new TournamentService();
        this._utilHelper = new UtilityHelper();
        this._playOff = new PlayOff();

        this._results = [];
        this._semiFinalsResults = []
        this._thirdPlaceResults =[]
        this._finalsResults = []
        
        this._pot = {};
        this._playOffs = {};
        this._semiFinals = {};
        this._semiFinalLoosers = {};
        this._thirdPlace = {};
        this._finals = {};
    }

    start(groups){
        groups = this.#handleGroups(groups);
        let numberOfKeys = Object.keys(groups).length;
        this._pot = this._tournamentService.getPot(groups, numberOfKeys);
        numberOfKeys = Object.keys(this._pot).length;
        this.#runQuarterFinals(this._pot, numberOfKeys);
        numberOfKeys /=2;
        this.#runSemifinals(numberOfKeys);    
        numberOfKeys /= 2;
        this.#runFinals(numberOfKeys);
    }
    
    #runFinals(numberOfKeys){
         
        this._finals = this._playOff.determinePlayOffMatches(this._semiFinals, this._finals, numberOfKeys, 'Finals');
        let finalsCopy = JSON.parse(JSON.stringify(this._finals));
        this._finalsResults = this._tournamentService.getFinalsResults(this._finals);

        this._tournamentService.showMedalists(this._tournamentService.getFinalist( finalsCopy, this._finalsResults), this._tournamentService.getRunnerUp( this._finals, this._finalsResults), this._tournamentService.getThirdPlacer(this._thirdPlace, this._thirdPlaceResults));
    }

    #runSemifinals(numberOfKeys){
        this._semiFinals = this._playOff.determinePlayOffMatches(this._playOffs, this._semiFinals, numberOfKeys, "Semifinals");
        let semiFinalsCopy = JSON.parse(JSON.stringify(this._semiFinals));
        this._semiFinalsResults = this._tournamentService.getSemifinalResults(this._semiFinals);
        this._semiFinals = this._playOff.eliminateTeams(this._semiFinals,  this._semiFinalsResults, "Winners");
        this._semiFinalLoosers = this._playOff.eliminateTeams(semiFinalsCopy,  this._semiFinalsResults, "Loosers");;
        this._thirdPlace = this._playOff.determinePlayOffMatches(this._semiFinalLoosers,  this._thirdPlace, numberOfKeys /2, "Third place");
        this._thirdPlaceResults = this._tournamentService.getThirdPlaceResults(this._thirdPlace);
    }

    #runQuarterFinals(pot, numberOfKeys){
        this._playOffs=  this._tournamentService.getPlayOffs(pot, this._playOffs, numberOfKeys);
        let quarterfinalResults= this._tournamentService.getQuarterfinalResults(this._playOffs);
        this._playOffs = this._playOff.eliminateTeams(this._playOffs, quarterfinalResults, "Winners");
        
    }

    #handleGroups(groups){
        groups = this._utilHelper.modifyGroups(groups);
        this._results = this._tournamentService.getGroupResults(groups);
        groups = this._tournamentService.updateGroups(groups, this._results);
        return groups;
    }
}
module.exports = {Tournament}