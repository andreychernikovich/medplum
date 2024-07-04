# Getting Started

To avoid errors in react-native-permissions need to comment line inRNPermissionsModule.mm
RCTLogError(@"%@", message);

>**Note**: as we use MMKV instead of AsyncStorage - we need to make pre-builds for expo

## Step 1: npx expo prebuild

## Step 2: npx expo run:android OR npx expo run:ios

>**Note**: More info here https://docs.expo.dev/workflow/prebuild/

To launch physical ios 

npx expo start --dev-client

##Installation:

yarn add _react-native-ble-plx_


Before use, you may check [docs](https://dotintent.github.io/react-native-ble-plx/) of this lib.


There is hook: useBluetooth to check state of bluetooth and conncected device

##Redux store:

Before use, you should install **_thunkMiddleware_** from **_'redux-thunk'_** and add it as middleware and  add following in your store.

```
import {combineReducers} from 'redux';
import {BleManager} from 'react-native-ble-plx';
import thunkMiddleware from 'redux-thunk';
import bleReducer from '../modules/bluetooth-le/reducers/bleReducer';

export const bleManager = new BleManager({
  restoreStateIdentifier: 'BleInTheBackground',
  restoreStateFunction: restoredState => {...},
});

const middlewares = [
    YOUR_MIDDLEWARES,
    thunkMiddleware.withExtraArgument(bleManager),
  ];

combineReducers({
  YOUR_REDUCERS,
  bleReducer
});
```
####Example: 
_store_ file
```
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {BleManager} from 'react-native-ble-plx';
import thunkMiddleware from 'redux-thunk';
import bleReducer from '../modules/bluetooth-le/reducers/bleReducer';

export const bleManager = new BleManager({
  restoreStateIdentifier: 'BleInTheBackground',
  restoreStateFunction: restoredState => {},
});

export const configureStore = () => {
  const middlewares = [
    thunkMiddleware.withExtraArgument(bleManager),
  ];

  const rootReducer = combineReducers({
    ble: bleReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return {store};
};
```

##Usage:

```
import useBluetooth from '../modules/bluetooth-le/hooks/useBluetooth';

const {blePowerOn: boolean, device}= useBluetooth();
```
Device store object
```
{
  id: string,
  name: string,
  isConnected: boolean,
  isConnecting: boolean,
};
```




1. actions that you can dispatch

```
  scan()
  stopScan()
  disconnectDevice()
  updateConnect(connectingDevice)
  reset() - restore store state to default
```
2. methods from utils to read device characteristics

```
getDeviceCharacteristics (deviceID):  async Characteristic[] with unread value
readCharacteristic ({deviceID, serviceUUID, uuid}): async Characteristic with read value
getAndReadCharacteristics (async deviceID): async Characteristic[] with read value if possible and null if not
subscribeOnCharacteristic(deviceID, {serviceUUID, uuid}: characteristic, callback): subscription
readAllCharacteristics(deviceID): async Characteristic[] with only read value
```

3. containers with implemented features

```
PermissionScreen: screen checks location and bluetooth permissions =>
BleStateScreen: screen checks if bluetooth powered on =>
BleReadyScreen: screen before scan screen =>
DeviceListScreen: screen with found BLE devices =>
LogScreen: screen with device charachteristics
```

