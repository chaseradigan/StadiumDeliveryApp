import React from 'react';
import { Text, View, Button, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


export default class NotificationScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            granted: false,
            token: "",
            notification:{
                origin:"",
                data:""
            }
        }
    }
    async componentDidMount(){
        let status = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if(!status.granted){
            let statusNew = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }
    _handleNotification = async notification =>{
        Vibration.vibrate();
        console.log(notification);
        this.setState({notification:notification});
       let x= await Notifications.getBadgeNumberAsync();
       console.log(x)
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Origin: {this.state.notification.origin}</Text>
                    <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
                </View>

            </View>
        );
    }
}
