import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
const FETCH_NEWS_SLIDER_SUCCESS = 'FETCH_NEWS_SLIDER_SUCCESS';
const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

const requestNews = () => ({ type: FETCH_NEWS_REQUEST });
const receivedNews = news => ({ type: FETCH_NEWS_SUCCESS, payload: news });
const receivedNewsSlider = news => ({ type: FETCH_NEWS_SLIDER_SUCCESS, payload: news });
const NewsError = () => ({ type: FETCH_NEWS_FAILURE });

export const fetchNews = () => (dispatch, getState) => {
  dispatch(requestNews());
  return fetch(getState().env.API_URL+"/news?sort=-date_submitted")
    .then(response => response.json())
    .then(news => dispatch(receivedNews(news)))
    .catch(err => dispatch(NewsError(err)));
};

export const fetchNewsForSlider = () => (dispatch, getState) => {
  //dispatch(requestNews());
  return fetch(getState().env.API_URL+"/news?sort=-date_submitted&page=1&per-page=6")
    .then(response => response.json())
    .then(news => dispatch(receivedNewsSlider(news)))
    .catch(err => dispatch(NewsError(err)));
};