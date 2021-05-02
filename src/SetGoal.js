import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Friends from '../assets/svgs/Friends';
import FindFriend from '../assets/svgs/FindFriend';

export default class SetGoal extends React.Component{
  render(){return (
    <View style = {styles.container}>
      <Text style = {styles.title}> Set Goal. </Text>

      <TouchableOpacity style = {{backgroundColor: '#b8cff2', height: 200, width: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 20}} onPress = {() => {console.log("hey"); this.props.navigation.navigate('FriendGoals')}}>
        <Friends />
        <Text style = {{color: 'white', fontSize: 20, marginTop: 20}}> Set with Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {{marginTop: 30, backgroundColor: '#c1e7e1', height: 200, width: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
        <FindFriend />
        <Text style = {{color: 'white', fontSize: 20, marginTop: 20}}> Match with Others</Text>
      </TouchableOpacity>
    </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 200,
  },
  title : {
    fontFamily: 'Avenir',
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});