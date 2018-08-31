import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST';
const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE';

const requestGames = () => ({ type: FETCH_GAMES_REQUEST });
const receivedGames = games => ({ type: FETCH_GAMES_SUCCESS, payload: games });
const gamesError = () => ({ type: FETCH_GAMES_FAILURE });

export const fetchGames = () => (dispatch, getState) => {
  dispatch(requestGames());
  return fetch("http://api.kla-uk.lan/games")
    .then(response => response.json())
    .then(games => dispatch(receivedGames(games)))
    .catch(err => dispatch(gamesError(err)));
};