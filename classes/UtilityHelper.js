class UtilityHelper{
    constructor(){
        
    }
    addKeys(numberOfKeys, draw){
        const startChar = 'D';
        let offset = numberOfKeys;
        const startCode = startChar.charCodeAt(0);
        const endCode = startCode + offset;
        
        for (let code = startCode; code <= endCode; code++) {
          const char = String.fromCharCode(code);
          draw[char] = [];
        }
        return draw;
    }
  
    giveRankings(groups){
        let allRanks = []
        let index = 0
        for(let group in groups){
            if(Object.hasOwn(groups, group)){
                let newRanks = Object.values(groups).map(group => group[index])
                newRanks.sort((a, b) => {
                    if(a.Points != b.Points){
                    return b.Points - a.Points
                    }else if(a.PointsDifference != b.PointsDifference && a.Points == b.Points){
                    return b.PointsDifference - a.PointsDifference
                    }else if(a.PointsDifference == b.PointsDifference && a.Points == b.Points){
                    return b.TotalScore - a.TotalScore
                    }
            
                });
                allRanks = allRanks.concat(newRanks)
            }
            index += 1;
        }
        allRanks.forEach((team, i) => {
            team.Rang = i + 1;
        });
        return allRanks
    }
    reduceGroups(groups){
        for(let group in groups){
             if(Object.hasOwn(groups, group)){
                 let team = groups[group];
                 team.splice(-1);
             }
        }
        return groups
     }
    sortGroups(groups, matches) {
        for (let group in groups) {
            groups[group].sort((a, b) => {
                if (b.Points !== a.Points) {
                    return b.Points - a.Points;
                } else {
                    let match = this.findHeadToHeadMatch(a, b, group, matches);
                    if (match) {
                        return match.Winner === a.Team ? -1 : 1;
                    } else {
                        return 0;
                    }
                }
            });
        }
    
        for (let group in groups) {
            if (Object.hasOwn(groups, group)) {
                let teams = groups[group];
    
                for (let i = 0; i < teams.length; i++) {
                    let tiedTeams = [teams[i]];
                    
                    for (let j = i + 1; j < teams.length && teams[i].Points === teams[j].Points; j++) {
                        tiedTeams.push(teams[j]);
                    }
    
                    if (tiedTeams.length === 3) {
                        tiedTeams.sort((a, b) => b.PointsDifference - a.PointsDifference);
                        for (let k = 0; k < tiedTeams.length; k++) {
                            teams[i + k] = tiedTeams[k];
                        }
    
                        i += 2; 
                    }
                }
            }
        }
    
        return groups;
    }
    
    findHeadToHeadMatch(teamA, teamB, group, matches) {
        let matchData = matches.find(m => m.group === group);
        if (matchData) {
            return matchData.matches.find(m => 
                (m.Winner === teamA.Team && m.Looser === teamB.Team) || 
                (m.Winner === teamB.Team && m.Looser === teamA.Team)
            );
        }
        return null;
    }
    modifyGroups(groups){
        Object.values(groups).forEach(group =>{
            group.forEach(team =>{
                {
                    team.TotalScore = 0;
                    team.Points = 0;
                    team.AllowedPoints = 0;
                    team.PointsDifference = 0;
                    team.TotalWins = 0;
                    team.TotalLoses = 0;
                    team.Rang = 0;
                }
            })
        })
        return groups;
    }
}
module.exports = {UtilityHelper}