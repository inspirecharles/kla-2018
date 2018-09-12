import React, { Component } from "react";

export function createGameUrlSlug(game_slug){
	return game_slug.replace("_", "-");
}

export function	createResultLink(game){
	return "/"+createGameUrlSlug(game.slug)+"/draw-"+( (game.results && game.results.length)? game.results[0].draw_id:"" ) 
}

export function	renderDividends(dividends, type = 'lotto_dividends'){
	if( dividends ){
		dividends = JSON.parse(dividends);
		return (
			<div className="dividends-table" dangerouslySetInnerHTML={{ __html: dividends[type]}}></div>
		)
	}
}