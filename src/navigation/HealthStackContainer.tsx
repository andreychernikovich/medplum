import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as routes from '@constants/screens';

import HealthPermissionScreen from '@containers/healthPermissionScreen';

import i18n from '@i18n/index';
import CustomHeader from '@components/CustomHeader';

const Stack = createStackNavigator();

const HealthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerShown: true,
        headerBackTitleVisible: false,
        header: () => <CustomHeader title={i18n.t("headers.health")} />,
      }}>
      {/* TODO: refactor drawer behavior */}
      <Stack.Screen
        name={routes.HEALTH_PERMISSION_SCREEN}
        component={HealthPermissionScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
    </Stack.Navigator>
  );
};

export default HealthStack;
