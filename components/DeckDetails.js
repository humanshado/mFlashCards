import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


class DeckDetails extends Component {
    render() {
        console.log('props in DeckDetails ', this.props);
        const { deck } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text>This is DeckDetails View: {deck}</Text>
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
