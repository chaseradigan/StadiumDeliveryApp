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
                <Container>
                    <Header transparent iosBarStyle="light-content" searchBar style={{ backgroundColor: "black" }} rounded>
                        <Item underline style={this.state.focus ? styles.focusedInput: styles.nonFocusedInput}>
                            <Icon style={{color:"white"}} name="ios-search" />
                            <Input placeholderTextColor="white" style={{color:'white'}} onFocus={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false })} placeholder="Search" />
                            <Icon style={{color:"white"}} name="ios-restaurant" />
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
        backgroundColor: "black",color:'white', height: 35, borderBottomColor:"white"
    },
    nonFocusedInput:{
        backgroundColor: "black",color:"white", height: 35,
    }
})