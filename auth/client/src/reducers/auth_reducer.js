import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_BINANCEKEY,
  FETCH_BITBAYKEY
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case FETCH_BINANCEKEY:
      return { ...state, binancekey: action.payload };
    case FETCH_BITBAYKEY:
      return { ...state, bitbaykey: action.payload };
  }

  return state;
}
