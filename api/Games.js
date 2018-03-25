import React from 'react';

// Fetch all games of the day
function getGames (date) {
  const query = new Request('http://data.nba.net/10s/prod/v1/' + date + '/scoreboard.json');    
  return fetch(query)
    .then(response => response.json())
    .then(json => {
      return json.games;
    })
    .catch((error) => {
        console.log("error 1");
    });
}

// get data of the game matching the date and gameId
function getGame (date, gameId) {  
  const query = new Request('http://data.nba.net/data/10s/prod/v1/' + date + '/' + gameId + '_boxscore.json');
  return fetch(query)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch((error) => {
        console.log("error 2");
    });
}

export { getGames, getGame };