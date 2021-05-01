import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default class Profile extends React.Component {
  state = {selectedIndex: 1};

  render() {
    const buttons = ['D', 'W', 'M'];
    const data = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 2],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity}`,
        }
      ]
    };

    const commitsData = [
      { date: "2021-04-27", count: 1, color: 'red'},
      { date: "2021-04-03", count: 2 },
      { date: "2021-04-04", count: 3 },
      { date: "2021-04-05", count: 4 },
      { date: "2021-04-06", count: 5 },
      { date: "2021-04-30", count: 2 },
      { date: "2021-04-31", count: 3 },
      { date: "2021-04-01", count: 2 },
      { date: "2021-04-02", count: 4 },
      { date: "2021-04-05", count: 2 },
      { date: "2021-04-30", count: 4 }
    ];


    const chartConfig = {
      backgroundColor: '#1cc910',
      backgroundGradientFrom: "#ffffff",
      backgroundGradientFromOpacity: 1,
      backgroundGradientToOpacity: 1,
      backgroundGradientTo: "#ffffff",
      //color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      color: (opacity = 1) => {return this.state.selectedIndex == 1 ? `rgba(0, 0, 0, ${opacity})` : `rgba(124, 235, 217, ${opacity})`},
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      fillShadowGradient: '#b8cff2',
      fillShadowGradientOpacity: 1,
      style : {
        padding: 0,
        margin: -200
      }
    };
    return (
      <View style={styles.container}>
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
            <Text style = {{color: "#B8CFF2"}}> 28cx89 </Text>
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
          <Text style = {{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}> Progress.</Text>

          <ButtonGroup
            onPress={(e) => this.setState({selectedIndex : e})}
            buttonStyle = {{backgroundColor: '#F2F3F3'}}
            selectedButtonStyle = {{backgroundColor: '#C1E7E1'}}
            selectedTextStyle = {{color: '#6B6565'}}
            textStyle = {{color: '#6B6565'}}
            buttonContainerStyle = {{height: 40}}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 40, borderRadius: 20, marginBottom: 30 }}
          />

          {this.state.selectedIndex == 1 ? <BarChart
            style={styles.graph}
            data={data}
            width={300}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            showBarTops = {false}
            showValuesOnTopOfBars = {true}
            withHorizontalLabels = {false}
            fromZero =  {true}
            withInnerLines = {false}
            
          /> : <ContributionGraph
          style = {styles.monthGraph}
          values={commitsData}
          endDate={new Date("2021-05-01")}
          squareSize = {30}
          numDays={31}
          width={300}
          height={250}
          chartConfig={chartConfig}
          horizontal = {false}
          showMonthLabels = {false}
        />}
        </View>
      </View>
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
  },
  graph : {
    alignSelf: 'stretch',
    borderColor: 'blue',
    //borderWidth: 1,
    padding: 0,
    marginLeft: -30
  },
  monthGraph : {
    padding: 0,
    alignSelf : 'center',
    borderColor: 'blue',
    //borderWidth: 1,
  }
});
