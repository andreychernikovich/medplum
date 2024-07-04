import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "flex-end",
    marginTop: 20,
  },
  signupText: {
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginEnd: 40,
  },
  forgotPasswordText: {
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginTop: 10,
  },
});

export default styles;
