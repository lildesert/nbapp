import React from 'react';

// Fetch all games of the day
// http://data.nba.net/10s/prod/v1/20180421/scoreboard.json
function getGames(date) {
  const query = new Request('http://data.nba.net/10s/prod/v1/' + date + '/scoreboard.json');
  return fetch(query)
    .then(response => response.json())
    .then(json => {
      return json.games;
    })
    .catch((error) => {
      console.log("error 1 : " + error);
    });
}

// get data of the game matching the date and gameId
// http://data.nba.net/data/10s/prod/v1/20180421/0041700164_boxscore.json
function getGame(date, gameId) {
  const query = new Request('http://data.nba.net/data/10s/prod/v1/' + date + '/' + gameId + '_boxscore.json');
  return fetch(query)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch((error) => {
      console.log("error 2 : " + error);
    });
}

export { getGames, getGame };
