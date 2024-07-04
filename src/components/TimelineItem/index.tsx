import React, { useCallback, useEffect, useState } from "react";
import { NativeSyntheticEvent, Text, TextLayoutEventData, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import i18n from "@i18n/index";
import { COLORS } from "@constants/colors";
import styles from "./styles";

type Props = {
  title?: string;
  subtitle?: string;
  comment?: string;
  icon?: string;
  date: string;
  time: string;
}

const NUM_OF_LINES = 3;

const TimelineItem = (props: Props) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<number | undefined>(undefined);

  useEffect(() => {
    setNumLines(textShown ? undefined : NUM_OF_LINES);
  }, [textShown]);

  const onTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (event.nativeEvent.lines.length >= NUM_OF_LINES && !textShown) {
        setShowMoreButton(true);
        setNumLines(NUM_OF_LINES);
      }
    },
    [textShown],
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={props.icon} size={50} color={COLORS.primaryDark} />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.textContainer}>
          {props.title && <Text style={styles.title}>{props.title}</Text>}
          {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
          {props.comment &&
            <Text
              style={styles.comment}
              onTextLayout={onTextLayout}
              numberOfLines={numLines}>
                {props.comment}
            </Text>
          }
          {showMoreButton &&
            <Text onPress={() => setTextShown(prev => !prev)} style={styles.moreLess} ellipsizeMode="tail">
              {textShown ? i18n.t("timeline.readLess"): i18n.t("timeline.readMore")}
            </Text>
            }
        </View>
        <View>
          <Text style={styles.date}>{props.date}</Text>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelineItem;
