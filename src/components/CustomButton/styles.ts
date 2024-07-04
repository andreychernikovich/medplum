import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  button: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 12,
    marginTop: 40,
    backgroundColor: COLORS.primaryDark,
  },
  disabledButton: {
    backgroundColor: COLORS.primaryLight,
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    letterSpacing: 1,
    color: COLORS.white,
  },
});

export default styles;
