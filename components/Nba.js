import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList } from 'react-native';
import * as GameComponent from '../components/Game.js';
import * as GameApi from '../api/Games.js';
import * as DateHelper from '../helpers/DateHelper.js';

export class Nba extends Component {
    constructor (props) {
        super(props);

        let yesterday = DateHelper.getFormattedDate();
        this.state = {
            loading: true,
            date: yesterday,
            gamesId: []
        };       
    }

    async componentWillMount () {
        let games = await GameApi.getGames(this.state.date);
        var gamesId = [];

        for (var game of games) {
            gamesId.push(game.gameId);
        }

        this.setState((prevState) => {
            return {
                gamesId: gamesId,
                loading: false
            };
        });
    }

    render () {
        if(this.state.loading){
            return( <ActivityIndicator size='large' style={{height:80}} /> );
        } else {
            return (                
                <View style={styles.container}>
                    <FlatList
                        data={this.state.gamesId}
                        renderItem={({item}) => <GameComponent.Game gameId={item} date={this.state.date} />}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
