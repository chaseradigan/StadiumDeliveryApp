import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen'


const Stack = createStackNavigator();


export default function MyStack({ navigation }) {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Search" component={SearchScreen} options={{
            headerShown:false,
                headerStyle: {
                    backgroundColor: 'black'
                },

                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} />
        
        </Stack.Navigator>
    );
}