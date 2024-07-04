import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flex : 1,
    zIndex: 1,
  },
  textContainer: {
    width: "70%",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.primaryDark,
  },
  buttonContainer: {
    width: "15%",
  }
});

export default styles;
