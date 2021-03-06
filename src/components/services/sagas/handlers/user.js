import {call, put} from 'redux-saga/effects';
import {axiosCall} from '../requests/user';
import {
  loginSuccess,
  signupSuccess,
  signupError,
  loginError,
  accessToken,
} from '../../Action/ActionPoll';
import AsyncStorage from '@react-native-community/async-storage';

async function setToLocalStorage(token) {
  await AsyncStorage.setItem('AceessToken', token);
}

export function* handleloginUser(action) {
  try {
    const response = yield call(
      axiosCall,
      'get',
      `/login?username=${action.payload.name}&password=${action.payload.password}`,
    );
    if (response.data.error === 0) {
      setToLocalStorage(response.data.token);
      yield put(accessToken(response.data.token));
      yield put(loginSuccess(response.data.token, action.payload));
    } else {
      yield put(loginError(response.data, action.payload));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* handlelSignUpUser(action) {
  try {
    const response = yield call(
      axiosCall,
      'post',
      `/add_user?username=${action.payload.name}&password=${action.payload.password}&role=${action.payload.role}`,
    );
    if (response.data.error === 0) {
      yield put(signupSuccess(response.data, action.payload));
    } else {
      yield put(signupError(response.data, action.payload));
    }
  } catch (e) {
    console.log(e);
  }
}

// export function* handlelistUsers(action) {
//   try {
//     const response = yield call(axiosCall, "get", `/list_users`);
//     if (response) {
//       yield put(setlistUsers(response.data));
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
