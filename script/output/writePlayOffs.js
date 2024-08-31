
function writePlayOffs(playOffs, text){
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

module.exports = {writePlayOffs};