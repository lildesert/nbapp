import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Games } from './components/Games';
import { GameDetails } from './components/GameDetails';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'NbApp',
  };
  constructor() {
    super();
    this.detailsView = this.detailsView.bind(this);
  }
  detailsView(route, params) {
    this.props.navigation.navigate(route, params);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Games onPress={this.detailsView} />
      </View>
    );
  }
}

class GameDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('gameTitle'),
    };
  };
  render() {
    const { navigation } = this.props;
    const gameId = navigation.getParam('gameId');
    const date = navigation.getParam('date');
    return (
      <View style={{ flex: 1 }}>
        <GameDetails gameId={gameId} date={date} />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    GameDetails: GameDetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
