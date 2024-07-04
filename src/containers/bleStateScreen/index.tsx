import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';

import styles from './styles';

import CustomButton from '@components/CustomButton';
import { COLORS } from "@constants/colors";
import images from '@assets/images';
import * as routes from '@constants/screens';
import i18n from '@i18n/index';
import useBluetooth from '@hooks/useBluetooth';
import { useAppNavigation } from '@hooks/useAppNavigation'
import { OPEN_BLUETOOTH_SETTINGS } from '@constants/bluetooth';
import ScreenProgress from '@components/ScreenProgress';

const BleStateScreen = () => {
  const { colors } = useTheme();
  const navigation = useAppNavigation();
  const { blePowerOn: bleState } = useBluetooth();

  const messageBleState = bleState
    ? i18n.t('bluetooth.ble_powered_on')
    : i18n.t('bluetooth.ble_powered_off');
  let color = bleState ? COLORS.primaryDark : COLORS.primaryLight;

  const openBluetoothSetting = () => {
    Linking.sendIntent(OPEN_BLUETOOTH_SETTINGS);
  };

  const nextPressHandler = () => {
    bleState && navigation.navigate(routes.BLE_READY_SCREEN);
  };

  const BleutoothTab = () => (
    <>
      {!bleState ? (
        <CustomButton
          title={i18n.t('bluetooth.open_ble_settings')}
          styles={styles.button}
          titleStyle={styles.buttonText}
          onPress={openBluetoothSetting}
        />
      ) : (
        <CustomButton
          title={i18n.t('buttons.next')}
          titleStyle={styles.buttonText}
          styles={styles.button}
          onPress={nextPressHandler}
        />
      )}
    </>
  );

  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.topContainer}>
        <Image
          style={[styles.image, {tintColor: color}]}
          source={images.ble_inactive}
        />
        <Text style={[styles.text, {color: colors.text}]}>
          {messageBleState}
        </Text>
      </View>
      <ScreenProgress length={3} index={1} />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <BleutoothTab />
        </View>
        <View />
      </View>
    </View>
  );

};

export default BleStateScreen;
