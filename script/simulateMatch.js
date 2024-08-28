const { writeData } = require('./writeData.js')
const results = []
function calculateWinProbability(team1, team2){
    const rankDifference = team1.FIBARanking - team2.FIBARanking;
    const winProbability = 1 / (1 + Math.exp((rankDifference) / 10));
    var winProbabilityRounded = winProbability.toFixed(2);

    return winProbabilityRounded
}

function getWinnerPoints(higherEdge, lowerEdge){
    const winnerPoints = Math.floor(Math.random() * (higherEdge - lowerEdge + 1)) + lowerEdge;
    return winnerPoints
}
function getLooserPoints(winnerPoints, looserLowerEdge){
    const looserPoints = Math.floor(Math.random() * (winnerPoints - (winnerPoints - 15))) + (winnerPoints - 15);
    return looserPoints
}

function simulateMatch(team1, team2){
    const lowerEdge = 80
    const higherEdge = 110

    const looserLowerEdge = 80

    winProbability = calculateWinProbability(team1, team2);
    let random = Math.random().toFixed(2)
    if(winProbability > 0.9){
        let winnerPoints = getWinnerPoints(higherEdge, looserLowerEdge + 30)
        return {
            Team1:{Team:team1.Team, Score:winnerPoints},
            Team2:{Team:team2.Team, Score:getLooserPoints(winnerPoints-20, looserLowerEdge)},
            Winner:team1.Team,
            Looser:team2.Team,
            Surrender:team2.Team
         }
    }
    

    const winnerPoints = getWinnerPoints(higherEdge, lowerEdge)
    const looserPoints = getLooserPoints(winnerPoints, looserLowerEdge)

    if(random < winProbability){
       
        return {
           Team1:{Team:team1.Team, Score:winnerPoints},
           Team2:{Team:team2.Team, Score:looserPoints},
           Winner:team1.Team,
           Looser:team2.Team,
           Surrender:"None"
        }
        
    }else if(random > winProbability) {
      
        return {
            Team1:{Team:team2.Team, Score:winnerPoints},
            Team2:{Team:team1.Team, Score:looserPoints},
            Winner:team2.Team,
            Looser:team1.Team,
            Surrender:"None"
        }
    }else {
        return {
            Team1:{Team:team1.Team, Score:winnerPoints},
            Team2:{Team:team2.Team, Score:winnerPoints},
            Winner:"Draw",
            Looser:"Draw",
            Surrender:"None"
        }
       
    }

}
function simulateGroupMatches(groups){
    for (const group in groups) {
        if (Object.hasOwn(groups, group)) {
            const teams = groups[group];
            const groupResult = { group: group, matches: [] };
            for(let i = 0; i < teams.length;i++){
                for(let j = i+1; j < teams.length;j++){
                    if(teams[i].Team != teams[j].Team){
                        const team1 = teams[i]
                        const team2 = teams[j]
                        const matchResult = simulateMatch(team1, team2)
                        groupResult.matches.push(matchResult);
                    }
                }
                
            }
            results.push(groupResult);
            
        }
        
    }
    writeData(results)
    return results;
}
module.exports = {simulateGroupMatches}