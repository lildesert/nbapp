import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Nba extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Loading...",
      games: null
    };
  }

  getDateFormat () {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    let day = today.getDate() < 9 ? '0' + today.getDate() : today.getDate();
    //let day = 17;
    let date = '' + year + month + day;

    return date;
  }

  componentDidMount () {
    const currentDate = this.getDateFormat();

    const query = new Request('http://data.nba.net/10s/prod/v1/' + currentDate + '/scoreboard.json');    
    return fetch(query)
      .then(response => response.json())
      .then(json => {
        this.setState({
          display: "coucou",
        }, function(){});
      })
      .catch((error) => {
          console.error("error");
      });
  }

  render() {
    let prop = "some property";
    return (
      <View style={styles.container}>
        <Text>{this.state.display}</Text>
        <Text>{this.state.games}</Text>
      </View>
    );
  }
}

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
