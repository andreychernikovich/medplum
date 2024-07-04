import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle, View } from "react-native";
import { HelperText, ActivityIndicator } from "react-native-paper";

import { COLORS } from "@constants/colors";
import styles from "./styles";

type Props = {
  title?: string;
  disabled?: boolean;
  error?: string;
  isLoading?: boolean;
  styles?: ViewStyle | undefined;
  titleStyle?: TextStyle | undefined;
  onPress: (data?: any) => void;
}

const CustomButton = (props: Props) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={[
        styles.button,
        props.disabled && styles.disabledButton,
        props.styles,
      ]}
      disabled={props.disabled || props.isLoading}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      {props.isLoading
        ? <ActivityIndicator color={COLORS.white} testID="activity-indicator" />
        : <Text style={[styles.text, props.titleStyle]}>{props.title}</Text>
      }
    </TouchableOpacity>
    {props.error && (<HelperText type="error">{props.error}</HelperText>)}
    </View>
  );
};

export default CustomButton;
