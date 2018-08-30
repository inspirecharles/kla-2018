import {combineReducers} from 'redux';

import AccountReducer	from './reducer-account';
import GameReducer	from './reducer-games';


const allReducers = combineReducers({
	accounts: AccountReducer,
	games: GameReducer,
});

export default allReducers;