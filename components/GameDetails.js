import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import * as GameApi from '../api/GamesApi';
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
      this.homeTeam = this.teamMapById[game.basicGameData.hTeam.teamId];
      this.visitorTeam = this.teamMapById[game.basicGameData.vTeam.teamId];
      this.setState((prevState) => {
        return {
          homeLogo: this.homeTeam.logo,
          visitorLogo: this.visitorTeam.logo,
          homeScore: game.basicGameData.hTeam.score,
          homeTriCode: game.basicGameData.hTeam.triCode,
          visitorScore: game.basicGameData.vTeam.score,
          visitorTriCode: game.basicGameData.vTeam.triCode,
          playerStats: game.stats.activePlayers,
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
