import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { HOME, BLUETOOTH, CONTAINERS, HEALTH } from "@constants/screens";
import { COLORS } from "@constants/colors";
import ProfileStackContainer from "@navigation/ProfileStackContainer";
import Home from "@screens/Home";
import BleStack from './BleStackContainer';

import i18n from "@i18n/index";
import HealthStack from "./HealthStackContainer";

const Tab = createBottomTabNavigator();

const BottomStackContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      backBehavior="history"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.primaryLight,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarLabel: i18n.t("tabLabel.timeline"),
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={tabInfo.focused ? COLORS.primaryDark : COLORS.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BLUETOOTH}
        component={BleStack}
        options={{
          header: () => null,
          tabBarLabel: i18n.t("tabLabel.bluetooth"),
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="settings-outline"
              size={24}
              color={tabInfo.focused ? COLORS.primaryDark : COLORS.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name={HEALTH}
        component={HealthStack}
        options={{
          header: () => null,
          tabBarLabel: i18n.t("tabLabel.health"),
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="heart-outline"
              size={24}
              color={tabInfo.focused ? COLORS.primaryDark : COLORS.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name={CONTAINERS.PROFILE_CONTAINER}
        component={ProfileStackContainer}
        options={{
          header: () => null,
          tabBarLabel: i18n.t("tabLabel.profile"),
          tabBarIcon: (tabInfo) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={tabInfo.focused ? COLORS.primaryDark : COLORS.primaryLight}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStackContainer;
