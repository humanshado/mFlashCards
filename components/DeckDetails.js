import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class DeckDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.title}</Text>
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

export default DeckDetails;
