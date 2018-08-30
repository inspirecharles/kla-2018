import serialize from "serialize-javascript"
import compression from "compression";
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import allReducers from '../shared/reducers'
import App from "../shared/App";
import sourceMapSupport from "source-map-support";

if(process.env.NODE_ENV === "development"){
	sourceMapSupport.install();
}

const app = express();

app.use(compression())
app.use(express.static("public"));
app.use(handleRender);

function handleRender(req, res) {
	const staticContext = {};
  	const store = createStore(allReducers,
		applyMiddleware(thunk)
	);

  	const html = renderToString(
    	<Provider store={store}>
    		<StaticRouter location={req.url} context={staticContext}>
      			<App />
      		</StaticRouter>
    	</Provider>
  	)

  	const preloadedState = store.getState();
  	res.send(renderFullPage(html, preloadedState));
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

app.get("*", (req,res) => {
	res.send(renderFullPage(html, preloadedState));
});

app.listen(3001, () => {
	console.log("Server is listening "+process.env.PORT+" || "+3000);
});
