import React, { useCallback, useState } from 'react';
import { Text, View, VirtualizedList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import Progress from '@components/Progress';
import DeviceComponent from '@components/Device';
import ModalComponent from '@components/Modal';

import { scan, stopScan } from '@actions/bluetoothActions';
import { useAppNavigation } from '@hooks/useAppNavigation'
import * as routes from '@constants/screens';
import { COLORS } from "@constants/colors";
import { StoreState } from '@src/types/ble';
import { reset } from '@actions/ble';
import i18n from '@i18n/index';

import styles from './styles';

const DeviceListScreen = () => {
  const devices = useSelector((state: StoreState) => state.ble.devices);
  const device = useSelector((state: StoreState) => state.ble.device);

  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const nextButtonOpacity = useSharedValue(1);
  const fade = (value: number) => {
    nextButtonOpacity.value = withTiming(value, {
      duration: 500,
    });
  };

  useFocusEffect(
    useCallback(() => {
      fade(device.isConnected ? 1 : 0);
      if(device.isConnected) {
        navigation.navigate(routes.DEVICE_GRAPHIC_SCREEN);
      }
    }, [device.isConnected])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(reset());
      dispatch(scan());
      return () => dispatch(stopScan());
    }, []),
  );

  const renderLoader = () =>{
    return (
      <View style={styles.progressStyle}>
        {device.isConnecting && 
        <View style={styles.wrapper}>
            <Text style={styles.connectingText}>{i18n.t('bluetooth.deviceConnecting')}</Text>
        </View>}
        <Progress color={COLORS.primaryDark} />
      </View>
    )
  }

  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.listHeader}>
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          message={modalText}
        />
      </View>
      <View style={styles.listContainer}>
        {devices.length === 0 || device.isConnecting ? (
          renderLoader()
        ) : (
          <VirtualizedList
            data={devices}
            getItemCount={data => data.length}
            getItem={(data, index) => ({
              device: data[index],
              key: data[index].id,
            })}
            renderItem={({item}) => (
              <DeviceComponent
                key={item.key}
                device={item.device}
                setModalVisible={setModalVisible}
                setModalText={setModalText}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default DeviceListScreen;
