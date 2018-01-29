import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {decks.map(deck => {
                    const { title, questions } = deck
                    return (
                        <View key={deck.title} style={styles.deckContainer}>
                            <View>
                                <Text style={styles.titleText}>{title}</Text>
                                <Text style={styles.cardText}>Number of Cards: {questions.length}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.submitBtn}
                                onPress={() => navigate('DeckDetails', { deck: deck })}>
                                <Text style={styles.btnText}>show</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
        justifyContent: "space-around",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    deckContainer: {
        width: 330,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#01BAEF",
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 3,
        marginTop: 15
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
        fontWeight: "bold"
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
        shadowOffset: { width: 5, height: 5},
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
    console.log('state in DeckList.js ', Object.values(state));
    return {
        decks: Object.values(state)
    }
}

export default connect(mapStateToProps, { fetchDecks })(DeckList);
