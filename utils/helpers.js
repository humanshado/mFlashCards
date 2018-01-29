import { AsyncStorage } from 'react-native';

export const MY_STORAGE_KEY = "@myFlashCards:key";

const defaultDecks = {
        Nigeria: {
            title: "Nigeria",
            questions: [
                {
                    question1: "Is Nigeria located in Africa?",
                    answer1: "Yes"
                },
                {
                    question2: "Is Lagos the capital of Nigeria?",
                    answer2: "No"
                }
            ]
        },
            Canada: {
                title: "Canada",
                questions: [
                    {
                        question1: "Is Canada located in Asia?",
                        answer1: "No"
                    },
                    {
                        question2: "Is Toronto the capital of Canada?",
                        answer2: "No"
                    }
                ]
            },
            Australia: {
                title: "Australia",
                questions: [
                    {
                        question1: "Is Australia located in Europe?",
                        answer1: "No"
                    },
                    {
                        question2: "Is Canberra the capital of Australia?",
                        answer2: "Yes"
                    }
                ]
            },
            Brazil: {
                title: "Brazil",
                questions: [
                    {
                        question1: "Is Brazil located in South America?",
                        answer1: "Yes"
                    },
                    {
                        question2: "Is Brasilia the capital of Brazil?",
                        answer2: "Yes"
                    }
                ]
            },
            Norway: {
                title: "Norway",
                questions: [
                    {
                        question1: "Is Norway located in Europe?",
                        answer1: "Yes"
                    },
                    {
                        question2: "Is Oslo the capital of Norway?",
                        answer2: "Yes"
                    }
                ]
            }
        }

export async function getDecks(){
    try {
        const response = await AsyncStorage.getItem(MY_STORAGE_KEY);
        if (response !== null) {
            return JSON.parse(response);
        } else {
            await AsyncStorage.setItem(MY_STORAGE_KEY, JSON.stringify(defaultDecks))
            return defaultDecks;
        }
    } catch (error) {
       console.error(error)
    }
}

export async function saveDeckToAsyncStorage(newDeckTitle) {
    try {
        await AsyncStorage.mergeItem(MY_STORAGE_KEY, JSON.stringify({
            [newDeckTitle]: {
                title: newDeckTitle,
                questions: []
            }
        }))
    } catch (error) {
        console.error(error)
    }
}

export function saveCardToDeck(deckId, question, answer){
    return AsyncStorage.getItem(MY_STORAGE_KEY)
        .then(response => JSON.parse(response))
            .then(result => {
                console.log('result in helpers saveCard ', result);
                result[deckId].questions.push({ question, answer })
                AsyncStorage.setItem(MY_STORAGE_KEY, JSON.stringify(result))
            })
}