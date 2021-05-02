import React, { Component, useState } from 'react';
import Main from './Main';
import { TouchableOpacity, SafeAreaView, TextInput, StyleSheet, Text, Dimensions, View, Image, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const width_proportion80 = '80%';
const width_proportion100 = '100%';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            frequency: 'Once',
            category: 'Education'
        }
    }


  render() {

    return (
      <View style={styles.container} >
        <Button 
            icon = { <Icon name = 'chevron-left'
                size={30}
                color= '#6B6565'/>
            }
            buttonStyle={styles.backButton}
            onPress = {() => this.props.navigation.goBack()}
        />
        <Text style = {styles.title}> Set Goal. </Text>

        <SafeAreaView>
            <Text style={styles.subTitle}>Goal name</Text>
            <TextInput
                style={styles.input}
                onChangeText={() => console.log("pls work")}
                placeholder="Name of goal"
                keyboardType="numeric"
            />
            <Text style={styles.subTitle}>Frequency</Text>

            <Picker
                style = {[styles.pickerStyle]}
                selectedValue = {this.state.frequency}
                onValueChange = {(itemValue, itemPosition) =>
                    this.setState({frequency: itemValue})}
                >
                <Picker.Item label = 'Once' value = 'Once' />
                <Picker.Item label = 'Daily' value = 'Daily' />
                <Picker.Item label = 'Weekly' value = 'Weekly' />
                <Picker.Item label = 'Monthly' value = 'Monthly' />
            </Picker>

            <Text style={styles.subTitle}>Category</Text>
            <Picker
                style = {[styles.pickerStyle]}
                selectedValue = {this.state.category}
                onValueChange = {(itemValue, itemPosition) =>
                    this.setState({category: itemValue})}
                >
                <Picker.Item label = 'Education' value = 'Education' />
                <Picker.Item label = 'Exercise' value = 'Exercise' />
                <Picker.Item label = 'Health' value = 'Health' />
                <Picker.Item label = 'Lifestyle' value = 'Lifestyle' />
            </Picker>
            <Text style={styles.subTitle}>Friend code</Text>
            < View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.addFriend]}
                    onChangeText={() => console.log("pls work")}
                    placeholder="Enter friend code"
                    keyboardType="numeric"
                />
                <Button 
                    onPress={this.handleClick}
                    icon={
                        <Icon
                          name="plus"
                          size={20}
                          color="white"
                        />}
                    buttonStyle={[styles.button, styles.addButton]}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['#C1E7E1', '#AEE1DA'],
                        start: { x: 0, y: 0 },
                        end: { x: 0, y: 1 },
                    }}
                />
            </View>
            {/* <View style={styles.row}>
                INSERT THE PROFILE PICS HERE
                <Image style={styles.img}
                source={}
                />
            </View> */}
        </SafeAreaView>
        <PickerThingy/>

        <Button title="Finish" buttonStyle={styles.button}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#C1E7E1', '#AEE1DA'],
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 },
          }}
        />
      </View>
    )
  }
}

class PickerThingy extends React.Component{
    render(){
        return(
            <View style={{height:windowHeight, width:windowWidth, zIndex: 1, position: "absolute"}}>
                <TouchableOpacity activeOpacity={1} style={{flexGrow: 1}}/>
                <Picker
                    selectedValue = {"Education"}
                    onValueChange = {(itemValue, itemPosition) =>
                        this.setState({category: itemValue})}
                    >
                    <Picker.Item label = 'Education' value = 'Education' />
                    <Picker.Item label = 'Exercise' value = 'Exercise' />
                    <Picker.Item label = 'Health' value = 'Health' />
                    <Picker.Item label = 'Lifestyle' value = 'Lifestyle' />
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width_proportion100,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title : {
    fontFamily: 'Avenir',
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle : {
    fontFamily: 'Avenir',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    color: '#6B6565'
  },
  input : {
    height: 40,
    width: width_proportion100,
    padding: 12,
    borderColor: '#E1E8FC',
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 20
  },
  button: {
    width: 180,
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 95,
    alignItems: 'center'
  },
  row : {
    flexDirection: 'row'
  },
  addFriend : {
    width: width_proportion80,
    marginBottom: 30,
    justifyContent: 'flex-start'
  },
  addButton : {
    width: 40,
    height: 40,
    marginTop: 0,
    marginLeft: 30,
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'flex-end'
  },
  backButton : {
    backgroundColor: 'transparent',
    width: 40,
    paddingVertical: -1
  },
  img : {
      width: 60,
      height: 60,
      backgroundColor: '#F2F3F3',
      borderRadius: 50
  },
  pickerStyle : {
    width: width_proportion100,
    borderRadius: 20,
    height: 40,
    borderColor: '#E1E8FC',
    borderStyle: 'solid',
    borderWidth: 3,
    justifyContent: 'center',
    opacity: 1
  }
});
