const { UtilityHelper } = require("./UtilityHelper");


class Pot{
    constructor(){
        this._utilHelper = new UtilityHelper()
    }


    drawPot(rankedTeams, numberOfKeys, pot) { 
        pot = this._utilHelper.addKeys(numberOfKeys, pot);
    
        pot = this.#addTeams(rankedTeams, pot)
        return pot
       
    }

    
    #addTeams(rankedTeams, pot){
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


}
module.exports = {Pot}