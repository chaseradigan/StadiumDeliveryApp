import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Button, Icon } from 'native-base';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';

const Stack = createStackNavigator();

export default function MyStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{
                title: "Login",

                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{
                title: "Sign Up",

                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        </Stack.Navigator>
    );
}