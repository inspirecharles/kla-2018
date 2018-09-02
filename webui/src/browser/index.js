import React from "react";
import {render, hydrate} from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import allReducers from '../shared/reducers';
import App from "../shared/App";
import 'bootstrap';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(allReducers, preloadedState,
	applyMiddleware(thunk),
	applyMiddleware(logger)
)

render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root"));