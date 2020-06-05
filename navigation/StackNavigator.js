import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import VenScreen from '../screens/VenScreen';
import MapScreen from '../screens/MapScreen';
import MenuScreen from '../screens/MenuScreen';
import CartIcon from '../screens/components/CartIcon';
import ShoppingCart from '../screens/ShoppingCart';


const Stack = createStackNavigator();

export default function MyStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                title: 'BITE',
                headerStyle: {
                    backgroundColor: 'black'
                },

                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () =>  <CartIcon {...navigation}/>
            }} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{
                title: 'Menu',
                headerStyle: {
                    backgroundColor: 'black'
                },

                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerBackTitle: "Back"
            }} />
            <Stack.Screen name="Venue" component={VenScreen}
                options={{
                    title: 'Venue',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitle: "Back"
                }}
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Map',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitle: "Home"
                }}
            />
            <Stack.Screen
                name="Cart"
                component={ShoppingCart}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    title: 'Cart',
                    headerStyle: {
                        backgroundColor: 'black'
                    },

                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitle: "Home"
                }} />
        </Stack.Navigator>
    );
}