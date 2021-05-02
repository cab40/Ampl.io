import React from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, Dimensions, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width_proportion80 = '80%';
const width_proportion100 = '100%';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      frequency: 'Select an item',
      category: 'Select an item'
    }
  }

  sendGoal = async () => {
    let username = await AsyncStorage.getItem('username');
    axios.post(`http://localhost:5000/createGoal/${username}`, {
      name : this.state.name, 
      frequency : this.state.frequency,
      category : this.state.category,
      friends : []
    }).then(() => {
      this.props.navigation.navigate('Main');
    }).catch((e) => {
      console.log("bad");
      console.log(e.message);

      this.props.navigation.navigate('Main');
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container} >
        <View style={{ flexDirection: 'row', marginRight: 110, justifyContent: 'space-between', marginTop: 50 }}>
          <Button
            icon={<Icon name='chevron-left'
              size={30}
              color='#6B6565' />
            }
            buttonStyle={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.title}> Set Goal. </Text>
        </View>
        <View style={styles.container} >
            <SafeAreaView>
                <Text style={styles.subTitle}>Goal name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => this.setState({name : e})}
                    placeholder="Name of goal"
                    keyboardType="numeric"
                />
                
                <Text style={styles.subTitle}>Frequency</Text>
                
                <View style = {styles.input}>
                <RNPickerSelect
                    onValueChange = {(itemValue) =>
                    this.setState({frequency: itemValue})}
                    value = {this.state.frequency}
                    style = {pickerSelectStyles}
                    items={[
                    { label: `Once`, value: 'Once' },
                    { label: `Daily`, value: 'Daily' },
                    { label: `Weekly`, value: 'Weekly' },
                    { label: `Monthly`, value: 'Monthly' },
                    ]}
                />
                </View>

        <SafeAreaView>
          <Text style={styles.subTitle}>Category</Text>

          <View style={styles.input}>
            <RNPickerSelect
              onValueChange={(itemValue) =>
                this.setState({ category: itemValue })}
              value={this.state.category}
              style={pickerSelectStyles}
              items={[
                { label: `Education`, value: 'Education' },
                { label: `Exercise`, value: 'Exercise' },
                { label: `Health`, value: 'Health' },
                { label: `Lifestyle`, value: 'Lifestyle' },
              ]}
            />
          </View>

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
                    //source={}
                    />
                </View> */}

          <Button title="Finish" buttonStyle={styles.button} onPress = {this.sendGoal}
            titleStyle={{ fontFamily: 'Avenir', fontWeight: 'bold', fontSize: 22 }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#C1E7E1', '#AEE1DA'],
              start: { x: 0, y: 0 },
              end: { x: 0, y: 1 },
            }}
          />
          </SafeAreaView>
          </SafeAreaView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width_proportion100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 20
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 85,
  },
  subTitle: {
    fontFamily: 'Avenir',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    color: '#6B6565'
  },
  input: {
    height: 40,
    width: width_proportion100,
    padding: 8,
    borderColor: '#E1E8FC',
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 20
  },
  button: {
    width: 180,
    height: 60,
    borderRadius: 40,
    marginTop: 80,
    marginLeft: 95,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  addFriend: {
    width: width_proportion80,
    marginBottom: 30,
    justifyContent: 'flex-start'
  },
  addButton: {
    width: 40,
    height: 40,
    marginTop: 0,
    marginLeft: 30,
    alignItems: 'center',
    paddingRight: 10,
    justifyContent: 'flex-end'
  },
  backButton: {
    backgroundColor: 'transparent',
    width: 40,
    paddingVertical: -1
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: '#F2F3F3',
    borderRadius: 50
  },
  pickerStyle: {
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: 'gray',
    //borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'blue',
  },
});
