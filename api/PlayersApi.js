
const players = {
  isLoaded: false,
  data: []
}

// Api docs: https://github.com/kshvmdn/nba.js/blob/master/docs/api/DATA.md

// Fetch all the players
// http://http://data.nba.net/data/10s/prod/v1/{{year}}/players.json
// year = 2018
async function getPlayers(year) {
  if (players.isLoaded) {
    return players.data;
  }
  const query = new Request('http://data.nba.net/10s/prod/v1/' + year + '/players.json');
  return fetch(query)
    .then(response => response.json())
    .then(json => {
      players.isLoaded = true;
      players.data = json.league.standard;
      return players.data;
    })
    .catch((error) => {
      console.log("error getPlayers : " + error);
    });
}

export { getPlayers };
