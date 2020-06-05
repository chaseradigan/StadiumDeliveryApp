import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import PastOrdersScreen from '../screens/PastOrdersScreen'
import { Button, Icon } from 'native-base';
import PaymentMethodsScreen from '../screens/payments/PaymentMethods';
import SettingsScreen from '../screens/Settings';
import AddCardScreen from '../screens/payments/AddCardScreen'
import MyPaymentsScreen from '../screens/payments/MyPayments';
import { StackActions } from '@react-navigation/native';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import MockData from '../mockData';
const Stack = createStackNavigator();


export default function SettingsStackNavigator({ navigation }) {

    return (
        <Stack.Navigator mode="modal" initialRouteName={"Settings"}>
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Account',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },

                }} />
            <Stack.Screen
                name="Payment"
                component={PaymentMethodsScreen}
                options={{
                    title: 'Payment Methods',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate("Settings")}

                            transparent
                        ><Icon style={{ color: "white" }} name="ios-return-left"></Icon>
                        </Button>),
                }} />
            <Stack.Screen
                name="Orders"
                component={PastOrdersScreen}
                options={{
                    title: 'Orders',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate("Settings")}

                            transparent
                        ><Icon style={{ color: "white" }} name="ios-return-left"></Icon>
                        </Button>),
                }} />
            <Stack.Screen
                name="AddCard"
                component={AddCardScreen}
                options={{
                    title: 'New Card',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate("Payment")}
                            transparent
                        ><Icon style={{ color: "white" }} name="ios-return-left"></Icon>
                        </Button>),
                }} />
            <Stack.Screen
                name="MyPayments"
                component={MyPaymentsScreen}
                options={{
                    title: 'Payment Methods',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate("Payment")}
                            transparent
                        ><Icon style={{ color: "white" }} name="ios-return-left"></Icon>
                        </Button>),
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    title: 'Notifications',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate("Settings")}
                            transparent
                        ><Icon style={{ color: "white" }} name="ios-return-left"></Icon>
                        </Button>),
                }}
            />
            <Stack.Screen
                name="MockData"
                component={MockData}
                options={{
                    title: 'Notifications',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.navigate("Settings")}
                            transparent
                        ><Icon style={{ color: "white" }} name="ios-return-left"></Icon>
                        </Button>),
                }}
            />
        </Stack.Navigator>
    );
}