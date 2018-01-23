import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getDecks } from '../utils/helpers';

class DeckList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to Mobile FlashCards!</Text>
                {Object.keys(getDecks()).map(deck => {
                    const { title, questions } = getDecks()[deck]
                    return (
                        <View key={deck}>
                            <Text>{title}</Text>
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
        marginTop: 25,
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

export default DeckList;
