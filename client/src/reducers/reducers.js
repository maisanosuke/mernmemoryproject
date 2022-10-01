import {combineReducers} from 'redux';
import postReducer from './postReducer';
import editingIdReducer from './editingIdReducer';
import userReducer from './userReducer';

export default combineReducers({
    posts: postReducer,
    editingId: editingIdReducer,
    user: userReducer,
})