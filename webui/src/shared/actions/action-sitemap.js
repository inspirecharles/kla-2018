import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const FETCH_SITEMAP_SUCCESS = 'FETCH_SITEMAP_SUCCESS';
const EMPTY_SITEMAP_FAILURE = 'EMPTY_SITEMAP_FAILURE';


const receivedSitemap = result => ({ type: FETCH_SITEMAP_SUCCESS, payload: result });
const resultError = err => ({ type: EMPTY_SITEMAP_FAILURE, payload: err });

async function requesting(){
	return await dispatch(requestResult());
}

export const fetchSiteMapData = () => (dispatch, getState) => {
  	return fetch(getState().env.API_URL+"/site/getsitemapdata")
	    .then(response => response.json())
	    .then(result => dispatch(receivedSitemap(result)))
	    .catch(err => dispatch(resultError(err)));
};