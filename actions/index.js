export const FETCH_DECKS = "FETCH_DECKS";
export const ADD_DECK = "ADD_DECK";
export const FETCH_DECK = "FETCH_DECK";
export const ADD_CARD = "ADD_CARD";

export const fetchDecks = (decks) => {
    return {
        type: FETCH_DECKS,
        payload: decks
    }
}

export const addDeck = (deck) => {
    return {
        type: ADD_DECK,
        payload: deck
    }
}

export const fetchDeck = (deck) => {
    return {
        type: FETCH_DECK,
        payload: deck
    }
}

export const addCard = (card) => {
    return {
        type: ADD_CARD,
        payload: card
    }
}