import 'react-native-gesture-handler';
import React from 'react';
import * as Font from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import firebase from "./firebase";
import { StatusBar, Image, View, Vibration } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { AppLoading, Notifications } from 'expo';
import { Asset } from "expo-asset";
import TabNavigator from './navigation/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      isReady: false,
      authDone: false,
      token: ""
    }
  }
  async componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ active: true, authDone: true })
      } else {
        this.setState({ active: false, authDone: true })
      }
    })
  }
  async _loadAssetsAsync() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    
    const imageAssets = cacheImages([
      require('./images/beer2.jpg'),
      require('./images/burger.jpg'),
      require('./images/french-fries.jpg'),
      require('./images/ice-cream.jpg'),
      require('./images/hotdog.jpg'),
      require('./images/taco.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }


  render() {
    if (this.state.isReady && this.state.authDone)
      return (
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            {this.state.active ?
              <TabNavigator /> :
              <AuthStackNavigator />}
          </NavigationContainer>
        </Provider>
      )
    else
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content"/>
          <Image source={require('./assets/splash.png')} />
          <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        </View>
      )
  }
}
