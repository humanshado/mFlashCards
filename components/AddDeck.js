import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { saveDeckToAsyncStorage } from '../utils/helpers';
import { addDeck } from '../actions';


class AddDeck extends Component {
    state = {
        newDeckTitle: ""
    }

    submitNewDeck = async () => {
        const { newDeckTitle } = this.state;
        await saveDeckToAsyncStorage(newDeckTitle)
        await this.props.addDeck(newDeckTitle);
        const { decks } = this.props;
        this.props.navigation.navigate("DeckDetails", { deck: decks[newDeckTitle] })
        this.setState({ newDeckTitle: ""})
    }

    render() {
        console.log('props in AddDeck ', this.props);
        return (
            <View style={styles.container}>
                <Text style={styles.questionText}>Enter the name of a country</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.newDeckTitle} 
                    onChangeText={(newDeckTitle) => this.setState({ newDeckTitle })}
                    placeholder="country name"
                    autoFocus={true}>
                </TextInput>
                <TouchableOpacity 
                    style={styles.submitBtn}
                    onPress={this.submitNewDeck}>
                    <Text style={styles.btnText}>Add Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 5
    },
    input: {
        width: 300,
        height: 50,
        padding: 8,
        fontSize: 18,
        borderColor: "#013342",
        borderWidth: 2,
        borderRadius: 7,
        marginBottom: 50,
        textAlign: "center"
    },
    submitBtn: {
        width: 100,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#013342",
        marginTop: 25,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5
    },
    btnText: {
        color: "#FBFBFF",
        fontWeight: "bold",
        justifyContent: "center",
        alignSelf: "center"
    }
});

const mapStateToProps = (state) => {
    console.log('state in AddDeck ', state)
    return {
        decks: state
    };
}

export default connect(mapStateToProps, { addDeck })(AddDeck);
