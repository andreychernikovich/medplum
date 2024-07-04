import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@screens/Login";
import SignUp from "@screens/SignUp";
import ForgotPassword from "@screens/ForgotPassword";
import { SIGN_UP, LOGIN, FORGOT_PASSWORD } from "@constants/screens";

const Stack = createNativeStackNavigator();

const AuthContainer = () => {
  return (
    <>
      <Stack.Navigator
         initialRouteName={LOGIN}
         screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={SIGN_UP} component={SignUp} />
        <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPassword} />
      </Stack.Navigator>
    </>
  );
};

export default AuthContainer;
