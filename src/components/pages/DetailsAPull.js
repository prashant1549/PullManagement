import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  reqPollById,
  editTitleReq,
  addVoteReq,
  deleteOptionReq,
  addOptionReq,
  deletePollReq,
} from '../services/Action/ActionPoll';
import {
  FormControl,
  HStack,
  Input,
  useToast,
  VStack,
  Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
const DetailsAPull = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [editButton, setEditButton] = useState(false);
  const [data, setData] = useState({});
  const [editTitle, setTitle] = useState('');
  const [addOption, setOption] = useState('');
  const [count1, setCount1] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const Data = useSelector(state => state.singlePoll);
  useEffect(async () => {
    const id = await AsyncStorage.getItem('itemId');
    dispatch(reqPollById(id));
  }, []);
  const handleEdit = async value => {
    if (value === true) {
      setTitle(Data.singlePoll.data.title);
      setEditButton(value);
    } else {
      const id = await AsyncStorage.getItem('itemId');
      const data = {id, editTitle};
      dispatch(editTitleReq(data));
      if (Data.isloadingtitle === false) {
        toast.show({
          title: 'Title update',
          status: 'success',
          description: 'Successfully your tiltle is update',
        });
      }
      setTitle('');
      setEditButton(value);
    }
  };
  const hanldeVote = async option => {
    const id = Data.singlePoll.data._id;
    dispatch(addVoteReq({id, option}));
    toast.show({
      title: 'Add Vote',
      status: 'success',
      description: 'Successfully your add Vote',
    });
  };
  const handleDeletePollOption = async option => {
    dispatch(
      deleteOptionReq({
        id: Data.singlePoll.data._id,
        text: option,
      }),
    );
    toast.show({
      title: 'Delete Poll Option',
      status: 'success',
      description: 'Successfully your Delete Poll option',
    });
  };
  const handleAddOption = async option => {
    const id = await AsyncStorage.getItem('itemId');
    const data = {id, addOption};
    dispatch(addOptionReq(data));
    if (Data.isloadingAddOption === false) {
      toast.show({
        title: 'Add Option',
        status: 'success',
        description: 'Successfully your add option',
      });
    }
    setOption('');
    setModalVisible(!modalVisible);
  };
  const handleDeleteCount = async () => {
    setCount1(3);
    setModalVisible(!modalVisible);
  };
  const handleDeletePoll = async () => {
    const id = await AsyncStorage.getItem('itemId');
    dispatch(deletePollReq(id));
    toast.show({
      title: 'Delete poll',
      status: 'success',
      description: 'Successfully your Delete Poll',
    });
    setCount1(-1);
    setModalVisible(!modalVisible);
    navigation.navigate('Polls List');
  };
  return (
    <>
      {Data.isloadingSinglePoll === true ? (
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="#fff">
          <HStack space={2}>
            <Spinner accessibilityLabel="Loading posts" />
          </HStack>
        </VStack>
      ) : (
        <>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.1,
                height: 100,
                paddingVertical: 10,
                flexDirection: 'row',
                marginTop: 10,
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
              }}>
              <View style={{flex: 0.5, alignSelf: 'center'}}>
                {editButton === false ? (
                  <Text style={{fontSize: 20, marginHorizontal: 10}}>
                    {Data.isloadingtitle === false ? (
                      Data.singlePoll.data ? (
                        Data.singlePoll.data.title
                      ) : (
                        ''
                      )
                    ) : (
                      <Spinner accessibilityLabel="Loading posts" />
                    )}
                  </Text>
                ) : (
                  <FormControl>
                    <Input
                      height={10}
                      placeholder="Enter username"
                      onChangeText={e => setTitle(e)}
                      value={editTitle}
                    />
                  </FormControl>
                )}
              </View>
              <View
                style={{
                  flex: 0.5,
                  alignSelf: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    width: 100,
                    left: 20,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    justifyContent: 'center',
                  }}
                  onPress={() => handleEdit(!editButton)}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    {editButton === false ? (
                      <Icon name="edit" size={30} color="blue" />
                    ) : (
                      <Icon name="update" size={30} color="blue" />
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              style={{flex: 0.8}}
              data={Data.singlePoll.data ? Data.singlePoll.data.options : ''}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <View
                  style={{
                    height: 80,
                    flexDirection: 'row',
                    margin: 10,
                    alignSelf: 'center',
                    backgroundColor: '#FFFFFF',
                  }}>
                  <View
                    style={{flex: 4, justifyContent: 'center', marginLeft: 5}}>
                    <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                      {item.option}{' '}
                    </Text>
                  </View>
                  <View
                    style={{flex: 2, justifyContent: 'center', marginLeft: 5}}>
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                        width: 100,
                        height: 50,
                        borderRadius: 10,
                        backgroundColor: 'lightpink',
                        justifyContent: 'center',
                      }}
                      onPress={() => hanldeVote(item.option)}>
                      <Text
                        numberOfLines={1}
                        style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Vote : {item.vote}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      marginLeft: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => handleDeletePollOption(item.option)}>
                      <Icon name="delete" size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <View
              style={{
                flex: 0.1,
                height: 100,
                flexDirection: 'row',
                paddingVertical: 10,
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
              }}>
              <View style={{flex: 0.5, alignSelf: 'center'}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    width: 100,

                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    justifyContent: 'center',
                  }}
                  onPress={() => handleDeleteCount()}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 15,
                    }}>
                    <Icon name="delete" size={30} color="red" />
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 0.5,
                  alignSelf: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    width: 100,
                    left: 20,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'lightblue',
                    justifyContent: 'center',
                  }}
                  onPress={() => setModalVisible(true)}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      fontSize: 15,
                    }}>
                    <Icon name="library-add" size={30} color="blue" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.modalView}>
                {count1 >= 0 ? (
                  <Text>Are you sure want to delete?</Text>
                ) : (
                  <FormControl>
                    <Input
                      width={200}
                      height={10}
                      placeholder="Enter username"
                      onChangeText={e => setOption(e)}
                      value={addOption}
                    />
                  </FormControl>
                )}

                <HStack>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                  {count1 < 0 ? (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => handleAddOption()}>
                      <Text style={styles.textStyle}>Add Poll Option</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => handleDeletePoll()}>
                      <Text style={styles.textStyle}>Ok</Text>
                    </TouchableOpacity>
                  )}
                </HStack>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    marginRight: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default DetailsAPull;
