import { StyleSheet, StatusBar } from "react-native";
import { COLORS } from "@constants/colors";

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  profileContaner: {
    margin: 20,
    borderBottomColor: COLORS.primaryLight,
    borderBottomWidth: 1,
    paddingBottom: 24,
    flexDirection: "row",
  },
  userInfoContainer: {
    marginLeft: 20,
    alignSelf: "center",
  },
  avatarStyle: {
    backgroundColor: COLORS.primaryDark,
  },
  labelStyle: {
    fontSize: 42,
  },
  name: {
    fontSize: 26,
    fontWeight: '500',
    color: COLORS.primaryDark,
  },
  city: {
    marginTop: 8,
    marginBottom: 2
  },
});

export default styles;
