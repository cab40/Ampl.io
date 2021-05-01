import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View, LayoutAnimation} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import People from '../assets/svgs/People';
import DownIcon from '../assets/svgs/DownIcon';
import UpIcon from '../assets/svgs/UpIcon';
import MessageIcon from '../assets/svgs/MessageIcon';
import CheckIcon from '../assets/svgs/CheckIcon';

export default class Home extends React.Component{
    render(){
        return (
            <View style = {styles.container}>
                <View style = {{height: 20}}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{fontSize: 30, fontWeight: "600"}}> Today. </Text>
                    <GoalRow />
                    <GoalRow />

                    <View>
                        <Text style={{marginTop: 30, fontSize: 30, fontWeight: "600"}}> This Week. </Text>
                    </View>
                    <GoalRow />
                    <GoalRow />
                    <GoalRow />

                    <View>
                        <Text style={{marginTop: 30, fontSize: 30, fontWeight: "600"}}> This Month. </Text>
                    </View>
                    <GoalRow />
                    <GoalRow />
                </ScrollView>
            </View>
        );
    }
}

class GoalRow extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            barWidth: 0,
            checked: false,
            collapsed: true 
        }
    }

    renderProgressBar = () => {
        let completed = 1;
        if(this.state.checked){
            completed++;
        }

        let total = 3;

        let circles = [];

        for(let i = 0;i <= total; i++){
            let color = i > completed || completed == 0 ? "#FFFFFF" : "#B8CFF2";
            let offset = -6 + this.state.barWidth*(i/total);

            circles.push(<View key={i} style={{position:"absolute", width: 12, height: 12, borderRadius: 6, left:offset, bottom: -3, backgroundColor: color}}/>);
        }

        return (
            <View style={{marginLeft:6, flexDirection:"row", width:"100%"}} >
                <View style={{backgroundColor:"#B8CFF2", height:5, width:((completed/total)*100)+"%"}}/>
                <View style={{backgroundColor:"#FFFFFF", height:5, width:((1-completed/total)*100)+"%"}}/>
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

    render(){
        return(
            <View style={GoalStyle.mainContainer}>
                <View style={GoalStyle.RowStack}>
                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); this.setState({checked: !this.state.checked})}} 
                        style={{borderRadius:13, alignItems: "center", justifyContent:"center", marginRight:10, height:26, width: 26, backgroundColor:"#FFFFFF"}}
                    >
                        {this.state.checked ? 
                            <CheckIcon /> : null
                        }
                    </TouchableOpacity>

                    <View style={{flex: 1, marginRight:50, justifyContent: "space-between"}} onLayout={(event) => {var {height, width} = event.nativeEvent.layout; this.setState({barWidth: width})}} >
                        <Text style={{marginBottom: 10}}>Goal Name</Text>
                        {this.renderProgressBar()}
                    </View>
                    <TouchableOpacity onPress={this.toggleCollapse} activeOpacity={0.8} style={{flex: 0.2,alignItems:"flex-end", justifyContent: "space-between"}}>
                        <View style={{height: 18, flexDirection:"row", alignItems:"center", justifyContent:"flex-end"}}>
                            <Text style={{color: "#6B6565", fontWeight: '600', fontSize:16, marginRight:5}}>4</Text>
                            <People />
                        </View>
                        {this.state.collapsed ? <DownIcon /> : <UpIcon />}
                    </TouchableOpacity>
                </View>
                <View style={[{width:"100%", marginTop: this.state.collapsed ? 0 : 25, overflow:"hidden"}, this.state.collapsed ? {height: 0} : {}]}>
                    <View style={{flexDirection:"row", marginBottom:15}}>
                        <View style={{flex:1, flexDirection:"column"}}>
                            <Text>Complete</Text>
                            <View style={{flexDirection:"row", alignItems:"center", marginTop:5}}>
                                <View style={{backgroundColor:"#C1E7E1", alignItems:"center", width:26, height:26, borderRadius:13, justifyContent:"center"}}>
                                    <Text style={{fontWeight:"600", fontSize: 12, color:"white", textAlign:"center"}}>RW</Text>
                                </View>
                                <Text style={{color:"#6B6565", fontSize: 12, fontWeight: "500", marginLeft: 5}}>User3 Name </Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:"column"}}>
                            <Text>Incomplete</Text>
                            <View style={{flexDirection:"row", alignItems:"center", marginTop:5}}>
                                <View style={{backgroundColor:"#C1E7E1", alignItems:"center", width:26, height:26, borderRadius:13, justifyContent:"center"}}>
                                    <Text style={{fontWeight:"600", fontSize: 12, color:"white", textAlign:"center"}}>RW</Text>
                                </View>
                                <Text style={{color:"#6B6565", fontSize: 12, fontWeight: "500", marginLeft: 5}}>User3 Name </Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", marginTop:5}}>
                                <View style={{backgroundColor:"#C1E7E1", alignItems:"center", width:26, height:26, borderRadius:13, justifyContent:"center"}}>
                                    <Text style={{fontWeight:"600", fontSize: 12, color:"white", textAlign:"center"}}>RW</Text>
                                </View>
                                <Text style={{color:"#6B6565", fontSize: 12, fontWeight: "500", marginLeft: 5}}>User3 Name </Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", marginTop:5}}>
                                <View style={{backgroundColor:"#C1E7E1", alignItems:"center", width:26, height:26, borderRadius:13, justifyContent:"center"}}>
                                    <Text style={{fontWeight:"600", fontSize: 12, color:"white", textAlign:"center"}}>RW</Text>
                                </View>
                                <Text style={{color:"#6B6565", fontSize: 12, fontWeight: "500", marginLeft: 5}}>User3 Name </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
                        <View>
                            <Text style={{fontSize: 14, color:"#6B6565"}}>Details</Text>
                            <Text style={{fontSize: 12, color:"#6B6565"}} >Category: Exercise {"\t"} Occurence:Daily</Text>
                        </View>
                        <MessageIcon />
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
        width:"100%", 
        backgroundColor: "#F2F3F3",
        borderRadius: 20,
        marginTop: 15
    },
    RowStack:{
        width: "100%",
        flexGrow: 1,
        flexDirection: "row",
    }
});
