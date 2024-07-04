import * as types from '@constants/actionTypes';
import { NavAction } from '@src/types/navigation'

const initState = {
  lastScreen: null,
  reversedRtl: false,
};

const navigationReducer = (state = initState, action: NavAction) => {
  switch (action.type) {
    case types.SET_LAST_SCREEN:
      return {...state, lastScreen: action.payload};
    case types.REVERSED_RTL:
      return {...state, reversedRtl: action.payload};
    default:
      return state;
  }
};
export default navigationReducer;
