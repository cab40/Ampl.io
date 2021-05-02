import React from 'react';
import {StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Main from './Main';
import ChatInbox from './ChatInbox';
import Chat from './Chat';
import FriendGoals from './FriendGoals';

const Stack = createStackNavigator(
  //{headerMode: 'none'}
  );

export default class App extends React.Component {
    render(){
      return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <NavigationContainer>
              <Stack.Navigator initialRouteName={"FriendGoals"} screenOptions = {{headerShown: false}}>
                <Stack.Screen
                  name="Login"
                  component={Login}
                />
                <Stack.Screen
                  name="Main"
                  component={Main}
                />
                <Stack.Screen
                  name="ChatInbox"
                  component={ChatInbox}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                />
                <Stack.Screen
                  name="FriendGoals"
                  component={FriendGoals}
                />
              </Stack.Navigator>
            </NavigationContainer>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
