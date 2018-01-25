import { FETCH_DECKS, ADD_DECK, FETCH_DECK, ADD_CARD } from '../actions';
import { defaultDecks } from '../utils/helpers';

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
            return { ...action.payload }
        case ADD_CARD:
            return {}
        default:
            return state;
    }
}

export default deckReducer;


