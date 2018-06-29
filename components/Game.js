import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import * as GameApi from '../api/Games.js';
import teamInfo from '../utils/TeamMap';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      gameId: props.gameId,
      date: props.date,
      loading: true,
      homeScore: 0,
      homeTriCode: 0,
      visitorScore: 0,
      visitorTriCode: 0
    };
  }

  async componentWillMount() {
    if (this.state.gameId !== 0 && this.state.date !== "") {
      let game = await GameApi.getGame(this.state.date, this.state.gameId);
      this.setState((prevState) => {
        return {
          homeScore: game.basicGameData.hTeam.score,
          homeTriCode: game.basicGameData.hTeam.triCode,
          visitorScore: game.basicGameData.vTeam.score,
          visitorTriCode: game.basicGameData.vTeam.triCode,
          loading: false
        };
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (<ActivityIndicator size='large' style={{ height: 80 }} />);
    } else {
      return (
        <View style={styles.container}>
          <Text style={[styles.game, this.state.index % 2 === 0 ? styles.gameEven : styles.gameOdd]}>
            <Text style={styles.teamCode}>{this.state.visitorTriCode} </Text>
            <Text style={styles.teamScore}>{this.state.visitorScore} </Text>
            -
            <Text style={styles.teamScore}>{this.state.homeScore} </Text>
            <Text style={styles.teamCode}>{this.state.homeTriCode}</Text>
          </Text>
        </View>
      );
    }
  }
}

const deviceWidth = Dimensions.get('window').width; //full width
const deviceHeight = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  game: {
    width: deviceWidth,
    textAlign: 'center',
    padding: 20,
  },
  gameEven: {
    color: '#ffffff',
    backgroundColor: '#17408B'
  },
  gameOdd: {
    backgroundColor: '#ffffff'
  },
  teamCode: {
    fontSize: 22
  },
  teamScore: {
    fontSize: 18
  }
});
