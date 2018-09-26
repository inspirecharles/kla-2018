import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST';
const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
const FETCH_GAMES_ONLY_SUCCESS = 'FETCH_GAMES_ONLY_SUCCESS';
const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE';
const EMPTY_GAMES = 'EMPTY_GAMES';

const requestGames = () => ({ type: FETCH_GAMES_REQUEST });
const receivedGames = games => ({ type: FETCH_GAMES_SUCCESS, payload: games });
const receivedGamesOnly = games => ({ type: FETCH_GAMES_ONLY_SUCCESS, payload: games });
const gamesError = () => ({ type: FETCH_GAMES_FAILURE });
const emptyGamesArray = () => ({ type: EMPTY_GAMES });

export const fetchGames = () => (dispatch, getState) => {
  dispatch(requestGames());
  return fetch(getState().env.API_URL+"/games?sort=priority")
    .then(response => response.json())
    .then(games => dispatch(receivedGamesOnly(games)))
    .catch(err => dispatch(gamesError(err)));
};

export const fetchHomeResultData = () => (dispatch, getState) => {
  dispatch(requestGames());
  return fetch(getState().env.API_URL+"/games/homeresultdata")
    .then(response => response.json())
    .then(games => dispatch(receivedGames(games)))
    .catch(err => dispatch(gamesError(err)));
};

export const emptyGames = () => (dispatch, getState) => {
  dispatch(emptyGamesArray());
}