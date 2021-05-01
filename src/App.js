import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Login from './Login.js';

const Stack = createStackNavigator(
  //{headerMode: 'none'}
  );

export default class App extends React.Component {
    render(){
      return (
        <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={"Login"} screenOptions = {{headerShown: false}}>
                <Stack.Screen
                  name="Login"
                  component={Login}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
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
