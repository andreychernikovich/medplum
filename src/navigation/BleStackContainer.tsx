import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as routes from '@constants/screens';

import BlePermissionScreen from '@containers/blePermissionScreen';
import BleReadyScreen from '@containers/bleReadyScreen';
import DeviceListScreen from '@containers/deviceListScreen';
import BleStateScreen from '@containers/bleStateScreen';
import GraphicScreen from '@containers/graphicScreen';

import i18n from '@i18n/index';
import CustomHeader from '@components/CustomHeader';

const Stack = createStackNavigator();

const BleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerShown: true,
        headerBackTitleVisible: false,
        header: () => <CustomHeader title={i18n.t("headers.bluetooth")} />,
      }}>
      {/* TODO: refactor drawer behavior */}
      <Stack.Screen
        name={routes.PERMISSION_SCREEN}
        component={BlePermissionScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={routes.BLE_STATE_SCREEN}
        component={BleStateScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={routes.BLE_READY_SCREEN}
        component={BleReadyScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={routes.DEVICE_LIST_SCREEN}
        component={DeviceListScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={routes.DEVICE_GRAPHIC_SCREEN}
        component={GraphicScreen}
        options={{
          headerTitle: i18n.t('headers.device_logs'),
          animationTypeForReplace: 'pop',
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default BleStack;
