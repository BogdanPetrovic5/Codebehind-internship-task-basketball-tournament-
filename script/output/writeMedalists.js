function writeMedalists(medalist){
    console.log("\nMedalists: ")
    for(let i =0; i<medalist.length; i++){
        console.log(`\t${i + 1}: ${medalist[i].Team}`)
    }
}
module.exports = {writeMedalists}