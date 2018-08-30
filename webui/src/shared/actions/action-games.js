import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const UPDATE_GAMES = 'UPDATE_GAMES';

export const updateGames = (data) => {
  
  var request = fetch('http://api.kla-uk.lan/games', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'mode': 'no-cors',
      }
    })
	
	return (dispatch) => {
		request.then((response) => {
	    	return response.json()
	    }).then((data) => {
	      	console.log(data)
	      	return {error: 'Could not finish mutation, because only movies exist.'}
	    }).catch((error) => {
	      	console.log(error)
	      	return {error: 'Could not connect to API'}
	    })
	}
}