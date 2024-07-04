import React from "react";
import { TextStyle, Text } from "react-native";
import styles from "./styles";

type Props = {
  title: string;
  titleStyle?: TextStyle | undefined;
};

const Subtitle = (props: Props) => {
  return (
    <Text testID="subtitle-text" style={[styles.title, props.titleStyle]}>
      {props.title}
    </Text>
  );
};

export default Subtitle;
