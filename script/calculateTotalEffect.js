function modifyGroups(groups){
    Object.values(groups).forEach(group =>{
        group.forEach(team =>{
            {
                team.TotalScore = 0;
                team.Points = 0
                team.AllowedPoints = 0;
                team.PointsDifference = 0
                team.TotalWins = 0
                team.TotalLoses = 0
            }
        })
    })
    return groups
}


function updateGroups(team, match) { 
    team = calculateTotalScore(team,match)
    team = calculateTotalPoints(team, match)
    team = calculateTotalAllowedPoints(team, match)
    team = calculatePointsDifference(team)
    team = calculateWinsLoses(team, match)
    return team
 }

function calculateWinsLoses(team, match){
    if(team.Team === match.Winner){
        team.TotalWins += 1
    }else if(team.Team === match.Looser && team.Team != match.Surrender){
        team.TotalLoses += 1
    }
    return team
}
function calculateTotalScore(team, match) { 
    if(team.Team === match.Team1.Team){
        team.TotalScore += match.Team1.Score
    }else if(team.Team === match.Team2.Team){
        team.TotalScore += match.Team2.Score
    }

    return team
}
function calculateTotalPoints(team, match) { 
    if(team.Team === match.Winner){
        team.Points += 2
    }else if(team.Team === match.Looser && match.Surrender === "None"){
        team.Points += 1
    }
    return team;
 }
function calculateTotalAllowedPoints(team, match){
    if(team.Team === match.Team1.Team){
        team.AllowedPoints += match.Team2.Score
    }else if(team.Team === match.Team2.Team){
        team.AllowedPoints+= match.Team1.Score
    }
    return team
}
function calculatePointsDifference(team) { 
    team.PointsDifference = team.TotalScore - team.AllowedPoints
    return team;
 }
function calculateTotalEffect(groups, results){
 
    groups = modifyGroups(groups);
    Object.values(groups).forEach(group =>{
        group.forEach(team =>{
           results.forEach(groupResults=>{
            groupResults.matches.forEach(match=>{
                
                team = updateGroups(team, match)
            })
           })
        })
    })
    return groups;
}
module.exports = {calculateTotalEffect}