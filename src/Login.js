import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Main from './Main.js';
import LinearGradient from 'react-native-linear-gradient';

export default class Login extends React.Component {
  state = {};
  
  render() {
    return (
      <View style={styles.container}>
        <Text> Habit.co </Text>

        {/* <Button title = "Login" color = "red" buttonStyle = {{width: 180, borderRadius: 20}} 
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#C1E7E1', '#AEE1DA'],
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        }}
      /> */}
      </View>
    )
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
