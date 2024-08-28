
function writeData(data){
    if(data != undefined || data != null){
        for(let i = 0; i < data.length;i++){
            console.log(`Group ${data[i].group}:`)
            for(let j = 0; j < data[i].matches.length;j++){
                console.log(`\t${data[i].matches[j].Team1.Team} - ${data[i].matches[j].Team2.Team} (${data[i].matches[j].Team1.Score} : ${data[i].matches[j].Team2.Score}) winner: ${data[i].matches[j].Winner} Looser: ${data[i].matches[j].Looser} Surrender: ${data[i].matches[j].Surrender}`)
            }
        }
    }
}
module.exports = {writeData}