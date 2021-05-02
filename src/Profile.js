import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native';

const data = [
  { x: 1, y: 67 },
  { x: 2, y: 23 },
  { x: 3, y: 99 },
  { x: 4, y: 25 },
  { x: 5, y: 78 },
  { x: 6, y: 40 },
  { x: 7, y: 65 }
];

export default class Profile extends React.Component {
  state = {
    selectedIndex: 0,
    timeLine: '5',
    timeUnit: 'Days'
  };

  render() {
    const buttons = ['D', 'W', 'M'];

    const chartConfig = {
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      //color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      barRadius: 5,
      fillShadowGradient: '#b8cff2',
      fillShadowGradientOpacity: 1,
      style: {
        padding: 0,
        margin: -200
      }
    };
    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Image style={styles.picture} source={require('../assets/cute.png')} />
          <Text style={styles.name}> Full Name </Text>
        </View>

        <View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}> Goals Completed:</Text>
            <Text> 10 </Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}> Friend Code</Text>
            <Text style={{ color: "#B8CFF2" }}> 28cx89 </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#d9d9d9',
            borderBottomWidth: 1,
            marginBottom: 30,
          }}
        />

        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, fontSize: 30, fontWeight: 'bold' }}> Progress.</Text>

          <ButtonGroup
            onPress={(e) => this.setState({ selectedIndex: e, timeUnit: e == 0 ? 'Days' : e == 1 ? 'Weeks' : 'Months' })}
            buttonStyle={{ backgroundColor: '#F2F3F3' }}
            selectedButtonStyle={{ backgroundColor: '#C1E7E1' }}
            selectedTextStyle={{ color: '#6B6565' }}
            textStyle={{ color: '#6B6565' }}
            buttonContainerStyle={{ height: 40 }}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 40, borderRadius: 20, marginBottom: 30 }}
          />

          <VictoryChart width={320} padding={30}>
            <VictoryBar style={{ data: { fill: ({ datum }) => { return datum._x % 2 === 0 ? '#b8cff2' : '#c1e7e1' } } }} data={data.slice(-1*parseInt(this.state.timeLine))} cornerRadius={{ bottom: 12, top: 12 }} barRatio={1} labels={({ datum }) => `${datum.y}%`} />
            <VictoryAxis style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" }
            }} />
          </VictoryChart>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text> Before  </Text>

            <View style={{ flexDirection: 'row' }}>
              <Text>Last </Text>
               <RNPickerSelect
                style = {pickerSelectStyles}
                onValueChange={(value) => { if(value) this.setState({timeLine: value})
                }}
                value = {this.state.timeLine}
                items={[
                  { label: `2 ${this.state.timeUnit}`, value: '2' },
                  { label: `3 ${this.state.timeUnit}`, value: '3' },
                  { label: `4 ${this.state.timeUnit}`, value: '4' },
                  { label: `5 ${this.state.timeUnit}`, value: '5' },
                  { label: `6 ${this.state.timeUnit}`, value: '6' },
                  { label: `7 ${this.state.timeUnit}`, value: '7' },
                ]}
              />
            </View>

            <Text> Now </Text>
          </View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50
  },
  name: {
    fontSize: 30,
    //borderColor: 'blue',
    //borderWidth: 1,
    textAlign: "center",
    textAlignVertical: 'center'
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    //borderColor: 'blue',
    //borderWidth: 1
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: 'gray',
    marginLeft: 5,
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
