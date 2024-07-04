import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import { disconnectDevice, updateConnect } from '@actions/bluetoothActions';
import images from '@assets/images';
import i18n from '@i18n/index';
import { COLORS } from '@constants/colors';
import { storage } from "@utils/storage";
import { SELECTED_DEVICE } from '@constants/storage';

import CustomButton from '@components/CustomButton';
import Progress from '@components/Progress';

import styles from './styles';
import { Device } from '@src/types/ble'

type Props = {
  device: Device;
  setModalVisible: (data: boolean) => void;
  setModalText: (datta: string) => void;
}

const DeviceComponent = ({device, setModalVisible, setModalText}: Props) => {
  const [deviceName, setDeviceName] = useState<string | undefined>("");
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const isConnected = device.isConnected;
  const isConnecting = device.isConnecting;

  useEffect(() => {
    setDeviceName(device.name);
    setDeviceId(device.id);
  }, []);

  const pressHanlderConnect = () => {
    if (device.isConnected || device.isConnecting) {
      dispatch(disconnectDevice());
    } else {
      storage.set(SELECTED_DEVICE,  JSON.stringify({id: device?.id, isConnected: false}));
      dispatch(updateConnect(device));
    }
  };

  const deviceShortText = `id : ${device.id} \nname : ${device.name} \n txLevel : ${device.txPowerLevel}`;

  const pressHanlderInfo = () => {
    setModalText(deviceShortText);
    setModalVisible(true);
  };

  return (
    <TouchableOpacity
      testID="device-component"
      onPress={pressHanlderConnect}
      style={[styles.mainContainer]}>
      <View style={styles.lefContainer}>
        <Image style={styles.leftIcon} source={images.ble_active} />
        <View style={styles.midContainer}>
          <Text testID="device-name" style={[styles.textname, {color: colors.text}]} numberOfLines={1}>
            {deviceName || deviceId}
          </Text>
          {isConnected && (
            <Text style={[styles.textStatus, {color: colors.primary}]}>
              {i18n.t('buttons.connected')}
            </Text>
          )}
          {isConnecting && (
            <Text style={[styles.textStatus, {color: colors.primary}]}>
              {i18n.t('buttons.connecting')}
            </Text>
          )}
        </View>
        <View style={styles.connectButtonContainer}>
          <View>
            {isConnecting && (
              <Progress style={styles.rightIcon} color={COLORS.primaryDark} />
            )}
          </View>
          <CustomButton
            styles={styles.connectButton}
            onPress={pressHanlderInfo}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceComponent;
