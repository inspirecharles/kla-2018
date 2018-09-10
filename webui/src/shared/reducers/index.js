import {combineReducers} from 'redux';

import EnvReducer	from './reducer-env';
import AccountReducer	from './reducer-account';
import GameReducer	from './reducer-games';
import ResultReducer	from './reducer-results';


const allReducers = combineReducers({
	accounts: AccountReducer,
	games: GameReducer,
	results: ResultReducer,
	env: EnvReducer,
});

export default allReducers;