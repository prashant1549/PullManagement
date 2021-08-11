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
  Icon,
  IconButton,
  HStack,
  Divider,
  Center,
} from 'native-base';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {aceessToken} from '../services/Action/Todo';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (username == '' || password == '') {
      setError('Please enter username and password');
    } else {
      try {
        const token = await axios.post(
          'https://secure-refuge-14993.herokuapp.com/login?',
          {username: username, password: password},
        );
        dispatch(aceessToken(token.data.token));
        await AsyncStorage.setItem('AceessToken', token.data.token);
        setUsername('');
        setPassword('');
      } catch (error) {
        setError(error);
      }
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
