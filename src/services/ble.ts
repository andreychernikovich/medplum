import {BleManager} from 'react-native-ble-plx';

export const bleManager = new BleManager({
  restoreStateIdentifier: 'BleInTheBackground',
  restoreStateFunction: restoredState => {},
});
