import React from 'react';
import {LayoutAnimation, Dimensions, TouchableOpacity, ScrollView, TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import Dumbbell from '../assets/svgs/Dumbbell';
import Education from '../assets/svgs/Education';
import Health from '../assets/svgs/Health';
import BackArrow from '../assets/svgs/BackArrow';
import Search from '../assets/svgs/Search';
import SendIcon from '../assets/svgs/SendMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const icons = {
    "Health": <Health />,
    "Education": <Education />,
    "Exercise": <Dumbbell />
}

const height = Dimensions.get('window').height;

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            messages: [],
            category: "",
            name: "",
            members: [],
            headerHeight: 0,
            footerHeight: 0,
            currentMessage: ""
        }

        this.scrollViewRef = React.createRef();
    }

    async componentDidMount(){
        let username = await AsyncStorage.getItem('username');

        if(this.scrollViewRef?.current){
            this.scrollViewRef.current.scrollToEnd({animated: false});
        }

        this.setState({
            username,
            ...this.props.route.params.data
        });
    }

    sendMessage = () => {
        let newMessageList = this.state.messages;
        newMessageList.push({sender: this.state.username, message: this.state.currentMessage, id: Math.random().toString(36).substring(7) });

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            currentMessage: "",
            messages: newMessageList
        }, () => {this.scrollViewRef.current.scrollToEnd({animated: true})});
    }

    renderMessages = () => {
        let lastSender = "";
        return this.state.messages.map(message => {
            let additional = [];
            if(message.sender != lastSender){
                lastSender = message.sender;
                if(lastSender == this.state.username){
                    additional.push(<View key={"a"} style={{height:16}} />);
                } else{
                    additional.push(<Text key={"b"} style={{marginTop:8, marginBottom:4, color: "#6B6565", fontSize:10}}>{lastSender}</Text>);
                }
            }

            if(message.sender == this.state.username){
                return(
                    <View key={message.id} style={{width:"100%", alignItems:"flex-end"}}>
                        {additional}
                        <View style={{alignItems:"center", borderRadius: 15, maxWidth: "60%", backgroundColor: "#B8CFF2",padding:15, marginBottom:5}} >
                            <Text style={{fontSize: 14, color: "white"}}>{message.message}</Text>
                        </View>
                    </View>
                );
            } else{
                return(
                    <View key={message.id} style={{width:"100%", alignItems:"flex-start"}}>
                        {additional}
                        <View style={{borderRadius: 15, maxWidth: "60%", padding:15, backgroundColor: "#F2F3F3", marginBottom: 5}} >
                            <Text>{message.message}</Text>
                        </View>
                    </View>
                )
            }
        });
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={{height:53}} />
                <View 
                    style={{width:"100%", alignItems: "center", paddingLeft:15, paddingRight: 15, paddingBottom: 5, flexDirection:"row", borderColor:"#CECECE", borderBottomWidth: 1}} 
                    onLayout={(event) => { var { height } = event.nativeEvent.layout; this.setState({headerHeight: height}) }}
                >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <BackArrow />
                    </TouchableOpacity>
                    <View style={{flex: 1, flexDirection:"column", marginLeft: 15, marginRight: 40}}>
                        <Text style={{fontWeight: "600", fontSize: 22}}>{this.state.name}</Text>
                        <Text style={{fontSize: 10, color:"#6B6565"}} numberOfLines={1}>
                            with {this.state.members.map((member, idx) => {
                                if(member != this.state.username){
                                    if(idx == 0){
                                        return member;
                                    }
                                    if(idx == this.state.members.length-1 || (idx == this.state.members.length-2 && this.state.members[idx-2] == this.state.username)){
                                        return ", and " + member;
                                    } else{
                                        return ", " + member;
                                    }
                                }
                            })}
                        </Text>
                    </View>
                    
                    {icons[this.state.category]}
                </View>
                <View style={{flexDirection: "column", width: "100%", height: height-this.state.footerHeight-53-this.state.headerHeight, paddingLeft: 10, paddingRight: 10}}>
                    <ScrollView ref={this.scrollViewRef} showsVerticalScrollIndicator={false} >
                        {this.renderMessages()}
                    </ScrollView>
                </View>
                <View 
                    style={{flexDirection: "row", backgroundColor:"white", flex: 1,alignItems: "center",  paddingLeft:25, paddingRight: 20, position:"absolute", bottom:0, paddingBottom: 15}}
                    onLayout={(event) => { var { height } = event.nativeEvent.layout; this.setState({footerHeight: height}) }}
                >
                    <View style={styles.searchBar}>
                        <TextInput style={{fontSize:18}} value={this.state.currentMessage} onChangeText={(currentMessage) => this.setState({currentMessage})} placeholderTextColor={"#C4C4C4"} placeholder={"Send Message"}/>
                    </View>
                    <TouchableOpacity onPress={this.sendMessage}>
                        <SendIcon style={{marginLeft: 10, transform:[{translateY: -5}]}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white"
    },
    searchBar:{
        height: 50,
        flex:1,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 25,
        borderColor: "#E1E8FC",
        borderWidth: 4,
        flexDirection: "row",
        alignItems:"center",
        paddingLeft: 20
    }
})
