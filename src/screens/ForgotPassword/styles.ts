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
  loginText: {
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
});

export default styles;
