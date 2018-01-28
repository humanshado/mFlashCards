import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class AddCardForm extends Component {
    state = {
        question: "",
        answer: ""
    }

    submitNewCard = () => {

    }

    render(){
        console.log('props in AddCardForm ', this.props);
        const { deckId } = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <Text>Lets add new Card in {deckId}</Text>
                <Text>Enter the new question</Text>
                <TextInput
                    value={this.state.question}
                    onChangeText={(question) => this.setState({ question })}
                    placeholder="question here...">
                </TextInput>
                <TextInput
                    value={this.state.answer}
                    onChangeText={(answer) => this.setState({ answer })}
                    placeholder="answer here...">
                </TextInput>
                <TouchableOpacity onPress={this.submitNewCard}>
                    <Text>submit</Text>
                </TouchableOpacity>
            </View>
        )
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

export default connect()(AddCardForm);