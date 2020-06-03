import React, { Component } from 'react';
import { Container, View, Card, CardItem, Left, Body, Right, Icon, Content, Text } from 'native-base';
import "firebase/auth";

export default class PaymentMethodsScreen extends React.Component {
    constructor() {
        super();

    }
    onChange = (form) => {

    }
    render() {
        return (
            <Container>
                <Content scrollEnabled={false}>
                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate("MyPayments")}>
                            <Left>
                                <Icon active name="ios-card" />
                                <Text>Payment Methods</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem button onPress={() => this.props.navigation.navigate("AddCard")}>
                            <Left>
                                <Icon active name="ios-add-circle" />
                                <Text>Add Payment Method</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
                
            </Container>
        );
    }
}
