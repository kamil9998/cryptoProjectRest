import axios from 'axios';
import { browserHistory } from 'react-router';
import * as balanceHelpers from '../utils/balanceHelpers';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_APIKEY,
  FETCH_BALANCE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ 
          type: FETCH_APIKEY,
          payload: response.data.apikey
        });
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/balance');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password, binancekey, bitbaykey }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, binancekey, bitbaykey })
      .then(response => {
        
        dispatch({ 
          type: FETCH_APIKEY,
          payload: response.data.apikey
        });
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function clearAuthError() {
  return {
    type: CLEAR_AUTH_ERROR
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}

export function fetchBalance() {
  return {
    type: FETCH_BALANCE,
    payload: 'dsa'
  };
}


