import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
const {
  ACCESS_FINE_LOCATION,
  ACCESS_COARSE_LOCATION,
} = PermissionsAndroid.PERMISSIONS;

import { PermissionsAndroid, Platform } from 'react-native';

export const isAndroidDevice = Platform.OS === 'android';

export const requestLocationPermission = async () => {
  const check = await PermissionsAndroid.check(ACCESS_FINE_LOCATION);
  if (!check) return PermissionsAndroid.request(ACCESS_FINE_LOCATION);

  return PermissionsAndroid.RESULTS.GRANTED;
};

export const requestLocationCoarsePermission = async () => {
  const check = await PermissionsAndroid.check(ACCESS_COARSE_LOCATION);
  if (!check) return PermissionsAndroid.request(ACCESS_COARSE_LOCATION);

  return PermissionsAndroid.RESULTS.GRANTED;
};

const arrayForPermissions = isAndroidDevice
  ? [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    ]
  : [
      PERMISSIONS.IOS.BLUETOOTH
    ];

const statusForGranted = isAndroidDevice
  ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  : PERMISSIONS.IOS.BLUETOOTH;

export const checkBluetooth_ = async () => {
  return checkMultiple(arrayForPermissions)
    .then(statuses => {
      return statuses[statusForGranted] === RESULTS.GRANTED;
    })
    .catch(error => {
      return false;
    });
};

export const requestBluetooth_ = async () => {
  return requestMultiple(arrayForPermissions).then(statuses => {
    return RESULTS.GRANTED === `${statuses[statusForGranted]}`;
  });
};
