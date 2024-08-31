function reduceGroups(groups){
   for(let group in groups){
        if(Object.hasOwn(groups, group)){
            let team = groups[group];
            team.splice(-1);
        }
   }
   return groups
}

module.exports = {reduceGroups}