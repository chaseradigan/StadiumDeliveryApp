import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import VenScreen from '../screens/VenScreen';
import { Button, Icon } from 'native-base';
import MapScreen from '../screens/MapScreen';
import MenuScreen from '../screens/MenuScreen';


const Stack = createStackNavigator();


export default function MyStack({ navigation }) {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen} options={{
                title: 'FoodXperience',
                headerStyle: {
                    backgroundColor: 'black'
                },

                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
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
                headerBackTitle:"Back"
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
                    headerBackTitle:"Back"
                }}
            />
            <Stack.Screen name="Map" component={MapScreen}

                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    title: 'Map',
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