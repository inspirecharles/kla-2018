import {combineReducers} from 'redux';

import EnvReducer	from './reducer-env';
import AccountReducer	from './reducer-account';
import GameReducer	from './reducer-games';


const allReducers = combineReducers({
	accounts: AccountReducer,
	games: GameReducer,
	env: EnvReducer,
});

export default allReducers;