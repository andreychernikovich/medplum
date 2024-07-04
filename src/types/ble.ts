import { Observation } from "./observation";

export type Device = {
    id: string,
    isConnected?: boolean | undefined,
    isConnecting?: boolean,
    name?: string | undefined,
    txPowerLevel?: string,
}

export type EmptyDevice = {
  id: string,
  name: string,
  isConnected: boolean,
  isConnecting: boolean,
};

export type BleState = {
  ble: {
    device: {
      id: string;
      isConnected: boolean;
      name: string;
      isConnecting?: boolean;
    };
  };
};

export type BleAction = {
  type: string,
  payload: Device | string,
};
export type Dispatch<T> = (action: T) => void;

export type GetState = () => StoreState;

type DeviManagerHandler<> = (error: Error, newDevice: Device) => void;

export interface IDeviceManager {
  cancelDeviceConnection: (i:string) => Device,
  connectToDevice: (i:string, param: unknown) => Device,
  stopDeviceScan: () => void,
  startDeviceScan: (arg0: unknown, param: unknown, arg2: DeviManagerHandler) => void,
}

export type State = {
  device: Device,
  devices: Array<Device>,
  message: string,
  isBluetoothOn?: boolean,
  measurements: Array<Observation>,
  loading: boolean,
}

export type StoreState = {
  ble: State
}

export type Author = {
  display: string;
  reference: string;
}
