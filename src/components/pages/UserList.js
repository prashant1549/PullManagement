import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {asyncData} from '../services/Action/Todo';
import axios from 'axios';
import {paginate} from './Paginate';
import {Text, FlatList, HStack, Heading, VStack, Button} from 'native-base';
const UserList = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(0);
  useEffect(async () => {
    const data = await axios.get(
      'https://secure-refuge-14993.herokuapp.com/list_users',
    );
    dispatch(asyncData(data.data.data));
  }, [navigation]);
  const data = useSelector(state => state.TodoReducer.cart);
  const handleCurrentPage = value => {
    setcurrentPage(currentPage => currentPage + value);
  };
  let data1 = paginate(data, currentPage, 20);
  console.log(data1);
  return (
    <VStack>
      <HStack backgroundColor="#000">
        <Heading flex={0.5} size={'md'} textAlign="center" color="#fff">
          Username
        </Heading>
        <Heading flex={0.5} size={'md'} textAlign="center" color="#fff">
          Role
        </Heading>
      </HStack>
      <FlatList
        data={data1}
        VirtualizedList={10}
        renderItem={({item}) => (
          <HStack w="100%" border={1}>
            <Text flex={0.5} ml={5}>
              {item.username}
            </Text>
            <Text flex={0.5} textAlign="center">
              {item.role}
            </Text>
          </HStack>
        )}
        keyExtractor={item => item._id}
      />
      <HStack justifyContent="space-between" margin={5}>
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
