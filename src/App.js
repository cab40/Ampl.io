import React from 'react';
import {StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Main from './Main';
import ChatInbox from './ChatInbox';

const Stack = createStackNavigator(
  //{headerMode: 'none'}
  );

export default class App extends React.Component {
    render(){
      return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <NavigationContainer>
              <Stack.Navigator initialRouteName={"Login"} screenOptions = {{headerShown: false}}>
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
