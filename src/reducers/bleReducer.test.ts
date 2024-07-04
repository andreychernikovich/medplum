import bleReducer from "./bleReducer";
import * as types from "@constants/actionTypes";
import { BleAction, Device } from "@src/types/ble";

const mockDevice: Device = {
  id: "123",
  name: "Mock Device",
  isConnected: true,
  isConnecting: false,
};

const mockDeviceForUpdate: Device = {
  id: "456",
  name: "Another Device",
  isConnected: false,
  isConnecting: true,
};

const mockDevices: Array<Device> = [
  {
    id: "456",
    name: "Another Device",
    isConnected: false,
    isConnecting: true,
  },
  {
    id: "789",
    name: "Yet Another Device",
    isConnected: false,
    isConnecting: false,
  },
];

const initialState = {
  device: { id: "", name: "", isConnected: false, isConnecting: false },
  devices: [],
  message: "",
};

describe("bleReducer", () => {
  it("should return the initial state when no action is provided", () => {
    const state = bleReducer(initialState, {} as BleAction);

    expect(state).toEqual(initialState);
  });

  it("should add a new device to the devices array when the action type is ADD_DEVICE", () => {
    const action: BleAction = {
      type: types.ADD_DEVICE,
      payload: mockDevice,
    };

    const state = bleReducer(initialState, action);

    expect(state.devices).toContain(mockDevice);
  });

  it("should set the device object to the action payload when the action type is SET_DEVICE", () => {
    const action: BleAction = {
      type: types.SET_DEVICE,
      payload: mockDevice,
    };

    const state = bleReducer(initialState, action);

    expect(state.device).toEqual(mockDevice);
  });

  it("should update the device object in the devices array that matches the action payload id when the action type is UPDATE_DEVICE", () => {
    const action: BleAction = {
      type: types.UPDATE_DEVICE,
      payload: { ...mockDeviceForUpdate, name: "Updated Device" },
    };

    const state = bleReducer({ ...initialState, devices: mockDevices }, action);

    expect(state.devices).toContainEqual(action.payload);
  });

  it("should set the message string to the action payload when the action type is SET_MESSAGE", () => {
    const action: BleAction = {
      type: types.SET_MESSAGE,
      payload: "Mock Message",
    };

    const state = bleReducer(initialState, action);

    expect(state.message).toEqual(action.payload);
  });

  it("should reset the state to the initial state except for the isBluetoothOn and device properties when the action type is RESET", () => {
    const action: BleAction = {
      type: types.RESET,
      payload: ""
    };

    const state = bleReducer(
      {
        ...initialState,
        devices: mockDevices,
        message: "Mock Message",
        isBluetoothOn: true,
        device: mockDevice,
      },
      action
    );

    expect(state).toEqual({
      ...initialState,
      isBluetoothOn: true,
      device: mockDevice,
    });
  });
});
