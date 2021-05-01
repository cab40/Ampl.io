import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login.js';

const Stack = createStackNavigator(
  //{headerMode: 'none'}
  );

export default class App extends React.Component {
    render(){
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen
              name="Login"
              component={Login}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <View style={styles.container}>
          <Text>Hi</Text>
          <StatusBar style="auto" />
        </View>
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
