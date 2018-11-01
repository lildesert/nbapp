import React from 'react';

// Api docs: https://github.com/kshvmdn/nba.js/blob/master/docs/api/DATA.md

// Fetch all the players
// http://http://data.nba.net/data/10s/prod/v1/{{year}}/players.json
// year = 2018
async function getPlayers(year) {
  const query = new Request('http://data.nba.net/10s/prod/v1/' + year + '/players.json');
  return fetch(query)
    .then(response => response.json())
    .then(json => {
      return json.league.standard;
    })
    .catch((error) => {
      console.log("error getPlayers : " + error);
    });
}

export { getPlayers };
