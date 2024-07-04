import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import type { RootStackParamList } from "@src/types/navigation";
import useLogin from "@hooks/useLogin";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Title from "@components/Title";
import Subtitle from "@components/Subtitle";
import RememberMe from "@components/RememberMe";
import { validateEmail } from "@utils/validators";
import { SIGN_UP, FORGOT_PASSWORD } from "@constants/screens";
import { EMAIL_VALUE, IS_REMEMBER_ME } from "@constants/storage";
import { GOOGLE_ID, IOS_GOOGLE_ID } from "@constants/environment";
import { trackLog } from "@utils/trackLog";
import i18n from "@i18n/index";
import styles from "./styles";
import { storage } from "@utils/storage";

const MIN_PASSWORD_LENGTH = 7;

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    typeof SIGN_UP | typeof FORGOT_PASSWORD
  >;
};

const Login = (props: Props) => {
  const {login, googleLogin} = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [isRemember, setIsRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");

  useEffect(() => {
    const isRememberEmail = storage.getBoolean(IS_REMEMBER_ME);
    const email = storage.getString(EMAIL_VALUE);
    if (isRememberEmail && email) setEmail(email);
  }, []);

  useEffect(() => {
    setIsDisabled(
      !(validateEmail(email) && password.length > MIN_PASSWORD_LENGTH),
    );
  }, [email, password]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const onLoginStart = async () => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      await login(email, password, (error: Error) => setErrorMessage(error.message));
      storage.set(IS_REMEMBER_ME, Boolean(isRemember));
      storage.set(EMAIL_VALUE, String(isRemember ? email : ""));
    } catch (e) {
      trackLog<Error>("error in login handler", e);
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleLoginStart = async () => {
    try {
      setIsSigninInProgress(true);
      GoogleSignin.configure({
        webClientId: GOOGLE_ID,
        offlineAccess: true,
        iosClientId: IOS_GOOGLE_ID
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        await googleLogin(userInfo.idToken, (error: Error) => setGoogleErrorMessage(error.message));
      }
    } catch (error) {
        trackLog<Error>("error in login handler2", error);
        setGoogleErrorMessage(error.message);
    } finally {
        setIsSigninInProgress(false);
    }
  }

  return (
    <View style={styles.container}>
      <Title title={i18n.t("login.login")} />
      <CustomTextInput
        placeholder={i18n.t("common.email")}
        value={email}
        leftIcon="account"
        onChangeText={setEmail}
        keyboardType="email-address"
        errorMessage={
          validateEmail(email) || !email ? "" : i18n.t("error.invalidEmail")
        }
      />
      <CustomTextInput
        placeholder={i18n.t("common.password")}
        secureTextEntry={true}
        leftIcon="key-variant"
        onChangeText={setPassword}
      />
      <RememberMe onPress={setIsRememberMe} />
      <CustomButton
        title={i18n.t("login.login")}
        disabled={isDisabled}
        isLoading={isLoading}
        error={errorMessage}
        onPress={onLoginStart}
      />
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => props.navigation.navigate(FORGOT_PASSWORD)}
      >
        <Subtitle
          titleStyle={styles.forgotPasswordText}
          title={i18n.t("forgotPassword.forgotPassword")}
        />
      </TouchableOpacity>
      <CustomButton
        title={i18n.t("login.googleLogin")}
        isLoading={isSigninInProgress}
        error={googleErrorMessage}
        onPress={onGoogleLoginStart}
      />
      <View style={styles.textContainer}>
        <Text>{i18n.t("login.doNotNaveAccount")}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate(SIGN_UP)}>
          <Subtitle
            titleStyle={styles.signupText}
            title={i18n.t("signup.signup")}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Login;
