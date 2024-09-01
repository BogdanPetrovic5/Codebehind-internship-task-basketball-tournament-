const { UtilityHelper } = require("./UtilityHelper");


class Pot{
    constructor(){
        this._utilHelper = new UtilityHelper()
    }
    addTeams(rankedTeams, pot){
        let start = 0;
        for(let i in pot){
            if(Object.hasOwn(pot, i)){
                for(let j = start; j < start + 2; j++){
                    pot[i].push(rankedTeams[j]);
                }
            }
            start += 2;
        }
        
       return pot
    }
    drawPot(rankedTeams, numberOfKeys, pot) { 
        pot = this._utilHelper.addKeys(numberOfKeys, pot);
    
        pot = this.addTeams(rankedTeams, pot)
        return pot
       
    }
}
module.exports = {Pot}