import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as GameApi from '../api/Games.js';

export class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            gameId: props.gameId,
            date: props.date,
            loading: true,
            homeScore: 0,
            homeTriCode: 0,
            visitorScore: 0,
            visitorTriCode: 0
        };
    }

    async componentWillMount () {
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
            return( <ActivityIndicator size='large' style={{height:80}} /> );
        } else {
            return (
                <View style={styles.container}>
                    <Text>{this.state.visitorTriCode} : {this.state.visitorScore} @ {this.state.homeTriCode} : {this.state.homeScore}</Text>
                </View>
            );
        }
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
  