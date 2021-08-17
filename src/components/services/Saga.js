import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {ASYN_DATA, LIST_POLL} from './Action/Type';
// import {asyncData, addListPoll} from './actions';
import {asyncData, addListPoll} from './Action/Todo';

async function* fetchUser() {
  try {
    const data = await axios.get(
      'https://secure-refuge-14993.herokuapp.com/list_users',
    );

    yield put(asyncData(data.data.data));
  } catch (e) {}
}
async function* fetchPollList() {
  try {
    const data = await axios.get(
      'https://secure-refuge-14993.herokuapp.com/list_polls',
    );

    yield put(addListPoll(data.data.data));
  } catch (e) {}
}

function* Sagas() {
  yield takeLatest(ASYN_DATA, fetchUser);
  yield takeLatest(LIST_POLL, fetchPollList);
  // yield takeLatest(FETCH_SMURF_DATA, onFetchSmurfData);
}

export default Sagas;
