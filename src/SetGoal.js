import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Friends from '../assets/svgs/Friends';
import FindFriend from '../assets/svgs/FindFriend';

export default class SetGoal extends React.Component{
  render(){return (
    <View style = {styles.container}>
      <Text style = {styles.title}> Set Goal. </Text>

      <TouchableOpacity style = {styles.box1} onPress = {() => {console.log("hey"); this.props.navigation.navigate('FriendGoals')}}>
        <Friends />
        <Text style = {styles.textStyle}> Set with Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.box2} onPress = {() => {console.log("hey"); this.props.navigation.navigate('Matchgoal')}}>
        <FindFriend />
        <Text style = {styles.textStyle}> Match with Others</Text>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 200,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box1 : {
    backgroundColor: '#b8cff2',
    height: 200, 
    width: 300, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  box2 : {
    backgroundColor: '#c1e7e1',
    height: 200, 
    width: 300, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 30,
    elevation: 5,
  },
  textStyle : {
    color: 'white', 
    fontSize: 23, 
    marginTop: 20, 
    fontFamily: 'Avenir',
  }
});
