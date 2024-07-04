import React from 'react';
import { Linking } from 'react-native';

import * as routes from '@constants/screens';
import useBluetooth from '@hooks/useBluetooth';
import { useAppNavigation } from '@hooks/useAppNavigation'

import CustomButton from '@components/CustomButton';
import i18n from '@i18n/index';
import styles from './styles'

type Props = {
  permissions: boolean;
}

const PermissionButtonTab = ({permissions}: Props) => {
  const {blePowerOn: bleState} = useBluetooth();
  const navigation = useAppNavigation();

  const openAppSetting = () => {
    Linking.openSettings();
  };

  const nextPressHandler = () => {
    bleState
      ? navigation.navigate(routes.BLE_READY_SCREEN)
      : navigation.navigate(routes.BLE_STATE_SCREEN);
  };

  return (
    <>
      {!permissions ? (
        <CustomButton
          title={i18n.t('bluetooth.open_app_settings')}
          onPress={openAppSetting}
          styles={styles.button}
          titleStyle={styles.buttonText}
        />
      ) : (
        <CustomButton
          title={i18n.t('buttons.next')}
          onPress={nextPressHandler}
          styles={styles.button}
          titleStyle={styles.buttonText}
        />
      )}
    </>
  );
};

export default PermissionButtonTab;
