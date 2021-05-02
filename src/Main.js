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
        let colored = focused ? '#b8cff2' : '#cfcfcf';

            if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Set Goal') {
              iconName = 'edit';
            } else if (route.name === 'Home') {
              iconName = 'house';
            }

        return <Icon name={iconName} iconStyle={{color: colored, marginTop: 10}} size = {40}/>
      },
    })} tabBarOptions = {{activeTintColor: '#c1e7e1', inactiveTintColor: '#b8cff2', showLabel: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Set Goal" component={SetGoal} />
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
