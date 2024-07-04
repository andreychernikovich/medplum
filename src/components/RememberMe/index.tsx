import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@constants/colors";
import i18n from "@i18n/index";
import styles from "./styles";

type Props = {
  onPress: (remember: boolean) => void;
};

const RememberMe = (props: Props) => {
  const [isRememberMe, setIsRememberMe] = useState(false);

  return (
    <View style={styles.container} testID="rememberMeWrapper">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setIsRememberMe((prev) => !prev);
          props.onPress((prev) => !prev);
        }}
      >
        <Ionicons
          name={isRememberMe ? "checkbox-outline" : "square-outline"}
          size={24}
          color={COLORS.gray}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{i18n.t("login.rememberMe")}</Text>
    </View>
  );
};

export default RememberMe;
