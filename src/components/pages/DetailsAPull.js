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
import {useSelector} from 'react-redux';
import axios from 'axios';
import {FormControl, HStack, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const DetailsAPull = ({navigation}) => {
  const [editButton, setEditButton] = useState(false);
  const [data, setData] = useState({});
  const [editTitle, setTitle] = useState('');
  const [addOption, setOption] = useState('');
  const [count, setCount] = useState(-1);
  const [count1, setCount1] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const Data = useSelector(state => state.TodoReducer.pollDetails);
  const tokenStr = useSelector(state => state.TodoReducer.token);
  const handleEdit = async value => {
    if (value === true) {
      setTitle(Data.title);
      setEditButton(value);
    } else {
      try {
        const edittitle = await axios.post(
          `https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${Data._id}&title=${editTitle}`,
          {},
          {headers: {access_token: tokenStr}},
        );
        const token = await axios.get(
          `https://secure-refuge-14993.herokuapp.com/list_poll?id=${Data._id}`,
        );
        setData(token.data.data);
        setTitle('');
        setEditButton(value);
        setCount(1);
      } catch (error) {}
    }
  };
  const hanldeVote = async option => {
    setCount(1);
    console.log(option);
    try {
      const edittitle = await axios.post(
        `https://secure-refuge-14993.herokuapp.com/do_vote?id=${Data._id}&option_text=${option}`,
        {},
        {headers: {access_token: tokenStr}},
      );
      const token = await axios.get(
        `https://secure-refuge-14993.herokuapp.com/list_poll?id=${Data._id}`,
      );
      setData(token.data.data);
    } catch (error) {
      //   setError(error);
    }
  };
  const handleDeletePollOption = async option => {
    try {
      const edittitle = await axios.post(
        `https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${Data._id}&option_text=${option}`,
        {},
        {headers: {access_token: tokenStr}},
      );
      const token = await axios.get(
        `https://secure-refuge-14993.herokuapp.com/list_poll?id=${Data._id}`,
      );
      setData(token.data.data);
      setCount(1);
    } catch (error) {
      //   setError(error);
    }
  };
  const handleAddOption = async option => {
    try {
      const edittitle = await axios.post(
        `https://secure-refuge-14993.herokuapp.com/add_new_option?id=${Data._id}&option_text=${addOption}`,
        {},
        {headers: {access_token: tokenStr}},
      );
      const token = await axios.get(
        `https://secure-refuge-14993.herokuapp.com/list_poll?id=${Data._id}`,
      );
      setData(token.data.data);
      setCount(1);
      setOption('');
      setModalVisible(!modalVisible);
    } catch (error) {
      //   setError(error);
    }
  };
  const handleDeleteCount = async () => {
    setCount1(3);
    setModalVisible(!modalVisible);
  };
  const handleDeletePoll = async () => {
    console.log('amsnkajn');
    try {
      const edittitle = await axios.post(
        ` https://secure-refuge-14993.herokuapp.com/delete_poll?id=${Data._id}`,
        {},
        {headers: {access_token: tokenStr}},
      );
      console.log(editTitle.data);
      setCount1(-1);
      setModalVisible(!modalVisible);
      navigation.navigate('Polls List');
    } catch (error) {
      //   setError(error);
    }
  };
  return (
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
                {count > 0 ? data.title : Data.title}
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
            style={{flex: 0.5, alignSelf: 'center', alignItems: 'flex-end'}}>
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
                {editButton === false ? 'Edit' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={{flex: 0.8}}
          data={count > 0 ? data.options : Data.options}
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
              <View style={{flex: 4, justifyContent: 'center', marginLeft: 5}}>
                <Text numberOfLines={1} style={{fontWeight: 'bold'}}>
                  {item.option}{' '}
                </Text>
              </View>
              <View style={{flex: 2, justifyContent: 'center', marginLeft: 5}}>
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
                Delete Poll
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 0.5, alignSelf: 'center', alignItems: 'flex-end'}}>
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
                Add Option
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
