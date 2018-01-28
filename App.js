import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { applyMiddleware, createStore, compose } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { getDecks } from './utils/helpers';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import deckReducer from './reducers';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddCardForm from './components/AddCardForm';

const store = createStore(
  deckReducer,
  compose(
    applyMiddleware(logger)
  )
)

const Tabs = TabNavigator({
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) =>  <MaterialCommunityIcons name="cards" size={30} color={tintColor}/>
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} /> 
      }
    }
  }, {
    tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? "blue" : "white",
    style: {
      height: 50,
      backgroundColor: Platform.OS === "ios" ? "white" : "blue",
    }
  }
})

const RootNav = StackNavigator({
  Home: { screen: Tabs },
  DeckDetails: { screen: DeckDetails },
  AddCardForm: { screen: AddCardForm }
})


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <RootNav />
        </View>
      </Provider>
    );
  }
}

export default App;
