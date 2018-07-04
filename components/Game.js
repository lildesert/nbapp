import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      game: props.game,
      gameId: props.game.gameId,
      date: props.date,
      loading: true,
      homeScore: 0,
      homeTriCode: 0,
      visitorScore: 0,
      visitorTriCode: 0
    };
  }

  async componentWillMount() {
    let game = this.state.game;
    this.setState((prevState) => {
      return {
        homeScore: game.hTeam.score,
        homeTriCode: game.hTeam.triCode,
        visitorScore: game.vTeam.score,
        visitorTriCode: game.vTeam.triCode,
        loading: false
      };
    });
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
