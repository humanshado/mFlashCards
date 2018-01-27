import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { saveDeckToAsynStorage } from '../utils/helpers';
import { addDeck } from '../actions';


class AddDeck extends Component {
    state = {
        newDeckTitle: ""
    }

    submitNewDeck = async () => {
        const { newDeckTitle } = this.state;
        await saveDeckToAsynStorage(newDeckTitle)
        await this.props.addDeck(newDeckTitle);
        const { decks } = this.props;
        this.props.navigation.navigate("DeckDetails", { deck: decks[newDeckTitle] })
        this.setState({ newDeckTitle: ""})
    }

    render() {
        console.log('props in AddDeck ', this.props);
        return (
            <View style={styles.container}>
                <Text>Enter the name of a country</Text>
                <TextInput
                    value={this.state.newDeckTitle} 
                    onChangeText={(newDeckTitle) => this.setState({ newDeckTitle })}
                    placeholder="country name">
                </TextInput>
                <TouchableOpacity onPress={this.submitNewDeck}>
                    <Text>submit</Text>
                </TouchableOpacity>
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

const mapStateToProps = (state) => {
    console.log('state in AddDeck ', state)
    return {
        decks: state
    };
}

export default connect(mapStateToProps, { addDeck })(AddDeck);
