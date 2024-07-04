import React from "react";
import { KeyboardTypeOptions, TextStyle, View } from "react-native";

import CustomTextInput from "@components/CustomTextInput";
import Subtitle from "@components/Subtitle";
import styles from "./styles";

type Props = {
  title: string;
  value?: string;
  rightIcon?: string;
  errorMessage?: string;
  isEditable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  contentStyle?: TextStyle;
  onRightIconPress?: () => void;
  onChangeText?: (text: string) => void;
};

const ProfileTextInput = (props: Props) => {
  return (
    <View style={styles.container} testID="custom-text-input-wrapper">
      <Subtitle title={props.title} titleStyle={styles.title} />
      <CustomTextInput
        style={styles.input}
        contentStyle={props.contentStyle}
        value={props.value}
        rightIcon={props.rightIcon}
        isEditable={props.isEditable}
        errorMessage={props.errorMessage}
        keyboardType={props.keyboardType}
        onRightIconPress={props.onRightIconPress}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default ProfileTextInput;
