import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
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
} from 'native-base';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {aceessToken} from '../services/Action/Todo';
import AsyncStorage from '@react-native-community/async-storage';

export default function Signup({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (username == '' || password == '') {
      setError('Please enter username and password');
    } else {
      try {
        const token = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/add_user?username=${username}&password=${password}&role=${role}`,
        );
        console.log(token.data);
        if (token.data.error === 1) {
          setError(token.data.message);
        } else {
          setUsername('');
          setPassword('');
          setRole('');
          setError('');
          navigation.navigate('Login');
        }
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
          Sign up to continue!
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
          <FormControl>
            <Input
              placeholder="Enter password"
              type="password"
              onChangeText={e => setPassword(e)}
              value={password}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Enter role"
              onChangeText={e => setRole(e)}
              value={role}
            />
          </FormControl>
          <VStack space={2} mt={5}>
            <Button
              onPress={() => handleSubmit()}
              colorScheme="cyan"
              _text={{color: 'white'}}>
              SignUp
            </Button>

            {/* <HStack justifyContent="center" alignItem="center">
              <IconButton
                variant="unstyled"
                startIcon={
                  <Icon
                    as={<Icon name="facebook" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
              <IconButton
                variant="unstyled"
                startIcon={
                  <Icon
                    as={<Icon name="google" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
              <IconButton
                variant="unstyled"
                startIcon={
                  <Icon
                    as={<Icon name="github" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
            </HStack> */}
            <HStack justifyContent="center">
              <Text fontSize="sm" color="muted.700" fontWeight={400}>
                I have already account.{' '}
              </Text>
              <Link
                onPress={() => navigation.navigate('Login')}
                _text={{color: 'cyan.500', bold: true, fontSize: 'sm'}}>
                Sign In
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
