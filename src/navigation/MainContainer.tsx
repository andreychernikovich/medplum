import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMedplumProfile } from "@medplum/react-hooks";
import AuthContainer from "@navigation/AuthContainer";
import BottomStackContainer from "@navigation/BottomStackContainer";
import { CONTAINERS } from "@constants/screens";

const Stack = createNativeStackNavigator();

const MainContainer = () => {
  const profile = useMedplumProfile();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!profile ? (
        <Stack.Screen name={CONTAINERS.AUTH} component={AuthContainer} />
      ) : (
        <Stack.Screen
          name={CONTAINERS.BOTTOM_STACK}
          component={BottomStackContainer}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainContainer;
