import {combineReducers} 	from 'redux';

import EnvReducer			from './reducer-env';
import AccountReducer		from './reducer-account';
import GameReducer			from './reducer-games';
import ResultsReducer		from './reducer-results';
import ResultReducer		from './reducer-result-detail';
import NewsReducer			from './reducer-news';
import NewsDetailReducer	from './reducer-news-detail';
import NewsSliderReducer	from './reducer-news-slider';
import SiteMapReducer		from './reducer-sitemap';


const allReducers = combineReducers({
	accounts: AccountReducer,
	games: GameReducer,
	results: ResultsReducer,
	result_detail: ResultReducer,
	env: EnvReducer,
	sitemap: SiteMapReducer,
	news: NewsReducer,
	news_slider: NewsSliderReducer,
	news_detail: NewsDetailReducer,
});

export default allReducers;