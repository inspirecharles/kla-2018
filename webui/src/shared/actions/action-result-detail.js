import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_RESULT_DETAIL_REQUEST = 'FETCH_RESULT_DETAIL_REQUEST';
const FETCH_RESULT_DETAIL_SUCCESS = 'FETCH_RESULT_DETAIL_SUCCESS';
const FETCH_RESULT_DETAIL_FAILURE = 'FETCH_RESULT_DETAIL_FAILURE';
const EMPTY_RESULT_DETAIL_FAILURE = 'EMPTY_RESULT_DETAIL_FAILURE';


const requestResult = () => ({ type: FETCH_RESULT_DETAIL_REQUEST });
const receivedResult = result => ({ type: FETCH_RESULT_DETAIL_SUCCESS, payload: result });
const resultError = () => ({ type: FETCH_RESULT_DETAIL_FAILURE });
const emptyResult = () => ({ type: EMPTY_RESULT_DETAIL_FAILURE });

async function requesting(){
	return await dispatch(requestResult());
}

export const emptyResultDetail = () => (dispatch, getState) => {
	return dispatch( emptyResult() );
}

export const fetchResultByGame = (game_slug) => (dispatch, getState) => {
  	return fetch(getState().env.API_URL+"/results/fetchbygame?game_slug="+(game_slug && game_slug.replace("-", "_")) )
	    .then(response => response.json())
	    .then(result => dispatch(receivedResult(result)))
	    .catch(err => dispatch(resultError(err)));
};

export const fetchResultByGameAndDrawId = (game_slug, draw_id) => (dispatch, getState) => {
  	return fetch(getState().env.API_URL+"/results/fetchbygameanddrawid?game_slug="+(game_slug && game_slug.replace("-", "_"))+ "&draw_id="+(draw_id && draw_id.replace("draw-","")))
	    .then(response => response.json())
	    .then(result => dispatch(receivedResult(result)))
	    .catch(err => dispatch(resultError(err)));
};

export const fetchLatestResultDrawByGame = (game_slug) => (dispatch, getState) => {
	return fetch(getState().env.API_URL+"/results/fetchbygame?game_slug="+(game_slug && game_slug.replace("-", "_")))
	    .then(response => response.json())
	    .then(result => dispatch(receivedResult(result)))
	    .catch(err => dispatch(resultError(err)));
}

export const searchResult = ( game_slug, search_data ) => (dispatch, getState) => {
	return fetch(getState().env.API_URL+"/results/search?game_slug="+game_slug+"&search_data="+JSON.stringify(search_data))
	    .then(response => response.json())
	    .then(result => dispatch(receivedResult(result)))
	    .catch(err => dispatch(resultError(err)));
}