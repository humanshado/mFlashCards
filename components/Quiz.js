import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DeckList from './DeckList';

class Quiz extends Component {

    state = {
        deck: {},
        questionIndex: 0,
        displayQuestion: true,
        correct: 0,
        wrong: 0,
        score: 0
    }

    componentWillMount = () => {
        let newDeck = this.props.navigation.state.params.deck;
        const { deck } = this.state;
        this.setState({ deck: newDeck });

    }

    displayAnswer = () => {
        this.setState({ displayQuestion: !this.state.displayQuestion})
    }

    displayQuestion = () => {
        this.setState({ displayQuestion: !this.state.displayQuestion })
    }

    submitScore = (event, questionNumber, numberOfQuestions) => {
        let { questionIndex, correct, wrong, score } = this.state;
        //Replace recorded time in AsyncStorage || save time to AsyncStorage if records === null
        
        if(event === "correctBtn"){
            this.setState({ correct: this.state.correct + 1 });
        }else{
            this.setState({ wrong: this.state.wrong + 1 });
        }

        this.setState({ questionIndex: questionIndex + 1 });
    }

    render() {
        console.log('props in Quiz ', this.props);
        const { navigation } = this.props;
        const { title, questions } = this.state.deck;
        let { questionIndex } = this.state;
        let questionNumber = questionIndex + 1;
        let numberOfQuestions = questions.length;
    
        if(questionIndex === numberOfQuestions){
            let { correct } = this.state
            return (
                <View>
                    <Text>{`You scored ${Math.round((correct/numberOfQuestions)*100)}%`}</Text>
                </View>
            )
        }
            //display total score
            //display two buttons: (1) Restart Quiz (2) Exit to DeckDetails
            //if (1) is clicked, set questionIndex to zero
            //else Exit to DeckDetails

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Quiz on {title}</Text>
                <Text>{`${questionNumber} of ${numberOfQuestions}`}</Text>
                <View>
                    {this.state.displayQuestion 
                        ? <View>
                            <Text style={styles.textStyle}>{questions[questionIndex].question}</Text>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => this.displayAnswer()}>
                                <Text style={styles.btnText}>Show Answer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: "green" }]}
                                ref={"correctBtn"}
                                onPress={() => this.submitScore(event="correctBtn", questionNumber, numberOfQuestions)}>
                                <Text style={[styles.btnText]}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: "red", marginTop: 5 }] }
                                ref={"wrongBtn"}
                                onPress={() => this.submitScore(event="wrongBtn", questionNumber, numberOfQuestions)}>
                                <Text style={[styles.btnText, ]}>Wrong</Text>
                            </TouchableOpacity>
                        </View>
                        : <View>
                            <Text style={styles.textStyle}>Answer : {questions[questionIndex].answer}</Text>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => this.displayQuestion()}>
                                <Text style={styles.btnText}>Show Question</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, {backgroundColor: "red"}]}
                                onPress={() => navigation.dispatch(NavigationActions.navigate({ routeName: "DeckList" }))}>
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                            </View> 
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 25
    },
    textStyle: {
        textAlign: "center",
        color: "blue",
        fontSize: 18,
        fontWeight: "bold"
    },
    btn: {
        width: 100,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#013342",
        marginTop: 7,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        marginTop: 50
    },
    btnText: {
        color: "#FBFBFF",
        fontWeight: "bold",
        justifyContent: "center",
        alignSelf: "center"
    }
})

export default Quiz;

