import React, { Component } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Logo as AppLogo} from '../assets/svgs/Logo';

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
        //console.log(this.state.username);
        this.props.navigation.navigate('Main');
    }

  render() {
    return (
      <View style={styles.container} >
          <AppLogo/>

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
          titleStyle={{fontFamily:'Avenir', fontWeight:'bold', fontSize:22}}
          linearGradientProps={{
            colors: ['#C1E7E1', '#AEE1DA'],
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 },
          }}
          onPress = {this.login}
        />
        <View style={styles.row}>
        <Text style={styles.signUp}>No account? </Text>
        <Button title="Sign Up!" buttonStyle={styles.signUpBtn} type='clear'
          titleStyle={{color:'#82b8b0', fontFamily:'Avenir'}}
        />
        </View>
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
    height: 45,
    width: 200,
    margin: 12,
    padding: 12,
    borderColor: '#E1E8FC',
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 30
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 40,
    marginTop: 80,
    alignItems: 'center'
  },
  signUpBtn : {
    color: 'blue',

  },
  signUp : {
    marginTop: 13,
    color: '#82b8b0',
    fontFamily: 'Avenir'
  },
  row : {
    flexDirection: 'row'
  }
});