import { combineReducers } from 'redux';

//Reducers
import authReducer from './authReducer';

const rootReducer = combineReducers({
	auth: authReducer
});

export default rootReducer;


