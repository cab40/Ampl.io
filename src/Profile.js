import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
//import { ButtonGroup } from 'react-native-elements';

export default class Profile extends React.Component() {
    render(){return (
      <View>
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
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

/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
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
            <Text> 28cx89 </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#d9d9d9',
            borderBottomWidth: 1,
          }}
        />

        <View style={{ marginTop: 10 }}>
          <Text> Progress.</Text>

          <ButtonGroup
            onPress={() => console.log("YO")}
            selectedIndex={2}
            buttons={buttons}
            containerStyle={{ height: 100 }}
          />
        </View> */