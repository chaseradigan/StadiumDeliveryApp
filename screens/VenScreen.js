import React from 'react';
import { View, Text } from 'react-native';


export default class VenScreen extends React.Component{
  componentDidMount(){
    this.props.navigation.setOptions({title:this.props.route.params.item})
  }
  render(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
      <Text>Ven Screen</Text>
      
    </View>
  );
  }
}