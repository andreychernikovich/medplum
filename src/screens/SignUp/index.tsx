import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Snackbar} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginAuthenticationResponse } from "@medplum/core";
import { useMedplum } from "@medplum/react-hooks";

import type { RootStackParamList } from "@src/types/navigation";
import useLogin from "@hooks/useLogin";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Title from "@components/Title";
import Subtitle from "@components/Subtitle";
import { validateEmail, validatePassword } from "@utils/validators";
import { LOGIN } from "@constants/screens";
import { PROJECT_ID } from "@constants/environment";
import { trackLog } from "@utils/trackLog";
import i18n from "@i18n/index";
import styles from "./styles";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, typeof LOGIN>;
};

const Signup = (props: Props) => {
  const medplum = useMedplum();
  const {login} = useLogin();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);

  useEffect(() => {
    setIsMatchPassword(password === confirmedPassword || !confirmedPassword);
  }, [password, confirmedPassword]);

  useEffect(() => {
    setIsDisabled(
      !(validateEmail(email)
      && validatePassword(password)
      && password === confirmedPassword
      && firstName
      && lastName
      && isMatchPassword))
  }, [firstName, lastName, email, password, confirmedPassword, isMatchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [firstName, lastName, email, password, confirmedPassword]);

  const handleNewPatientResponse = async (
    newUserResponse: LoginAuthenticationResponse
  ) => {
    try {
      await medplum
        .startNewPatient({
          login: newUserResponse.login,
          projectId: PROJECT_ID ?? "",
        });
      setVisibleSnackBar(true);
      await login(email, password, (error: Error) => setErrorMessage(error.message));
    } catch(error) {
      setErrorMessage(error.message);
      trackLog<Error>("error in new patient handler", error);
    }
  };

  const signup = async () => {
    try {
      setIsLoading(true);
      const newUserResponse: LoginAuthenticationResponse  = await medplum.startNewUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        projectId: PROJECT_ID,
        recaptchaToken: '',
      })
      await handleNewPatientResponse(newUserResponse);
    } catch (error) {
      setErrorMessage(error.message);
      trackLog<Error>("error in new user handler", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
        <Title title={i18n.t("signup.createAccount")}/>
        <CustomTextInput
          placeholder={i18n.t("signup.firstName")}
          leftIcon="account"
          onChangeText={setFirstName}
        />
        <CustomTextInput
          placeholder={i18n.t("signup.lastName")}
          leftIcon="account"
          onChangeText={setLastName}
        />
        <CustomTextInput
          placeholder={i18n.t("common.email")}
          leftIcon="email"
          keyboardType="email-address"
          errorMessage={(validateEmail(email) || !email) ? "" : i18n.t("error.invalidEmail")}
          onChangeText={setEmail}
        />
        <CustomTextInput
          placeholder={i18n.t("common.password")}
          secureTextEntry={true}
          leftIcon="key-variant"
          errorMessage={(validatePassword(password) || !password) ? "" : i18n.t("error.invalidPassword")}
          onChangeText={setPassword}
        />
        <CustomTextInput
          placeholder={i18n.t("signup.confirmPassword")}
          secureTextEntry={true}
          leftIcon="key-variant"
          errorMessage={(!isMatchPassword) ? i18n.t("error.passwordMismatch") : ""}
          onChangeText={setConfirmedPassword}
        />
        <CustomButton
          title={i18n.t("signup.createAccount")}
          disabled={isDisabled}
          onPress={signup}
          error={errorMessage}
          isLoading={isLoading}
        />
        <View style={styles.textContainer}>
          <Subtitle title={i18n.t("signup.haveAccount")} />
          <TouchableOpacity onPress={() => props.navigation.navigate(LOGIN)}>
            <Subtitle titleStyle={styles.loginText} title={i18n.t("login.login")} />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        </View>
      </ScrollView>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={() => setVisibleSnackBar(false)}
        style={styles.snackBar}
        duration={2000}
      >
        {i18n.t("signup.registrationSuccessfully")}
      </Snackbar>
    </View>
  );
};

export default Signup;
