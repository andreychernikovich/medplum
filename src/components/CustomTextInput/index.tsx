import React, { useState } from "react";
import { KeyboardTypeOptions, TextStyle, View, ViewStyle } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { COLORS } from "@constants/colors";
import { styles } from "./styles";

type Props = {
  placeholder?: string;
  value?: string;
  leftIcon?: string;
  rightIcon?: string;
  errorMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  isEditable?: boolean;
  contentStyle?: TextStyle;
  style?: ViewStyle;
  onRightIconPress?: () => void;
  onChangeText?: (text: string) => void;
};

const CustomTextInput = (props: Props) => {
  const [hidePass, setHidePass] = useState(props.secureTextEntry);

  const iconButtonEyeHandler = () => {
    setHidePass(!hidePass);
  };

  const rightIcon = () =>
    props.rightIcon ? (
      <TextInput.Icon
        testID="icon-button"
        icon={props.rightIcon}
        color={COLORS.gray}
        onPress={props.onRightIconPress}
      />
    ) : (
      props.secureTextEntry && (
        <TextInput.Icon
          testID="icon-button-eye"
          icon={hidePass ? "eye-off" : "eye"}
          color={COLORS.gray}
          onPress={iconButtonEyeHandler}
        />
      )
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={hidePass}
        contentStyle={props.contentStyle}
        placeholderTextColor={COLORS.gray}
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
        underlineColor={COLORS.transparent}
        activeUnderlineColor={COLORS.transparent}
        editable={props.isEditable}
        left={
          props.leftIcon && (
            <TextInput.Icon
              testID="icon"
              icon={props.leftIcon}
              color={COLORS.gray}
            />
          )
        }
        right={rightIcon()}
      />
      {props.errorMessage && (
        <HelperText type="error">{props.errorMessage}</HelperText>
      )}
    </View>
  );
};

export default CustomTextInput;
