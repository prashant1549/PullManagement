import React, {useEffect, useState} from 'react';
// import MaterialIcon from 'material-icons-react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  useToast,
} from 'native-base';
import {loginRequest} from '../services/Action/ActionPoll';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {
    isError,
    isSuccess,
    userStatus = '',
  } = useSelector(state => state.user);
  useEffect(async () => {
    const token = await AsyncStorage.getItem('AceessToken');
    if (isError) {
      toast.show({
        status: 'error',
        description: userStatus,
      });
      dispatch({type: 'LOGIN_DEFAULT'});
    } else if (isSuccess === true && token) {
      toast.show({
        status: 'success',
        description: 'Successfully Login',
      });
    }
  }, [isError, isSuccess]);

  const handleSubmit = async () => {
    const data = {username, password};
    if (username == '' || password == '') {
      toast.show({
        status: 'error',
        description: 'Please enter username and password',
      });
      // setError('Please enter username and password');
    } else {
      await dispatch(loginRequest(data));
    }
  };
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto" justifyContent="center">
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign in to continue!
        </Heading>
        <Text alignSelf="center" color="red.500">
          {error}
        </Text>
        <VStack space={2} mt={5}>
          <FormControl>
            <Input
              placeholder="Enter username"
              onChangeText={e => setUsername(e)}
              value={username}
            />
          </FormControl>
          <FormControl mb={5}>
            <Input
              placeholder="Enter password"
              type="password"
              onChangeText={e => setPassword(e)}
              value={password}
            />
            <Link
              _text={{fontSize: 'xs', fontWeight: '700', color: 'cyan.500'}}
              alignSelf="flex-end"
              mt={1}>
              Forget Password?
            </Link>
          </FormControl>
          <VStack space={2}>
            <Button
              colorScheme="cyan"
              _text={{color: 'white'}}
              onPress={() => handleSubmit()}>
              Login
            </Button>
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              I'm a new user.{' '}
            </Text>
            <Link
              onPress={() => navigation.navigate('Signup')}
              _text={{color: 'cyan.500', bold: true, fontSize: 'sm'}}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
