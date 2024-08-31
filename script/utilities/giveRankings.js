function giveRankings(groups){
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
module.exports= {giveRankings}
