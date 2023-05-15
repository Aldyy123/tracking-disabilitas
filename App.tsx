/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './src/providers/Notification';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();
import {NavigationContainer} from '@react-navigation/native';
import SettingsScreen from './src/Screens/SettingsScreen';
import NotificationScreen from './src/Screens/NotificationScreen';
import StatusScreen from './src/Screens/StatusScreen';
import TrackerScreen from './src/Screens/Tracker';
import {useTheme} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <PaperProvider>
        <NavigationContainer independent>
          <Tab.Navigator
            initialRouteName="Tracker"
            activeColor="#E8F6EF"
            inactiveColor="#B0DAFF"
            barStyle={{backgroundColor: '#0C134F', padding: 0}}>
            <Tab.Screen
              name="Tracker"
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="eight-track"
                    color={color}
                    size={27}
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
                    size={27}
                  />
                ),
              }}
              component={StatusScreen}
            />
            <Tab.Screen
              name="Notification"
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="bell" color={color} size={27} />
                ),
                tabBarBadge: 3,
              }}
              component={NotificationScreen}
            />
            <Tab.Screen
              name="Settings"
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="cog" color={color} size={27} />
                ),
              }}
              component={SettingsScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

export default App;
