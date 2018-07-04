import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList } from 'react-native';
import * as GameComponent from '../components/Game.js';
import * as GameApi from '../api/GamesApi';
import * as DateHelper from '../helpers/DateHelper.js';

export class Games extends Component {
  constructor(props) {
    super(props);
    this.detailsView = this.detailsView.bind(this);
    let gamesDate = DateHelper.getFormattedDate(new Date('2018-04-21'));
    this.state = {
      loading: true,
      date: gamesDate,
      gamesId: []
    };
  }

  detailsView(route, params) {
    const { onPress } = this.props;
    onPress(route, params);
  }

  async componentWillMount() {
    let games = await GameApi.getGames(this.state.date);
    this.setState((prevState) => {
      return {
        games: games,
        loading: false
      };
    });
  }

  render() {
    if (this.state.loading) {
      return (<ActivityIndicator size='large' style={{ height: 80 }} />);
    } else {
      return (
        <View style={styles.container}>
          {/* TODO : Afficher Date du jour sélectionné */}
          <Text style={[styles.date]}>{DateHelper.prettyDisplay(this.state.date)}</Text>

          {/* TODO : Afficher Datepicker */}
          <FlatList
            data={this.state.games}
            renderItem={({ item, index }) => <GameComponent.Game onPress={this.detailsView} game={item} date={this.state.date} index={index} />}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    marginVertical: 20
  }
});
