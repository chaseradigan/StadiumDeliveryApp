import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Transition } from 'react-navigation-fluid-transitions';
export default class MapScreen extends React.Component {
    constructor(){
        super();
        this.state={
          location:null,
          loading:true
        }
    }
    async componentDidMount(){
        let status = await Location.requestPermissionsAsync();
        console.log(status);
        if(status.granted === true){
            let location = await Location.getCurrentPositionAsync({});
            this.setState({location:location});
            //console.log(location);
            const api_key = "AIzaSyDhHXaa_qx9xC9jgne4VpOq8o2Sh1K6BDw";
            let url =`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${api_key}`
            let result = await fetch(url);
            console.log(result.json());
            this.setState({loading:false})
        }else{
          this.setState({loading:false})
        }
    }
  render() {
    return (
      <Transition appear="scale" disappear="scale">
      <View style={styles.container}>
      {this.state.location ? 
        <MapView showsUserLocation initialRegion={{latitude:this.state.location.coords.latitude, longitude:this.state.location.coords.longitude, latitudeDelta:0.03, longitudeDelta:0.03}} style={styles.mapStyle} />
      :<Text>Location Permission Disabled</Text>}
        </View>
        </Transition>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});