import React from 'react';
import { Container, Text, Header, View, Icon, Button, Item, Input, Content, Segment, Title, Subtitle } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';



export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            location: null,
            focus: false
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <Container>
                    <Header transparent iosBarStyle="dark-content" searchBar style={{ backgroundColor: "white" }} rounded>
                        <Item underline style={this.state.focus ? styles.focusedInput: styles.nonFocusedInput}>
                            <Icon name="ios-search" />
                            <Input onFocus={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false })} placeholder="Search" />
                            <Icon name="ios-restaurant" />
                        </Item>
                        {this.state.focus ? 
                        <Button transparent>
                            <Text note>Search</Text>
                        </Button>
                        :<React.Fragment/>}
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

const styles = StyleSheet.create({
    focusedInput:{
        backgroundColor: "white", height: 40, shadowOffset: { width: 0, height: 5 }, shadowColor: "black", shadowOpacity: 0.1
    },
    nonFocusedInput:{
        backgroundColor: "white", height: 40,
    }
})