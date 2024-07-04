import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";
import { COLORS } from "@constants/colors";

const Settings = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={COLORS.white} />
    </View>
  );
};

export default Settings;
