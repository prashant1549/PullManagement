import * as React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import UserList from './UserList';
import PullList from './PullList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  NativeBaseProvider,
  Button,
  Box,
  HamburgerIcon,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
} from 'native-base';
import Logout from './Logout';
import AddPull from './AddPull';

const Drawer = createDrawerNavigator();

const getIcon = screenName => {
  switch (screenName) {
    case 'Polls List':
      return 'home';
    case 'User List':
      return 'list';
    case 'Create Poll':
      return 'person-add';
    case 'logout':
      return 'logout';

    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space={6} my={2} mx={1}>
        <Box px={4}>
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
            john_doe@gmail.com
          </Text>
        </Box>
        <VStack divider={<Divider />} space={4}>
          <VStack space={3}>
            {props.state.routeNames.map((name, index) => (
              <Pressable
                key={index}
                px={5}
                py={3}
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={event => {
                  props.navigation.navigate(name);
                }}>
                <HStack space={7} alignItems="center">
                  <Icon size={30} color="#900" name={getIcon(name)} />
                  <Text
                    fontWeight={500}
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
export default function MyDrawer() {
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1}>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Polls List" component={PullList} />
          <Drawer.Screen name="User List" component={UserList} />
          <Drawer.Screen name="Create Poll" component={AddPull} />
          <Drawer.Screen name="logout" component={Logout} />
        </Drawer.Navigator>
      </Box>
    </NativeBaseProvider>
  );
}
