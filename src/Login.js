import React, { Component } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    login = async () => {
        await AsyncStorage.setItem('username', this.state.username);
        this.props.navigation.navigate('Main');
    }

  render() {
    return (
      <View style={styles.container} >
        <Text style = {styles.title}> habit.co </Text>

        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {this.setState({username: e})}}
            value={this.state.username}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {this.setState({password: e})}}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
          />
        </SafeAreaView>

        <Button title="Login" color="red" buttonStyle={styles.button}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['#C1E7E1', '#AEE1DA'],
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 },
          }}
          onPress = {this.login}
        />
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
  title : {
    fontFamily: 'Avenir',
    fontSize: 30,
    marginBottom: 30,
  },
  input : {
    height: 40,
    width: 180,
    margin: 12,
    padding: 12,
    borderColor: '#E1E8FC',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 20
  },
  button: {
    width: 180,
    borderRadius: 20,
    marginTop: 30,
  }
});
