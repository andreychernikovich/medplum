import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';

import styles from './styles';
import images from '@assets/images';
import i18n from '@i18n/index';

import {COLORS} from '@constants/colors';
import {DRAWER_STATE_CLOSED} from '@constants/drawer';
import {APP_STATE_ACTIVE} from '@constants/appState';

import {checkBluetooth_} from '@utils/permissions';
import useAppState from '@hooks/useAppState';

import ModalComponent from './components/modal';
import PermissionButtonTab from './components/permissionTab';
import ScreenProgress from '@components/ScreenProgress';

const PermissionScreen = () => {
  const {colors} = useTheme();
  const {appState} = useAppState();

  const [permissions, setPermissions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [askedPerms, setAskedPerms] = useState(false);
  const messagePerms = permissions
    ? i18n.t('permission.granted')
    : i18n.t('permission.denied');
  let color = permissions ? COLORS.primaryDark : COLORS.primaryLight;
  // const isDrawerClosed = useDrawerStatus() === DRAWER_STATE_CLOSED;
  const isDrawerClosed = true;

  useEffect(() => {
    preProcessingPerms();
  }, [isDrawerClosed]);

  useEffect(() => {
    if (appState === APP_STATE_ACTIVE) {
      checkPermissions();
    }
  }, [appState]);

  const preProcessingPerms = async () => {
    if (!askedPerms && isDrawerClosed) {
      setAskedPerms(true);
      let perms = await checkPermissions();
      setModalVisible(!perms);
    }
  };

  const checkPermissions = async () => {
    const isAvailable = await checkBluetooth_();
    setPermissions(isAvailable);
    return isAvailable;
  };

  return (
    <View style={styles.mainContainerStyle}>
      <ModalComponent
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setPermissions={setPermissions}
      />
      <View style={styles.topContainer}>
        <Image
          style={[styles.image, {tintColor: color}]}
          source={images.permissions}
        />
        <Text style={[styles.leftedText, {color: colors.text}]}>
          {messagePerms}
        </Text>
      </View>
      <ScreenProgress length={3} index={0} />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <PermissionButtonTab permissions={permissions} />
        </View>
        <View />
      </View>
    </View>
  );
};

export default PermissionScreen;
