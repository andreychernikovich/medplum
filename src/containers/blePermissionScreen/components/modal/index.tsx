import React from 'react';
import {ScrollView, Text, View, Dimensions} from 'react-native';
import {Modal} from 'react-native-paper';

import {useTheme} from '@react-navigation/native';

import styles from './styles';

import i18n from '@i18n/index';
import CustomButton from '@components/CustomButton';
import {requestBluetooth_} from '@utils/permissions';
import {COLORS} from "@constants/colors";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (data: boolean)=> void;
  setPermissions: (data: boolean)=> void;
}

const ModalComponent = ({modalVisible, setModalVisible, setPermissions}: ModalProps) => {
  const {colors} = useTheme();
  const leftTextStyle = [styles.leftedText, {color: colors.text}];
  const hideModal = () => setModalVisible(false);

  const askPermissions = async () => {
    const isAvailable = await requestBluetooth_();
    setPermissions(isAvailable);
    setModalVisible(!isAvailable);
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={hideModal}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={250}
      animationOutTiming={250}
      deviceHeight={Dimensions.get('screen').height}
      deviceWidth={Dimensions.get('screen').width}
      hideModalContentWhileAnimating={true}
      hasBackdrop={true}
      backdropColor={colors.text}
      backdropOpacity={0.5}
      statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        <ScrollView
          contentContainerStyle={[
            styles.modalView,
            {backgroundColor: colors.background},
          ]}>
          <View style={styles.permListContainer}>
            <Text style={styles.attentionText}>
              {i18n.t('bluetooth.attention')}
            </Text>
            <Text style={[styles.centerText, {color: colors.text}]}>
              {i18n.t('bluetooth.requirements')}
            </Text>
            <Text style={leftTextStyle}>
              {`• ${i18n.t('permission.fine_location')}`}
            </Text>
            <Text style={leftTextStyle}>
              {`• ${i18n.t('permission.bluetooth')}`}
            </Text>
          </View>
          <View style={styles.modalButtonsContainer}>
            <CustomButton
              title={i18n.t('permission.provide')}
              styles={[
                styles.buttonStyle,
                {backgroundColor: COLORS.altBtnColor},
              ]}
              onPress={askPermissions}
              titleStyle={styles.reverseButtonText}
            />
            <CustomButton
              title={i18n.t('buttons.hide')}
              styles={[
                styles.buttonStyle,
                {backgroundColor: COLORS.primaryDark},
              ]}
              onPress={hideModal}
              titleStyle={styles.reverseButtonText}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalComponent;
