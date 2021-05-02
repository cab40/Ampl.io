import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile.js';
import SetGoal from './SetGoal';
import Home from './Home.js';
import { Icon } from 'react-native-elements';
import Header from './Header.js';

const Tab = createBottomTabNavigator();

export default class Main extends React.Component{
  render() {return (
    <View style = {styles.container}>
    <Header navigation = {this.props.navigation}/>
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

            if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'SetGoal') {
              iconName = 'edit';
            } else if (route.name === 'Home') {
              iconName = 'house';
            }

        return <Icon name={iconName} iconStyle={{ color: '#B8CFF2' }} />
      },
    })}>
      <Tab.Screen name="Home" children = {()=> <Home navigation = {this.props.navigation}/>}/>
      <Tab.Screen name="SetGoal" children={() => <SetGoal navigation = {this.props.navigation}/>} />
      <Tab.Screen name="Profile" children={() => <Profile />} />
    </Tab.Navigator>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
