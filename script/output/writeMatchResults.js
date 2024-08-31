
function writeMatchResults(data, phase){
    if(phase.Phase === "Group"){
        if(data != undefined || data != null){
            console.log(`\n${phase.Phase} phase: `)
            for(let i = 0; i < data.length;i++){
                console.log(`\tGroup ${data[i].group}:`)
                for(let j = 0; j < data[i].matches.length;j++){
                    console.log(`\t\t${data[i].matches[j].Team1.Team} - ${data[i].matches[j].Team2.Team} (${data[i].matches[j].Team1.Score} : ${data[i].matches[j].Team2.Score}) winner: ${data[i].matches[j].Winner} Looser: ${data[i].matches[j].Looser} Surrender: ${data[i].matches[j].Surrender}`)
                }
            }
        }
   
    }else if(phase.Phase === "Play offs"){
        if(data != undefined || data != null){
            console.log(`\n${phase.Type} `)
            for(let i = 0; i < data.length;i++){
                if(i != 0 && i % 2 == 0) console.log("\n")
                for(let j = 0; j < data[i].matches.length;j++){
                    console.log(`\t${data[i].matches[j].Team1.Team} - ${data[i].matches[j].Team2.Team} (${data[i].matches[j].Team1.Score} : ${data[i].matches[j].Team2.Score}) winner: ${data[i].matches[j].Winner} Looser: ${data[i].matches[j].Looser} Surrender: ${data[i].matches[j].Surrender}`)
                }
            }
        }
        
    }
   
}
module.exports = {writeMatchResults}