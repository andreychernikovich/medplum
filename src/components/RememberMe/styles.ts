import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 10,
    marginStart: 32,
  },
  text: {
    marginLeft: 6,
    alignSelf: "center",
    color: COLORS.gray,
  },
});

export default styles;
