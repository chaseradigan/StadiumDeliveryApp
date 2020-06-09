import React from 'react';
import { Container, Text, Header, View, Icon, Button, Item, Input, Content, Segment, Title, Subtitle } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';



export default class OrderOptionsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'}}>
            <View style={{ height: "100%" ,width: '100%', backgroundColor:"#fff", justifyContent:"center"}}>
              <Text>Testing a modal with transparent background</Text>
            </View>
        </View>
        );
    }
}