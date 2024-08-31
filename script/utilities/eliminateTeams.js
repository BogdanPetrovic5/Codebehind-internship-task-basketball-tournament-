const { calculateTotalEffect } = require("./calculateTotalEffect");


function eliminateTeams(playOffs, playOffsResults, parameter){
    for(let group in playOffs){
        if(Object.hasOwn(playOffs, group)){
            var teams = playOffs[group]
           
            for(let i = 0;i<playOffsResults.length;i++){
                if (playOffsResults[i].group == group) {
                   if(parameter === "Winners"){
                    for (let j = 0; j < teams.length; j++) {
                        if (playOffsResults[i].matches[0].Looser === teams[j].Team) {
                            teams.splice(j,1)
                            break; 
                        }
                    }
                   }else if(parameter === "Loosers"){
                    for (let j = 0; j < teams.length; j++) {
                        if (playOffsResults[i].matches[0].Winner === teams[j].Team) {
                            teams.splice(j,1)
                            break; 
                        }
                    }
                   }
                    playOffs[group] = teams;
                    
                }
              
            }
        }
    }
   
    playOffs = calculateTotalEffect(playOffs, playOffsResults)

    return playOffs
 
}
module.exports = {eliminateTeams};