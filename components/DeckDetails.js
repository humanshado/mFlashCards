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
                    <Text>Welcome to: {deck.title}</Text>
                    <Text>Number of Cards: {deck.questions.length}</Text>
                </View>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AddCardForm", {deckId: deck.title })}>
                    <Text>Add Card</Text>
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

const mapStateToProps = (state, ownProps) => {
    console.log('state in DeckDetails ', state)
    console.log('ownProps in DeckDetails state ', ownProps)
    const { title } = ownProps.navigation.state.params.deck;
    return {
        deck: state[title]
    }
}

export default connect(mapStateToProps, { fetchDecks })(DeckDetails);
