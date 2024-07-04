import * as types from "@constants/actionTypes";
import { BleAction, Device } from "@src/types/ble";

let initialState = {
  device: { id: "", name: "", isConnected: false, isConnecting: false },
  devices: [],
  message: "",
  measurements: [],
  loading: false,
};

export type State = {
  device: Device;
  devices: Array<Device>;
  message: string;
  isBluetoothOn?: boolean;
  measurements: Array<object>;
  loading: boolean;
};

const bleReducer = (state: State = initialState, action: BleAction) => {
  switch (action.type) {
    case types.ADD_DEVICE: {
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    }
    case types.SET_DEVICE: {
      return {
        ...state,
        device: action.payload,
      };
    }
    case types.UPDATE_DEVICE: {
      return {
        ...state,
        devices: state.devices.map((item: Device) => {
          if (
            typeof action.payload !== "string" &&
            item.id === action.payload.id
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    }
    case types.SET_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case types.SET_MEASUREMENT: {
      return {
        ...state,
        measurements: action.payload,
      };
    }
    case types.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case types.RESET:
      return {
        ...initialState,
        isBluetoothOn: state.isBluetoothOn,
        device: state.device,
        measurements: state.measurements
      };
    default: {
      return state;
    }
  }
};
export default bleReducer;
