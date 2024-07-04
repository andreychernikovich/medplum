import React, { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';

import LogLayout from '@containers/logScreen';
import { BLUETOOTH } from '@constants/screens';
import { useAppNavigation } from '@hooks/useAppNavigation';
import useBluetoothConnected from '@hooks/useBluetoothConnected';
import MeasurementsListComponent from '../logScreen/components/measurementsList';

type Props = {
  isOpen: boolean;
  handleDropdown: () => void;
}

const MeasurementsScreen = (props: Props) => {
  const navigation = useAppNavigation();
  const { isDeviceConnected } = useBluetoothConnected();
  const { isOpen, handleDropdown } = props;

  useEffect(() => {
    if(isOpen && !isDeviceConnected) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: BLUETOOTH }]
        })
      );
    }
  }, [isOpen]);

  return (
    <LogLayout>
      <MeasurementsListComponent isOpen={isOpen} handleDropdown={handleDropdown} />
    </LogLayout>
  );
};

export default MeasurementsScreen;
