import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import firebase from "../firebase";
import "firebase/auth";
import { Icon } from 'native-base';
import SettingsStackNavigator from './SettingsStackNavigator';

const Drawer = createDrawerNavigator();

export default function MyDrawer({ navigation }) {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="Home"
                component={TabNavigator}
                options={{
                    drawerIcon: () => <Icon name="ios-home" />
                }}
            />
            
            <Drawer.Screen
                name="Setting"
                component={SettingsStackNavigator}
                options={{title:"Settings", drawerIcon: () => <Icon name="ios-cog" /> }}
            />
        </Drawer.Navigator>
    );
}