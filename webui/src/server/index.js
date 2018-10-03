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
import sm from 'sitemap';
import fs from 'fs';

import allReducers from '../shared/reducers'
import App from "../shared/App";
import sourceMapSupport from "source-map-support";
import routes from "../shared/routes";

import {createGameUrlSlug} from "../shared/helper";
import {fetchEnv} from "../shared/actions/action-env";
import {fetchSiteMapData} from "../shared/actions/action-sitemap";
import {parse} from "env-file-reader";
const envs = parse('.env');

if(process.env.NODE_ENV === "development"){
	sourceMapSupport.install();
}


const app = express();

app.use(compression())
app.use(express.static("public"));

function handleRender(req, res, next) {
  	const store = createStore(allReducers,
		applyMiddleware(thunk)
	);
	store.dispatch(fetchEnv(envs));

	const promises = routes.reduce((acc, route) => {
		var props = matchPath(req.url, route);
	    if ( props && route.component && route.component.initialAction) {
	    	if( props.path == '/:game_slug' ){
	    		acc.push(Promise.resolve(store.dispatch(route.component.initialAction( props.params.game_slug.replace("-", "_") ))));
	    	}
	    	else if( props.path == '/:game_slug/results/:draw_id?' ){
	    		acc.push(Promise.resolve(store.dispatch(route.component.initialAction( props.params.game_slug.replace("-", "_"), (props.params.draw_id && props.params.draw_id.replace("draw-", "")) || null ))));
	    	}
	    	else if( props.path == '/news/:slug' ){
	    		acc.push(Promise.resolve(store.dispatch(route.component.initialAction( props.params.slug ))));
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
				<div id="print-me"></div>
				<div id="root">${html}</div>
			</body>
			<script>window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>
			<script type="text/javascript" src="/bundle.js" async></script>
		</html>
	`;
}

function generateSiteMap(req,res,next){
	const store = createStore(allReducers,
		applyMiddleware(thunk)
	);
	store.dispatch(fetchEnv(envs));
	var urls = [];

	/* for fix routes */
	routes.forEach((route,index) => {
		if(!route.path.includes(":")){
			var default_priority = null;
			var default_changefreq = null;
			if( route.path == "/" ){
				default_priority = 1;
				default_changefreq = 'daily';
			}
			urls.push({
    			url: route.path,
    			priority: default_priority ? default_priority : 0.8,
    			changefreq: default_changefreq ? default_changefreq : 'monthly'
    		});
    	}
	})

    let promise = Promise.resolve(store.dispatch(fetchSiteMapData()));
    promise.then(function(){
    	const sitemap_data = store.getState().sitemap;

    	/* for each games */
    	sitemap_data.games.forEach(( game, index ) => {
    		var game_url = "/"+createGameUrlSlug(game.slug);
    		urls.push({
    			url: game_url,
    			priority: 0.8,
    			changefreq: 'weekly'
    		})

    		/* for each results */
    		game.results.forEach((result, index) =>{
    			urls.push({
    				url: game_url+"/draw-"+result.draw_id,
    				priority: 0.8,
    				changefreq: 'monthly'
    			})
    		})
    	})

	    const sitemap = sm.createSitemap({
		    hostname: envs.APP_URL,
		    urls: urls,
		});

		fs.writeFileSync('./public/sitemap.xml', sitemap.toString());	
		res.end('sitemap.xml has been generated to public/sitemap.xml');
    })
}

app.get("/generate-sitemap", async (req,res,next) => {
	generateSiteMap(req,res,next);
})

app.use(handleRender);

app.listen(envs.APP_PORT, () => {
	console.log("Server is listening "+envs.APP_PORT);
});