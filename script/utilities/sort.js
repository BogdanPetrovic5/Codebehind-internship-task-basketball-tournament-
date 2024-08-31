function sort(groups, matches) {
    for (let group in groups) {
        groups[group].sort((a, b) => {
            if (b.Points !== a.Points) {
                return b.Points - a.Points;
            } else {
                let match = findHeadToHeadMatch(a, b, group, matches);
                if (match) {
                    return match.Winner === a.Team ? -1 : 1;
                } else {
                    return 0;
                }
            }
        });
    }

    for (let group in groups) {
        if (Object.hasOwn(groups, group)) {
            let teams = groups[group];

            for (let i = 0; i < teams.length; i++) {
                let tiedTeams = [teams[i]];
                
                for (let j = i + 1; j < teams.length && teams[i].Points === teams[j].Points; j++) {
                    tiedTeams.push(teams[j]);
                }

                if (tiedTeams.length === 3) {
                    tiedTeams.sort((a, b) => b.PointsDifference - a.PointsDifference);
                    for (let k = 0; k < tiedTeams.length; k++) {
                        teams[i + k] = tiedTeams[k];
                    }

                    i += 2; 
                }
            }
        }
    }

    return groups;
}

function findHeadToHeadMatch(teamA, teamB, group, matches) {
    let matchData = matches.find(m => m.group === group);
    if (matchData) {
        return matchData.matches.find(m => 
            (m.Winner === teamA.Team && m.Looser === teamB.Team) || 
            (m.Winner === teamB.Team && m.Looser === teamA.Team)
        );
    }
    return null;
}

module.exports = { sort };
