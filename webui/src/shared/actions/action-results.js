import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_RESULT_REQUEST = 'FETCH_RESULT_REQUEST';
const FETCH_RESULT_SUCCESS = 'FETCH_RESULT_SUCCESS';
const FETCH_RESULT_FAILURE = 'FETCH_RESULT_FAILURE';

const requestResults = () => ({ type: FETCH_RESULT_REQUEST });
const receivedResults = results => ({ type: FETCH_RESULT_SUCCESS, payload: results });
const resultsError = () => ({ type: FETCH_RESULT_FAILURE });

export const fetchResults = () => (dispatch, getState) => {
  dispatch(requestResults());
  return fetch(getState().env.API_URL+"/results")
    .then(response => response.json())
    .then(results => dispatch(receivedResults(results)))
    .catch(err => dispatch(resultsError(err)));
};

export const fetchResultByGameAndDrawId = (game_slug, draw_id) => (dispatch, getState) => {
  dispatch(requestResults());
  return fetch(getState().env.API_URL+"/results/fetchbygameanddrawid?game_slug="+(game_slug && game_slug.replace("-", "_"))+"&draw_id="+(draw_id && draw_id.replace("draw-","")))
  //return fetch(getState().env.API_URL+"/results/fetchbygameanddrawid?game_slug=euro_millions&draw_id=1142")
    .then(response => response.json())
    .then(results => dispatch(receivedResults(results)))
    .catch(err => dispatch(resultsError(err)));
};