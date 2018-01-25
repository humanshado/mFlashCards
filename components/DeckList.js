import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import DeckDetails from './DeckDetails';
import { fetchDecks } from '../actions';

class DeckList extends Component {
    
    componentWillMount(){
        this.props.fetchDecks();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { decks } = this.props;
        console.log('props in DeckList ', this.props)
        return (
            <View style={styles.container}>
                <Text>Welcome to Mobile FlashCards!</Text>
                {Object.keys(decks).map(deck => {
                    console.log(deck)
                    const { title, questions } = decks[deck]
                    return (
                        <View key={deck}>
                            <Text>{title}</Text>
                            <TouchableOpacity 
                                onPress={() => navigate('DeckDetails', { deck: deck })}>
                                <Text>Show Deck</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deckContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#EEE',
        borderColor: '#000',
        borderRadius: 8
    }
});

const mapStateToProps = (state) => {
    console.log('state in DeckList.js ', state);
    return {
        decks: state
    }
}

export default connect(mapStateToProps, { fetchDecks })(DeckList);
