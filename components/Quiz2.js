import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

class Quiz extends Component {

    state = {
        deck: {},
        isAttempted: false,
        questionsAttempted: 0,
        score: 0,
        isScored: false
    }

    componentWillMount = () => {
        let newDeck = this.props.navigation.state.params.deck;
        const { deck } = this.state;
        this.setState({ deck: newDeck });

        //flipCard animations
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener = ({ value }) => {
            this.value = value;
        }

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"]
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"]
        })
    }

    flipCard = () => {
        if(this.value === 360){
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 800
            }).start()
        }else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                duration: 800
            }).start()
        }
    }

    render () {
        console.log('props in Quiz ', this.props);
        const { title, questions } = this.state.deck;
        const counter = 0;
        const numberOfQuestions = questions.length;

        //flip animations styles
        const frontAnimatedStyle = {
            transform: [
                { rotateX: this.frontInterpolate }
            ]
        }

        const backAnimatedStyle = {
            transform: [
                { rotateX: this.backInterpolate }
            ]
        }

        return (
            <View style={styles.container}>
                <Text>Questions on {title}</Text>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.flipText}>Front of the Card</Text>
                    </Animated.View>
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.flipText}>Back of the Card</Text>
                    </Animated.View>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.flipCard()}>
                    <Text style={styles.btnText}>Flip</Text>
                </TouchableOpacity>
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
    flipCard: {
        width: 400,
        height: 510,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        backfaceVisibility: "hidden"
    },
    flipCardBack: {
        backgroundColor: "#3A141F",
        position: "absolute",
        top: 0
    },
    flipText: {
        textAlign: "center",
        color: "#FBFBFF",
        fontSize: 18,
        fontWeight: "bold"
    },
    btn: {
        width: 100,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#013342",
        marginTop: 7,
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
})

export default Quiz;

