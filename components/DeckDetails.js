import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../actions';
import AddCardForm from './AddCardForm';


class DeckDetails extends Component {

    componentWillMount = () => {
        this.props.fetchDecks();
    }

    render() {
        console.log('Props in DeckDetails ', this.props);
        const { deck, navigation } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{deck.title}</Text>
                    <Text style={styles.cardText}>Number of Cards: {deck.questions.length}</Text>
                </View>
                <TouchableOpacity style={[styles.btn, {backgroundColor: "orange"}]}>
                    <Text style={[styles.btnText, { color: "#013342"}]}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => navigation.navigate("AddCardForm", {deckId: deck.title })}>
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#01BAEF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 5
    },
    cardText: {
        textAlign: "center",
        color: "#FBFBFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30
    },
    btn: {
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

const mapStateToProps = (state, ownProps) => {
    console.log('state in DeckDetails ', state)
    console.log('ownProps in DeckDetails state ', ownProps)
    const { title } = ownProps.navigation.state.params.deck;
    return {
        deck: state[title]
    }
}

export default connect(mapStateToProps, { fetchDecks })(DeckDetails);
