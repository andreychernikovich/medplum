import * as types from '@constants/actionTypes';

export const setLastScreen = (data: string) => ({
  type: types.SET_LAST_SCREEN,
  payload: data,
});

export const reversedRtl = (data: string) => ({
  type: types.REVERSED_RTL,
  payload: data,
});
