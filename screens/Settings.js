import React from 'react';
import { Button, Container, Header, Left, Text, Content, CardItem, Card, Right, Icon, Body } from 'native-base';
import { Alert } from 'react-native';
import firebase from "../firebase";
import "firebase/auth";
import { useFocusEffect } from '@react-navigation/native';

export default class SettingsScreen extends React.Component {
    constructor() {
        super();

    }
   
    Logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [{
                text: "Yes"
                , onPress: () => this.handleLogout()
            }, {
                text: "Cancel",
                onPress: () => console.log("Canceled"),
                style: "cancel"
            }
            ],
            { cancelable: false })
    }

    handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(response => {
                console.log(response);
                this.props.navigation.navigate("Home");
            })
            .catch(error => {
                console.log(error);
            })

    }
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate("Orders")}>
                            <Left>
                                <Icon active name="ios-paper" />
                                <Text>Orders</Text>
                            </Left>
                            <Body />
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem button onPress={() => this.props.navigation.navigate("Payment")}>
                            <Left>
                                <Icon active name="ios-card" />
                                <Text>Payment Methods</Text>
                            </Left>
                            
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem button onPress={this.Logout}>

                            <Icon active name="ios-log-out" />
                            <Text>Logout</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
