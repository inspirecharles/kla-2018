import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const UPDATE_GAMES = 'UPDATE_GAMES';

export const updateGames = (data) => {
	const request = fetch('http://api.kla-uk.lan/games',{ 'Content-Type': 'application/json', mode:'no-cors' });
	
	return (dispatch) => {
		request.then((data) => {
			console.log(data);
			dispatch({
				type: UPDATE_GAMES,
				payload: data
			})
		});
	}
}