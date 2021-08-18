import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showPollRequest} from '../services/Action/ActionPoll';
import {paginate} from './Paginate';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  FlatList,
  HStack,
  Heading,
  Divider,
  Button,
  Box,
  VStack,
} from 'native-base';
import {toUpper} from 'lodash';
const PullList = ({navigation}) => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(0);

  const poll = useSelector(state => state.poll);
  useEffect(() => {
    dispatch(showPollRequest());
  }, [dispatch]);
  // console.log(data);
  const handleCurrentPage = value => {
    setcurrentPage(currentPage => currentPage + value);
  };
  const handleItemId = async id => {
    await AsyncStorage.setItem('itemId', id);

    navigation.navigate('Details Of A Pull');
  };
  let data1 = paginate(poll.data.data, currentPage, 5);
  return (
    <VStack flex={1} backgroundColor="#fff">
      <FlatList
        flex={0.9}
        data={data1}
        renderItem={({item}) => (
          <Box style={styles.subcat} backgroundColor="gray.700">
            <Heading size="md" color="#fff" alignSelf="center">
              {toUpper(item.title)}
            </Heading>
            <Divider my={2} />

            <FlatList
              ml={4}
              data={item.options}
              renderItem={({item, index}) => (
                <View>
                  <Text color="#fff">
                    {index + 1}. {item.option}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
            <Button
              onPress={() => handleItemId(item._id)}
              m={3}
              colorScheme="cyan"
              _text={{color: 'white'}}>
              View Details
            </Button>
          </Box>
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
          disabled={
            poll.data.data
              ? Math.ceil(poll.data.data.length / 5) > currentPage
                ? false
                : true
              : ''
          }
          colorScheme="cyan"
          _text={{color: 'white'}}
          onPress={() => handleCurrentPage(+1)}>
          Next Page
        </Button>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  subcat: {
    margin: 10,
    shadowColor: '#000',
    textShadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.85,
    shadowRadius: 7.5,
    elevation: 9,
  },
});
export default PullList;
