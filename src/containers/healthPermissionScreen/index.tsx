import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeEventEmitter,
  NativeModules,
  TouchableOpacity
} from 'react-native';

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }

  /* Can now read or write to HealthKit */

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };

  AppleHealthKit.getHeartRateSamples(
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
    },
  );
});

import styles from './styles';

export default function HealthPermissionScreen() {
  const [authStatus, setAuthStatus] = useState<any>({});

  useEffect(() => {
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:HeartRate:new',
      async () => {
        console.log('--> observer triggered');
      },
    );
  });

  const handlePressGetAuthStatus = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
    });
  };

  const handlePressGetDailyStepCountSamples = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                React Native Health Example
              </Text>
              <TouchableOpacity onPress={handlePressGetAuthStatus}>
                Press me to get Auth Status
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressGetDailyStepCountSamples}>
                Press me to get Daily Step Count Samples
              </TouchableOpacity>
              <Text style={styles.sectionDescription}>
                {JSON.stringify(authStatus, null, 2)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
