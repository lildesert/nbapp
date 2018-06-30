import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
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
    const { onPress } = this.props;
    if (this.state.loading) {
      return (<ActivityIndicator size='large' style={{ height: 80 }} />);
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.game} onPress={() => { onPress('GameDetails'); }}>
            <Text style={[styles.gameLabel, this.state.index % 2 === 0 ? styles.gameEven : styles.gameOdd]}>{this.state.visitorTriCode} {this.state.visitorScore} -  {this.state.homeScore} {this.state.homeTriCode}</Text>
          </TouchableOpacity>
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
    width: deviceWidth
  },
  gameEven: {
    color: '#ffffff',
    backgroundColor: '#17408B'
  },
  gameOdd: {
    backgroundColor: '#ffffff'
  },
  gameLabel: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20
  }
});
