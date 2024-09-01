class PhaseOutcomeEvaluator{
    constructor(){

    }
    
    #updateGroups(team, match) { 
        team = this.#calculateTotalScore(team,match);
        team = this.#calculateTotalPoints(team, match);
        team = this.#calculateTotalAllowedPoints(team, match);
        team = this.#calculatePointsDifference(team);
        team = this.#calculateWinsLoses(team, match);

        return team;
    }

    #calculateWinsLoses(team, match){
        if(team.Team === match.Winner){
            team.TotalWins += 1;
        }else if(team.Team === match.Looser && team.Team != match.Surrender){
            team.TotalLoses += 1;
        }

        return team;
    }

    #calculateTotalScore(team, match) { 
        if(team.Team === match.Team1.Team){
            team.TotalScore += match.Team1.Score;
        }else if(team.Team === match.Team2.Team){
            team.TotalScore += match.Team2.Score;
        }

        return team;
    }

    #calculateTotalPoints(team, match) { 
        if(team.Team === match.Winner){
            team.Points += 2;
        }else if(team.Team === match.Looser && match.Surrender === "None"){
            team.Points += 1;
        }

        return team;
    }

    #calculateTotalAllowedPoints(team, match){
        if(team.Team === match.Team1.Team){
            team.AllowedPoints += match.Team2.Score;
        }else if(team.Team === match.Team2.Team){
            team.AllowedPoints+= match.Team1.Score;
        }

        return team;
    }

    #calculatePointsDifference(team) { 
        team.PointsDifference = team.TotalScore - team.AllowedPoints;

        return team;
    }

    calculateTotalEffect(groups, results){
 
       
        Object.values(groups).forEach(group =>{
            group.forEach(team =>{
            results.forEach(groupResults=>{
                groupResults.matches.forEach(match=>{
                    team = this.#updateGroups(team, match);
                })
            })
            })
        })

        return groups;
    }
}
module.exports = {PhaseOutcomeEvaluator}