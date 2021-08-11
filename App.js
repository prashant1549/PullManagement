import React, {useEffect} from 'react';
import {
  Heading,
  useColorMode,
  Button,
  HStack,
  Avatar,
  Center,
  useColorModeValue,
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {aceessToken} from './src/components/services/Action/Todo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/pages/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Signup from './src/components/pages/Signup';
import MyDrawer from './src/components/pages/MyDrawer';

const Stack = createNativeStackNavigator();
export default function App() {
  const dispatch = useDispatch();
  useEffect(async () => {
    // SplashScreen.hide();
    const data = await AsyncStorage.getItem('AceessToken');
    dispatch(aceessToken(data));
  }, []);
  const token = useSelector(state => state.TodoReducer.token);
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
            </>
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
