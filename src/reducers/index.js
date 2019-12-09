import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import smsReducer from './smsReducer';
import examReducer from './examReducer';
import studentReducer from './studentReducer';




export default combineReducers ({
    loginReducer,
    smsReducer,
    examReducer,
    studentReducer
});
