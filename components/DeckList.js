import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers';
import { fetchDecks } from '../actions';
import DeckDetails from './DeckDetails';

class DeckList extends Component {
    
    componentWillMount = async () => {
        const decks = await getDecks();
        await this.props.fetchDecks(decks);
    }

    render() {
        console.log('props in DeckList ', this.props)
        const { navigate } = this.props.navigation;
        const { decks } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Text>Welcome to Mobile FlashCards!</Text>
                </View>
                {decks.map(deck => {
                    const { title, questions } = deck
                    return (
                        <View key={deck.title}>
                            <Text>{title}</Text>
                            <Text>Number of Cards: {questions.length}</Text>
                            <TouchableOpacity 
                                onPress={() => navigate('DeckDetails', { deck: deck })}>
                                <Text>show</Text>
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
    console.log('state in DeckList.js ', Object.values(state));
    return {
        decks: Object.values(state)
    }
}

export default connect(mapStateToProps, { fetchDecks })(DeckList);
