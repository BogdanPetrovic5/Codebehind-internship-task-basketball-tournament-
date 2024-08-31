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
                team.Rang = 0
            }
        })
    })
    return groups
}
module.exports = {modifyGroups}