
const {addKeys} = require('./addKeys.js')
function addTeams(rankedTeams, pot){
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
function drawPot(rankedTeams, numberOfKeys, pot) { 
    pot = addKeys(numberOfKeys, pot);

    pot = addTeams(rankedTeams, pot)
    return pot
   
}
module.exports = {drawPot};