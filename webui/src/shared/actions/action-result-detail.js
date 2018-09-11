import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_RESULT_DETAIL_REQUEST = 'FETCH_RESULT_DETAIL_REQUEST';
const FETCH_RESULT_DETAIL_SUCCESS = 'FETCH_RESULT_DETAIL_SUCCESS';
const FETCH_RESULT_DETAIL_FAILURE = 'FETCH_RESULT_DETAIL_FAILURE';

const requestResult = () => ({ type: FETCH_RESULT_DETAIL_REQUEST });
const receivedResult = result => ({ type: FETCH_RESULT_DETAIL_SUCCESS, payload: result });
const resultError = () => ({ type: FETCH_RESULT_DETAIL_FAILURE });

export const fetchResultByGameAndDrawId = (game_slug, draw_id) => (dispatch, getState) => {
  dispatch(requestResult());
  return fetch(getState().env.API_URL+"/results/fetchbygameanddrawid?game_slug="+(game_slug && game_slug.replace("-", "_"))+"&draw_id="+(draw_id && draw_id.replace("draw-","")))
    .then(response => response.json())
    .then(result => dispatch(receivedResult(result)))
    .catch(err => dispatch(resultError(err)));
};