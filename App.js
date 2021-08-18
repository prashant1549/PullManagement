import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {accessToken} from './src/components/services/Action/ActionPoll';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/pages/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Signup from './src/components/pages/Signup';
import MyDrawer from './src/components/pages/MyDrawer';
import DetailsAPull from './src/components/pages/DetailsAPull';

const Stack = createNativeStackNavigator();
export default function App() {
  const dispatch = useDispatch();
  useEffect(async () => {
    // SplashScreen.hide();
    const data = await AsyncStorage.getItem('AceessToken');
    dispatch(accessToken(data));
  }, []);
  const token = useSelector(state => state.user.token);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {token === null ? (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="Signup"
                component={Signup}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{headerShown: false}}
                name="Home page"
                component={MyDrawer}
              />
              <Stack.Screen name="Details Of A Pull" component={DetailsAPull} />
            </>
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
