import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Games } from './components/Games';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'NbApp',
  };
  constructor() {
    super();
    this.detailsView = this.detailsView.bind(this);
  }
  detailsView() {
    this.props.navigation.navigate('GameDetails');
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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game Details Screen</Text>
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
