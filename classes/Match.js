
class Match{
    constructor(){
        
    }
    #calculateWinProbability(team1, team2){
        const rankDifference = (-team1.FIBARanking + team1.TotalWins - team1.TotalLoses + team1.PointsDifference) - (-team2.FIBARanking + team2.TotalWins - team2.TotalLoses + team2.PointsDifference);
   
        const winProbability = 1 / (1 + Math.exp((-rankDifference) / 10));
        var winProbabilityRounded = winProbability.toFixed(3);
        
        return winProbabilityRounded;
    }
    
    #getWinnerPoints(higherEdge, lowerEdge){
        const winnerPoints = Math.floor(Math.random() * (higherEdge - lowerEdge + 1)) + lowerEdge;
        return winnerPoints;
    }
    #getLooserPoints(winnerPoints, looserLowerEdge){
        const looserPoints = Math.floor(Math.random() * (winnerPoints - (winnerPoints - 15))) + (winnerPoints - 15);

        return looserPoints;
    }
    
    #matchResult(team1, team2){
        const lowerEdge = 80;
        const higherEdge = 110;
        const looserLowerEdge = 80;
        let winProbability = this.#calculateWinProbability(team1, team2);
        let random = Math.random().toFixed(3)
        
        if(winProbability > 0.9){
            let winnerPoints = this.#getWinnerPoints(higherEdge, looserLowerEdge + 30)
            return {
                Team1:{Team:team1.Team, Score:winnerPoints},
                Team2:{Team:team2.Team, Score:this.#getLooserPoints(winnerPoints-20, looserLowerEdge)},
                Winner:team1.Team,
                Looser:team2.Team,
                Surrender:team2.Team
             }
        }
        if(winProbability < 0.1){
            let winnerPoints = this.#getWinnerPoints(higherEdge, looserLowerEdge + 30)
            return {
                Team1:{Team:team2.Team, Score:winnerPoints},
                Team2:{Team:team1.Team, Score:this.#getLooserPoints(winnerPoints-20, looserLowerEdge)},
                Winner:team2.Team,
                Looser:team1.Team,
                Surrender:team1.Team
             }
        }
    
        const winnerPoints = this.#getWinnerPoints(higherEdge, lowerEdge)
        const looserPoints = this.#getLooserPoints(winnerPoints, looserLowerEdge)
    
        if(random > winProbability){
            return {
               Team1:{Team:team2.Team, Score:winnerPoints},
               Team2:{Team:team1.Team, Score:looserPoints},
               Winner:team2.Team,
               Looser:team1.Team,
               Surrender:"None"
            }
            
        }else if(random < winProbability) {
          
            return {
                Team1:{Team:team1.Team, Score:winnerPoints},
                Team2:{Team:team2.Team, Score:looserPoints},
                Winner:team1.Team,
                Looser:team2.Team,
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
    simulateMatches(groups){
        const results = []
        for (const group in groups) {
            if (Object.hasOwn(groups, group)) {
    
                const teams = groups[group];
                const groupResult = { group: group, matches: [] };
    
                for(let i = 0; i < teams.length;i++){
                    for(let j = i+1; j < teams.length;j++){
                        if(teams[i].Team != teams[j].Team){
                            const team1 = teams[i];
                            const team2 = teams[j];
                            const result = this.#matchResult(team1, team2)
                            groupResult.matches.push(result);
                        }
                    }
                }
                results.push(groupResult);
            }
        }
        
        return results;
    }
}
module.exports = {Match}