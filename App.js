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
import Quiz from './components/Quiz';

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
        tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor}/> 
      }
    }
  }, 
  {
    tabBarPosition: Platform.OS === "android" ? "bottom" : "bottom"
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "#013342" : "white",
    style: {
      height: 50,
      backgroundColor: Platform.OS === "ios" ? "white" : "#013342",
    }
  }
})

const RootNav = StackNavigator({
  Home: { 
    screen: Tabs,
    navigationOptions: {
      title: "Mobile FlashCards!",
      headerTintColor: "#565254",
      headerStyle: {
        backgroundColor: "#FBFBFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2
      }
    }
   },
  DeckDetails: { 
    screen: DeckDetails,
    navigationOptions: {
      title: "Deck",
      headerTintColor: "#FBFBFF",
      headerStyle: {
        backgroundColor: "#013342"
      }
    }
   },
  AddCardForm: { 
    screen: AddCardForm,
    navigationOptions: {
      title: "New Card",
      headerTintColor: "#565254",
      headerStyle: {
        backgroundColor: "#FBFBFF"
      }
    }
   },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: "#565254",
      headerStyle: {
        backgroundColor: "#FBFBFF"
      }
    }
  }
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
