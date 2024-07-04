import React, {useRef} from 'react';
import {View, Animated, useWindowDimensions} from 'react-native';

import styles from './styles';

import {COLORS} from '@constants/colors';

type Props = {
  length: number;
  index: number;
}

const ScreenProgress = ({length, index}: Props) => {
  const {width: windowWidth} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(windowWidth * index)).current;

  const arrayWithScreenAmountLength = [];
  for (let i = 0; i < length; i++) {
    arrayWithScreenAmountLength.push({});
  }

  return (
    <View style={styles.indicatorContainer} testID="indicator-container">
      {arrayWithScreenAmountLength.map((item, itemIndex) => {
        const width = scrollX.interpolate({
          inputRange: [
            windowWidth * (itemIndex - 1),
            windowWidth * itemIndex,
            windowWidth * (itemIndex + 1),
          ],
          outputRange: [16, 32, 16],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange: [
            windowWidth * (itemIndex - 1),
            windowWidth * itemIndex,
            windowWidth * (itemIndex + 1),
          ],
          outputRange: [COLORS.primaryLight, COLORS.primaryDark, COLORS.primaryLight],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={itemIndex}
            style={[styles.normalDot, {width}, {backgroundColor}]}
          />
        );
      })}
    </View>
  );
};

export default ScreenProgress;
