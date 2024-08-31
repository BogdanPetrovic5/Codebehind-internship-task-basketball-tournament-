function writePot(pot){
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
module.exports = {writePot}