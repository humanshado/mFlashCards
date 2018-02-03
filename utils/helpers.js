import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const MY_STORAGE_KEY = "@myFlashCards:key";
export const NOTIFICATIONS_KEY = "@myNotifications:key";


//Initial default data

const defaultDecks = {
        Nigeria: {
            title: "Nigeria",
            questions: [
                {
                    question: "Is Nigeria located in Africa?",
                    answer: "Yes"
                },
                {
                    question: "Is Lagos the capital of Nigeria?",
                    answer: "No"
                }
            ]
        },
            Canada: {
                title: "Canada",
                questions: [
                    {
                        question: "Is Canada located in Asia?",
                        answer: "No"
                    },
                    {
                        question: "Is Toronto the capital of Canada?",
                        answer: "No"
                    }
                ]
            },
            Australia: {
                title: "Australia",
                questions: [
                    {
                        question: "Is Australia located in Europe?",
                        answer: "No"
                    },
                    {
                        question: "Is Canberra the capital of Australia?",
                        answer: "Yes"
                    }
                ]
            },
            Brazil: {
                title: "Brazil",
                questions: [
                    {
                        question: "Is Brazil located in South America?",
                        answer: "Yes"
                    },
                    {
                        question: "Is Brasilia the capital of Brazil?",
                        answer: "Yes"
                    }
                ]
            },
            Norway: {
                title: "Norway",
                questions: [
                    {
                        question: "Is Norway located in Europe?",
                        answer: "Yes"
                    },
                    {
                        question: "Is Oslo the capital of Norway?",
                        answer: "Yes"
                    }
                ]
            }
        }


//API calls to AsyncStorage data

export async function getDecks(){
    try {
        //const cleanStorage = await AsyncStorage.clear();
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


//Local Notifications 

function createNotification(){
    return {
        title: "Quiz time!",
        body: "👏 Remember to study your flash cards",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATIONS_KEY)
        .then(JSON.parse)
        .then(data => {
            if(data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if(status === "granted"){
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: "day"
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}