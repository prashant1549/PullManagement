import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {aceessToken} from '../services/Action/Todo';
import AsyncStorage from '@react-native-community/async-storage';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await AsyncStorage.removeItem('AceessToken');
      dispatch(aceessToken(null));
      navigation.navigate('Login');
    });

    return unsubscribe;
  }, [navigation]);
  return <View></View>;
};
export default Logout;
