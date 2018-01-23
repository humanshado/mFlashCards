import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class AddDeck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Add New Deck</Text>
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
    },
});

export default AddDeck;
