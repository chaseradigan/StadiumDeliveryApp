import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchStackNavigator from './SearchStackNavigator';
import StackNavigator from './StackNavigator';
import { Icon, Right } from 'native-base';
import SettingsStackNavigator from './SettingsStackNavigator';
const Tab = createBottomTabNavigator();


export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerStyle: { backgroundColor: "black" } }}
            tabBarOptions={{
                activeTintColor: "black"
            }}
        >
            <Tab.Screen
                name="Home"
                component={StackNavigator}
                options={{ 
                    tabBarIcon: 
                    ({focused, color,size}) =>  
                    <Icon style={{color:color}} active={focused} name="ios-home" />
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchStackNavigator}
                options={{ 
                    tabBarIcon: 
                    ({focused, color,size}) => 
                    <Icon style={{color:color}} active={focused} name="ios-search" /> 
                }}
            />
            <Tab.Screen
                name="Account"
                component={SettingsStackNavigator}
                options={{ 
                    tabBarIcon: 
                    ({focused, color,size}) => 
                    <Icon style={{color:color}} active={focused} name="ios-person" /> 
                }}
            />
        </Tab.Navigator>
    );
}