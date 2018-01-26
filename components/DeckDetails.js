import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { fetchDecks } from '../actions';


class DeckDetails extends Component {

    componentWillMount = () => {
        this.props.fetchDecks();
    }

    render() {
        console.log('Props in DeckDetails ', this.props);
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                <Text>This is DeckDetails View: {deck.title}</Text>
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
