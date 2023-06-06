/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './src/providers/Notification';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme as ReactNavigationDarkTheme,
} from '@react-navigation/native';
import SettingsScreen from './src/Screens/SettingsScreen';
import NotificationScreen from './src/Screens/NotificationScreen';
import StatusScreen from './src/Screens/StatusScreen/StatusScreen';
import TrackerScreen from './src/Screens/Tracker';
import {
  adaptNavigationTheme,
  useTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/config/store';
import {Alert, useColorScheme} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {DefaultDarkTheme, defaultLightTheme} from './src/theme';
const {DarkTheme, LightTheme} = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: ReactNavigationDarkTheme,
});
function App(): JSX.Element {
  const scheme = useColorScheme();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const internetInfo = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('Internet', 'Internet tidak terhubung');
      }
    });

    return internetInfo;
  }, []);

  return (
    <>
      <ReduxProvider store={store}>
        <PaperProvider
          theme={scheme === 'dark' ? DefaultDarkTheme : defaultLightTheme}>
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : LightTheme}
            independent>
            <Tab.Navigator
              initialRouteName="Tracker"
              activeColor="#E8F6EF"
              inactiveColor="#B0DAFF"
              barStyle={{backgroundColor: '#0C134F'}}>
              <Tab.Screen
                name="Tracker"
                options={{
                  tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                      name="eight-track"
                      color={color}
                      size={24}
                    />
                  ),
                }}
                component={TrackerScreen}
              />
              <Tab.Screen
                name="Status"
                options={{
                  tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                      name="information"
                      color={color}
                      size={24}
                    />
                  ),
                }}
                component={StatusScreen}
              />
              {/* <Tab.Screen
                name="Notification"
                options={{
                  tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                      name="bell"
                      color={color}
                      size={24}
                    />
                  ),
                  tabBarBadge: 3,
                }}
                component={NotificationScreen}
              /> */}
              {/* <Tab.Screen
                name="Settings"
                options={{
                  tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons
                      name="cog"
                      color={color}
                      size={27}
                    />
                  ),
                }}
                component={SettingsScreen}
              /> */}
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
