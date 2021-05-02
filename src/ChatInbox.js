import React from 'react';
import {TouchableOpacity, ScrollView, TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import Dumbbell from '../assets/svgs/Dumbbell';
import Education from '../assets/svgs/Education';
import Health from '../assets/svgs/Health';
import BackArrow from '../assets/svgs/BackArrow';
import Search from '../assets/svgs/Search';
import AsyncStorage from '@react-native-async-storage/async-storage' 

export default class ChatInbox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            searchResults: [],
            allChats: [],
            username: ""
        }
    }

    changeSearch = (e) => {
        if(e.length == 0){
            this.setState({searchQuery: e, searchResults: this.state.allChats});
        } else{
            let searchResults = [];
            this.state.allChats.forEach((chat) => {
                if(chat.name.includes(e) || chat.category.includes(e)){
                    searchResults.push(chat);
                }
            });
            this.setState({searchResults, searchQuery: e});
        }
    }

    renderChats = () => {
        return this.state.searchResults.map(chat => {
            return <ChatCard navigation={this.props.navigation} username={this.state.username} key={chat.id} data={chat} /> 
        });
    }

    async componentDidMount(){
        let username = await AsyncStorage.getItem('username');
        let chats = [
            {
                messages: [
                    {sender: "Alvin", id:"123", message: "I love olaf"},
                    {sender: "Olaf", id:"323", message: "I love you too Alvin!!"},
                    {sender: "Alvin", id:"523", message: "Do you want to go build a snowman?? Its nice and cold outside"},
                    {sender: "Alvin", id:"623", message: "Or we can go make some snow angels :)"},
                    {sender: "Raymond", id:"723", message: "Isnt is the summer? How are you going to build a snowman"},
                ],
                read: false,
                id: "141afs",
                name: "Watch an episode of frozen",
                category: "Health",
                members: ["Alvin", "Olaf", "Shrek", "Anna", "Raymond"]
            },
            {
                messages: [
                    {sender: "Raymond", id: "123", message: "Alvin, go do your math!"},
                    {sender: "Alvin", id: "2", message: "Oh right! Yes of course! I totally forgot"},
                    {sender: "Alvin", id: "3", message: "Im doing it right now"},
                    {sender: "Catherine", id: "4", message: "You better be."},
                    {sender: "Jocelyn", id: "5", message: "Smh Alvin"}
                ],
                read: true,
                id: "asdf142",
                name: "Daily Math Exercises",
                category: "Education",
                members: ["Alvin", "Raymond", "Catherine", "Jocelyn"]
            },
            {
                messages: [
                    {sender: "Alvin", id:"3", message: "Jocelyn, train your model"},
                    {sender: "Jocelyn", id:"2", message: "I don't know how..."},
                    {sender: "Jocelyn", id:"5", message: "Can you help me?"},
                    {sender: "Alvin", id:"4", message: "Loser"},
                    {sender: "Jocelyn", id:"7", message: "Shut up, Alvin"},
                    {sender: "Raymond", id:"6", message: ":o"},
                ],
                read: false,
                id: "a21jad",
                name: "Train Tensorflow Model",
                category: "Education",
                members: ["Alvin", "Raymond", "Catherine", "Jocelyn"]
            },
            {
                messages: [{sender: "Olaf", message: "Build a snowman, alvin!"}],
                read: true,
                id: "12ks0431",
                name: "Daily Snowman Building",
                category: "Exercise",
                members: ["Alvin", "Olaf", "Anna", "Christof"]
            },
            {
                messages: [{sender: "Catherine", message: "Raymond, walk Felix"}],
                read: true,
                id: "asdf191a",
                name: "Weekly Dog Walking",
                category: "Exercise",
                members: ["Alvin", "Catherine", "Jocelyn", "Raymond"]
            },
            {
                messages: [{sender: "Alvin", message: "Go code, Raymond!!"}],
                read: true,
                id: "asf122jsd",
                name: "Daily Leetcode",
                category: "Education",
                members: ["Alvin", "Raymond", "Jocelyn", "Catherine"]
            },
        ];

        this.setState({
            searchResults: chats,
            allChats: chats,
            username
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress = {() => this.props.navigation.goBack()} >
                        <BackArrow />
                    </TouchableOpacity>
                    <Text style={{marginLeft: 20, color:"#000000", fontSize:30, fontWeight: "600"}}>Chat Inbox.</Text>
                </View>

                <View style={styles.searchBar}>
                    <Search style={{marginRight:5}}/>
                    <TextInput style={{fontSize:18}} value={this.state.searchQuery} onChangeText={this.changeSearch} placeholderTextColor={"#C4C4C4"} placeholder={"Search"}/>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.renderChats()}
                </ScrollView>
            </View>
        )
    }
}

class ChatCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            read: false
        }
    }

    async componentDidMount(){ //process data here...
        this.setState({
            read: this.props.data.read 
        });
    }

    icon = {
        "Education": <Education />,
        "Exercise": <Dumbbell />,
        "Health": <Health />
    }

    goToMessage = () => {
        this.setState({read: true}); //also need to send to backend to update the data
        this.props.navigation.navigate('Chat', {data: this.props.data});
    }

    render(){
        let lastMessage = this.props.data.messages[this.props.data.messages.length-1];

        return (
            <TouchableOpacity style={CardStyle.mainCard} onPress={this.goToMessage}> 
                {this.icon[this.props.data.category]}
                <View style={CardStyle.textSection} >
                    <Text numberofLines={1} style={CardStyle.textHeader}>{this.props.data.name}</Text>
                    <Text numberOfLines={1} style={this.state.read ? CardStyle.readChat : CardStyle.unreadChat}>{lastMessage.sender == this.props.username ? "You" : lastMessage.sender}: {lastMessage.message}</Text>
                </View>
                <View style={CardStyle.statusSection}>
                    {this.state.read ? null :
                        <View style={{height: 8, width: 8, borderRadius: 4, backgroundColor: "#F46DA8"}} /> 
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:"white"
    },
    header: {
        flexDirection:"row",
        marginTop: 80,
        alignItems: "center"
    },
    searchBar:{
        height: 50,
        width: "98%",
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
});

const CardStyle = StyleSheet.create({
    mainCard: {
        width:"100%",
        height: 80,
        padding: 20,
        backgroundColor:"#F2F3F3",
        borderRadius: 15,
        flexDirection: "row",
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.2,
        elevation: 3,
    },
    statusSection:{
        flex: 0.3,
        justifyContent:"center",
        alignItems:"flex-end"
    },
    textHeader:{
        fontSize: 18,
        fontWeight:"600",
        color:"#000000",
        marginBottom:2
    },
    readChat:{
        color:"#6B6565"
    },
    unreadChat:{
        color:"black"
    },
    textSection:{
        flex: 2,
        flexDirection: "column",
        marginLeft: 20
    }
});
