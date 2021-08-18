import {createStore, combineReducers, applyMiddleware} from 'redux';
import TodoReducer from './Reducer/TodoReducer';
import createSagaMiddleware from 'redux-saga';
import Sagas from './Saga';
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  TodoReducer: TodoReducer,
});

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(Sagas);
export default configureStore;
