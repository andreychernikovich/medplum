import React from "react";
import { View, ActivityIndicator, ViewStyle } from "react-native";

import { COLORS } from "@constants/colors";
import styles from "./style";

type Props = {
  style?: ViewStyle;
  color: string;
};

const Progress = ({ style, color }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        testID="progress-indicator"
        size="large"
        color={color || COLORS.altBtnColor}
      />
    </View>
  );
};

export default Progress;
