import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addListPoll} from '../services/Action/Todo';
import axios from 'axios';
import {Text, FlatList, HStack, Heading, VStack} from 'native-base';
const ListOfPull = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const data = await axios.get(
      'https://secure-refuge-14993.herokuapp.com/list_polls',
    );
    // console.log(data.data.data);
    // dispatch(addListPoll(data.data.data));
  }, [navigation]);
  //   const data = useSelector(state => state.TodoReducer.cart);
  return (
    <VStack>
      {/* <HStack backgroundColor="#000">
        <Heading flex={0.5} size={'md'} textAlign="center" color="#fff">
          Username
        </Heading>
        <Heading flex={0.5} size={'md'} textAlign="center" color="#fff">
          Role
        </Heading>
      </HStack>
      <FlatList
        data={data}
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
      /> */}
    </VStack>
  );
};
export default ListOfPull;
