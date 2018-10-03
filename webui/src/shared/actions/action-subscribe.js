import "es6-promise/auto";
import fetch from "isomorphic-fetch";

export const saveEmail = (email) => (dispatch, getState) => {
  return fetch(getState().env.API_URL+"/subscription/saveemail?email="+email)
    .then(response => response.json())
    .then(games => {
    	console.log(games);
    })
    .catch(err => dispatch(gamesError(err)));
};

