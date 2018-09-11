import {combineReducers} from 'redux';

import EnvReducer		from './reducer-env';
import AccountReducer	from './reducer-account';
import GameReducer		from './reducer-games';
import ResultsReducer	from './reducer-results';
import ResultReducer	from './reducer-result-detail';


const allReducers = combineReducers({
	accounts: AccountReducer,
	games: GameReducer,
	results: ResultsReducer,
	result_detail: ResultReducer,
	env: EnvReducer,
});

export default allReducers;