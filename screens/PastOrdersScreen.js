import React from 'react';
import { View } from 'react-native';
import { Container, Header, Button,Left, Text, Icon } from 'native-base';


export default class PastOrdersScreen extends React.Component {

    constructor() {
        super();
    }
    componentDidUpdate() {

    }
    render() {
        return (
            <Container>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="ios-paper"/>
                    <Text>No Orders</Text>
                </View>
            </Container>
        )
    }
}