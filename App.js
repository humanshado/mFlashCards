import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DeckList from './components/DeckList';
import DeckDetails from './components/DeckDetails';
import AddDeck from './components/AddDeck';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';


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
      marginTop: Platform.OS === "ios" ? 0 : 24
    }
  }
})

class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs />
      </View>
    );
  }
}

export default App;
