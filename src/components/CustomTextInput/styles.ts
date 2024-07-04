import { StyleSheet } from "react-native";
import { COLORS } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  input: {
    height: 52,
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderColor: COLORS.gray,
    marginTop: 20,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
});
