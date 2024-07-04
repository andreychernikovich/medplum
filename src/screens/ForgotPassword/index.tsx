import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@src/types/navigation";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Title from "@components/Title";
import { validateEmail } from "@utils/validators";
import Subtitle from "@components/Subtitle";
import { LOGIN } from "@constants/screens";
import i18n from "@i18n/index";
import styles from "./styles";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof LOGIN>;
};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const resetPassword = () => {
    //start reset password flow
  };

  useEffect(() => {
    setIsDisabled(!validateEmail(email));
  }, [email]);

  return (
    <View style={styles.container}>
      <Title title={i18n.t("forgotPassword.passwordReset")} />
      <CustomTextInput
        placeholder={i18n.t("common.email")}
        leftIcon="email"
        onChangeText={setEmail}
        keyboardType="email-address"
        errorMessage={
          validateEmail(email) || !email ? "" : i18n.t("error.invalidEmail")
        }
      />
      <CustomButton
        title={i18n.t("forgotPassword.resetPassword")}
        disabled={isDisabled}
        onPress={resetPassword}
      />
      <View style={styles.textContainer}>
        <Text>{i18n.t("forgotPassword.rememberPassword")}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(LOGIN)}
        >
          <Subtitle
            titleStyle={styles.loginText}
            title={i18n.t("login.login")}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default ForgotPassword;
