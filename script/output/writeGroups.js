function writeGroups(groups) {
   
    for (let group in groups) {
        if (Object.hasOwn(groups, group)) {
            console.log(
                `\tGroup ${group} Name                | Wins | Loses | Points | Scores | Allowed Scores | Differences | Rang`
            );
            console.log('\t----------------------------|------|-------|--------|--------|----------------|-------------|-------');

            const teams = groups[group];
            
            teams.forEach(team => {
                console.log(
                    `\t${team.Team.padEnd(28)}| ${String(team.TotalWins).padStart(4)} | ${String(team.TotalLoses).padStart(5)} | ${String(team.Points).padStart(6)} | ${String(team.TotalScore).padStart(6)} | ${String(team.AllowedPoints).padStart(14)} | ${String(team.PointsDifference).padStart(11)} | ${String(team.Rang).padStart(5)}`
                );
            });
            console.log(''); 
        }
    }
}
module.exports = {writeGroups}