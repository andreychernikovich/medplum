import * as types from '@constants/actionTypes';
import { Device } from '@src/types/ble'
import { Observation } from '@src/types/observation';

export const reset = () => {
  return {
    type: types.RESET,
  };
};

export const addDevice = (device: Device) => {
  return {
    type: types.ADD_DEVICE,
    payload: device,
  };
};

export const updateDevice = (device: Device) => {
  return {
    type: types.UPDATE_DEVICE,
    payload: device,
  };
};

export const setMessage = (message: string) => {
  return {
    type: types.SET_MESSAGE,
    payload: message,
  };
};

export const setDevice = (device: Device) => {
  return {
    type: types.SET_DEVICE,
    payload: device,
  };
};

export const setLoading = (loading: boolean) => {
  return {
    type: types.SET_LOADING,
    payload: loading,
  };
};

export const setMeasurement = (measurements: Array<Observation>) => {
  return {
    type: types.SET_MEASUREMENT,
    payload: measurements,
  };
};
