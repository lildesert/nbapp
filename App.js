import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Nba } from './components/Nba.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Nbapp</Text>
        <Nba />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
