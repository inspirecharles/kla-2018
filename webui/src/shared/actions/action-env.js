import "es6-promise/auto";
import fetch from "isomorphic-fetch";

const SET_ENV_SUCCESS = 'SET_ENV_SUCCESS';

const receivedEnv = env => ({ type: SET_ENV_SUCCESS, payload: env });

export const fetchEnv = (env) => (dispatch, getState) => {
  	return dispatch(receivedEnv(env));
};