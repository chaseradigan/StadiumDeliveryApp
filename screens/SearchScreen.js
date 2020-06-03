import React from 'react';
import { Container,  Text, Header, View, Icon, Button, Item, Input, Content } from 'native-base';
import { StatusBar } from 'react-native';



export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = { location: null }
    }

    render() {
        return (
            <View style={{flex:1}}>
            <StatusBar barStyle="light-content" backgroundColor="black"/>
            <Container>
            <Header iosBarStyle="light-content" searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-restaurant" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
            <Content>
                
                <View style={{ padding: 20 }}>
                
                </View>
                </Content>
            </Container>
            </View>
        );
    }
}

