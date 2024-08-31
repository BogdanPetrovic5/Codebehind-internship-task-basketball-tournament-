const {matchResult} = require('./matchResult.js')


function simulateMatches(groups){
    const results = []
    for (const group in groups) {
        
        if (Object.hasOwn(groups, group)) {

            const teams = groups[group];
            const groupResult = { group: group, matches: [] };

            for(let i = 0; i < teams.length;i++){
                for(let j = i+1; j < teams.length;j++){
                    if(teams[i].Team != teams[j].Team){
                        const team1 = teams[i]
                        const team2 = teams[j]
                        const result = matchResult(team1, team2)
                        groupResult.matches.push(result);
                    }
                }
            }

            results.push(groupResult);
            
        }
        
    }
    
    return results;
}
module.exports = {simulateMatches}