import React, {useState} from 'react';
import {
  useColorMode,
  Heading,
  Button,
  Input,
  FormControl,
  Image,
  Stack,
  ScrollView,
} from 'native-base';

const Login = () => {
  const [valid, setValid] = useState(false);
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <>
      <Image
        source={{
          uri: 'https://wallpaperaccess.com/full/317501.jpg',
        }}
        alt="Alternate Text"
        size={'md'}
      />
      <Heading>Login</Heading>
      <FormControl isRequired isInvalid={valid}>
        <Stack mx={4}>
          <FormControl.Label>Username</FormControl.Label>
          <Input p={2} placeholder="Enter username" />
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={valid} mt={4}>
        <Stack mx={4}>
          <FormControl.Label>Password</FormControl.Label>
          <Input p={2} placeholder="enter password" type="password" />
        </Stack>
      </FormControl>
      <Button
        pl={5}
        pr={5}
        mt={5}
        width={200}
        colorScheme={colorMode === 'light' ? 'blue' : 'red'}
        onPress={() => {
          toggleColorMode();
        }}>
        Login
      </Button>
    </>
  );
};
export default Login;
