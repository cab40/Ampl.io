import React, { Component } from 'react';
import { Image, TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, Badge } from 'react-native-elements';

export default class Login extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container} >
        <Image style = {styles.picture} source = {require('../assets/hehe.jpeg')}/>

        <Text> 😡 </Text>

        <View>
          <Icon onPress = {() => {console.log("chat"); this.props.navigation.navigate('ChatInbox')}} type = 'font-awesome' name = 'commenting' 
          color = '#B8CFF2' size = {30} />
            <Badge
            status="success"
            badgeStyle = {{backgroundColor: '#f46da8'}}
            containerStyle={{ position: 'absolute', top: 0, right: 0}}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    height: 90,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1, 
    //borderColor: 'blue',
    //borderWidth: 1,
  }, 
  picture : {
    height: 40, 
    width: 40,
    borderRadius: 40
  }
});
