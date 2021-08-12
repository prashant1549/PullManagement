import React, {useState} from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  NativeBaseProvider,
  Heading,
  Text,
  FormControl,
} from 'native-base';
import axios from 'axios';
const AddPull = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (
      title == '' ||
      option1 == '' ||
      option2 == '' ||
      option3 == '' ||
      option4 == ''
    ) {
      setError('Please fill are required filled');
    } else {
      try {
        const token = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/add_poll?title=${title}&options=${option1}____${option2}____${option3}____${option4}`,
        );

        setTitle('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setError('');
        navigation.navigate('Polls List');
      } catch (error) {
        setError(error);
      }
    }
  };
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto" justifyContent="center">
        <Heading alignSelf="center" size="lg" color="primary.500">
          Create Poll
        </Heading>

        <Text alignSelf="center" color="red.500">
          {error}
        </Text>

        <VStack space={2} mt={5}>
          <FormControl>
            <Input
              placeholder="Enter Title"
              onChangeText={e => setTitle(e)}
              value={title}
            />
          </FormControl>
          <FormControl mb={5}>
            <Input
              placeholder="Enter option1"
              onChangeText={e => setOption1(e)}
              value={option1}
            />
          </FormControl>
          <FormControl mb={5}>
            <Input
              placeholder="Enter option2"
              onChangeText={e => setOption2(e)}
              value={option2}
            />
          </FormControl>

          <FormControl mb={5}>
            <Input
              placeholder="Enter option3"
              onChangeText={e => setOption3(e)}
              value={option3}
            />
          </FormControl>
          <FormControl mb={5}>
            <Input
              placeholder="Enter option4"
              onChangeText={e => setOption4(e)}
              value={option4}
            />
          </FormControl>

          <VStack space={2}>
            <Button
              colorScheme="cyan"
              _text={{color: 'white'}}
              onPress={() => handleSubmit()}>
              Add Poll
            </Button>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};
export default AddPull;