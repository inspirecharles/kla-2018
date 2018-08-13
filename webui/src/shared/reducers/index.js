import {combineReducers} from 'redux';

import AccountReducer	from './reducer-account';


const allReducers = combineReducers({
	accounts: AccountReducer,
});

export default allReducers;