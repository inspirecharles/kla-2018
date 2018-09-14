import serialize from "serialize-javascript"
import compression from "compression";
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from "react-router-dom";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import allReducers from '../shared/reducers'
import App from "../shared/App";
import sourceMapSupport from "source-map-support";
import routes from "../shared/routes";

import {fetchEnv} from "../shared/actions/action-env";
import {parse} from "env-file-reader";
const envs = parse('.env');

if(process.env.NODE_ENV === "development"){
	sourceMapSupport.install();
}


const app = express();

app.use(compression())
app.use(express.static("public"));
app.use(handleRender);

function handleRender(req, res, next) {
  	const store = createStore(allReducers,
		applyMiddleware(thunk)
	);
	store.dispatch(fetchEnv(envs));

	const promises = routes.reduce((acc, route) => {
		var props = matchPath(req.url, route);
	    if ( props && route.component && route.component.initialAction) {
	    	if( props.params.game_slug && props.params.draw_id ){	
	    		acc.push(Promise.resolve(store.dispatch(route.component.initialAction( props.params.game_slug.replace("-", "_"), props.params.draw_id.replace("draw-","") ))));
	    	}
	    	else{
	      		acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
	    	}
	    }
	    return acc;
	}, []);

	Promise.all(promises)
    .then((data) => {
		const staticContext = {data};
    	const html = renderToString(
	    	<Provider store={store}>
	    		<StaticRouter location={req.url} context={staticContext}>
	      			<App />
	      		</StaticRouter>
	    	</Provider>
	  	)
	  	const preloadedState = store.getState();
	  	res.send(renderFullPage(html, preloadedState));
    }).catch(next);  	
}

function renderFullPage(html, preloadedState) {
	return `
		<!DOCTYPE html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Test</title>
				<link rel="stylesheet" type="text/css" href="/css/main.css">
			</head>
			<body>
				<div id="root">${html}</div>
			</body>
			<script>window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>
			<script type="text/javascript" src="/bundle.js" async></script>
		</html>
	`;
}

app.get("/", (req,res, next) => {
	handleRender(req, res, next);
});

app.listen(envs.APP_PORT, () => {
	console.log("Server is listening "+envs.APP_PORT);
});
