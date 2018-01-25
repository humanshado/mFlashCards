export const STORATE_KEY = "ABUMOBILEFLASHCARDS12345";

export const defaultDecks = {
        nigeria: {
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
            canada: {
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
            australia: {
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
            brazil: {
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
            norway: {
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

export function getDecks() {
    return defaultDecks;
}
