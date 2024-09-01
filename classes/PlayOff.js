const { PhaseOutcomeEvaluator } = require("./PhaseOutcomeEvaluator");
const { UtilityHelper } = require("./UtilityHelper");

class PlayOff{
    constructor(){
        this._utilHelper = new UtilityHelper()
        this._phaseOutcome = new PhaseOutcomeEvaluator()
    }
    eliminateTeams(playOffs, playOffsResults, parameter){
        for(let group in playOffs){
            if(Object.hasOwn(playOffs, group)){

                var teams = playOffs[group]
                for(let i = 0;i<playOffsResults.length;i++){
                    if (playOffsResults[i].group == group) {
                       if(parameter === "Winners"){
                            for (let j = 0; j < teams.length; j++) {
                                if (playOffsResults[i].matches[0].Looser === teams[j].Team) {
                                    teams.splice(j,1);
                                    break; 
                                }
                            }
                       }else if(parameter === "Loosers"){
                            for (let j = 0; j < teams.length; j++) {
                                if (playOffsResults[i].matches[0].Winner === teams[j].Team) {
                                    teams.splice(j,1);
                                    break; 
                                }
                            }
                       }
                        playOffs[group] = teams;
                    }
                }
            }
        }
        playOffs = this._phaseOutcome.calculateTotalEffect(playOffs, playOffsResults);
    
        return playOffs;
     
    }
    #selectRandomTeam(pot){
        const keys = Object.keys(pot);
        let randomKey = Math.floor(Math.random() * keys.length);
        let key = keys[randomKey];
        let group = pot[key];
        let randomIndex = Math.floor(Math.random()*group.length);
        let obj = group[randomIndex];
        pot[key].splice(randomIndex,1);
        if(group.length < 1){
            delete pot[key]
            keys.splice(randomKey, 1);
        }

        return obj
    }
    #selectSpecificPairs(pot, index){
        const keys = Object.keys(pot);
        let key = keys[index];
        let group = pot[key];
        let obj = group[0];

        return obj;
    }
    determinePlayOffMatches(pot, playOffs, numberOfKeys, playOffType){
        let potTemp = pot;
        playOffs = this._utilHelper.addKeys(numberOfKeys-1,playOffs);
        let index = 0;
    
        for(let group in playOffs){
            if(Object.hasOwn(playOffs, group)){
                for(let i = 0; i < 2; i++){
                    if(playOffType == "Quarterfinals"){
                        playOffs[group].push(this.#selectRandomTeam(potTemp))
                    }else if(playOffType == "Semifinals" || playOffType == "Finals" || playOffType == "Third place"){
                        playOffs[group].push(this.#selectSpecificPairs(potTemp, index))
                    }
                    index += 1;
                }
                
            }
        }

        return playOffs;
    }
}
module.exports = {PlayOff}