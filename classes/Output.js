class Output{
    constructor(){

    }
    writeMedalists(medalist){
        console.log("\nMedalists: ")
        for(let i =0; i<medalist.length; i++){
            console.log(`\t${i + 1}: ${medalist[i].Team}`);
        }
    }
    writePlayOffs(playOffs, text){
        console.log(`\n${text}: `)
        let counter = 0;
        for(let group in playOffs){
            if(counter % 2 == 0 && counter != 0) console.log("\n")
            if(Object.hasOwn(playOffs, group)){
                let matches = playOffs[group]
                for(let i = 0; i < group.length;i++){
                    console.log(`\t${matches[0].Team} vs ${matches[1].Team}`);
                }
            }
            counter += 1;
        }
    }
    writePot(pot){
        for(let group in pot){
            if(Object.hasOwn(pot, group)){
                let match = pot[group]
                console.log(`Pot ${group}: `)
                for(let i = 0; i < match.length;i++){
                    console.log(`\t${match[i].Team}`)
                }
            }
        }
    }
    writeGroups(groups) {
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
    writeMatchResults(data, phase){
        if(phase.Phase === "Group"){
            if(data != undefined || data != null){
                console.log(`\n${phase.Phase} phase: `);
                for(let i = 0; i < data.length;i++){
                    console.log(`\tGroup ${data[i].group}:`)
                    for(let j = 0; j < data[i].matches.length;j++){
                        console.log('\t', this.#printData(data, j,i))
                       
                    }
                }
            }
       
        }else if(phase.Phase === "Play offs"){
            if(data != undefined || data != null){
                console.log(`\n${phase.Type} `);
                for(let i = 0; i < data.length;i++){
                    if(i != 0 && i % 2 == 0) console.log("\n");
                    for(let j = 0; j < data[i].matches.length;j++){
                       console.log(this.#printData(data, j, i)) 
                       
                    }
                }
            }
            
        }
    }
    #printData(data, j, i){
        return `\t${data[i].matches[j].Team1.Team} - ${data[i].matches[j].Team2.Team} (${data[i].matches[j].Team1.Score} : ${data[i].matches[j].Team2.Score})`
    }
}
module.exports = {Output}