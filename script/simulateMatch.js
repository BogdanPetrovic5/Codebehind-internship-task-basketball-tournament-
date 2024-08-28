const { writeData } = require('./writeData.js')
const results = []
var winner = {}
var looser = {}

const lowerEdge = 70
const higherEdge = 120

const looserLowerEdge = 60
var draw = false;

function calculateWinProbability(team1, team2){
    const rankDifference = team1.FIBARanking - team2.FIBARanking;
    const winProbability = 1 / (1 + Math.exp((-rankDifference) / 10));
    var winProbabilityRounded = winProbability.toFixed(1);
    return winProbabilityRounded
}

function getWinnerPoints(){
    const winnerPoints = Math.floor(Math.random() * (higherEdge - lowerEdge + 1)) + lowerEdge;
    return winnerPoints
}
function getLooserPoints(winnerPoints){
    const looserPoints = Math.floor(Math.random() * (winnerPoints - looserLowerEdge)) + looserLowerEdge;
    return looserPoints
}

function simulateMatch(team1, team2){
    winProbability = calculateWinProbability(team1, team2);
    let random = Math.random().toFixed(1)

    const winnerPoints = getWinnerPoints()
    const looserPoints = getLooserPoints(winnerPoints)

    if(random < winProbability){
       
        return {
            team1:{team:team1.Team, points:winnerPoints},
            team2:{team:team2.Team, points:looserPoints},
            winner:team1.Team
        }
        
    }else if(random > winProbability) {
      
        return {
            team1:{team:team2.Team, points:winnerPoints},
            team2:{team:team1.Team, points:looserPoints},
            winner:team2.Team
        }
    }else {
        return {
            team1:{team:team1.Team, points:winnerPoints},
            team2:{team:team2.Team, points:winnerPoints},
            winner:"Draw"
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