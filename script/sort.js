function sort(groups, matches) {
    for (let group in groups) {
        groups[group].sort((a, b) => {
            if (b.Points !== a.Points) {
                return b.Points - a.Points;
            }else if(b.Points == a.Points){
                
                let matchesTemp = matches.find(
                    m => m.group === group
                );
                let match = matchesTemp.matches.find(
                    m => (m.Winner == a.Team && m.Looser == b.Team) || (m.Winner == b.Team && m.Looser == a.Team) 
                )
                if (match) {
                    
                    return match.Winner === a.Team ? -1 : 1;
                } else {
                    
                    return 0;
                }
            }
        });
    }
    // for(let group in groups){
    //     groups[group].sort((a,b)=>{
         
    //         let match = matches.find(
    //             m => m.group === group && 
    //             ((m.Winner === a.Team && m.Looser === b.Team) ||
    //                 (m.Winner === b.Team && m.Looser === a.Team))
    //         );
            
    //         if (match) {
                
    //             return match.Winner === a.Team ? -1 : 1;
    //         } else {
                
    //             return 0;
    //         }
            
    //     })
    // }
    for(let group in groups){
     
        if(Object.hasOwn(groups, group)){
            const team = groups[group];
            for(let i = 0; i < team.length;i++){
                let counter = 0
                for(let j = i+1; j < team.length; j++){
                    if(team[i].Points == team[j].Points){
                        counter+= 1
                    }
                }   
                if(counter == 2){
                    for(let j = i+1; j < team.length; j++){
                        if(team[i].PointsDifference < team[j].PointsDifference){
                            temp = team[i]
                            team[i] = team[j]
                            team[j] = temp 
                        }
                       
                    }
                }
               
             
            }
        }
    
    }
    return groups;
}
module.exports = {sort}