function writeGroups(groups){
    for(let group in groups){
        if(Object.hasOwn(groups, group)){
            console.log(`Group ${group} Name/ Wins/ Loses/ Points/ Scores/ Allowed Scores/ Differences : `)
            const team = groups[group];
            for(let i = 0; i < team.length;i++){
               console.log(`\t${team[i].Team}/ ${team[i].TotalWins}/ ${team[i].TotalLoses}/ ${team[i].Points}/ ${team[i].TotalScore}/ ${team[i].AllowedPoints}/ ${team[i].PointsDifference}`)
            }
        }
    
    }
}
module.exports = {writeGroups}