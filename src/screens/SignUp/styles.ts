import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
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
  loginText:{
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  snackBar: {
    backgroundColor: COLORS.primaryLight,
  },
});

export default styles;
