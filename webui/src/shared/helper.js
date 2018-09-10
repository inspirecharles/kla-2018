export function createGameUrlSlug(game_slug){
	return game_slug.replace("_", "-");
}

export function	createResultLink(game){
	return "/"+createGameUrlSlug(game.slug)+"/draw-"+( (game.results && game.results.length)? game.results[0].draw_id:"" ) 
}