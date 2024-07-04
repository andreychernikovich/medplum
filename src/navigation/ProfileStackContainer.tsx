import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "@screens/Profile";
import EditProfile from "@screens/EditProfile";
import Settings from "@screens/Settings";
import { PROFILE, SETTINGS, EDIT_PROFILE } from "@constants/screens";
import CustomHeader from "@components/CustomHeader";
import i18n from "@i18n/index";

const Stack = createNativeStackNavigator();

const ProfileStackContainer = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={PROFILE}
        screenOptions={{
          headerShown: true,
          header: ({options}) => <CustomHeader title={options.title} /> 
        }}>
        <Stack.Screen 
            name={PROFILE} 
            component={Profile} 
            options={{
              title: i18n.t("headers.profile"),
            }}
        />
        <Stack.Screen 
            name={EDIT_PROFILE} 
            component={EditProfile}
            options={{
              title: i18n.t("headers.editProfile"),
            }}
        />
        <Stack.Screen 
            name={SETTINGS} 
            component={Settings}
             options={{
              title: i18n.t("headers.settings"),
            }}
        />
      </Stack.Navigator>
    </>
  );
};

export default ProfileStackContainer;
