import { 
  setDevice, 
  updateDevice,
  addDevice
} from '@actions/ble';
import {
  Device, 
  BleAction, 
  Dispatch, 
  GetState, 
  IDeviceManager
} from '@src/types/ble'

/* eslint-disable no-undef */

export const emptyDevice: Device = {
  id: '',
  name: undefined,
  isConnected: false,
  isConnecting: false,
};

export const scan = () => {
  return (dispatch: Dispatch<BleAction>, getState: GetState, DeviceManager: IDeviceManager) => {
    DeviceManager.startDeviceScan(null, null, (error: any, newDevice: Device) => {
      if (error) return;
      let {
        ble: { device, devices },
      } = getState();
      if (!checkIsScanned(newDevice, devices)) {
        const deviceState = {
          ...newDevice,
          isConnected: device.id === newDevice.id,
          isConnecting: false,
        };
        dispatch(addDevice(deviceState));
      }
    });
  };
};

const checkIsScanned = (device: Device, devices: Array<Device>) =>
  !!devices.find(deviceInStorage => deviceInStorage.id === device.id);

export const stopScan = () => {
  return (dispatch: Dispatch<BleAction>, getState: GetState, DeviceManager: IDeviceManager) => {
    DeviceManager.stopDeviceScan();
  };
};

export const disconnectDevice = () => {
  return (dispatch: Dispatch<BleAction>, getState: GetState, DeviceManager: IDeviceManager) => {
    let {
      ble: { device },
    } = getState();
    disconnectBleDevice(dispatch, getState, DeviceManager, device);
  };
};

export const updateConnect = (connectingDevice: Device) => {
  return async (dispatch: Dispatch<BleAction>, getState: GetState, DeviceManager: IDeviceManager) => {
    let {
      ble: { device },
    } = getState();
    if (device.id !== '') {
      await disconnectBleDevice(dispatch, getState, DeviceManager, device);
      connectDevice(dispatch, getState, DeviceManager, connectingDevice);
    } else {
      connectDevice(dispatch, getState, DeviceManager, connectingDevice);
    }
  };
};

const connectDevice = async (
  dispatch: Dispatch<BleAction>,
  getState: GetState,
  DeviceManager: IDeviceManager,
  connectingDevice: Device,
) => {
  dispatch(
    updateDevice({
      ...connectingDevice,
      isConnecting: true,
    }),
  );
  dispatch(
    setDevice({
      ...connectingDevice,
      isConnecting: true,
    }),
  );
  try {
    const deviceUpdated = await DeviceManager.connectToDevice(
      connectingDevice.id,
      null,
    );
    const connectionStatus = deviceUpdated.isConnected;
    const deviceState = {
      ...deviceUpdated,
      isConnected: connectionStatus,
      isConnecting: false,
    };
    dispatch(updateDevice(deviceState));
    if (connectionStatus) dispatch(setDevice(deviceState));
    else dispatch(setDevice(emptyDevice));
  } catch (error) {
    let {
      ble: { device} ,
    } = getState();
    const deviceState: Device = {
      ...connectingDevice,
      isConnected: false,
      isConnecting: false,
    };
    dispatch(updateDevice(deviceState));
    if (device.id === connectingDevice.id) {
      dispatch(setDevice(emptyDevice));
    }
  }
};

const disconnectBleDevice = async (
  dispatch: Dispatch<BleAction>,
  getState: GetState,
  DeviceManager: IDeviceManager,
  deviceToDisconnect: Device,
) => {
  const deviceState = {
    ...deviceToDisconnect,
    isConnected: false,
    isConnecting: false,
  };
  await DeviceManager.cancelDeviceConnection(deviceToDisconnect.id);
  let {
    ble: {device},
  } = getState();
  dispatch(updateDevice(deviceState));
  if (device.id === deviceToDisconnect.id) dispatch(setDevice(emptyDevice));
};

/* eslint-enable no-undef */
