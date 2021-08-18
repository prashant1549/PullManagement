import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {asyncData} from '../services/Action/Todo';
import axios from 'axios';
import {paginate} from './Paginate';
import {
  Text,
  FlatList,
  HStack,
  Heading,
  VStack,
  Button,
  Box,
} from 'native-base';
const UserList = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(0);
  // useEffect(async () => {
  //   const data = await axios.get(
  //     'https://secure-refuge-14993.herokuapp.com/list_users',
  //   );
  //   dispatch(asyncData(data.data.data));
  // }, [navigation]);
  const data = useSelector(state => state.TodoReducer.cart);
  const handleCurrentPage = value => {
    setcurrentPage(currentPage => currentPage + value);
  };
  let data1 = paginate(data, currentPage, 20);
  console.log(data1);
  return (
    <VStack flex={1}>
      <HStack flex={0.1} backgroundColor="#000">
        <Heading
          alignSelf="center"
          flex={0.3}
          size={'md'}
          textAlign="center"
          color="#fff">
          User Id
        </Heading>
        <Heading
          alignSelf="center"
          flex={0.4}
          size={'md'}
          textAlign="center"
          color="#fff">
          Username
        </Heading>
        <Heading
          alignSelf="center"
          flex={0.3}
          size={'md'}
          textAlign="center"
          color="#fff">
          Role
        </Heading>
      </HStack>
      <FlatList
        flex={0.9}
        data={data1}
        VirtualizedList={10}
        renderItem={({item}) => (
          <HStack w="100%">
            <Box border={1} flex={0.3}>
              <Text numberOfLines={1}>{item._id}</Text>
            </Box>
            <Box border={1} flex={0.4}>
              <Text numberOfLines={1} ml={1}>
                {item.username}
              </Text>
            </Box>
            <Box border={1} flex={0.3} textAlign="center">
              <Text numberOfLines={1}>{item.role}</Text>
            </Box>
          </HStack>
        )}
        keyExtractor={item => item._id}
      />
      <HStack flex={0.1} justifyContent="space-between" margin={5}>
        <Button
          disabled={currentPage > 1 ? false : true}
          colorScheme="cyan"
          _text={{color: 'white'}}
          onPress={() => handleCurrentPage(-1)}>
          Previous page
        </Button>

        <Button
          disabled={Math.ceil(data.length / 20) > currentPage ? false : true}
          colorScheme="cyan"
          _text={{color: 'white'}}
          onPress={() => handleCurrentPage(+1)}>
          Next Page
        </Button>
      </HStack>
    </VStack>
  );
};
export default UserList;
