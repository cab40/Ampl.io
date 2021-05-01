import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Profile';
import AddGoal from './AddGoal';
import Home from './Home';
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator();

export default class Main extends React.Component {
    render(){
      return (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Add Goal') {
              iconName = 'edit';
            } else if (route.name === 'Home') {
              iconName = 'house';
            }

            return <Icon name={iconName} iconStyle={{ color: '#B8CFF2' }} />
          },
        })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Add Goal" component={AddGoal} />
          <Tab.Screen name="Profile" component={() => <Profile />} />
        </Tab.Navigator>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
