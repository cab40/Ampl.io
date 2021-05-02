import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View, LayoutAnimation } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import People from '../assets/svgs/People';
import DownIcon from '../assets/svgs/DownIcon';
import UpIcon from '../assets/svgs/UpIcon';
import MessageIcon from '../assets/svgs/MessageIcon';
import CheckIcon from '../assets/svgs/CheckIcon';
import axios from 'axios';
import { host } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from 'react-native-user-avatar';

export default class Home extends React.Component {
  state = {
    goals: [],
    username : ""
  };

  makeCall = () => {
    axios.get(`${host}/getGoals/${this.state.username}`)
      .then((response) => {
        //console.log(response.data);
        this.setState({ goals: response.data})
      }).catch((e) => {
        console.log(e);
      })
  }

  async componentDidMount() {
    let username = await AsyncStorage.getItem('username');

    this.setState({
      username : username
    })

    axios.get(`${host}/getGoals/${username}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          goals: res.data
        })
      })
      .catch((e) => {
        console.log(e);
      })

    this._interval = setInterval(() => {
      this.makeCall();
    }, 5000);
  }

  componentWillUnmount(){
    clearInterval(this._interval);
  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 30, fontWeight: "600" }}> Today. </Text>
        {/* <GoalRow goalName="Do iBio Homework" completeUsers={["Jocelyn"]} incompleteUsers={["Everybody else"]} frequency={"Daily"} category={"Exercise"} /> */}

        {this.state.goals.filter(goal => goal.frequency === 'Daily').map(goal => <GoalRow key={goal.name} goalName={goal.name} completeUsers={goal.complete} incompleteUsers={goal.incomplete} frequency={goal.frequency} category={goal.category} goalId = {goal.goalId} username = {this.state.username} navigation = {this.props.navigation} 
        makeCall = {this.makeCall}
        />)}

        <View>
          <Text style={{ marginTop: 30, fontSize: 30, fontWeight: "600" }}> This Week. </Text>
        </View>

        {/* <GoalRow goalName="goalName" completeUsers={["Raymond", "Rapunzel"]} incompleteUsers={["Olaf", "Johnny"]} frequency={"Weekly"} category={"Exercise"} /> */}

        {this.state.goals.filter(goal => goal.frequency === 'Weekly').map(goal => <GoalRow key={goal.name} goalName={goal.name} completeUsers={goal.complete} incompleteUsers={goal.incomplete} frequency={goal.frequency} category={goal.category} goalId = {goal.goalId} username = {this.state.username} navigation = {this.props.navigation}
        makeCall = {this.makeCall}
        />)}

        <View>
          <Text style={{ marginTop: 30, fontSize: 30, fontWeight: "600" }}> This Month. </Text>
        </View>

        {/* <GoalRow goalName="goalName" completeUsers={["Raymond", "Rapunzel"]} incompleteUsers={["Olaf", "Johnny"]} frequency={"Monthly"} category={"Exercise"} /> */}

        {this.state.goals.filter(goal => goal.frequency === 'Monthly').map(goal => <GoalRow key={goal.name} goalName={goal.name} completeUsers={goal.complete} incompleteUsers={goal.incomplete} frequency={goal.frequency} category={goal.category} goalId = {goal.goalId} username = {this.state.username} navigation = {this.props.navigation}
        makeCall = {this.makeCall}
        />)}

        <View style={{ height: 10 }} />
      </ScrollView>
    );
  }
}

class GoalRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barWidth: 0,
      checked: this.props.completeUsers.includes(this.props.username),
      collapsed: true,
    }
  }

  toggleProgress = () => {
    console.log(this.props.username);
    console.log(this.props.goalId);

    this.setState({ 
      checked: !this.state.checked,
    },
    () => axios.post(`${host}/toggleGoal/${this.props.username}/${this.props.goalId}`, {'complete' : this.state.checked})
    .then(async () => {
      await this.props.makeCall();
    }).then(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }).catch((e) => {
      console.log("toggle bad");
      console.log(e.message);
    }));
  }

  renderProgressBar = () => {
    let completed = this.props.completeUsers.length;
    if (this.state.checked && !this.props.completeUsers.includes(this.props.username)) {
      completed++;
    }

    let total = this.props.completeUsers.length + this.props.incompleteUsers.length;

    let circles = [];

    for (let i = 0; i <= total; i++) {
      let color = i > completed || completed == 0 ? "#FFFFFF" : "#B8CFF2";
      let offset = -6 + this.state.barWidth * (i / total);

      circles.push(<View key={i} style={{ position: "absolute", width: 12, height: 12, borderRadius: 6, left: offset, bottom: -3, backgroundColor: color }} />);
    }

    return (
      <View style={{ marginLeft: 6, flexDirection: "row", width: "100%" }} >
        <View style={{ backgroundColor: "#B8CFF2", height: 5, width: ((completed / total) * 100) + "%" }} />
        <View style={{ backgroundColor: "#FFFFFF", height: 5, width: ((1 - completed / total) * 100) + "%" }} />
        {circles}
      </View>
    )
  }

  toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <View style={GoalStyle.mainContainer}>
        <View style={GoalStyle.RowStack}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => { this.toggleProgress();}}
            style={{ borderRadius: 13, alignItems: "center", justifyContent: "center", marginRight: 10, height: 26, width: 26, backgroundColor: "#FFFFFF" }}
          >
            {this.state.checked ?
              <CheckIcon /> : null
            }
          </TouchableOpacity>

          <View style={{ flex: 1, marginRight: 50, justifyContent: "space-between" }} onLayout={(event) => { var { height, width } = event.nativeEvent.layout; this.setState({ barWidth: width }) }} >
            <Text style={{ marginBottom: 10 }}>{this.props.goalName}</Text>
            {this.renderProgressBar()}
          </View>

          <TouchableOpacity onPress={this.toggleCollapse} activeOpacity={0.8} style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "space-between" }}>
            <View style={{ height: 18, flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
              <Text style={{ color: "#6B6565", fontWeight: '600', fontSize: 16, marginRight: 5 }}>{this.props.completeUsers.length + this.props.incompleteUsers.length}</Text>
              <People />
            </View>
            {this.state.collapsed ? <DownIcon /> : <UpIcon />}
          </TouchableOpacity>
        </View>
        <View style={[{ width: "100%", marginTop: this.state.collapsed ? 0 : 25, overflow: "hidden" }, this.state.collapsed ? { height: 0 } : {}]}>
          <View style={{ flexDirection: "row", marginBottom: 15, justifyContent: 'space-between', borderWidth: 0 }}>
            <View style={{ flex: 1, flexDirection: "column", borderWidth: 0 }}>
              <Text>Incomplete</Text>
              {this.props.incompleteUsers.map(user => <View key={user} style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <View style={{ backgroundColor: "#C1E7E1", alignItems: "center", width: 26, height: 26, borderRadius: 13, justifyContent: "center" }}>
                  <Text style={{ fontWeight: "600", fontSize: 12, color: "white", textAlign: "center" }}>{user.slice(0, 2)}</Text>
                </View>
                <Text style={{ color: "#6B6565", fontSize: 12, fontWeight: "500", marginLeft: 5 }}>{user} </Text>
              </View>)}
            </View>

            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text>Complete</Text>
              {this.props.completeUsers.map(user => <View key={user} style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                <View style={{ backgroundColor: "#C1E7E1", alignItems: "center", width: 26, height: 26, borderRadius: 13, justifyContent: "center" }}>
                  <Text style={{ fontWeight: "600", fontSize: 12, color: "white", textAlign: "center" }}>{user.slice(0, 2)}</Text>
                </View>

                <Text style={{ color: "#6B6565", fontSize: 12, fontWeight: "500", marginLeft: 5 }}>{user}</Text>
              </View>)
              }
            </View>
          </View>

          <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 14, color: "#6B6565" }}>Details</Text>
              <Text style={{ fontSize: 12, color: "#6B6565" }} >Category: {this.props.category} {"\t"} Occurence: {this.props.frequency}</Text>
            </View>
            <MessageIcon onPress={() => this.props.navigation.navigate('ChatInbox')} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    //borderColor: 'blue',
    //borderWidth: 1
  },
});

const GoalStyle = StyleSheet.create({
  mainContainer: {
    padding: 15,
    width: "100%",
    backgroundColor: "#F2F3F3",
    borderRadius: 20,
    marginTop: 15
  },
  RowStack: {
    width: "100%",
    flexGrow: 1,
    flexDirection: "row",
  }
});
