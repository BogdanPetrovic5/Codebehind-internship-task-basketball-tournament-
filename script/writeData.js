
function writeData(data){
    if(data != undefined || data != null){
        for(let i = 0; i < data.length;i++){
            console.log(`Group ${data[i].group}:`)
            for(let j = 0; j < data[i].matches.length;j++){
                console.log(`\t${data[i].matches[j].team1.team} - ${data[i].matches[j].team2.team} (${data[i].matches[j].team1.points} : ${data[i].matches[j].team2.points}) winner: ${data[i].matches[j].winner}`)
            }
        }
    }
}
module.exports = {writeData}