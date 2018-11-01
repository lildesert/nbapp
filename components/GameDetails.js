import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import * as GameApi from '../api/GamesApi';
import * as PlayersApi from '../api/PlayersApi';
import teamMap from '../utils/TeamMap';

export class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: props.gameId,
      date: props.date,
    };
    let teamMapById = {};
    for (let key in teamMap) {
      teamMapById[teamMap[key].id] = Object.assign({}, teamMap[key], { abbr: key })
    }
    this.teamMapById = teamMapById;
  }

  async componentWillMount() {
    if (this.state.gameId !== 0 && this.state.date !== "") {
      let game = await GameApi.getGame(this.state.date, this.state.gameId);
      let players = await PlayersApi.getPlayers(new Date().getFullYear());
      this.homeTeam = this.teamMapById[game.basicGameData.hTeam.teamId];
      this.visitorTeam = this.teamMapById[game.basicGameData.vTeam.teamId];

      let homePlayersStats = [], awayPlayersStats = [];
      for (let p in game.stats.activePlayers) {
        let playerStat = game.stats.activePlayers[p];
        let playerInfo = players.find(player => player.personId == playerStat.personId);
        if (playerInfo != undefined) {
          playerStat.firstName = playerInfo.firstName;
          playerStat.lastName = playerInfo.lastName;
          playerStat.pos = playerInfo.pos;
          playerStat.jersey = playerInfo.jersey;
          if (playerStat.teamId == this.homeTeam.id) {
            homePlayersStats.push(playerStat);
          } else {
            awayPlayersStats.push(playerStat);
          }
        }
      }

      this.setState((prevState) => {
        return {
          homeLogo: this.homeTeam.logo,
          visitorLogo: this.visitorTeam.logo,
          homeScore: game.basicGameData.hTeam.score,
          homeTriCode: game.basicGameData.hTeam.triCode,
          visitorScore: game.basicGameData.vTeam.score,
          visitorTriCode: game.basicGameData.vTeam.triCode,
          homePlayersStats: homePlayersStats,
          awayPlayersStats: awayPlayersStats,
          loading: false
        };
      });
    }
  }

  render() {
    const { onPress } = this.props;
    if (this.state.loading) {
      return (<ActivityIndicator size='large' style={{ height: 80 }} />);
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={this.state.visitorLogo} />
            <Text style={styles.gameLabel}>
              {this.state.visitorTriCode} {this.state.visitorScore} - {this.state.homeScore} {this.state.homeTriCode}
            </Text>
            <Image style={styles.logo} source={this.state.homeLogo} />
          </View>
          <View style={styles.body}>

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#03304f',
    padding: 16
  },
  gameLabel: {
    color: '#ffffff'
  },
  logo: {
    width: 50,
    height: 50
  },
  body: {
    flex: 1
  }
});
