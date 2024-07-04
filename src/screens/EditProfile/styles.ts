import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    alignItems: "center",
  },
  button: {
    marginTop: 14,
  },
  snackBar: {
    backgroundColor: COLORS.primaryLight,
  },
  email: {
    color: COLORS.gray,
  },
});

export default styles;
