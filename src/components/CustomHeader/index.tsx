import React, { ReactNode } from "react";
import { View, ViewStyle, Text, TextStyle } from "react-native";
import styles from "./styles";

type Props = {
  title?: string | undefined;
  leftIcon?: string;
  rightIcon?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
  onPressLeftIcon?: () => void;
  headerRight?: () => ReactNode;
  headerLeft?: () => ReactNode;
};

const CustomHeader = ({headerLeft, headerRight, textStyle, title}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {headerLeft && headerLeft()}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {headerRight && headerRight()}
      </View>
    </View>
  );
};

export default CustomHeader;
