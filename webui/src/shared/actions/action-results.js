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

export const exportResults = (game, draw_date, draw_date_to) => (dispatch, getState) => {
	window.location = getState().env.API_URL+"/results/exportresults?game="+game+"&draw_date="+draw_date+"&draw_date_to="+draw_date_to;
}

export const exportResultByDrawId = (game, draw_id) => (dispatch, getState) => {
	window.location = getState().env.API_URL+"/results/exportresults?game="+game+"&draw_id="+draw_id;
}