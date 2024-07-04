import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@constants/colors";
import styles from "./styles";

type Props = {
  icon: string;
  title: string;
  onPress: () => void;
};

const ProfileRowItem = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <Ionicons name={props.icon} size={32} color={COLORS.primaryDark} />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileRowItem;
