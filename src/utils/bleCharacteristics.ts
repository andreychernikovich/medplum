/* eslint-disable no-console */
import { Characteristic } from 'react-native-ble-plx';
import { bleManager } from '@services/ble';
import { trackLog } from "@utils/trackLog";

export type CharacteristicsProps = {
  serviceUUID: string;
  uuid: string;
  isReadable: boolean;
  deviceID: string;
  value: string;
}

export const getDeviceCharacteristics = async (deviceID: string) => {
  const device_ = await bleManager.discoverAllServicesAndCharacteristicsForDevice(
    deviceID,
  );
  const services = await device_.services();
  const characteristics = [];
  for (const service of services) {
    const characteristics_ = await service.characteristics();
    for (const characteristic of characteristics_) {
      characteristics.push(characteristic);
    }
  }
  return characteristics;
};

export const readCharacteristic = async ({deviceID, serviceUUID, uuid}: Characteristic) => {
  return await bleManager.readCharacteristicForDevice(
    deviceID,
    serviceUUID,
    uuid,
  );
};

export const getAndReadCharacteristics = async (deviceID: string) => {
  const device_ = await bleManager.discoverAllServicesAndCharacteristicsForDevice(
    deviceID,
  );

  const services = await device_.services();
  const characteristics = [];
  for (const service of services) {
    const characteristics_ = await service.characteristics();
    for (const characteristic of characteristics_) {
      try {
        const characteristic_ = await characteristic.read();
        characteristics.push(characteristic_);
      } catch (error) {
        characteristics.push(characteristic);
        trackLog<Error>("error in getAndReadCharacteristics", error);
      }
    }
  }
  return characteristics;
};

export const subscribeOnCharacteristic = (
  deviceID: string,
  {serviceUUID, uuid}: {serviceUUID: string, uuid: string},
  callback: (data: any) =>void,
) => {
  const subscription = bleManager.monitorCharacteristicForDevice(
    deviceID,
    serviceUUID,
    uuid,
    (error, char) => {
      if (error) {
        trackLog<Error>("error in subscribeOnCharacteristic", error);
        return;
      }
      callback(char);
    },
  );

  return () => subscription.remove();
};

export const subscribeOnAllCharacteristics = async (deviceID: string, callback: ()=>void) => {

  const characteristics = await getDeviceCharacteristics(deviceID);
  for (const characteristic of characteristics)
    subscribeOnCharacteristic(deviceID, characteristic, callback);
};

export const readAllCharacteristics = async (deviceID: string) => {
  const characteristics = await getDeviceCharacteristics(deviceID);
  const characteristics_ = [];
  for (const characteristic of characteristics) {
    const {serviceUUID, uuid} = characteristic;
    try {
      const characteristic_ = await bleManager.readCharacteristicForDevice(
        deviceID,
        serviceUUID,
        uuid,
      );
      characteristics_.push(characteristic_);
    } catch (error) {
      trackLog<Error>("error in readAllCharacteristics", error);
    }
  }
  return characteristics_;
};

export const getCharacteristicsString = async (device: string) => {
  const characteristics = await getAndReadCharacteristics(device);
  const textArray = await characteristicsToTextArray(characteristics);
  Object.defineProperty(device, '_manager', {enumerable: false});
  return `${JSON.stringify(device)}\n\n${textArray}`;
};

export const characteristicsToTextArray = async (characteristics: Array<any>) => {
  return await Promise.all(
    characteristics.map(async characteristic => {
      Object.defineProperty(characteristic, '_manager', {enumerable: false});
      return `${JSON.stringify(characteristic)}\n\n`;
    }),
  );
};
