
import React, { Component } from 'react';
import { Container } from 'native-base';
import { CreditCardInput } from "react-native-input-credit-card";
import "firebase/auth";

export default class AddCardScreen extends React.Component {
    constructor() {
        super();

    }
    onChange = (form) => {

    }
    render() {
        return (
            <Container style={{ paddingTop: 60 }}>
                <CreditCardInput onChange={this.onChange} />
            </Container>
        );
    }
}
