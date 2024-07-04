import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import CustomButton from '@components/CustomButton';
import ScreenProgress from '@components/ScreenProgress';

import { updateConnect } from '@actions/bluetoothActions';
import { useAppNavigation } from '@hooks/useAppNavigation'
import * as routes from '@constants/screens';
import { SELECTED_DEVICE } from '@constants/storage';
import i18n from '@i18n/index';
import images from '@assets/images';
import { storage } from "@utils/storage";

import styles from './styles';

const BleReadyScreen = () => {
  const { colors } = useTheme();

  const navigation = useAppNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDevice = async () =>{
      const device = await storage.getString(SELECTED_DEVICE);
      if(device) {
        dispatch(updateConnect(JSON.parse(device)));
      }
    }
    getDevice()
  }, []);

  const nextPressHandler = () => {
    navigation.navigate(routes.DEVICE_LIST_SCREEN);
  };

  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.topContainer}>
        <Image style={styles.image} source={images.check} />
        <Text style={[styles.text, {color: colors.text}]}>
          {i18n.t('bluetooth.everything_fine')}
        </Text>
      </View>
      <ScreenProgress length={3} index={2} />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={i18n.t('buttons.next')}
            styles={styles.button}
            titleStyle={styles.buttonText}
            onPress={nextPressHandler}
          />
        </View>
        <View />
      </View>
    </View>
  );
};

export default BleReadyScreen;
