import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AppLoading } from 'expo';
import deckReducer from './reducers';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const store = createStore(
  deckReducer,
  applyMiddleware(logger)
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

const MainNav = StackNavigator({
  Home: { screen: Tabs },
  DeckDetails: { screen: DeckDetails }
})

class App extends Component {

  state = {
    isReady: false
  }

  componentDidMount(){
    persistStore(store, {
      storage: AsyncStorage,
    }, () => { this.setState({ isReady: true })})
  }

  render() {
    if(!this.state.isReady){
      return <AppLoading />
    }

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNav />
        </View>
      </Provider>
    );
  }
}

export default App;
