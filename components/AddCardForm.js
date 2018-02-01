import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { saveCardToDeck } from '../utils/helpers';
import { addCard } from '../actions';

class AddCardForm extends Component {
    state = {
        question: "",
        answer: ""
    }

    submitNewCard = async (deckId) => {
        const { question, answer } = this.state;
        await saveCardToDeck(deckId, question, answer );
        await this.props.addCard({deckId, question, answer});
        this.setState({ question: "", answer: ""});
        this.props.navigation.goBack();
    }

    render(){
        console.log('props in AddCardForm ', this.props);
        const { deckId } = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <Text style={[styles.textStyle, {color: "blue", fontWeight: "bold", marginBottom: 80}]}>Add new question on {deckId}</Text>
                <Text style={styles.textStyle}>Type question in the box </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.question}
                    onChangeText={(question) => this.setState({ question })}
                    placeholder="question here..."
                    autoFocus={true}>
                </TextInput>
                <Text style={styles.textStyle}>Suggest an answer </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.answer}
                    onChangeText={(answer) => this.setState({ answer })}
                    placeholder="answer here...">
                </TextInput>
                <TouchableOpacity
                    style={styles.btn} 
                    onPress={() => this.submitNewCard(deckId)}>
                    <Text style={styles.btnText}>submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
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
    btn:{
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


export default connect(null, { addCard })(AddCardForm);

