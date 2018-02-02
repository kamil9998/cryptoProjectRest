import {
  FETCH_BALANCE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_BALANCE:
      return { ...state, balance: action.payload };
  }

  return state;
}
  