import { FETCH_DECKS, ADD_DECK, FETCH_DECK, ADD_CARD } from '../actions';

function deckReducer(state = {}, action){
    switch(action.type){
        case FETCH_DECKS:
            return { ...state, ...action.payload}
        case ADD_DECK:
            return {...state, 
                [action.payload]: {
                    title: action.payload,
                        questions: []
                }
            }
        case FETCH_DECK:
            return {
                 ...action.payload
             }
        case ADD_CARD:
             console.log('payload in add_card reducer', action.payload)
            const { deckId, question, answer } = action.payload
            return {
                ...state,
                [deckId]:{
                    ...state[deckId],
                    questions: [...state[deckId].questions, { question, answer }]
                }
            }
        default:
            return state;
    }
}

export default deckReducer;
